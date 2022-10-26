import React, { useState, useEffect } from 'react';
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
  faEnvelope,
  faRectangleAd,
  faShieldBlank,
  faDesktop,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';

const LeftSidebar = () => {
  const { newAds, setNewAds, newVerifs, setNewVerifs } = ChatState();

  useEffect(() => {
    fetchNewAds();
    fetchNewVerifs();
  }, []);

  const fetchNewAds = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-new-ads`)
      .then((res) => {
        console.log('new ads ==> ', res.data);
        setNewAds(res.data);
      });
  };

  const fetchNewVerifs = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-new-verifs`)
      .then((res) => {
        console.log('new verifs ==> ', res.data);
        setNewVerifs(res.data);
      });
  };

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
        <Link to='/admin/mass-mail'>
          <FontAwesomeIcon icon={faEnvelope} className='fa' />
          Mass Mail
        </Link>
        <Link to='/admin/event'>
          <FontAwesomeIcon icon={faCalendarDays} className='fa' />
          Events
        </Link>
        <Link to='/admin/geo-block'>
          <FontAwesomeIcon icon={faEarthAmericas} className='fa' />
          Geo-Block
        </Link>
        <Link to='/admin/ip-block'>
          <FontAwesomeIcon icon={faDesktop} className='fa' />
          IP-Block
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
        <Link to='/ad-submissions'>
          <FontAwesomeIcon icon={faRectangleAd} className='fa' />
          Ad Submissions
          <span>{newAds && newAds.length > 0 && newAds.length}</span>
        </Link>
        <Link to='/verif-submissions'>
          <FontAwesomeIcon icon={faShieldBlank} className='fa' />
          Verified User Submissions
          <span>{newVerifs && newVerifs.length > 0 && newVerifs.length}</span>
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
