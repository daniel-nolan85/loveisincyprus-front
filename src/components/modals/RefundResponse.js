import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const RefundResponse = ({
  responseRefundModalIsOpen,
  setResponseRefundModalIsOpen,
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
      isOpen={responseRefundModalIsOpen}
      onRequestClose={() => setResponseRefundModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='duration-info'>
        <h2 className='center'>Your refund request has been received.</h2>
        <h3>
          You may now return your unwanted items to us at the following address:
        </h3>
        <br />
        <div className='return-address'>
          <p>WOLF</p>
          <p>Agiou Athanasiou 16-2</p>
          <p>8560 Peyia</p>
          <p>Cyprus</p>
        </div>
        <br />
        Your refund will be returned to the bank account your purchase was made
        with within 30 days from receipt of the goods by us.
        <br />
        This information has also been emailed to you for your reference.
      </div>
    </Modal>
  );
};

export default RefundResponse;
