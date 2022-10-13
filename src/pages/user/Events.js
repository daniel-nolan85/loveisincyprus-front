import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import defaultProfile from '../../assets/defaultProfile.png';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import EventCard from '../../components/cards/EventCard';

const Events = ({ history }) => {
  const [events, setEvents] = useState([]);
  const [prevEvents, setPrevEvents] = useState([]);
  const [comingEvents, setComingEvents] = useState([]);

  const { _id, token } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      fetchUserEvents();
      fetchPrevEvents();
      fetchComingEvents();
      console.log('events => ', events);
    }
  }, [token]);

  const fetchUserEvents = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-user-events`,
        { _id },
        {
          headers: {
            authtoken: token,
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

  const fetchPrevEvents = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-prev-events`,
        { _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log('previous events ==> ', res.data);
        setPrevEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchComingEvents = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-coming-events`,
        { _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log('upcoming events ==> ', res.data);
        setComingEvents(res.data);
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
          <h1 className='center'>No events</h1>
        ) : (
          <>
            <h1 className='center'>Events</h1>
            <input type='radio' name='Photos' id='checkAll' defaultChecked />
            <input type='radio' name='Photos' id='checkPrev' />
            <input type='radio' name='Photos' id='checkComing' />
            <div className='photos-top-content'>
              <label htmlFor='checkAll' className='submit-btn'>
                All Events
              </label>
              <label htmlFor='checkPrev' className='submit-btn'>
                Previous
              </label>
              <label htmlFor='checkComing' className='submit-btn'>
                Upcoming
              </label>
            </div>
            <div className='product-cards event'>
              {events &&
                events.map((event) => (
                  <div
                    className='product-card all'
                    key={event._id}
                    onClick={() => {
                      history.push(`/event/${event._id}`);
                    }}
                  >
                    <EventCard event={event} />
                  </div>
                ))}
              {prevEvents &&
                prevEvents.map((prevEvent) => (
                  <div
                    className='product-card prev'
                    key={prevEvent._id}
                    onClick={() => {
                      history.push(`/event/${prevEvent._id}`);
                    }}
                  >
                    <EventCard event={prevEvent} />
                  </div>
                ))}
              {comingEvents &&
                comingEvents.map((comingEvent) => (
                  <div
                    className='product-card coming'
                    key={comingEvent._id}
                    onClick={() => {
                      history.push(`/event/${comingEvent._id}`);
                    }}
                  >
                    <EventCard event={comingEvent} />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
      <RightSidebar />
    </div>
  );
};

export default Events;
