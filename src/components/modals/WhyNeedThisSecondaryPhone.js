import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const WhyNeedThisSecondaryPhone = ({
  whyNeedThisSecondaryPhoneModalIsOpen,
  setWhyNeedThisSecondaryPhoneModalIsOpen,
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
      isOpen={whyNeedThisSecondaryPhoneModalIsOpen}
      onRequestClose={() => setWhyNeedThisSecondaryPhoneModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='why-do-we-need-this'>
        <h2 className='center'>
          You can add an optional second number for your own security if you
          wish.
        </h2>
        <p>
          This number may be used to access your account in the event that you
          lose or change your primary mobile number.
        </p>
        <br />
        <p>
          Your phone number will not be displayed to any of our other members
          and will not be sold to any third-party entities.
        </p>
      </div>
    </Modal>
  );
};

export default WhyNeedThisSecondaryPhone;
