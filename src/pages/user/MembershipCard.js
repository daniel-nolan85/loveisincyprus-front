import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';
import { Link } from 'react-router-dom';
import { getUserPointsTotal } from '../../functions/user';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserShield,
  faStar,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';
import Mobile from '../../components/user/Mobile';

const MembershipCard = () => {
  const [points, setPoints] = useState(0);
  const {
    _id,
    name,
    profileImage,
    about,
    token,
    createdAt,
    membership,
    featuredMember,
    eventsEligible,
    verified,
    username,
  } = useSelector((state) => state.user);

  useEffect(() => {
    fetchUserPointsTotal();
  }, []);

  const fetchUserPointsTotal = () =>
    getUserPointsTotal(token).then((res) => {
      setPoints(res.data);
    });

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        <div className='ms-center'>
          <div className='ms-card'>
            <div className='ms-additional'>
              <div className='ms-user-card'>
                <div className='ms-level ms-center'>
                  {membership.paid ? 'Paid' : 'Unpaid'} Member
                </div>
                <div className='ms-points ms-center'>{points} Points</div>
                <Link to={`/user/profile/${_id}`}>
                  <img
                    className='ms-image ms-center'
                    src={profileImage ? profileImage.url : defaultProfile}
                    alt={`${username || name}'s profile picture`}
                  />
                </Link>
              </div>
              <div className='ms-more-info'>
                <Link to={`/user/profile/${_id}`}>
                  <h1>{username || name}</h1>
                </Link>
                <br />
                <div className='ms-coords small'>
                  <span>
                    Member since {moment(createdAt).format('MMMM Do YYYY')}
                  </span>
                </div>
                {membership.paid ? (
                  <div className='ms-coords small'>
                    <span>
                      Paid member until{' '}
                      {moment(membership.expiry).format('MMMM Do YYYY')}
                    </span>
                  </div>
                ) : (
                  <div className='ms-coords small'>
                    <span>
                      <Link to='/become-paid-member'>
                        Become a paid member?
                      </Link>
                    </span>
                  </div>
                )}
                <br />
                <div className='ms-coords'>
                  <span>Eligible for events:</span>
                  <span>{eventsEligible ? 'Yes' : 'No'}</span>
                </div>
                <div className='ms-coords'>
                  <span>Featured member:</span>
                  <span>{featuredMember ? 'Yes' : 'No'}</span>
                </div>
                <div className='ms-coords'>
                  <span>Verified user:</span>
                  <span>{verified === 'true' ? 'Yes' : 'No'}</span>
                </div>
                <div className='ms-stats'>
                  {eventsEligible && (
                    <FontAwesomeIcon icon={faCalendarDays} className='fa' />
                  )}
                  {featuredMember && (
                    <FontAwesomeIcon icon={faStar} className='fa star' />
                  )}
                  {verified === 'true' && (
                    <FontAwesomeIcon
                      icon={faUserShield}
                      className='fa verified'
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='ms-general'>
              <Link to={`/user/profile/${_id}`}>
                <h1>{username || name}</h1>
              </Link>
              <p>{about}</p>
              <span className='ms-more'>Hover the card for more info</span>
            </div>
          </div>
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default MembershipCard;
