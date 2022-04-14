import React, { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightToBracket,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);

    toast.success(
      `An email has been sent to ${email}. Please click the link to complete your registration.`,
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
    window.localStorage.setItem('emailForRegistration', email);
    setEmail('');
    setLoading(false);
  };

  return (
    <form id='register' className='input-group'>
      <input
        type='email'
        className='input-field'
        placeholder='Enter your email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />

      <button
        onClick={handleSubmit}
        type='submit'
        className='submit-btn'
        disabled={!email}
      >
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} className='fa' spin />
        ) : (
          <FontAwesomeIcon icon={faArrowRightToBracket} className='fa' />
        )}
        Register
      </button>
    </form>
  );
};

export default Register;
