import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faUpload } from '@fortawesome/free-solid-svg-icons';
import ImageUpload from '../forms/ImageUpload';

Modal.setAppElement('#root');

const PhotoUpload = ({
  photoUploadModalIsOpen,
  setPhotoUploadModalIsOpen,
  imageType,
  uploadNewImages,
  loading,
  newUploads,
  setNewUploads,
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
      isOpen={photoUploadModalIsOpen}
      onRequestClose={() => setPhotoUploadModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='points-info'>
        <h2>Upload new {imageType} images</h2>
        <br />
        <div className='write-post-footer'>
          <ImageUpload newUploads={newUploads} setNewUploads={setNewUploads} />
        </div>
        {newUploads.length > 0 && (
          <button
            type='submit'
            className='submit-btn'
            onClick={uploadNewImages}
          >
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} className='fa' spin />
            ) : (
              <FontAwesomeIcon icon={faUpload} className='fa' />
            )}
            Upload
          </button>
        )}
        <button
          className='submit-btn cancel'
          onClick={() => setPhotoUploadModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default PhotoUpload;
