import React, { useState, useEffect } from 'react';
import CancelSubscription from '../../components/modals/CancelSubscription';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserSettings = () => {
  const [cancelSubscriptionModalIsOpen, setCancelSubscriptionModalIsOpen] =
    useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    console.log(res.data);
    // setIP(res.data.IPv4);
  };

  const handleOptInOrOut = async () => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/user-opt-in-or-out`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            optIn: res.data.optIn,
          },
        });
        if (res.data.optIn == true) {
          toast.success(
            'You will now receive occasional inbox messages from our admin team informing you about upcoming events and other exciting updates',
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        } else {
          toast.error(
            'You will not receive occasional inbox messages from our admin team informing you about upcoming events and other exciting updates',
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <h1 className='center'>Settings</h1>
        <Link to='/change/password'>Change Password</Link>
        <span>
          {user && user.optIn
            ? 'Opt out of receiving mass-mail?'
            : 'Opt in to receive mass-mail?'}

          <div
            id='opt-btn'
            className={user && user.optIn ? 'opt-btn-on' : ''}
            onClick={handleOptInOrOut}
          >
            <span />
          </div>
        </span>
        <Link to='/membership-card'>Membership Card</Link>
        {user.membership.trialPeriod && (
          <span onClick={() => setCancelSubscriptionModalIsOpen(true)}>
            Cancel Subscription
          </span>
        )}
      </div>
      <CancelSubscription
        cancelSubscriptionModalIsOpen={cancelSubscriptionModalIsOpen}
        setCancelSubscriptionModalIsOpen={setCancelSubscriptionModalIsOpen}
      />
      <RightSidebar />
    </div>
  );
};

export default UserSettings;
