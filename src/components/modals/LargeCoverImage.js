import React, { useState } from 'react';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faSpinner } from '@fortawesome/free-solid-svg-icons';
import DeleteImage from './DeleteImage';

Modal.setAppElement('#root');

const LargeCoverImage = ({
  coverImageModalIsOpen,
  setCoverImageModalIsOpen,
  clearPhoto,
  membership,
  images,
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

  const makeCoverPic = async (img) => {
    setLoading(true);
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
        setLoading(false);
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
        setCoverImageModalIsOpen(false);
      })
      .catch((err) => {
        setLoading(false);
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
        `${process.env.REACT_APP_API}/cover-picture-delete`,
        { _id: user._id, coverImage: user.coverImage, img, images },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setLoadingDelete(false);
        toast.error(`Cover picture deleted.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            coverImage: res.data.coverImage,
            coverPhotos: res.data.coverPhotos,
          },
        });
        setCoverImageModalIsOpen(false);
      })
      .catch((err) => {
        setLoadingDelete(false);
        console.log(err);
        toast.error('Cover picture failed to delete.', {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <Modal
      isOpen={coverImageModalIsOpen}
      onRequestClose={() => setCoverImageModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {/* {images && images.length > 0 ? ( */}
      <div className='slideshow-container'>
        <div className='fade' id='first-slide'>
          {user._id === userId && (
            <span className='delete-pic'>
              <FontAwesomeIcon
                icon={faTrashCan}
                className='fa trash'
                onClick={() => deleteImage(images[0])}
              />
            </span>
          )}
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
          {user._id === userId &&
            (loading ? (
              <div className='spinner'>
                <FontAwesomeIcon icon={faSpinner} className='fa' spin />
              </div>
            ) : (
              <div
                className='slideshow-text'
                onClick={() => makeCoverPic(images[0])}
              >
                Make cover picture
              </div>
            ))}
        </div>
        {images.map((img, index) => (
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
            {user._id === userId &&
              (loading ? (
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

export default LargeCoverImage;
