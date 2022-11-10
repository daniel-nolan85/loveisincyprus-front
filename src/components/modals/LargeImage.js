import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const LargeImage = ({ imageModalIsOpen, setImageModalIsOpen, imageUrl }) => {
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
      isOpen={imageModalIsOpen}
      onRequestClose={() => setImageModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <img src={imageUrl} alt='Profile photo' className='pd-image-large' />
    </Modal>
  );
};

export default LargeImage;
