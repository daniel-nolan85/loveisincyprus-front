import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCheck } from '@fortawesome/free-solid-svg-icons';
import ShowPaymentInfo from '../cards/ShowPaymentInfo';

const OrdersList = ({ orders, handleStatusChange }) => {
  const showOrderInTable = (order) => (
    <table>
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
  );

  return (
    <>
      {orders.map((order) => (
        <div key={order._id}>
          <div>
            <ShowPaymentInfo order={order} />
            <div>Delivery Status</div>
            <div>
              <select
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
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
          </div>
          {showOrderInTable(order)}
        </div>
      ))}
    </>
  );
};

export default OrdersList;
