import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import LargeImage from '../../components/modals/LargeImage';
import ImagesDenied from '../../components/modals/ImagesDenied';
import Mobile from '../../components/user/Mobile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import PhotoUpload from '../../components/modals/PhotoUpload';
import * as faceapi from 'face-api.js';
import { toast } from 'react-toastify';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [thisUser, setThisUser] = useState({});
  const [imageModalIsOpen, setImageModalIsOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [visitorPhotos, setVisitorPhotos] = useState(0);
  const [deniedModalIsOpen, setDeniedModalIsOpen] = useState(false);
  const [photoUploadModalIsOpen, setPhotoUploadModalIsOpen] = useState(false);
  const [imageType, setImageType] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [newUploads, setNewUploads] = useState([]);
  const [faces, setFaces] = useState([]);
  const [detecting, setDetecting] = useState(false);

  let { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  const { userId } = useParams();

  const isFirstRun = useRef(true);
  const profileImgRef = useRef();

  useEffect(() => {
    fetchUser();
    fetchUsersPhotos();
    if (
      user.role !== 'main-admin' ||
      user.role !== 'secondary-admin' ||
      user._id === userId
    )
      visitorPhotosCount();
  }, [user && userId]);

  useEffect(() => {
    if (user && user.token) {
      if (
        user.role === 'main-admin' ||
        user.role === 'secondary-admin' ||
        user._id === userId
      ) {
        return;
      } else if (!user.clearPhoto || !user.membership.paid) {
        setDeniedModalIsOpen(true);
      }
    }
  }, [user && user.token]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      hasClearProfileImage();
    }
  }, [faces]);

  const fetchUser = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/user/${userId}`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setThisUser(res.data);
        if (
          user.role === 'main-admin' ||
          user.role === 'secondary-admin' ||
          user._id === userId
        ) {
          return;
        } else if (!res.data.clearPhoto || !res.data.membership.paid) {
          setDeniedModalIsOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUsersPhotos = () => {
    axios
      .post(
        `${process.env.REACT_APP_API}/users-photos`,
        {
          userId,
          user,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setPhotos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const visitorPhotosCount = async () => {
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/visitor-photos`,
          { user },
          {
            headers: {
              authtoken: user.token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (
            user.role === 'main-admin' ||
            user.role === 'secondary-admin' ||
            user._id === userId
          ) {
            return;
          } else if (res.data < 2) {
            setDeniedModalIsOpen(true);
          }
          setVisitorPhotos(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const uploadNew = () => {
    setPhotoUploadModalIsOpen(true);
  };

  const uploadNewImages = async () => {
    setLoading(true);
    setPhotoUploadModalIsOpen(false);
    await axios
      .put(
        `${process.env.REACT_APP_API}/upload-new-images`,
        { _id: user._id, imageType, newUploads },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            profilePhotos: res.data.profilePhotos,
            coverPhotos: res.data.coverPhotos,
            uploadedPhotos: res.data.uploadedPhotos,
            profileImage: res.data.profileImage,
            coverImage: res.data.coverImage,
          },
        });
        fetchUsersPhotos();
        setLoading(false);
        setNewUploads([]);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setNewUploads([]);
      });
  };

  const detectfaces = async () => {
    const detections = await faceapi.detectAllFaces(
      profileImgRef.current,
      new faceapi.TinyFaceDetectorOptions()
    );
    setFaces(detections);
  };

  const hasClearProfileImage = async () => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/clear-profile-image`,
        { user, faces },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            clearPhoto: res.data.clearPhoto,
          },
        });
        setDetecting(false);
        if (res.data.clearPhoto && res.data.profilePhotos.length > 1) {
          toast.success(
            'Face detected on profile picture. You may view other members pictures clearly.',
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        } else if (res.data.clearPhoto && res.data.profilePhotos.length < 2) {
          toast.warning(
            'Face detected on profile picture. Upload one more profile picture to be able to view other members pictures clearly.',
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        } else if (!res.data.clearPhoto) {
          toast.warning(
            'No face detected on profile picture. You will not be able to see other members pictures clearly.',
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        }
      });
  };

  const { clearPhoto, membership, name, username } = thisUser;

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        <h1 className='center'>
          {user._id === userId ? 'My' : `${username || name}'s`} Photos
        </h1>
        <input type='radio' name='Photos' id='check1' defaultChecked />
        <input type='radio' name='Photos' id='check2' />
        <input type='radio' name='Photos' id='check3' />
        <div className='photos-top-content'>
          <label
            htmlFor='check1'
            className='submit-btn'
            onClick={() => {
              setImageType('profile');
              setImageIndex(0);
            }}
          >
            Profile Images
          </label>
          <label
            htmlFor='check2'
            className='submit-btn'
            onClick={() => {
              setImageType('cover');
              setImageIndex(0);
            }}
          >
            Cover Images
          </label>
          <label
            htmlFor='check3'
            className='submit-btn'
            onClick={() => {
              setImageType('general upload');
              setImageIndex(0);
            }}
          >
            Uploads
          </label>
        </div>
        {user._id === userId && (
          <div className='tooltip upload-images'>
            <FontAwesomeIcon
              icon={faUpload}
              className='fa'
              onClick={uploadNew}
            />
            <span className='tooltip-text'>Upload new images</span>
          </div>
        )}
        <div className='photo-gallery'>
          {photos[0] &&
            photos[0].map((photo, i) => (
              <div className='pic profile' key={i}>
                {i === 0 ? (
                  <>
                    {detecting && (
                      <div className='outer-circle-rect'>
                        <div className='img-scanner-rect'></div>
                      </div>
                    )}
                    <img
                      ref={profileImgRef}
                      crossOrigin='anonymous'
                      src={photo.url || photo}
                      alt=''
                      style={{ cursor: 'zoom-in' }}
                      onClick={() => {
                        setImageIndex(i);
                        setImageModalIsOpen(true);
                      }}
                      className={
                        user.role === 'main-admin' ||
                        user.role === 'secondary-admin' ||
                        user._id === userId
                          ? ''
                          : visitorPhotos < 2 ||
                            !clearPhoto ||
                            !membership.paid ||
                            !user.clearPhoto ||
                            !user.membership.paid ||
                            user.profilePhotos.length < 2
                          ? 'blur'
                          : ''
                      }
                    />
                  </>
                ) : (
                  <img
                    src={photo.url || photo}
                    alt=''
                    style={{ cursor: 'zoom-in' }}
                    onClick={() => {
                      setImageIndex(i);
                      setImageModalIsOpen(true);
                    }}
                    className={
                      user.role === 'main-admin' ||
                      user.role === 'secondary-admin' ||
                      user._id === userId
                        ? ''
                        : visitorPhotos < 2 ||
                          !clearPhoto ||
                          !membership.paid ||
                          !user.clearPhoto ||
                          !user.membership.paid ||
                          user.profilePhotos.length < 2
                        ? 'blur'
                        : ''
                    }
                  />
                )}
              </div>
            ))}
          {photos[1] &&
            photos[1].map((photo, i) => (
              <div className='pic cover' key={i}>
                <img
                  src={photo.url || photo}
                  alt=''
                  style={{ cursor: 'zoom-in' }}
                  onClick={() => {
                    setImageIndex(i);
                    setImageModalIsOpen(true);
                  }}
                  className={
                    user.role === 'main-admin' ||
                    user.role === 'secondary-admin' ||
                    user._id === userId
                      ? ''
                      : visitorPhotos < 2 ||
                        !clearPhoto ||
                        !membership.paid ||
                        !user.clearPhoto ||
                        !user.membership.paid ||
                        user.profilePhotos.length < 2
                      ? 'blur'
                      : ''
                  }
                />
              </div>
            ))}
          {photos[2] &&
            photos[2].map((photo, i) => (
              <div className='pic upload' key={i}>
                <img
                  src={photo.url || photo}
                  alt=''
                  style={{ cursor: 'zoom-in' }}
                  onClick={() => {
                    setImageIndex(i);
                    setImageModalIsOpen(true);
                  }}
                  className={
                    user.role === 'main-admin' ||
                    user.role === 'secondary-admin' ||
                    user._id === userId
                      ? ''
                      : visitorPhotos < 2 ||
                        !clearPhoto ||
                        !membership.paid ||
                        !user.clearPhoto ||
                        !user.membership.paid ||
                        user.profilePhotos.length < 2
                      ? 'blur'
                      : ''
                  }
                />
              </div>
            ))}
        </div>
        <LargeImage
          imageModalIsOpen={imageModalIsOpen}
          setImageModalIsOpen={setImageModalIsOpen}
          imageIndex={imageIndex}
          setImageIndex={setImageIndex}
          visitorPhotos={visitorPhotos}
          clearPhoto={clearPhoto}
          membership={membership}
          images={photos}
          imageType={imageType}
          fetchUsersPhotos={fetchUsersPhotos}
          setDetecting={setDetecting}
          detectfaces={detectfaces}
        />
        <ImagesDenied
          deniedModalIsOpen={deniedModalIsOpen}
          setDeniedModalIsOpen={setDeniedModalIsOpen}
          visitorPhotos={visitorPhotos}
          thisUser={thisUser}
          user={user}
        />
        <PhotoUpload
          photoUploadModalIsOpen={photoUploadModalIsOpen}
          setPhotoUploadModalIsOpen={setPhotoUploadModalIsOpen}
          imageType={imageType}
          uploadNewImages={uploadNewImages}
          loading={loading}
          newUploads={newUploads}
          setNewUploads={setNewUploads}
        />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Photos;
