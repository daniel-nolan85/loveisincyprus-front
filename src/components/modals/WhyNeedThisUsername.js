import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const WhyNeedThisUsername = ({
  whyNeedThisUsernameModalIsOpen,
  setWhyNeedThisUsernameModalIsOpen,
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
      isOpen={whyNeedThisUsernameModalIsOpen}
      onRequestClose={() => setWhyNeedThisUsernameModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='why-do-we-need-this'>
        <h2 className='center'>
          Your username will be how you are referred to throughout the site.
        </h2>
        <p>
          You can update your username at any time via your profile page,
          however the username you choose must be unique.
        </p>
        <p>
          If you choose not to provide a username right now, we will assign a
          temporary one to you.
        </p>
      </div>
    </Modal>
  );
};

export default WhyNeedThisUsername;
