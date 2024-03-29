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
  faFlag,
  faBarcode,
  faChartLine,
  faPhone,
  faTable,
  faCommentSms,
  faCalculator,
  faMobilePhone,
  faAddressCard,
  faSprayCanSparkles,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';
import { useSelector } from 'react-redux';

const LeftSidebar = () => {
  const {
    newAds,
    setNewAds,
    newVerifs,
    setNewVerifs,
    reportedContent,
    setReportedContent,
    productsForReview,
    setProductsForReview,
    newOrders,
    setNewOrders,
    newSubscriptions,
    setNewSubscriptions,
    newRefunds,
    setNewRefunds,
  } = ChatState();

  let {
    role,
    canVerify,
    canReported,
    canPosts,
    canUsers,
    canMassMail,
    canEvents,
    canOrders,
    canProducts,
    canCategories,
    canSubs,
    canCoupon,
  } = useSelector((state) => state.user);

  useEffect(() => {
    fetchNewAds();
    fetchNewVerifs();
    fetchReportedContent();
    fetchProductsForReview();
    fetchNewOrders();
    fetchNewSubscriptions();
    fetchNewRefunds();
  }, []);

  const fetchNewAds = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-new-ads`)
      .then((res) => {
        setNewAds(res.data);
      });
  };

  const fetchNewVerifs = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-new-verifs`)
      .then((res) => {
        setNewVerifs(res.data);
      });
  };

  const fetchReportedContent = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-reported-content`)
      .then((res) => {
        setReportedContent(res.data);
      });
  };

  const fetchProductsForReview = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-products-for-review`)
      .then((res) => {
        setProductsForReview(res.data);
      });
  };

  const fetchNewOrders = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-new-orders`)
      .then((res) => {
        setNewOrders(res.data);
      });
  };

  const fetchNewSubscriptions = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-new-subscriptions`)
      .then((res) => {
        setNewSubscriptions(res.data);
      });
  };

  const fetchNewRefunds = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-new-refunds`)
      .then((res) => {
        setNewRefunds(res.data);
      });
  };

  return (
    <div className='left-sidebar'>
      <div className='imp-links'>
        <Link to='/admin/dashboard'>
          <FontAwesomeIcon icon={faToolbox} className='fa' />
          Dashboard
        </Link>
        {role === 'main-admin' && (
          <Link to='/admin/ad-submissions'>
            <FontAwesomeIcon icon={faRectangleAd} className='fa' />
            Ad Submissions
            <span>{newAds && newAds.length > 0 && newAds.length}</span>
          </Link>
        )}
        {canVerify && (
          <Link to='/admin/verif-submissions'>
            <FontAwesomeIcon icon={faShieldBlank} className='fa' />
            Verified User Submissions
            <span>{newVerifs && newVerifs.length > 0 && newVerifs.length}</span>
          </Link>
        )}
        {canReported && (
          <Link to='/admin/reported-content'>
            <FontAwesomeIcon icon={faFlag} className='fa' />
            Reported Content
            <span>
              {reportedContent &&
                reportedContent.content.length > 0 &&
                reportedContent.content.length}
            </span>
          </Link>
        )}
        {role === 'main-admin' && (
          <Link to='/admin/product-review'>
            <FontAwesomeIcon icon={faSprayCanSparkles} className='fa' />
            Products to Review
            <span>
              {productsForReview &&
                productsForReview.length > 0 &&
                productsForReview.length}
            </span>
          </Link>
        )}
        {canOrders && (
          <Link to='/admin/orders'>
            <FontAwesomeIcon icon={faFolderOpen} className='fa' />
            Orders
            <span>{newOrders && newOrders.length > 0 && newOrders.length}</span>
          </Link>
        )}
        {role === 'main-admin' && (
          <Link to='/admin/subscriptions'>
            <FontAwesomeIcon icon={faAddressCard} className='fa' />
            Subscriptions
            <span>
              {newSubscriptions &&
                newSubscriptions.length > 0 &&
                newSubscriptions.length}
            </span>
          </Link>
        )}
        {role === 'main-admin' && (
          <Link to='/admin/refunds'>
            <FontAwesomeIcon icon={faBarcode} className='fa' />
            Refunds
            <span>
              {newRefunds && newRefunds.length > 0 && newRefunds.length}
            </span>
          </Link>
        )}
        {role === 'main-admin' && (
          <Link to='/admin/data'>
            <FontAwesomeIcon icon={faTable} className='fa' />
            Data
          </Link>
        )}
        {role === 'main-admin' && (
          <Link to='/admin/analytics'>
            <FontAwesomeIcon icon={faChartLine} className='fa' />
            Analytics
          </Link>
        )}
        <Link
          to={{
            pathname: 'https://statcounter.com/p12198487/summary/',
          }}
          target='_blank'
        >
          <FontAwesomeIcon icon={faCalculator} className='fa' />
          Stat Counter
        </Link>
        {canPosts && (
          <Link to='/admin/posts'>
            <FontAwesomeIcon icon={faSignsPost} className='fa' />
            Posts
          </Link>
        )}
        {canUsers && (
          <Link to='/admin/users'>
            <FontAwesomeIcon icon={faUsers} className='fa' />
            Users
          </Link>
        )}
        {role === 'main-admin' && (
          <Link to='/admin/chats'>
            <FontAwesomeIcon icon={faCommentSms} className='fa' />
            Chats
          </Link>
        )}
        {canMassMail && (
          <Link to='/admin/mass-mail'>
            <FontAwesomeIcon icon={faEnvelope} className='fa' />
            Mass Mail
          </Link>
        )}
        {canEvents && (
          <Link to='/admin/event'>
            <FontAwesomeIcon icon={faCalendarDays} className='fa' />
            Events
          </Link>
        )}
        {role === 'main-admin' && (
          <>
            <Link to='/admin/geo-block'>
              <FontAwesomeIcon icon={faEarthAmericas} className='fa' />
              Geo-Block
            </Link>
            <Link to='/admin/ip-block'>
              <FontAwesomeIcon icon={faDesktop} className='fa' />
              IP-Block
            </Link>
            <Link to='/admin/calling-code-block'>
              <FontAwesomeIcon icon={faPhone} className='fa' />
              Calling Code-Block
            </Link>
            <Link to='/admin/mobile-phone-block'>
              <FontAwesomeIcon icon={faMobilePhone} className='fa' />
              Mobile Phone-Block
            </Link>
          </>
        )}
        {canProducts && (
          <Link to='/admin/product'>
            <FontAwesomeIcon icon={faShirt} className='fa' />
            Products
          </Link>
        )}
        {canCategories && (
          <Link to='/admin/category'>
            <FontAwesomeIcon icon={faTag} className='fa' />
            Categories
          </Link>
        )}
        {canSubs && (
          <Link to='/admin/sub'>
            <FontAwesomeIcon icon={faTags} className='fa' />
            Sub-Categories
          </Link>
        )}
        {canCoupon && (
          <Link to='/admin/coupon'>
            <FontAwesomeIcon icon={faTicket} className='fa' />
            Coupon
          </Link>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
