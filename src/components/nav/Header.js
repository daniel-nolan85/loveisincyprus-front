import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faBolt,
  faCircleInfo,
  faMagnifyingGlass,
  faMessage,
  faNewspaper,
  faRightToBracket,
  faToolbox,
} from '@fortawesome/free-solid-svg-icons';
import SettingsMenu from './SettingsMenu';
import { useSelector, useDispatch } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';
import axios from 'axios';
import SearchResults from './SearchResults';
import firebase from 'firebase/compat/app';
import { Link, useHistory } from 'react-router-dom';

const Header = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [settingsMenu, setSettingsMenu] = useState(false);

  let { user } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  let dispatch = useDispatch();

  const searchUser = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${process.env.REACT_APP_API}/search-user/${query}`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setSearchResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    setSettingsMenu(false);
    setQuery('');
    setSearchResults([]);
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    history.push('/authentication');
  };

  return (
    <nav>
      <div className='nav-left'>
        <Link to='/'>
          <img src={Logo} alt='logo' className='logo' />
        </Link>
        {user && (
          <>
            {user.role === 'admin' && (
              <div className='settings-links dropdown'>
                <Link to='/admin/dashboard'>
                  <FontAwesomeIcon icon={faToolbox} className='menu-icon' />
                </Link>
                <div className='dropdown-content information'>
                  <Link to='/admin/dashboard'>Dashboard</Link>
                  <br />
                  <Link to='/admin/posts'>Posts</Link>
                  <br />
                  <Link to='/admin/users'>Users</Link>
                  <br />
                  <Link to='/admin/geo-block'>Geo-Block</Link>
                </div>
              </div>
            )}
            <ul>
              <Link to='/user/dashboard'>
                <li>
                  <FontAwesomeIcon icon={faNewspaper} className='menu-icon' />
                </li>
              </Link>
              <Link to='/swipe-to-match'>
                <li>
                  <FontAwesomeIcon icon={faBolt} className='menu-icon' />
                </li>
              </Link>
              <li>
                <FontAwesomeIcon icon={faBell} className='menu-icon' />
              </li>
              <li>
                <FontAwesomeIcon icon={faMessage} className='menu-icon' />
              </li>
            </ul>
          </>
        )}
        <div className='settings-links dropdown'>
          <FontAwesomeIcon icon={faCircleInfo} className='menu-icon' />
          <div className='dropdown-content information'>
            <Link to='/about-us'>About Us</Link>
            <br />
            <Link to='/help'>Help</Link>
            <br />
            <Link to='/contact-us'>Contact Us</Link>
            <br />
            <Link to='/relationship-coaching'>Relationship Coaching</Link>
            <br />
            <Link to='/privacy-policy'>Privacy Policy</Link>
            <br />
            <Link to='/terms-and-conditions'>Terms & Conditions</Link>
          </div>
        </div>
      </div>
      <div className='nav-right'>
        {user && (
          <>
            <form onSubmit={searchUser}>
              <div className='search-box'>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  onClick={searchUser}
                />
                <input
                  type='search'
                  placeholder='Search Users'
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSearchResults([]);
                  }}
                  value={query}
                />
              </div>
              <input type='submit' hidden />
            </form>

            <SearchResults
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              setQuery={setQuery}
            />

            <div className='nav-user-icon'>
              <img
                src={user.profileImage ? user.profileImage.url : defaultProfile}
                alt={`${
                  user.name || user.email.split('@')[0]
                }'s profile picture`}
                onClick={() => setSettingsMenu(!settingsMenu)}
              />
            </div>
            <SettingsMenu
              settingsMenu={settingsMenu}
              setSettingsMenu={setSettingsMenu}
              logout={logout}
            />
          </>
        )}

        {!user && (
          <>
            <Link to='/authentication' className='menu-icon'>
              <FontAwesomeIcon icon={faRightToBracket} className='fa' />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
