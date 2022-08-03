import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faGear,
  faLock,
  faNewspaper,
  faToolbox,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultProfile from '../../assets/defaultProfile.png';
import axios from 'axios';
import { toast } from 'react-toastify';

const SettingsMenu = ({ settingsMenu, setSettingsMenu, logout }) => {
  const [darkMode, setDarkMode] = useState(false);

  let { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('theme') === 'light') {
      setDarkMode(false);
      document.body.classList.remove('dark-theme');
    } else if (localStorage.getItem('theme') === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-theme');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-theme');

    if (localStorage.getItem('theme') == 'light') {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  };

  const handleOptInOrOut = async () => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/user-opt-in-or-out`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            optIn: res.data.optIn,
          },
        });
        if (res.data.optIn == true) {
          toast.success(
            'You will now receive occasional inbox messages from our admin team informing you about upcoming events and other exciting updates',
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        } else {
          toast.error(
            'You will not receive occasional inbox messages from our admin team informing you about upcoming events and other exciting updates',
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className={
        settingsMenu ? 'settings-menu-height settings-menu' : 'settings-menu'
      }
    >
      <div
        id='dark-btn'
        className={darkMode ? 'dark-btn-on' : ''}
        onClick={handleDarkMode}
      >
        <span />
      </div>
      <div className='settings-menu-inner'>
        <Link to={`/user/profile/${user._id}`}>
          <div className='user-profile' onClick={() => setSettingsMenu(false)}>
            <img
              src={user.profileImage ? user.profileImage.url : defaultProfile}
              alt={`${user.name || user.email.split('@')[0]}'s profile picture`}
            />
            <div>
              {user.name ? user.name : user.email && user.email.split('@')[0]}
            </div>
          </div>
        </Link>
        <hr />
        {user.role === 'admin' && (
          <div
            className='settings-links'
            onClick={() => setSettingsMenu(false)}
          >
            <Link to='/admin/dashboard'>
              <FontAwesomeIcon icon={faToolbox} className='fa' />
              Admin Panel
            </Link>
          </div>
        )}
        <div className='settings-links' onClick={() => setSettingsMenu(false)}>
          <Link to='/user/dashboard'>
            <FontAwesomeIcon icon={faNewspaper} className='fa' />
            Latest News
          </Link>
        </div>
        <div
          className='settings-links dropdown'
          // onClick={() => setSettingsMenu(false)}
        >
          <FontAwesomeIcon icon={faGear} className='fa' />
          Settings
          <div
            className='dropdown-content'
            // onClick={() => setSettingsMenu(false)}
          >
            {/* <FontAwesomeIcon icon={faLock} className='fa' /> */}
            <Link to='/change/password' onClick={() => setSettingsMenu(false)}>
              Change Password
            </Link>
            <span>
              {user && user.optIn
                ? 'Opt out of receiving mass-mail?'
                : 'Opt in to receive mass-mail?'}

              <div
                id='opt-btn'
                className={user && user.optIn ? 'opt-btn-on' : ''}
                onClick={handleOptInOrOut}
              >
                <span />
              </div>
            </span>
          </div>
        </div>
        <div className='settings-links' onClick={logout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} className='fa' />
          Logout
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
