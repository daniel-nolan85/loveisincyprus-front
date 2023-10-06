import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ViewPartner = ({
  viewSubStatusModalIsOpen,
  setViewSubStatusModalIsOpen,
  partner,
  username,
}) => {
  const modalStyles = {
    content: {
      position: 'fixed',
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
      isOpen={viewSubStatusModalIsOpen}
      onRequestClose={() => setViewSubStatusModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <h2 className='center'>
        {username} has full access to Love is in Cyprus courtesy of{' '}
        <span style={{ color: '#ef5b85' }}>{partner}</span>
      </h2>
    </Modal>
  );
};

export default ViewPartner;
