import React from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const DeleteImage = ({
  deleteImageModalIsOpen,
  setDeleteImageModalIsOpen,
  currentImg,
  handleDeleteImage,
  loadingDelete,
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
      isOpen={deleteImageModalIsOpen}
      onRequestClose={() => setDeleteImageModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to delete this image?</h1>
        <br />
        <div className='match-images'>
          <img src={currentImg.url || currentImg} alt='Image to delete' />
        </div>
        <br />
        <button
          className='submit-btn'
          onClick={() => {
            handleDeleteImage(currentImg);
          }}
        >
          {loadingDelete ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, delete'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => {
            setDeleteImageModalIsOpen(false);
          }}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteImage;
