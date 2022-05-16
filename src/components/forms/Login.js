import React, { useState, useEffect } from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faSpinner,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { createOrUpdateUser } from '../../functions/auth';

const Login = () => {
  const [email, setEmail] = useState('danielnolan85@yahoo.com');
  const [password, setPassword] = useState('123456');
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();
  let history = useHistory();

  let intended = history.location.state;
  useEffect(() => {
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push('/');
    }
  }, [user, history]);

  const roleBasedRedirect = (res) => {
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === 'admin') {
        history.push('/admin/dashboard');
      } else {
        history.push('/user/dashboard');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailLoading(true);

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

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
              address: res.data.address,
              wishlist: res.data.wishlist,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setEmailLoading(false);
    }
  };

  const googleLogin = async (e) => {
    e.preventDefault();
    setGoogleLoading(true);

    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

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
                address: res.data.address,
                wishlist: res.data.wishlist,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setGoogleLoading(false);
      });
  };

  return (
    <form id='login' className='input-group'>
      <input
        type='email'
        className='input-field'
        placeholder='Enter your email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <div className='password-row'>
        <input
          type={showPassword ? 'text' : 'password'}
          className='input-field'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        disabled={!email || password.length < 6}
      >
        {emailLoading ? (
          <FontAwesomeIcon icon={faSpinner} className='fa' spin />
        ) : (
          <FontAwesomeIcon icon={faEnvelope} className='fa' />
        )}
        Login with Email
      </button>
      <button onClick={googleLogin} type='submit' className='submit-btn google'>
        {googleLoading ? (
          <FontAwesomeIcon icon={faSpinner} className='fa' spin />
        ) : (
          <FontAwesomeIcon icon={faGoogle} className='fa' />
        )}
        Login with Google
      </button>
      <div className='forgot-link'>
        <Link to='/forgot/password'>Forgot password?</Link>
      </div>
    </form>
  );
};

export default Login;
