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

  let { _id, name, email, profileImage, role } = useSelector(
    (state) => state.user
  );

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
        <Link to={`/user/profile/${_id}`}>
          <div className='user-profile' onClick={() => setSettingsMenu(false)}>
            <img
              src={profileImage ? profileImage.url : defaultProfile}
              alt={`${name || email.split('@')[0]}'s profile picture`}
            />
            <div>{name ? name : email && email.split('@')[0]}</div>
          </div>
        </Link>
        <hr />
        {role === 'admin' && (
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
        <div className='settings-links' onClick={() => setSettingsMenu(false)}>
          <Link to='/user-settings'>
            <FontAwesomeIcon icon={faGear} className='fa' />
            Settings
          </Link>
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
