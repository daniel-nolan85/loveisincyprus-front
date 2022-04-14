import React from 'react';
import { Link } from 'react-router-dom';
import headphones from '../../assets/headphones.jpg';
import trainers from '../../assets/trainers.jpg';

const RightSidebar = () => {
  return (
    <div className='right-sidebar'>
      <div className='sidebar-title'>
        <h4>Advertisements</h4>
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
    </div>
  );
};

export default RightSidebar;
