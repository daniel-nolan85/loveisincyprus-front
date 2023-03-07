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

  return (
    <Modal
      isOpen={imageModalIsOpen}
      onRequestClose={() => setImageModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <img
        src={imageUrl}
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
    </Modal>
  );
};

export default LargeImage;
