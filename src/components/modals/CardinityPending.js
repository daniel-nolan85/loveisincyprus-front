import React from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const CardinityPending = ({
  cardinityPendingModalIsOpen,
  setCardinityPendingModalIsOpen,
  pendingFormData,
}) => {
  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

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
      onRequestClose={() => setCardinityPendingModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div dangerouslySetInnerHTML={{ __html: pendingFormData }}></div>
    </Modal>
  );
};

export default CardinityPending;
