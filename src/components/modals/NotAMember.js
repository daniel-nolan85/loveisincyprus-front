import React from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';

Modal.setAppElement('#root');

const NotAMember = ({ notAMemberModalIsOpen, setNotAMemberModalIsOpen }) => {
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
      isOpen={notAMemberModalIsOpen}
      onRequestClose={() => setNotAMemberModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>You must be a full-access member to buy gift cards</h1>
        <br />
        <button
          type='button'
          className='submit-btn'
          onClick={() => {
            history.push('/become-paid-member');
            setNotAMemberModalIsOpen(false);
          }}
        >
          Purchase subscription now
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setNotAMemberModalIsOpen(false)}
        >
          Maybe later
        </button>
      </div>
    </Modal>
  );
};

export default NotAMember;
