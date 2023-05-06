import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CardinityPending = ({ cardinityPendingModalIsOpen, pendingFormData }) => {
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
      isOpen={cardinityPendingModalIsOpen}
      onRequestClose={() => {}}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {pendingFormData && (
        <>
          <h2 style={{ textAlign: 'center', margin: '10px auto' }}>
            You are about to be redirected to your bank in order to verify this
            transaction.
          </h2>
          <form
            name='ThreeDForm'
            method='POST'
            action={pendingFormData.threeds2_data.acs_url}
          >
            <button type='submit' className='submit-btn'>
              Continue
            </button>
            <input
              type='hidden'
              name='creq'
              value={pendingFormData.threeds2_data.creq}
            />
            <input
              type='hidden'
              name='threeDSSessionData'
              value={pendingFormData.id}
            />
          </form>
        </>
      )}
    </Modal>
  );
};

export default CardinityPending;
