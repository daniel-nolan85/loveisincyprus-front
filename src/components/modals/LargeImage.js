import React from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

Modal.setAppElement('#root');

const LargeImage = ({
  imageModalIsOpen,
  setImageModalIsOpen,
  imageUrl,
  visitorPhotos,
  clearPhoto,
  membership,
  images,
}) => {
  let { user } = useSelector((state) => ({ ...state }));

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

  return (
    <Modal
      isOpen={imageModalIsOpen}
      onRequestClose={() => setImageModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {images && images.length > 0 ? (
        <div className='slideshow-container'>
          <div className='fade' id='first-slide'>
            <img src={images[0].url || images[0]} alt='1' />
            <div className='slideshow-text'>Make profile picture</div>
          </div>
          {images.map((img, index) => (
            <div className='my-slides fade' key={index}>
              <img src={img.url || img} alt={img.length} />
              <div className='slideshow-text'>Make profile picture</div>
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
      )}
    </Modal>
  );
};

export default LargeImage;
