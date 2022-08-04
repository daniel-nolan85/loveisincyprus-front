import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Event from '../modals/Event';
import axios from 'axios';

const RightSidebar = () => {
  const [eventModalIsOpen, setEventModalIsOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});
  const [ads, setAds] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      fetchApprovedAds();
    }
  }, [user && user.token]);

  const showEventDetails = (event) => {
    setEventModalIsOpen(true);
    setCurrentEvent(event);
  };

  const fetchApprovedAds = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-approved-ads`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setAds(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='right-sidebar'>
      {user.events &&
        user.events.map((e) => (
          <div key={e._id}>
            <div className='sidebar-title'>
              <h4>Events</h4>
              <Link to='/events'>All Events</Link>
            </div>

            <div className='events'>
              <div className='left-event'>
                <h3>{moment(e.when).format('DD')}</h3>
                <span>{moment(e.when).format('MMMM')}</span>
              </div>
              <div className='right-event'>
                <h4>{e.name}</h4>
                <p>
                  <FontAwesomeIcon icon={faLocationDot} className='fa' />{' '}
                  {e.location}
                </p>
                <p className='link' onClick={() => showEventDetails(e)}>
                  More Info
                </p>
              </div>
            </div>
          </div>
        ))}
      <div className='sidebar-title'>
        <h4>Advertisements</h4>
        <Link to='/ad-submission'>Submit an Ad</Link>
      </div>
      {ads.length > 0 ? (
        ads.map((ad) => (
          <div key={ad._id}>
            {ad.image ? (
              <div className='sidebar-ad'>
                <img
                  src={ad.image.url}
                  // alt={`${
                  //   ad.postedBy.name || ad.postedBy.email.split('@')[0]
                  // }'s advertisement`}
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
      {/* <div className='sidebar-title'>
        <h4>Conversation</h4>
        <Link to='#'>Hide Chat</Link>
      </div>
      <div className='online-list'>
        <p>Jennifer Justice</p>
      </div>
      <div className='online-list'>
        <p>Lennon Gray</p>
      </div>
      <div className='online-list'>
        <p>Luna Tuna</p>
      </div> */}
      <Event
        eventModalIsOpen={eventModalIsOpen}
        setEventModalIsOpen={setEventModalIsOpen}
        currentEvent={currentEvent}
      />
    </div>
  );
};

export default RightSidebar;
