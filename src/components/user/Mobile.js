import React, { useState, useEffect } from 'react';
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
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Badge } from 'antd';
import moment from 'moment';
import axios from 'axios';

const Mobile = () => {
  const [numOfUpcomingEvents, setNumOfUpcomingEvents] = useState(0);
  const [ads, setAds] = useState([]);
  const [targetedAds, setTargetedAds] = useState([]);

  const {
    token,
    following,
    followers,
    matches,
    events,
    gender,
    age,
    location,
    _id,
  } = useSelector((state) => state.user || {});
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    fetchNumOfUpcomingEvents();
    fetchApprovedAds();
  }, []);

  useEffect(() => {
    filterTargeted();
  }, [ads]);

  const fetchNumOfUpcomingEvents = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-num-upcoming-events`,
        { _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setNumOfUpcomingEvents(res.data);
      });
  };

  const fetchApprovedAds = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-approved-ads`)
      .then((res) => {
        console.log(res.data);
        setAds(res.data);
      });
  };

  const filterTargeted = () => {
    const targeted = [];
    if (!token) {
      ads.map((ad) => {
        if (ad.demographic.includes('everyone')) {
          targeted.push(ad);
        }
      });
      setTargetedAds([...new Set(targeted)]);
      return;
    } else {
      ads.map((ad) => {
        if (ad.demographic.includes('everyone')) {
          targeted.push(ad);
        }
        if (ad.demographic.includes('Male') && gender === 'male') {
          targeted.push(ad);
        }
        if (ad.demographic.includes('Female') && gender === 'female') {
          targeted.push(ad);
        }
        if (
          ad.demographic.includes('18-30 year olds') &&
          age > 17 &&
          age < 31
        ) {
          targeted.push(ad);
        }
        if (
          ad.demographic.includes('30-45 year olds') &&
          age > 29 &&
          age < 46
        ) {
          targeted.push(ad);
        }
        if (
          ad.demographic.includes('45-60 year olds') &&
          age > 44 &&
          age < 61
        ) {
          targeted.push(ad);
        }
        if (ad.demographic.includes('Over 60s') && age > 59) {
          targeted.push(ad);
        }
        if (ad.demographic.includes('Ayia Napa') && location === 'ayia napa') {
          targeted.push(ad);
        }
        if (ad.demographic.includes('Larnaca') && location === 'larnaca') {
          targeted.push(ad);
        }
        if (ad.demographic.includes('Limassol') && location === 'limassol') {
          targeted.push(ad);
        }
        if (ad.demographic.includes('Nicosia') && location === 'nicosia') {
          targeted.push(ad);
        }
        if (ad.demographic.includes('Paphos') && location === 'paphos') {
          targeted.push(ad);
        }
      });
      setTargetedAds([...new Set(targeted)]);
    }
  };

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

      <div className='mobile-topbar-events'>
        {token && (
          <div className='sidebar-title'>
            <h4>Events</h4>
            <Link to='/events'>All Events</Link>
          </div>
        )}
        {token && events && numOfUpcomingEvents > 0
          ? events.map(
              (e) =>
                !e.expired && (
                  <div key={e._id}>
                    <div className='events'>
                      <div className='left-event'>
                        <h3>{moment(e.when).format('DD')}</h3>
                        <span>{moment(e.when).format('MMMM')}</span>
                      </div>
                      <div className='right-event'>
                        <h4>{e.name}</h4>
                        <p>
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className='fa'
                          />{' '}
                          {e.location}
                        </p>
                        <p
                          className='link'
                          onClick={() => {
                            history.push(`/event/${e._id}`);
                          }}
                        >
                          More Info
                        </p>
                      </div>
                    </div>
                  </div>
                )
            )
          : token && <p>There are no upcoming events to display right now</p>}
        <br />
        <div className='sidebar-title'>
          <h4>Advertisements</h4>
          <Link to='/ad-submission'>Submit an Ad</Link>
        </div>
        {targetedAds.length > 0 ? (
          targetedAds.map((ad) => (
            <div key={ad._id}>
              {ad.image ? (
                <div className='sidebar-ad'>
                  <img
                    src={ad.image.url}
                    alt={`${ad.contactInfo.name}'s advertisement`}
                    className='sidebar-ads'
                  />
                  <p className='sidebar-ad-content'>{ad.content}</p>
                </div>
              ) : (
                <div className='sidebar-ads no-image'>
                  <p>{ad.content}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>There are no ads to display right now</p>
        )}
      </div>

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
