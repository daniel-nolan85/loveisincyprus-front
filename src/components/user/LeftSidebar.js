import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faNewspaper,
  faStar,
  faFaceGrinHearts,
  faFaceGrinStars,
  faPeopleArrows,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const LeftSidebar = () => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className='left-sidebar'>
      <div className='imp-links'>
        <Link to='/user/dashboard'>
          <FontAwesomeIcon icon={faNewspaper} className='fa' />
          Latest News
        </Link>
        <Link to='/liked-users'>
          <FontAwesomeIcon icon={faFaceGrinHearts} className='fa' />
          People I Like
          <span>
            {user &&
              user.token &&
              user.following.length > 0 &&
              user.following.length}
          </span>
        </Link>
        <Link to='/users-who-like-me'>
          <FontAwesomeIcon icon={faFaceGrinStars} className='fa' />
          People Who Like Me
          <span>
            {user &&
              user.token &&
              user.followers.length > 0 &&
              user.followers.length}
          </span>
        </Link>
        <Link to='/my-matches'>
          <FontAwesomeIcon icon={faPeopleArrows} className='fa' />
          My Matches
          <span>
            {user &&
              user.token &&
              user.matches.length > 0 &&
              user.matches.length}
          </span>
        </Link>
      </div>
      <div className='shortcut-links'>
        <p>Shopping</p>
        <Link to='/user/history'>
          <FontAwesomeIcon icon={faBagShopping} className='fa' />
          Purchase History
        </Link>
        <Link to='/user/wishlist'>
          <FontAwesomeIcon icon={faStar} className='fa' />
          Wishlist
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
