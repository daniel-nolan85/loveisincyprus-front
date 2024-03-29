import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

const AdPreview = ({
  previewModalIsOpen,
  setPreviewModalIsOpen,
  content,
  image,
  hyperlink,
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

  return (
    <Modal
      isOpen={previewModalIsOpen}
      onRequestClose={() => setPreviewModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='advert-preview'>
        {hyperlink ? (
          <Link
            to={{
              pathname: hyperlink,
            }}
            target='_blank'
          >
            {image.url ? (
              <>
                <img src={image.url} alt='Your advertisement image' />
                <br />
                <p className='ad-content' style={{ color: '#626262' }}>
                  {content}
                </p>
              </>
            ) : (
              <div className='no-image'>
                <p>{content}</p>
              </div>
            )}
          </Link>
        ) : image.url ? (
          <>
            <img src={image.url} alt='Your advertisement image' />
            <br />
            <p className='ad-content'>{content}</p>
          </>
        ) : (
          <div className='no-image'>
            <p>{content}</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AdPreview;
