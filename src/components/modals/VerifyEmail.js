import React from 'react';
import Modal from 'react-modal';
import { auth } from '../../firebase';
import { sendEmailVerification, get } from 'firebase/auth';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const VerifyEmail = ({
  verifyEmailModalIsOpen,
  setVerifyEmailModalIsOpen,
  email,
}) => {
  const sendVerification = () => {
    console.log(auth);
    // sendEmailVerification(email);
    // toast.success(
    //   `An email has been sent to ${email}. Please click the link to complete your registration.`,
    //   {
    //     position: toast.POSITION.TOP_CENTER,
    //   }
    // );
    // setVerifyEmailModalIsOpen(false);
  };
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
      isOpen={verifyEmailModalIsOpen}
      onRequestClose={() => setVerifyEmailModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>You have not yet verified your email address.</h1>
        <br />
        <button className='submit-btn' onClick={sendVerification}>
          Verify now?
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setVerifyEmailModalIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default VerifyEmail;
