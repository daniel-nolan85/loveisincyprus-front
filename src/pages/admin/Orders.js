import React, { useState, useEffect } from 'react';
import { getOrders, changeStatus } from '../../functions/admin';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import OrdersList from '../../components/lists/OrdersList';
import LeftSidebar from '../../components/admin/LeftSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState('');

  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, token).then((res) => {
      toast.success(`Order status has been successfully updated.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      loadOrders();
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
    <div className='container'>
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
            placeholder='Search Posts'
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
