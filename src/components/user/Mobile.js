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
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Badge } from 'antd';

const Mobile = () => {
  const { token, following, followers, matches } = useSelector(
    (state) => state.user || {}
  );
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

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
    <div className='mobile-topbar'>
      {token && (
        <div className='mobile-imp-links'>
          <Link to='/user/dashboard'>
            <FontAwesomeIcon icon={faNewspaper} className='fa' />
          </Link>
          <Link to='/liked-users'>
            <Badge
              count={following.length}
              offset={[0, 10]}
              style={{ backgroundColor: '#ef5b85' }}
            >
              <FontAwesomeIcon icon={faFaceGrinHearts} className='fa' />
            </Badge>
          </Link>
          <Link to='/users-who-like-me'>
            <Badge
              count={followers.length}
              offset={[0, 10]}
              style={{ backgroundColor: '#ef5b85' }}
            >
              <FontAwesomeIcon icon={faFaceGrinStars} className='fa' />
            </Badge>
          </Link>
          <Link to='/my-matches'>
            <Badge
              count={matches.length}
              offset={[0, 10]}
              style={{ backgroundColor: '#ef5b85' }}
            >
              <FontAwesomeIcon icon={faPeopleArrows} className='fa' />
            </Badge>
          </Link>
          <Link to='/high-compatibility'>
            <FontAwesomeIcon icon={faUsers} className='fa' />
          </Link>
        </div>
      )}
      <div className='mobile-shortcut-links'>
        {/* <p>Shopping</p> */}
        <form onSubmit={handleSearch}>
          <div className='mobile-search-box'>
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
        {token && (
          <div className='mobile-shop-links'>
            <Link to='/purchase/history'>
              <FontAwesomeIcon icon={faBagShopping} className='fa' />
            </Link>
            <Link to='/wishlist'>
              <FontAwesomeIcon icon={faStar} className='fa' />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mobile;
