import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const LargeDataImage = ({
  profileImageModalIsOpen,
  setProfileImageModalIsOpen,
  images,
  username,
}) => {
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
      isOpen={profileImageModalIsOpen}
      onRequestClose={() => setProfileImageModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='slideshow-container'>
        <h2 className='center'>
          {username} currently has
          <br />
          <span
            style={{ color: '#ef5b85', fontWeight: 'bold', fontSize: '24px' }}
          >
            {images.length}
          </span>{' '}
          {images.length == 1 ? 'profile image' : 'profile images'}
        </h2>
        {images && images.length > 1 ? (
          <>
            <div className='fade' id='first-slide'>
              <img
                src={images[0].url || images[0]}
                alt='1'
                className='pd-image-large'
              />
            </div>
            <>
              {images.map((img, index) => (
                <div className='my-slides fade' key={index}>
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
          images &&
          images.length === 1 && (
            <div className='fade' id='first-slide'>
              <img
                src={images[0].url || images[0]}
                alt='1'
                className='pd-image-large'
              />
            </div>
          )
        )}
      </div>
    </Modal>
  );
};

export default LargeDataImage;
