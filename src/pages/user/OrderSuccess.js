import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import amex from '../../assets/amex.png';
import discover from '../../assets/discover.png';
import mastercard from '../../assets/mastercard.png';
import visa from '../../assets/visa.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderSuccess = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    await axios
      .post(`${process.env.REACT_APP_API}/fetch-products`, { _id })
      .then((res) => {
        console.log('products ==> ', res);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(props);
  const { _id, orderStatus } = props.location.state.order;
  const { amount } = props.location.state.order.paymentIntent;
  const { card_brand, pan, exp_month, exp_year, holder } =
    props.location.state.order.paymentIntent.payment_instrument;

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <div className='ps-card'>
          <img
            src={card_brand === 'MasterCard' ? mastercard : visa}
            className='ps-logo-card'
          />
          <div className='ps-cardinfo'>
            <div className='ps-number-expiry'>
              <div>
                <label className='ps-label'>Card number:</label>
                <span className='ps-input'>XXXX-XXXX-XXXX-{pan}</span>
              </div>
            </div>
            <div className='ps-name-cvc'>
              <div>
                <label className='ps-label'>Name:</label>
                <span className='ps-input'>{holder}</span>
              </div>
              <div>
                <label className='ps-label'>Expiry:</label>
                <span className='ps-input'>
                  {exp_month} / {exp_year}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='ps-receipt'>
          <div className='ps-col'>
            <p>Cost:</p>
            <h2 className='ps-cost'>€{amount}</h2>
          </div>
          <div className='ps-col'>
            {products &&
              products.map((p) => (
                <div key={p.product._id}>
                  <p>Items:</p>
                  <h3 className='ps-bought-items'>{p.product.title}</h3>
                  <p className='ps-bought-items ps-description'>
                    {p.product.description}
                  </p>
                  <p className='ps-bought-items ps-price'>€{p.product.price}</p>
                </div>
              ))}
          </div>
          <p className='ps-comprobe'>
            This information will be sent to your email
          </p>
        </div>
        <p>
          Thanks for your purchase.{' '}
          <Link to='purchase/history'>View purchase history</Link>
        </p>
      </div>
      <RightSidebar />
    </div>
  );
};

export default OrderSuccess;
