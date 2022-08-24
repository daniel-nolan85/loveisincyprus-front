import React, { useState, useEffect } from 'react';
import { getUserOrders } from '../../functions/user';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCheck } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo';
import Invoice from '../../components/cards/Invoice';
import { PDFDownloadLink } from '@react-pdf/renderer';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';

const PurchaseHistory = () => {
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const showOrders = () =>
    orders.map((order, i) => (
      <div key={i}>
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div>{showDownloadLink(order)}</div>
      </div>
    ));

  const showOrderInTable = (order) => (
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
  );

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName='invoice.pdf'
      className='submit-btn'
    >
      Download PDF
    </PDFDownloadLink>
  );

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
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
