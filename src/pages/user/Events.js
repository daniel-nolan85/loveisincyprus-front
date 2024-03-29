import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import EventCard from '../../components/cards/EventCard';
import Mobile from '../../components/user/Mobile';

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
        <Mobile />
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
                    <EventCard
                      event={event}
                      fetchUserEvents={fetchUserEvents}
                    />
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
                    <EventCard
                      event={prevEvent}
                      fetchPrevEvents={fetchPrevEvents}
                    />
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
                    <EventCard
                      event={comingEvent}
                      fetchComingEvents={fetchComingEvents}
                    />
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
