import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import defaultProfile from '../../assets/defaultProfile.png';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';

const Events = ({ history }) => {
  const [events, setEvents] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) fetchEvents();
  }, [user && user.token]);

  const fetchEvents = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-user-events`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log('events ==> ', res.data);
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        {!events.length ? (
          <h1 className='center'>
            You do not currently have any upcoming events
          </h1>
        ) : (
          events.map((e) => <p key={e._id}>{e.name}</p>)
        )}
      </div>
      <RightSidebar />
    </div>
  );
};

export default Events;
