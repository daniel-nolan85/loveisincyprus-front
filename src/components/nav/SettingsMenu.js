import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faGear,
  faLock,
  faNewspaper,
  faToolbox,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultProfile from '../../assets/defaultProfile.png';

const SettingsMenu = ({ settingsMenu, setSettingsMenu, logout }) => {
  const [darkMode, setDarkMode] = useState(false);

  let { user } = useSelector((state) => ({ ...state }));

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
          onClick={() => setSettingsMenu(false)}
        >
          <FontAwesomeIcon icon={faGear} className='fa' />
          <p>Settings</p>
          <div
            className='dropdown-content'
            onClick={() => setSettingsMenu(false)}
          >
            {/* <FontAwesomeIcon icon={faLock} className='fa' /> */}
            <Link to='/change/password'>Change Password</Link>
          </div>
        </div>
        <div className='settings-links' onClick={logout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} className='fa' />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
