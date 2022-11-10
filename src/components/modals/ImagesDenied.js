import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ImagesDenied = ({
  deniedModalIsOpen,
  setDeniedModalIsOpen,
  visitorPhotos,
  thisUser,
  user,
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

  const { name, clearPhoto, membership, username } = thisUser;

  return (
    <Modal
      isOpen={deniedModalIsOpen}
      onRequestClose={() => setDeniedModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='images-denied'>
        {visitorPhotos < 2 ? (
          <>
            <h1>
              To view other member's photos you first need to upload some of
              your own
            </h1>
            <div>
              <h3>
                You have currently uploaded <span>{visitorPhotos}</span>
              </h3>
            </div>
            <div>
              <h3>
                Please upload <span>{visitorPhotos === 1 ? '1' : '2'}</span>{' '}
                more
              </h3>
            </div>
          </>
        ) : !clearPhoto ? (
          <>
            <h1>
              {username || name} is not using a clear image of their face as
              their profile picture.
            </h1>
            <div>
              <h3>As a result their uploaded images cannot be viewed.</h3>
            </div>
          </>
        ) : !membership.paid ? (
          <>
            <h1>
              {username || name} is not currently a paid subsciber to Love Is In
              Cyprus.
            </h1>
            <div>
              <h3>As a result their uploaded images cannot be viewed.</h3>
            </div>
          </>
        ) : !user.clearPhoto ? (
          <>
            <h1>
              You are not currently using a clear image of your face as your
              profile picture.
            </h1>
            <div>
              <h3>As a result you cannot view other member's photos.</h3>
            </div>
          </>
        ) : (
          !user.membership.paid && (
            <>
              <h1>
                You are not currently a paid subscriber to Love Is In Cyprus.
              </h1>
              <div>
                <h3>As a result you cannot view other member's photos.</h3>
              </div>
            </>
          )
        )}
      </div>
    </Modal>
  );
};

export default ImagesDenied;
