import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignsPost,
  faUsers,
  faToolbox,
  faEarthAmericas,
} from '@fortawesome/free-solid-svg-icons';

const LeftSidebar = () => {
  return (
    <div className='left-sidebar'>
      <div className='imp-links'>
        <Link to='/admin/dashboard'>
          <FontAwesomeIcon icon={faToolbox} className='fa' />
          Dashboard
        </Link>
        <Link to='/admin/posts'>
          <FontAwesomeIcon icon={faSignsPost} className='fa' />
          Posts
        </Link>
        <Link to='/admin/users'>
          <FontAwesomeIcon icon={faUsers} className='fa' />
          Users
        </Link>
        <Link to='/admin/geo-block'>
          <FontAwesomeIcon icon={faEarthAmericas} className='fa' />
          Geo-Block
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
