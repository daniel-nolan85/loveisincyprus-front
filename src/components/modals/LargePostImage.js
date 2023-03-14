import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faSpinner } from '@fortawesome/free-solid-svg-icons';
import DeleteImage from './DeleteImage';

Modal.setAppElement('#root');

const LargePostImage = ({
  postImageModalIsOpen,
  setPostImageModalIsOpen,
  post,
  newsFeed,
  fetchUserPosts,
  fetchPhotos,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteImageModalIsOpen, setDeleteImageModalIsOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState({});

  console.log('post => ', post);

  let { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

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

  const deleteImage = (img) => {
    setDeleteImageModalIsOpen(true);
    setCurrentImg(img);
  };

  const handleDeleteImage = async (img) => {
    setDeleteImageModalIsOpen(false);
    setLoadingDelete(true);
    console.log('img => ', img);
    await axios
      .put(
        `${process.env.REACT_APP_API}/post-picture-delete`,
        { _id: user._id, img, post },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setLoadingDelete(false);
        newsFeed && newsFeed();
        fetchUserPosts && fetchUserPosts();
        fetchPhotos && fetchPhotos();
        toast.error(`Image deleted.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            uploadedPhotos: res.data.uploadedPhotos,
          },
        });
        setPostImageModalIsOpen(false);
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
      isOpen={postImageModalIsOpen}
      onRequestClose={() => setPostImageModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='slideshow-container'>
        {post.postImages && post.postImages.length > 1 ? (
          <>
            <div className='fade' id='first-slide'>
              {user._id === post.postedBy._id && (
                <span className='delete-pic'>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className='fa trash'
                    onClick={() => deleteImage(post.postImages[0])}
                  />
                </span>
              )}
              <img
                src={post.postImages[0].url || post.postImages[0]}
                alt='1'
                className='pd-image-large'
              />
            </div>
            <>
              {post.postImages.map((img, index) => (
                <div className='my-slides fade' key={index}>
                  {user._id === post.postedBy._id && (
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
                    className='pd-image-large'
                  />
                </div>
              ))}
              <span className='slideshow-prev' onClick={() => plusSlides(-1)}>
                &#10094;
              </span>
              <span className='slideshow-next' onClick={() => plusSlides(1)}>
                &#10095;
              </span>
            </>
          </>
        ) : (
          post.postImages &&
          post.postImages.length === 1 && (
            <div className='fade' id='first-slide'>
              {user._id === post.postedBy._id && (
                <span className='delete-pic'>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className='fa trash'
                    onClick={() => deleteImage(post.postImages[0])}
                  />
                </span>
              )}
              <img
                src={post.postImages[0].url || post.postImages[0]}
                alt='1'
                className='pd-image-large'
              />
            </div>
          )
        )}
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

export default LargePostImage;
