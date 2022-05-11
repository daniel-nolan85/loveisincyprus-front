import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../../functions/stripe';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEuroSign, faCheck } from '@fortawesome/free-solid-svg-icons';
import defaultItem from '../../assets/defaultItem.png';

const StripeCheckout = ({ history }) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const { user, coupon } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(coupon, user.token).then((res) => {
      console.log('create payment intent', res.data);
      setClientSecret(res.data.clientSecret);
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p>{`Total after discount: €${totalAfterDiscount}`}</p>
          ) : (
            <p>No coupon applied</p>
          )}
        </div>
      )}
      <div>
        <Card
          cover={
            <img
              src={defaultItem}
              style={{
                height: '200px',
                width: '200px',
                objectFit: 'cover',
                marginBottom: '-50px',
              }}
            />
          }
          actions={[
            <>
              <FontAwesomeIcon icon={faEuroSign} className='fa' />
              <br />
              Total: €{cartTotal}
            </>,
            <>
              <FontAwesomeIcon icon={faCheck} className='fa' />
              <br />
              Total payable: €{(payable / 100).toFixed(2)}
            </>,
          ]}
        />
      </div>
      <form id='payment-form' className='stripe-form' onSubmit={handleSubmit}>
        <CardElement
          id='card-element'
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          className='stripe-button'
          disabled={processing || disabled || succeeded}
        >
          <span id='button-text'>
            {processing ? <div className='spinner' id='spinner'></div> : 'Pay'}
          </span>
        </button>
        <br />
        {error && <div>{error}</div>}
        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          Payment Successful. <Link to='payment/history'>View history</Link>
        </p>
      </form>
    </>
  );
};

export default StripeCheckout;
