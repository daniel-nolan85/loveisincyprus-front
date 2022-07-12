import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignsPost,
  faUsers,
  faToolbox,
  faEarthAmericas,
  faTicket,
  faShirt,
  faTag,
  faTags,
  faFolderOpen,
  faCalendarDays,
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
        <Link to='/admin/event'>
          <FontAwesomeIcon icon={faCalendarDays} className='fa' />
          Events
        </Link>
        <Link to='/admin/geo-block'>
          <FontAwesomeIcon icon={faEarthAmericas} className='fa' />
          Geo-Block
        </Link>
        <Link to='/admin/orders'>
          <FontAwesomeIcon icon={faFolderOpen} className='fa' />
          Orders
        </Link>
        <Link to='/admin/product'>
          <FontAwesomeIcon icon={faShirt} className='fa' />
          Products
        </Link>
        <Link to='/admin/category'>
          <FontAwesomeIcon icon={faTag} className='fa' />
          Categories
        </Link>
        <Link to='/admin/sub'>
          <FontAwesomeIcon icon={faTags} className='fa' />
          Sub-Categories
        </Link>
        <Link to='/admin/coupon'>
          <FontAwesomeIcon icon={faTicket} className='fa' />
          Coupon
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
