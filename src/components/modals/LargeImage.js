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
