import React from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import TakeAdPayment from '../forms/TakeAdPayment';

Modal.setAppElement('#root');

const AdPayment = ({
  paymentModalIsOpen,
  setPaymentModalIsOpen,
  currentAd,
  preparePayment,
  processing,
  succeeded,
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
      zIndex: '1000',
    },
  };

  return (
    <Modal
      isOpen={paymentModalIsOpen}
      onRequestClose={() => setPaymentModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {currentAd.accountInfo && (
        <div className='match'>
          <TakeAdPayment
            currentAd={currentAd}
            preparePayment={preparePayment}
            processing={processing}
            succeeded={succeeded}
          />
        </div>
      )}
    </Modal>
  );
};

export default AdPayment;
