import React, { useState, useEffect } from 'react';
import { getOrders, changeStatus } from '../../functions/admin';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import OrdersList from '../../components/lists/OrdersList';
import LeftSidebar from '../../components/admin/LeftSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';

const Orders = ({ history }) => {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState('');

  const { setNewOrders } = ChatState();

  const { token, canOrders } = useSelector((state) => state.user);

  useEffect(() => {
    if (!canOrders) {
      history.push('/admin/dashboard');
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(token).then((res) => {
      setOrders(res.data);
    });

  const fetchNewOrders = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-new-orders`)
      .then((res) => {
        setNewOrders(res.data);
      });
  };

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, token).then((res) => {
      toast.success(`Order status has been successfully updated.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      loadOrders();
      fetchNewOrders();
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value.toLowerCase());
  };

  const searched = (query) => (q) =>
    (q.paymentIntent.id && q.paymentIntent.id.includes(query)) ||
    (q.orderStatus && q.orderStatus.toLowerCase().includes(query)) ||
    (q.createdAt && q.createdAt.toLowerCase().includes(query)) ||
    (q.paymentIntent.status &&
      q.paymentIntent.status.toLowerCase().includes(query));

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
            placeholder='Search Orders'
            onChange={handleSearch}
            value={query}
          />
          <input type='submit' hidden />
        </div>
        <div>
          <OrdersList
            orders={orders}
            handleStatusChange={handleStatusChange}
            searched={searched}
            query={query}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
