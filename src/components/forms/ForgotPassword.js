import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.user) || {};

  let history = useHistory();

  useEffect(() => {
    if (token) history.push('/');
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('');
        console.log('success');
        setLoading(false);
        toast.success(
          `An email has been sent to ${email}. Please click the link to reset your password.`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <div className='form-box'>
      <div className='button-box'>
        <p className='form-header'>Forgot Password</p>
      </div>
      <form>
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
            <FontAwesomeIcon icon={faPaperPlane} className='fa' />
          )}
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
