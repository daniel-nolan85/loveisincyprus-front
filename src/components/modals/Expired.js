import React from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';

Modal.setAppElement('#root');

const Expired = ({ expiredModalIsOpen, setExpiredModalIsOpen }) => {
  const history = useHistory();

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
      isOpen={expiredModalIsOpen}
      onRequestClose={() => setExpiredModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Your paid membership has expired</h1>
        <br />
        <p>Would you like to renew your paid membership now?</p>
        <br />
        <button
          className='submit-btn'
          onClick={() => {
            history.push('/become-paid-member');
            setExpiredModalIsOpen(false);
          }}
        >
          Yes, renew now
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setExpiredModalIsOpen(false)}
        >
          Maybe later
        </button>
      </div>
    </Modal>
  );
};

export default Expired;
