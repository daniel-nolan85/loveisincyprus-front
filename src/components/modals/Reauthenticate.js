import React from 'react';
import Modal from 'react-modal';
import { auth } from '../../firebase';
import {
  RecaptchaVerifier,
  updateEmail,
  updatePassword,
  updatePhoneNumber,
} from 'firebase/auth';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const Reauthenticate = ({
  reauthenticateModalIsOpen,
  setReauthenticateModalIsOpen,
  updatedMobile,
  updatedEmail,
  updatedAnswer,
  showOTP,
  setShowOTP,
  OTP,
  setOTP,
  reauthMobile,
  setReauthMobile,
  loadingReauth,
  setLoadingReauth,
}) => {
  const generateRecaptcha = (e) => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response) => {},
      },
      auth
    );
  };

  const requestOTP = () => {
    setLoadingReauth(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    auth.currentUser
      .reauthenticateWithPhoneNumber(reauthMobile, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOTP(true);
        toast.success(
          `A One Time Password has been sent to ${reauthMobile}. Please enter this code below to complete your registration.`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        setLoadingReauth(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}. Please refresh the page and try again`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoadingReauth(false);
      });
  };

  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);
    if (otp.length === 6) {
      setLoadingReauth(true);
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then(async (res) => {
          updatedMobile && updatePhoneNumber(auth.currentUser, updatedMobile);
          updatedEmail && updateEmail(auth.currentUser, updatedEmail);
          updatedAnswer && updatePassword(auth.currentUser, updatedAnswer);
          //   setReauthenticated(true);
          setReauthenticateModalIsOpen(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setLoadingReauth(false);
        });
    }
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
      isOpen={reauthenticateModalIsOpen}
      onRequestClose={() => setReauthenticateModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='reauthenticate'>
        <h2 className='center'>
          You are requesting to update sensitive information which requires
          recent authentication.
        </h2>
        <h2 className='center'>
          For your security, please log in again to update this information.
        </h2>
        <form className='input-group'>
          <div className='info-questions phone'>
            <PhoneInput
              country={'cy'}
              className='input-field'
              placeholder='Enter your mobile number'
              value={reauthMobile}
              onChange={(phone) => {
                setReauthMobile(`+${phone}`);
              }}
            />
          </div>
          <input
            type='number'
            className={
              showOTP
                ? 'input-field otp-container otp-container-show'
                : 'otp-container'
            }
            placeholder='Enter your verification code'
            value={OTP}
            onChange={verifyOTP}
          />
          <button
            onClick={requestOTP}
            type='button'
            className='submit-btn'
            disabled={!reauthMobile || showOTP}
          >
            {loadingReauth ? (
              <FontAwesomeIcon icon={faSpinner} className='fa' spin />
            ) : (
              <FontAwesomeIcon icon={faArrowRightToBracket} className='fa' />
            )}
            Request OTP
          </button>
          <div id='recaptcha-container'></div>
        </form>
      </div>
    </Modal>
  );
};

export default Reauthenticate;
