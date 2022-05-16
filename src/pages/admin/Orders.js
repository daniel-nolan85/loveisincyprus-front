import React, { useState, useEffect } from 'react';
import { getOrders, changeStatus } from '../../functions/admin';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import OrdersList from '../../components/lists/OrdersList';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success(`Order status has been successfully updated.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      loadOrders();
    });
  };

  return (
    <div>
      <OrdersList orders={orders} handleStatusChange={handleStatusChange} />
    </div>
  );
};

export default Orders;
