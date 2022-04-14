import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ImagesDenied = ({
  deniedModalIsOpen,
  setDeniedModalIsOpen,
  visitorPhotos,
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
  };

  return (
    <Modal
      isOpen={deniedModalIsOpen}
      onRequestClose={() => setDeniedModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='images-denied'>
        <h1>
          To view other member's photos you first need to upload some of your
          own
        </h1>
        <div>
          <h3>
            You have currently uploaded <span>{visitorPhotos}</span>
          </h3>
        </div>
        <div>
          <h3>
            Please upload <span>{visitorPhotos === 1 ? '1' : '2'}</span> more
          </h3>
        </div>
      </div>
    </Modal>
  );
};

export default ImagesDenied;
