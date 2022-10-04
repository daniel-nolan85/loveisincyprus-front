import React, { useState, useEffect } from 'react';
import { getOrders, changeStatus } from '../../functions/admin';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import OrdersList from '../../components/lists/OrdersList';
import LeftSidebar from '../../components/admin/LeftSidebar';

const Orders = () => {
  const [orders, setOrders] = useState([]);

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

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        <div>
          <OrdersList orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
