import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const WhyNeedThisEmail = ({
  whyNeedThisEmailModalIsOpen,
  setWhyNeedThisEmailModalIsOpen,
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
      isOpen={whyNeedThisEmailModalIsOpen}
      onRequestClose={() => setWhyNeedThisEmailModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='why-do-we-need-this'>
        <h2>
          We will use the email address you provide us to send you a
          confirmation when you...
        </h2>
        <ul>
          <li>Purchase a subscription to the site</li>
          <li>Purchase an item from our online store</li>
        </ul>
        <br />
        <p>
          Your email address will not be displayed to any of our other members
          and will not be sold to any third-party entities.
        </p>
      </div>
    </Modal>
  );
};

export default WhyNeedThisEmail;
