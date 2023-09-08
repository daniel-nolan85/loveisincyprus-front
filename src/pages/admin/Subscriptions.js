import React, { useState, useEffect } from 'react';
import { getSubscriptions } from '../../functions/admin';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LeftSidebar from '../../components/admin/LeftSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import SubscriptionsList from '../../components/lists/SubscriptionsList';

const Subscriptions = ({ history }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [query, setQuery] = useState('');

  //   const { token, canOrders } = useSelector((state) => state.user);
  const { role, token } = useSelector((state) => state.user);

  useEffect(() => {
    if (role !== 'main-admin') {
      history.push('/admin/dashboard');
    }
  }, []);

  //   useEffect(() => {
  //     if (!canOrders) {
  //       history.push('/admin/dashboard');
  //     }
  //   }, []);

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = () =>
    getSubscriptions(token).then((res) => {
      console.log(res.data);
      setSubscriptions(res.data);
    });

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value.toLowerCase());
  };

  const searched = (query) => (q) => {
    // (q.paymentIntent.id && q.paymentIntent.id.includes(query)) ||
    // (q.orderStatus && q.orderStatus.toLowerCase().includes(query)) ||
    // (q.createdAt && q.createdAt.toLowerCase().includes(query)) ||
    // (q.paymentIntent.status &&
    //   q.paymentIntent.status.toLowerCase().includes(query));
  };
  return (
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        <div className='search-box'>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            onClick={handleSearch}
            className='fa'
          />
          <input
            type='search'
            placeholder='Search Subscriptions'
            onChange={handleSearch}
            value={query}
          />
          <input type='submit' hidden />
        </div>
        <div>
          <SubscriptionsList
            subscriptions={subscriptions}
            searched={searched}
            query={query}
          />
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
