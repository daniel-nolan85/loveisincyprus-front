import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightToBracket,
  faSpinner,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateUser } from '../../functions/auth';

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const roleBasedRedirect = (res) => {
    if (res.data.role === 'admin') {
      history.push('/admin/dashboard');
    } else {
      history.push('/user/dashboard');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // validation
    if (!password) {
      toast.error('Please enter your password', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (password.length < 6) {
      toast.error('Your password must be at least 6 characters long', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem('emailForRegistration');
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        console.log('user', user, 'idTokenResult', idTokenResult);
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                profileImage: res.data.profileImage,
                coverImage: res.data.coverImage,
                name: res.data.name,
                email: res.data.email,
                username: res.data.username,
                about: res.data.about,
                gender: res.data.gender,
                birthday: res.data.birthday,
                location: res.data.location,
                genderWanted: res.data.genderWanted,
                relWanted: res.data.relWanted,
                following: res.data.following,
                followers: res.data.followers,
                matches: res.data.matches,
                visitors: res.data.visitors,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
                createdAt: res.data.createdAt,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className='form-box'>
      <div className='button-box'>
        <p className='form-header'>Register Complete</p>
      </div>
      <form>
        <input
          type='email'
          className='input-field'
          value={email}
          readOnly
          disabled
        />
        <div className='password-row'>
          <input
            type={showPassword ? 'text' : 'password'}
            className='input-field'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
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
          disabled={password.length < 6}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faArrowRightToBracket} className='fa' />
          )}
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterComplete;
