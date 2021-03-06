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
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const LeftSidebar = () => {
  const { user, search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  // const { search } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: e.target.value },
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/shop/search?${text}`);
  };

  return (
    <div className='left-sidebar'>
      {user && (
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
      )}
      <div className='shortcut-links'>
        {/* <p>Shopping</p> */}
        <form onSubmit={handleSearch}>
          <div className='search-box'>
            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSearch} />
            <input
              type='search'
              placeholder='Search Products'
              onChange={handleChange}
              value={text}
            />
          </div>
          <input type='submit' hidden />
        </form>
        {user && (
          <>
            <Link to='/purchase/history'>
              <FontAwesomeIcon icon={faBagShopping} className='fa' />
              Purchase History
            </Link>
            <Link to='/wishlist'>
              <FontAwesomeIcon icon={faStar} className='fa' />
              Wishlist
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
