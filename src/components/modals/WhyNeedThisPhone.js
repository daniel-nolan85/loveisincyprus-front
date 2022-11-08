import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const WhyNeedThisPhone = ({
  whyNeedThisPhoneModalIsOpen,
  setWhyNeedThisPhoneModalIsOpen,
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
      isOpen={whyNeedThisPhoneModalIsOpen}
      onRequestClose={() => setWhyNeedThisPhoneModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='why-do-we-need-this'>
        <h2>
          We will use the phone number you provide us to send you a one time
          password (OTP).
        </h2>
        <p>
          This 6 digit code will be sent to the number you give us and enable
          you to log in to the site.
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

export default WhyNeedThisPhone;
