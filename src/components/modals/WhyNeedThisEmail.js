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
