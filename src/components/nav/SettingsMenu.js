import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAddressCard,
  faArrowRightFromBracket,
  faBullseye,
  faEject,
  faEnvelope,
  faGear,
  faLock,
  faNewspaper,
  faPlay,
  faToolbox,
  faUnlockKeyhole,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultProfile from '../../assets/defaultProfile.png';
import axios from 'axios';
import { toast } from 'react-toastify';

const SettingsMenu = ({
  settingsMenu,
  setSettingsMenu,
  logout,
  setCancelSubscriptionModalIsOpen,
  setOptinModalIsOpen,
}) => {
  const [darkMode, setDarkMode] = useState(false);

  let { _id, name, username, profileImage, role, membership, optin } =
    useSelector((state) => state.user);

  const box = useRef(null);
  useOutsideAlerter(box);

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

  function useOutsideAlerter(ref) {
    useEffect(() => {
      // Function for click event
      function handleOutsideClick(event) {
        console.log('settingsMenu => ', settingsMenu);
        console.log('ref.current => ', ref.current);
        console.log('event.target => ', event.target);
        if (
          settingsMenu &&
          ref.current &&
          !ref.current.contains(event.target)
        ) {
          setSettingsMenu(false);
        }
      }

      // Adding click event listener
      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick);
    }, [ref, settingsMenu]);
  }

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
      <div className='settings-menu-inner' ref={box}>
        <Link to={`/user/profile/${_id}`}>
          <div className='user-profile' onClick={() => setSettingsMenu(false)}>
            <img
              src={profileImage ? profileImage.url : defaultProfile}
              alt={`${username || name}'s profile picture`}
            />
            <div>{username || name}</div>
          </div>
        </Link>
        <hr />
        <div className='settings-links' onClick={() => setSettingsMenu(false)}>
          <Link to='/change/password'>
            <FontAwesomeIcon icon={faUnlockKeyhole} className='fa' />
            Change Password
          </Link>
        </div>
        <div className='settings-links' onClick={() => setSettingsMenu(false)}>
          <Link to='/membership-card'>
            <FontAwesomeIcon icon={faAddressCard} className='fa' />
            Membership Card
          </Link>
        </div>
        {!membership.paid && (
          <div
            className='settings-links'
            onClick={() => {
              setSettingsMenu(false);
            }}
          >
            <Link to='/become-paid-member'>
              <FontAwesomeIcon icon={faPlay} className='fa' />
              Become Paid Member
            </Link>
          </div>
        )}
        {membership.trialPeriod && (
          <div
            className='settings-links'
            onClick={() => {
              setSettingsMenu(false);
              setCancelSubscriptionModalIsOpen(true);
            }}
          >
            <span>
              <FontAwesomeIcon icon={faEject} className='fa' />
              Cancel Subscription
            </span>
          </div>
        )}
        <div
          className='settings-links'
          onClick={() => {
            setSettingsMenu(false);
            setOptinModalIsOpen(true);
          }}
        >
          <span>
            <FontAwesomeIcon icon={faEnvelope} className='fa' />
            Mass Mail
          </span>
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
