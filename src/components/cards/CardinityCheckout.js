import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPayment } from '../../functions/cardinity';
import { createOrder, emptyUserCart } from '../../functions/user';
import { Link, useHistory } from 'react-router-dom';
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEuroSign, faCheck } from '@fortawesome/free-solid-svg-icons';
import defaultItem from '../../assets/defaultItem.png';
import PaymentForm from '../forms/PaymentForm';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Carousel } from 'react-responsive-carousel';

const CardinityCheckout = ({ deliverTo, userAddress }) => {
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);
  const [userAgent, setUserAgent] = useState('');
  const [order, setOrder] = useState({});

  const { token } = useSelector((state) => state.user);
  const { coupon } = useSelector((state) => ({ ...state }));
  const { cart } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  let history = useHistory();

  const isFirstRun = useRef(true);
  console.log(cart);

  useEffect(() => {
    calcFinalAmount();
    setUserAgent(window.navigator.userAgent);
    console.log(window.navigator.userAgent);
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      history.push({
        pathname: '/order-successful',
        state: { order },
      });
    }
  }, [order]);

  const calcFinalAmount = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/calculate-final-amount`,
        {
          coupon,
        },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log('final amount => ', res.data);
        setCartTotal(res.data.cartTotal);
        setTotalAfterDiscount(res.data.totalAfterDiscount);
        setPayable(res.data.payable);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (values) => {
    setProcessing(true);
    createPayment(values, payable, userAgent, token).then((res) => {
      console.log('create payment', res.data);
      if (res.data.errors) {
        toast.error(res.data.errors[0].message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setProcessing(false);
      }
      if (res.data.status === 'approved') {
        toast.success(`Payment successful.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        createOrder(res.data, token, deliverTo, userAddress).then(
          (response) => {
            console.log('createOrder response => ', response);
            if (response.data.paymentIntent.status === 'approved') {
              if (typeof window !== 'undefined')
                localStorage.removeItem('cart');
              dispatch({
                type: 'ADD_TO_CART',
                payload: [],
              });
              dispatch({
                type: 'COUPON_APPLIED',
                payload: false,
              });
              emptyUserCart(token);
              setOrder(response.data);
            }
          }
        );
        setProcessing(false);
        setSucceeded(true);
      }
      if (res.data.status === 'pending') {
        toast.warning(`Payment pending.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setProcessing(false);
      }
      if (res.data.status === 'declined') {
        toast.error(`Payment declined.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setProcessing(false);
      }
    });
  };

  return (
    <div className='payment-amount'>
      {/* {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p>{`Total after discount: €${totalAfterDiscount}`}</p>
          ) : (
            <p>No coupon applied</p>
          )}
        </div>
      )} */}
      {cart.length > 1 ? (
        <Carousel
          showArrows
          autoPlay
          infiniteLoop
          style={{
            height: '200px',
            width: '200px',
            objectFit: 'cover',
            marginBottom: '-50px',
          }}
        >
          {cart.map((item, index) =>
            !item.images.length ? (
              <img src={defaultItem} key={index} />
            ) : (
              <img src={item.images[0].url} key={index} />
            )
          )}
        </Carousel>
      ) : (
        <Card
          cover={
            <img
              src={
                cart.length && cart[0].images && cart[0].images.length > 0
                  ? cart[0].images[0].url
                  : defaultItem
              }
              style={{
                height: '200px',
                width: '200px',
                objectFit: 'cover',
                margin: '0 auto',
              }}
            />
          }
        />
      )}
      <Card
        actions={[
          <>
            <FontAwesomeIcon icon={faEuroSign} className='fa euro' />
            <br />
            <p className='price'>Total: €{cartTotal}</p>
          </>,
          <>
            <FontAwesomeIcon icon={faCheck} className='fa check' />
            <br />
            {/* Total payable: €{(payable / 100).toFixed(2)} */}
            {coupon && totalAfterDiscount !== undefined ? (
              <p className='price'>{`Total after discount: €${totalAfterDiscount}`}</p>
            ) : (
              <p className='price'>{`No coupon applied: €${(
                payable / 100
              ).toFixed(2)}`}</p>
            )}
          </>,
        ]}
      />
      <PaymentForm
        handleSubmit={handleSubmit}
        processing={processing}
        succeeded={succeeded}
        cartTotal={cartTotal}
      />
    </div>
  );
};

export default CardinityCheckout;
