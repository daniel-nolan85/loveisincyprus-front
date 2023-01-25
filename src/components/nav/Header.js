import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCircleInfo,
  faMagnifyingGlass,
  faMessage,
  faRightToBracket,
  faShop,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import SettingsMenu from './SettingsMenu';
import { useSelector, useDispatch } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';
import axios from 'axios';
import SearchResults from './SearchResults';
import firebase from 'firebase/compat/app';
import { Link, useHistory } from 'react-router-dom';
import { Badge } from 'antd';
import SideNav from './SideNav';

const Header = ({
  setCancelSubscriptionModalIsOpen,
  setOptinModalIsOpen,
  setDeleteAccountModalIsOpen,
}) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [settingsMenu, setSettingsMenu] = useState(false);
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);

  let { user, cart } = useSelector((state) => ({ ...state }));

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
        setSearchResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetNotifCount = async () => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/reset-notification-count`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            newNotifs: res.data.newNotifs,
          },
        });
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
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: [],
    });
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
            <ul>
              <Link to='/chats'>
                <li className='tooltip'>
                  <Badge
                    count={user.messages.length}
                    offset={deviceSize > 450 ? [-20, 0] : [-10, 0]}
                  >
                    <FontAwesomeIcon icon={faMessage} className='menu-icon' />
                  </Badge>
                  <span className='tooltip-text'>Chats</span>
                </li>
              </Link>
            </ul>
            <div className='settings-links dropdown'>
              <Link to='/notifications'>
                <Badge
                  count={user.newNotifs.length}
                  offset={deviceSize > 450 ? [-20, 0] : [-10, 0]}
                >
                  <FontAwesomeIcon
                    icon={faBell}
                    className='menu-icon'
                    onClick={resetNotifCount}
                  />
                </Badge>
              </Link>
              <div className='dropdown-content information'>
                {user.newNotifs.length > 0
                  ? user.newNotifs.map((n, i) => (
                      <div key={i}>
                        {n.action}
                        <br />
                      </div>
                    ))
                  : 'No new notifications'}
              </div>
            </div>
          </>
        )}
        {!user && (
          <Link to='/shop'>
            <div className='tooltip'>
              <FontAwesomeIcon icon={faShop} className='menu-icon ' />
              <span className='tooltip-text'>Shop</span>
            </div>
          </Link>
        )}
        <Link to='/cart'>
          <div className='tooltip'>
            <Badge
              count={cart.length}
              offset={deviceSize > 450 ? [-20, 0] : [-10, 0]}
            >
              <FontAwesomeIcon icon={faCartShopping} className='menu-icon ' />
            </Badge>
            <span className='tooltip-text'>Cart</span>
          </div>
        </Link>
        <div className='settings-links dropdown'>
          <FontAwesomeIcon icon={faCircleInfo} className='menu-icon' />
          <div className='dropdown-content information'>
            <Link to='/about-us'>About Us</Link>
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
                alt={`${user.username || user.name}'s profile picture`}
                onClick={() => setSettingsMenu(!settingsMenu)}
              />
            </div>
            <SettingsMenu
              settingsMenu={settingsMenu}
              setSettingsMenu={setSettingsMenu}
              logout={logout}
              setCancelSubscriptionModalIsOpen={
                setCancelSubscriptionModalIsOpen
              }
              setOptinModalIsOpen={setOptinModalIsOpen}
              setDeleteAccountModalIsOpen={setDeleteAccountModalIsOpen}
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
        {user && <SideNav />}
      </div>
    </nav>
  );
};

export default Header;
