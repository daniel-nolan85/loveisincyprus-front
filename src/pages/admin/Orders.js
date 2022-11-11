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
    // (q.orderedBy.name &&
    //   q.postedBy.name.toLowerCase().includes(query)) ||
    //   (q.orderedBy.username &&
    //     q.postedBy.username.toLowerCase().includes(query)) ||
    //   (q.orderedBy.email && q.postedBy.email.toLowerCase().includes(query)) ||
    (q._id && q._id.toLowerCase().includes(query)) ||
    (q.orderStatus && q.orderStatus.toLowerCase().includes(query)) ||
    (q.createdAt && q.createdAt.toLowerCase().includes(query));

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
          {/* <OrdersList
            orders={orders}
            handleStatusChange={handleStatusChange}
            searched={searched}
            query={query}
          /> */}
          {orders.filter(searched(query)).map((order) => (
            <div key={order._id}>
              <div>
                <ShowPaymentInfo order={order} />
                <div className='order-status'>
                  <div className='delivery-status'>
                    <h2 className='center'>Delivery Status</h2>
                    <select
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      defaultValue={order.orderStatus}
                      name='status'
                    >
                      <option value='Not Processed'>Not Processed</option>
                      <option value='Processing'>Processing</option>
                      <option value='Dispatched'>Dispatched</option>
                      <option value='Cancelled'>Cancelled</option>
                      <option value='Completed'>Completed</option>
                    </select>
                  </div>
                  <div className='order-information'>
                    <h2 className='center' style={{ marginBottom: '0' }}>
                      Order Info
                    </h2>
                    <table className='product-info'>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.products.map((p, i) => (
                          <tr key={i}>
                            <td>{p.product.title}</td>
                            <td>{p.product.price}</td>
                            <td>{p.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* {showOrderInTable(order)} */}
              {/* {showDeliveryAddress(order.deliveryAddress)} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
