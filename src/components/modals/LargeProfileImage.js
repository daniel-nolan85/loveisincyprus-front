import React, { useState } from 'react';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as faceapi from 'face-api.js';
import DeleteImage from './DeleteImage';

Modal.setAppElement('#root');

const LargeProfileImage = ({
  profileImageModalIsOpen,
  setProfileImageModalIsOpen,
  clearPhoto,
  membership,
  images,
  setDetecting,
  detectfaces,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteImageModalIsOpen, setDeleteImageModalIsOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState({});

  let { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

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

  let slideIndex = 1;

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
    setLoading(true);

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
        setLoading(false);
        setDetecting(true);
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
        setProfileImageModalIsOpen(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error('Profile picture failed to update.', {
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
        `${process.env.REACT_APP_API}/profile-picture-delete`,
        { _id: user._id, profileImage: user.profileImage, img, images },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setLoadingDelete(false);
        setDetecting(true);
        toast.error(`Profile picture deleted.`, {
          position: toast.POSITION.TOP_CENTER,
        });
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
        setProfileImageModalIsOpen(false);
      })
      .catch((err) => {
        setLoadingDelete(false);
        console.log(err);
        toast.error('Profile picture failed to delete.', {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <Modal
      isOpen={profileImageModalIsOpen}
      onRequestClose={() => setProfileImageModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {/* {images && images.length > 0 ? ( */}
      <div className='slideshow-container'>
        <div className='fade' id='first-slide'>
          <span className='delete-pic'>
            <FontAwesomeIcon
              icon={faTrashCan}
              className='fa trash'
              onClick={() => deleteImage(images[0])}
            />
          </span>
          <img
            src={images[0].url || images[0]}
            alt='1'
            className={
              user.role === 'main-admin' ||
              user.role === 'secondary-admin' ||
              user._id === userId
                ? 'pd-image-large'
                : user.profilePhotos.length < 2 ||
                  images.length < 2 ||
                  !user.clearPhoto ||
                  !clearPhoto ||
                  !membership.paid ||
                  !user.membership.paid
                ? 'blur pd-image-large'
                : 'pd-image-large'
            }
          />
          {loading ? (
            <div className='spinner'>
              <FontAwesomeIcon icon={faSpinner} className='fa' spin />
            </div>
          ) : (
            <div
              className='slideshow-text'
              onClick={() => makeProfilePic(images[0])}
            >
              Make profile picture
            </div>
          )}
        </div>
        {images.map((img, index) => (
          <div className='my-slides fade' key={index}>
            <span className='delete-pic'>
              <FontAwesomeIcon
                icon={faTrashCan}
                className='fa trash'
                onClick={() => deleteImage(img)}
              />
            </span>
            <img
              src={img.url || img}
              alt={img.length}
              className={
                user.role === 'main-admin' ||
                user.role === 'secondary-admin' ||
                user._id === userId
                  ? 'pd-image-large'
                  : user.profilePhotos.length < 2 ||
                    images.length < 2 ||
                    !user.clearPhoto ||
                    !clearPhoto ||
                    !membership.paid ||
                    !user.membership.paid
                  ? 'blur pd-image-large'
                  : 'pd-image-large'
              }
            />
            {loading ? (
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
            )}
          </div>
        ))}
        <span className='slideshow-prev' onClick={() => plusSlides(-1)}>
          &#10094;
        </span>
        <span className='slideshow-next' onClick={() => plusSlides(1)}>
          &#10095;
        </span>
      </div>
      {/* ) : (
        <img
          src={imageUrl.url || imageUrl}
          alt='Profile photo'
          className={
            user.role === 'main-admin' ||
            user.role === 'secondary-admin' ||
            user._id === userId
              ? 'pd-image-large'
              : visitorPhotos < 2 ||
                !clearPhoto ||
                !membership.paid ||
                !user.clearPhoto ||
                !user.membership.paid
              ? 'blur pd-image-large'
              : 'pd-image-large'
          }
        />
      )} */}
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

export default LargeProfileImage;
