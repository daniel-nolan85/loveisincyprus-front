import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import defaultProfile from '../../assets/defaultProfile.png';

const SubscriptionsList = ({ subscriptions, searched, query }) => {
  const DurationRenderer = ({ duration }) => {
    let length;
    if (duration === 30) {
      length = 'One month';
    } else if (duration === 180) {
      length = 'Six months';
    } else if (duration === 365) {
      length = 'One year';
    } else {
      length = 'Invalid duration';
    }

    return <span>{length}</span>;
  };

  return (
    <>
      {subscriptions.filter(searched(query)).map((subscription) => (
        <div className='post-container' key={subscription._id}>
          <div className='post-row'>
            <div className='user-profile'>
              <Link to={`/user/${subscription.userInfo._id}`}>
                <img
                  src={
                    subscription.userInfo.profileImage
                      ? subscription.userInfo.profileImage.url
                      : defaultProfile
                  }
                  alt={`${
                    subscription.userInfo.username || subscription.userInfo.name
                  }'s profile picture`}
                />
              </Link>
              <div>
                <Link to={`/user/${subscription.userInfo._id}`}>
                  <p>
                    {subscription.userInfo.username ||
                      subscription.userInfo.name}
                  </p>
                </Link>
                <span>{moment(subscription.createdAt).fromNow()}</span>
              </div>
            </div>
          </div>
          <div className='single-refund'>
            <div className='refund-info'>
              <h2 style={{ marginBottom: '10px' }}>
                Amount: <span>€{subscription.cost}</span>
              </h2>
              <h2 style={{ marginBottom: '10px' }}>
                Duration: <DurationRenderer duration={subscription.duration} />
              </h2>
              <h2 style={{ marginBottom: '10px' }}>
                Start date:{' '}
                <span>
                  {moment(subscription.startDate).format('MMMM Do YYYY')}
                </span>
              </h2>
              <h2 style={{ marginBottom: '10px' }}>
                Expiry date:{' '}
                <span>
                  {moment(subscription.expiryDate).format('MMMM Do YYYY')}
                </span>
              </h2>
              <h2 style={{ marginBottom: '10px' }}>
                Trial period:{' '}
                <span>{subscription.trialPeriod ? 'Yes' : 'No'}</span>
              </h2>
              <h2 style={{ marginBottom: '10px' }}>
                Payment type:{' '}
                <span>
                  {subscription.paymentType.charAt(0).toUpperCase() +
                    subscription.paymentType.slice(1)}
                </span>
              </h2>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SubscriptionsList;
