import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faSpinner } from '@fortawesome/free-solid-svg-icons';
import DeleteImage from './DeleteImage';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as faceapi from 'face-api.js';

Modal.setAppElement('#root');

const LargeImage = ({
  imageModalIsOpen,
  setImageModalIsOpen,
  imageIndex,
  setImageIndex,
  visitorPhotos,
  clearPhoto,
  membership,
  images,
  imageType,
  fetchUsersPhotos,
  setDetecting,
  detectfaces,
}) => {
  const [photos, setPhotos] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingCover, setLoadingCover] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteImageModalIsOpen, setDeleteImageModalIsOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState({});

  let { user } = useSelector((state) => ({ ...state }));

  const profileImgRef = useRef();

  let dispatch = useDispatch();

  useEffect(() => {
    if (imageType === 'profile') setPhotos(images[0]);
    if (imageType === 'cover') setPhotos(images[1]);
    if (imageType === 'general upload') setPhotos(images[2]);
  }, [imageType, images]);

  const { userId } = useParams();

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
    },
    overlay: {
      position: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0, .8)',
      zIndex: '1000',
      overflowY: 'auto',
    },
  };

  let slideIndex = imageIndex + 1;

  const plusSlides = (n) => {
    showSlides((slideIndex += n));
  };

  const showSlides = (n) => {
    let i;
    let firstSlide = document.getElementById('first-slide');
    let slides = document.getElementsByClassName('my-slides');
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    firstSlide.style.display = 'none';
    slides[slideIndex - 1].style.display = 'block';
  };

  const makeProfilePic = async (img) => {
    setLoadingProfile(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/profile-picture-update`,
        { _id: user._id, img },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setLoadingProfile(false);
        if (res.data.error) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        } else {
          toast.success(`Profile picture updated.`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            profileImage: res.data.profileImage,
            profilePhotos: res.data.profilePhotos,
          },
        });
        Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri('/models')])
          .then(detectfaces)
          .catch((err) => console.log(err));
        fetchUsersPhotos();
        setDetecting(true);
        setImageModalIsOpen(false);
      })
      .catch((err) => {
        setLoadingProfile(false);
        console.log(err);
        toast.error('Profile picture failed to update.', {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const makeCoverPic = async (img) => {
    setLoadingCover(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/cover-picture-update`,
        { _id: user._id, img },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setLoadingCover(false);
        if (res.data.error) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        } else {
          toast.success(`Cover picture updated.`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            coverImage: res.data.coverImage,
            coverPhotos: res.data.coverPhotos,
          },
        });
        fetchUsersPhotos();
        setImageModalIsOpen(false);
      })
      .catch((err) => {
        setLoadingCover(false);
        console.log(err);
        toast.error('Cover picture failed to update.', {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const deleteImage = (img) => {
    setDeleteImageModalIsOpen(true);
    setCurrentImg(img);
  };

  const handleDeleteImage = async (img) => {
    setDeleteImageModalIsOpen(false);
    setLoadingDelete(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/upload-picture-delete`,
        {
          _id: user._id,
          coverImage: user.coverImage,
          profileImage: user.profileImage,
          img,
          imageType,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setImageIndex(0);
        setLoadingDelete(false);
        fetchUsersPhotos();
        setImageModalIsOpen(false);
        toast.error(`Image deleted.`, {
          position: toast.POSITION.TOP_CENTER,
        });
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
        if (res.data.profilePhotos.length > 0) {
          setDetecting(true);
          Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri('/models')])
            .then(detectfaces)
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        setLoadingDelete(false);
        console.log(err);
        toast.error('Image failed to delete.', {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <Modal
      isOpen={imageModalIsOpen}
      onRequestClose={() => setImageModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {photos && photos.length > 0 ? (
        <div className='slideshow-container'>
          <div className='fade' id='first-slide'>
            {user._id === userId && (
              <span className='delete-pic'>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className='fa trash'
                  onClick={() => deleteImage(photos[imageIndex])}
                />
              </span>
            )}
            <img
              src={photos[imageIndex].url || photos[imageIndex]}
              alt='1'
              className={
                user.role === 'main-admin' ||
                user.role === 'secondary-admin' ||
                user._id === userId
                  ? 'pd-image-large'
                  : visitorPhotos < 2 ||
                    !clearPhoto ||
                    !membership.paid ||
                    !user.clearPhoto ||
                    !user.membership.paid ||
                    user.profilePhotos.length < 2
                  ? 'blur pd-image-large'
                  : 'pd-image-large'
              }
            />
            {user._id === userId &&
              (imageType === 'profile' ? (
                loadingProfile ? (
                  <div className='spinner'>
                    <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                  </div>
                ) : (
                  <div
                    className='slideshow-text'
                    onClick={() => makeProfilePic(photos[imageIndex])}
                  >
                    Make profile picture
                  </div>
                )
              ) : (
                imageType === 'cover' &&
                (loadingCover ? (
                  <div className='spinner'>
                    <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                  </div>
                ) : (
                  <div
                    className='slideshow-text'
                    onClick={() => makeCoverPic(photos[imageIndex])}
                  >
                    Make cover picture
                  </div>
                ))
              ))}
          </div>
          {photos.map((img, index) => (
            <div className='my-slides fade' key={index}>
              {user._id === userId && (
                <span className='delete-pic'>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className='fa trash'
                    onClick={() => deleteImage(img)}
                  />
                </span>
              )}
              <img
                src={img.url || img}
                alt={img.length}
                className={
                  user.role === 'main-admin' ||
                  user.role === 'secondary-admin' ||
                  user._id === userId
                    ? 'pd-image-large'
                    : visitorPhotos < 2 ||
                      !clearPhoto ||
                      !membership.paid ||
                      !user.clearPhoto ||
                      !user.membership.paid ||
                      user.profilePhotos.length < 2
                    ? 'blur pd-image-large'
                    : 'pd-image-large'
                }
              />
              {user._id === userId &&
                (imageType === 'profile' ? (
                  loadingProfile ? (
                    <div className='spinner'>
                      <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                    </div>
                  ) : (
                    <div
                      className='slideshow-text'
                      onClick={() => makeProfilePic(img)}
                    >
                      Make profile picture
                    </div>
                  )
                ) : (
                  imageType === 'cover' &&
                  (loadingCover ? (
                    <div className='spinner'>
                      <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                    </div>
                  ) : (
                    <div
                      className='slideshow-text'
                      onClick={() => makeCoverPic(img)}
                    >
                      Make cover picture
                    </div>
                  ))
                ))}
            </div>
          ))}
          <span className='slideshow-prev' onClick={() => plusSlides(-1)}>
            &#10094;
          </span>
          <span className='slideshow-next' onClick={() => plusSlides(1)}>
            &#10095;
          </span>
        </div>
      ) : (
        <p>no data</p>
      )}
      <DeleteImage
        deleteImageModalIsOpen={deleteImageModalIsOpen}
        setDeleteImageModalIsOpen={setDeleteImageModalIsOpen}
        handleDeleteImage={handleDeleteImage}
        currentImg={currentImg}
        loadingDelete={loadingDelete}
      />
    </Modal>
  );
};

export default LargeImage;
