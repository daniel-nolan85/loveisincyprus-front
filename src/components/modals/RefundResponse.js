import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const RefundResponse = ({
  responseRefundModalIsOpen,
  setResponseRefundModalIsOpen,
  currentOrder,
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
          You may now return your unwanted items to our goods department at the
          following address:
        </h3>
        <br />
        <div className='return-address'>
          <p>Ex Florum Limited</p>
          <p>Agiou Athanasiou 16-2</p>
          <p>8560 Peyia</p>
          <p>Cyprus</p>
        </div>
        <br />
        <h3>Your Order Id is: </h3>
        <h3 style={{ fontWeight: 'bold' }}>
          {currentOrder.paymentIntent && currentOrder.paymentIntent.id}
        </h3>
        <h3 className='warning center'>
          You must include your Order Id with your return. Failure to do so may
          result in your request being rejected.
        </h3>
        <br />
        Your request will be inspected upon our receipt of the items and, if
        granted, your refund will be returned to the bank account your purchase
        was made with no more than 30 days later.
        <br />
        This information has also been emailed to you for your reference.
      </div>
    </Modal>
  );
};

export default RefundResponse;
