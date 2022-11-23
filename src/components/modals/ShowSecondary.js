import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ShowSecondary = ({
  secondaryAdminModalIsOpen,
  setSecondaryAdminModalIsOpen,
  userIsSecondaryAdmin,
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

  const { name, username, profileImage } = userIsSecondaryAdmin;

  return (
    <Modal
      isOpen={secondaryAdminModalIsOpen}
      onRequestClose={() => setSecondaryAdminModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>{username || name} is a secondary admin member</h1>
        <br />
        {profileImage && (
          <div className='match-images'>
            <img src={profileImage.url} alt={`${username || name}'s post`} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ShowSecondary;
