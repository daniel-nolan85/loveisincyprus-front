import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCheck } from '@fortawesome/free-solid-svg-icons';
import ShowPaymentInfo from '../cards/ShowPaymentInfo';

const OrdersList = ({ orders, handleStatusChange, searched, query }) => {
  //   const showOrderInTable = (order) => (
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>Product</th>
  //           <th>Price</th>
  //           <th>Quantity</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {order.products.map((p, i) => (
  //           <tr key={i}>
  //             <td>{p.product.title}</td>
  //             <td>{p.product.price}</td>
  //             <td>{p.count}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   );

  // const showDeliveryAddress = (address) => (
  //   <div>
  //     <p>{address.firstLine}</p>
  //     <p>{address.secondLine}</p>
  //     <p>{address.city}</p>
  //     <p>{address.state}</p>
  //     <p>{address.zip}</p>
  //     <p>{address.country}</p>
  //   </div>
  // );

  return (
    <>
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
    </>
  );
};

export default OrdersList;
