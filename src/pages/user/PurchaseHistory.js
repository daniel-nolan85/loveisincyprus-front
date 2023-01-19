import React, { useState, useEffect } from 'react';
import { getUserOrders } from '../../functions/user';
import { useSelector } from 'react-redux';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import SingleOrder from '../../components/cards/SingleOrder';
import Mobile from '../../components/user/Mobile';

const PurchaseHistory = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      setOrders(res.data);
    });

  const showOrders = () =>
    orders.map((order, i) => (
      <div key={i}>
        <SingleOrder order={order} />
      </div>
    ));

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        <h1 className='center'>
          {orders.length > 0 ? 'User Purchase Orders' : 'No Purchase Orders'}
        </h1>
        {showOrders()}
      </div>
      <RightSidebar />
    </div>
  );
};

export default PurchaseHistory;
