import React, { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faPaperPlane,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import LeftSidebar from '../user/LeftSidebar';
import RightSidebar from '../user/RightSidebar';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword('');
        toast.success(`Your password has been successfully updated.`, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <div className='form-box'>
          <div className='button-box'>
            <p className='form-header'>Change Password</p>
          </div>
          <form>
            <div className='password-row'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='input-field'
                placeholder='Enter your new password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                disabled={loading}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className='fa'
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <button
              onClick={handleSubmit}
              type='submit'
              className='submit-btn'
              disabled={password.length < 6 || loading}
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
      </div>
      <RightSidebar />
    </div>
  );
};

export default ChangePassword;
