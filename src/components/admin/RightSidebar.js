import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const RightSidebar = () => {
  return (
    <div className='right-sidebar'>
      <div className='sidebar-title'>
        <h4>Events</h4>
        <Link to='#'>See All</Link>
      </div>
      <div className='event'>
        <div className='left-event'>
          <h3>27</h3>
          <span>February</span>
        </div>
        <div className='right-event'>
          <h4>Shakey's birthday</h4>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} className='fa' /> Temecula
          </p>
          <Link to='#'>More Info</Link>
        </div>
      </div>
      <div className='event'>
        <div className='left-event'>
          <h3>13</h3>
          <span>March</span>
        </div>
        <div className='right-event'>
          <h4>Visit mum</h4>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} className='fa' /> Santa
            Barbara
          </p>
          <Link to='#'>More Info</Link>
        </div>
      </div>
      <div className='sidebar-title'>
        <h4>Advertisement</h4>
        <Link to='#'>Close</Link>
      </div>
      <div className='sidebar-title'>
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
      </div>
    </div>
  );
};

export default RightSidebar;
