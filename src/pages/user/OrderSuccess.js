import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import mastercard from '../../assets/mastercard.png';
import visa from '../../assets/visa.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Mobile from '../../components/user/Mobile';

const OrderSuccess = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    await axios
      .post(`${process.env.REACT_APP_API}/fetch-products`, { _id })
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { _id, deliveryFee, discount } = props.location.state.order;
  const { amount } = props.location.state.order.paymentIntent;
  const { card_brand, pan, exp_month, exp_year, holder } =
    props.location.state.order.paymentIntent.payment_instrument;

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
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
            <div className='ps-row'>
              <p>Cost of items:</p>
              <h3 className='ps-cost'>
                €
                {discount
                  ? (parseFloat(amount) + discount).toFixed(2) -
                    deliveryFee.toFixed(2)
                  : parseFloat(amount) - deliveryFee.toFixed(2)}
              </h3>
            </div>
            {discount && (
              <div className='ps-row'>
                <p>Discount:</p>
                <h3 className='ps-cost'>€{discount.toFixed(2)}</h3>
              </div>
            )}
            <div className='ps-row'>
              <p>Delivery fee:</p>
              <h3 className='ps-cost'>€{deliveryFee.toFixed(2)}</h3>
            </div>
            <div className='ps-row'>
              <p>Total paid:</p>
              <h2 className='ps-cost'>€{amount}</h2>
            </div>
          </div>
          <div className='ps-col'>
            <div className='ps-row'>
              <p>Items:</p>
              <div className='ps-items'>
                {products &&
                  products.map((p) => (
                    <div key={p.product._id}>
                      <h3 className='ps-bought-items'>
                        {p.product.title} x {p.count}
                      </h3>
                      <p className='ps-bought-items ps-description'>
                        {p.product.description}
                      </p>
                      <p className='ps-bought-items ps-price'>
                        €{(p.product.price * p.count).toFixed(2)}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <p className='ps-comprobe'>
            Thanks for your purchase. This information will be sent to your
            email.
          </p>
          <p className='ps-comprobe'>
            <Link to='purchase/history' className='link'>
              View purchase history.
            </Link>
          </p>
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default OrderSuccess;
