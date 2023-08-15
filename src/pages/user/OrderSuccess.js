import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Mobile from '../../components/user/Mobile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const OrderSuccess = (props) => {
  const [products, setProducts] = useState([]);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchAmount();
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

  const fetchAmount = () =>
    setAmount(
      props.location.state.order.paymentIntent.purchase_units[0].payments
        .captures[0].amount.value
    );

  const { _id, deliveryFee, discount } = props.location.state.order;

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        <div className='ps-success'>
          <div className='ps-icon-container'>
            <FontAwesomeIcon icon={faCheck} className='fa' />
          </div>
          <h2>Thank You!</h2>
          <p>Your payment has been approved.</p>
          <div className='ps-col'>
            <div className='ps-row'>
              <p>Cost of items:</p>
              <h3 className='ps-cost'>
                €
                {discount
                  ? (parseFloat(amount) + discount).toFixed(2) -
                    deliveryFee.toFixed(2)
                  : parseFloat(amount - deliveryFee).toFixed(2)}
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
                      <p className='ps-bought-items ps-price'>
                        €{(p.product.price * p.count).toFixed(2)}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className='ps-info'>
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

        {/* <div className='ps-receipt'>
          <div className='ps-col'>
            <div className='ps-row'>
              <p>Cost of items:</p>
              <h3 className='ps-cost'>
                €
                {discount
                  ? (parseFloat(amount) + discount).toFixed(2) -
                    deliveryFee.toFixed(2)
                  : parseFloat(amount - deliveryFee).toFixed(2)}
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
        </div> */}
      </div>
      <RightSidebar />
    </div>
  );
};

export default OrderSuccess;
