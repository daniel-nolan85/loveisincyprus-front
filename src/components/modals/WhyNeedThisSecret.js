import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const WhyNeedThisSecret = ({
  whyNeedThisSecretModalIsOpen,
  setWhyNeedThisSecretModalIsOpen,
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
      isOpen={whyNeedThisSecretModalIsOpen}
      onRequestClose={() => setWhyNeedThisSecretModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='why-do-we-need-this'>
        <h2 className='center'>
          You can add an optional secret statement for your own security if you
          wish.
        </h2>
        <p>
          Your selected secret statement combined with the answer you provide
          may be used as an alternative way to log in to your account.
        </p>
        <p>
          This information will not be displayed to any of our other members.
        </p>
      </div>
    </Modal>
  );
};

export default WhyNeedThisSecret;
