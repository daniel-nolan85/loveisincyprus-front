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
  faShop,
  faToolbox,
  faCartShopping,
  faCoins,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import SettingsMenu from './SettingsMenu';
import { useSelector, useDispatch } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';
import axios from 'axios';
import SearchResults from './SearchResults';
import firebase from 'firebase/compat/app';
import { Link, useHistory } from 'react-router-dom';
import { Badge } from 'antd';
import { ChatState } from '../../context/ChatProvider';

const Header = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [settingsMenu, setSettingsMenu] = useState(false);

  let { user, cart } = useSelector((state) => ({ ...state }));

  const {
    notification,
    setNotification,
    // thisPost,
    // setThisPost,
    // notifModalIsOpen,
    // setNotifModalIsOpen,
  } = ChatState();

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

  const resetCount = async () => {
    console.log('reset count');
    await axios
      .put(
        `${process.env.REACT_APP_API}/reset-message-count`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            messages: res.data.messages,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const notifPost = (post) => {
  //   setThisPost(post);
  //   setNotifModalIsOpen(true);
  // };

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
                  <Link to='/admin/mass-mail'>Mass Mail</Link>
                  <br />
                  <Link to='/admin/event'>Events</Link>
                  <br />
                  <Link to='/admin/geo-block'>Geo-Block</Link>
                  <br />
                  <Link to='/admin/orders'>Orders</Link>
                  <br />
                  <Link to='/admin/product'>Products</Link>
                  <br />
                  <Link to='/admin/category'>Categories</Link>
                  <br />
                  <Link to='/admin/sub'>Sub-Categories</Link>
                  <br />
                  <Link to='/admin/coupon'>Coupon</Link>
                  <br />
                  <Link to='/ad-submissions'>Ad Submissions</Link>
                </div>
              </div>
            )}
            <ul>
              <Link to='/user/dashboard'>
                <li className='tooltip'>
                  <FontAwesomeIcon icon={faNewspaper} className='menu-icon' />
                  <span className='tooltip-text'>Dashboard</span>
                </li>
              </Link>
              <Link to='/search-users'>
                <li className='tooltip'>
                  <FontAwesomeIcon icon={faUsers} className='menu-icon' />
                  <span className='tooltip-text'>Search members</span>
                </li>
              </Link>
              <Link to='/swipe-to-match'>
                <li className='tooltip'>
                  <FontAwesomeIcon icon={faBolt} className='menu-icon' />
                  <span className='tooltip-text'>Swipe</span>
                </li>
              </Link>
              <Link to='/points'>
                <li className='tooltip'>
                  <FontAwesomeIcon icon={faCoins} className='menu-icon' />
                  <span className='tooltip-text'>Points</span>
                </li>
              </Link>
              <Link to='/notifications'>
                <li className='tooltip'>
                  <Badge count={notification.length} offset={[-20, 0]}>
                    <FontAwesomeIcon icon={faBell} className='menu-icon' />
                  </Badge>
                  <span className='tooltip-text'>Notifications</span>
                </li>
              </Link>
              {/* <li>
                <div className='settings-links dropdown'>
                  <Badge count={notification.length} offset={[-20, 0]}>
                    <FontAwesomeIcon icon={faBell} className='menu-icon' />
                  </Badge>
                  <div className='dropdown-content information'>
                    {!notification.length && 'No new notifications'}
                    {notification.map((notif) => (
                      <div key={notif._id}>
                        {notif.chat ? (
                          <p
                            onClick={() => {
                              history.push('/chats');
                              setNotification(
                                notification.filter((n) => n !== notif)
                              );
                            }}
                          >
                            You received a new chat message from{' '}
                            {notif.chat.users[1].email.split('@')[0]}
                          </p>
                        ) : notif.likes ? (
                          <p
                            onClick={() => {
                              notifPost(notif);
                              setNotification(
                                notification.filter((n) => n !== notif)
                              );
                            }}
                          >
                            {
                              notif.likes[notif.likes.length - 1].email.split(
                                '@'
                              )[0]
                            }{' '}
                            liked your post
                          </p>
                        ) : notif.following &&
                          notif.following[notif.following.length - 1]._id ===
                            user._id ? (
                          <p
                            onClick={() => {
                              history.push(`/user/profile/${notif._id}`);
                              setNotification(
                                notification.filter((n) => n !== notif)
                              );
                            }}
                          >
                            {notif.email.split('@')[0]} likes you
                          </p>
                        ) : notif.email && notif._id !== user._id ? (
                          <p
                            onClick={() => {
                              history.push(`/user/profile/${notif._id}`);
                              setNotification(
                                notification.filter((n) => n !== notif)
                              );
                            }}
                          >
                            {notif.email.split('@')[0]} visited your profile
                          </p>
                        ) : notif.some((obj) =>
                            Object.keys(obj).includes('text')
                          ) ? (
                          <p
                            onClick={() => {
                              notifPost(notif);
                              setNotification(
                                notification.filter((n) => n !== notif)
                              );
                            }}
                          >
                            {
                              notif[notif.length - 1].postedBy.email.split(
                                '@'
                              )[0]
                            }{' '}
                            commented on your post
                          </p>
                        ) : (
                          ''
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </li> */}
              <Link to='/chats'>
                <li className='tooltip' onClick={resetCount}>
                  <Badge count={user.messages.length} offset={[-20, 0]}>
                    <FontAwesomeIcon icon={faMessage} className='menu-icon' />
                  </Badge>
                  <span className='tooltip-text'>Chats</span>
                </li>
              </Link>
            </ul>
          </>
        )}
        <Link to='/shop'>
          <div className='tooltip'>
            <FontAwesomeIcon icon={faShop} className='menu-icon ' />
            <span className='tooltip-text'>Shop</span>
          </div>
        </Link>
        <Link to='/cart'>
          <div className='tooltip'>
            <Badge count={cart.length} offset={[-20, 0]}>
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
