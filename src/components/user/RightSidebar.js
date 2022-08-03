import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import headphones from '../../assets/headphones.jpg';
import trainers from '../../assets/trainers.jpg';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Event from '../modals/Event';

const RightSidebar = () => {
  const [eventModalIsOpen, setEventModalIsOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});

  const { user } = useSelector((state) => ({ ...state }));

  const showEventDetails = (event) => {
    setEventModalIsOpen(true);
    setCurrentEvent(event);
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
      <img
        src={headphones}
        alt='advertisement for headphones'
        className='sidebar-ads'
      />
      <img
        src={trainers}
        alt='advertisement for trainers'
        className='sidebar-ads'
      />
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
