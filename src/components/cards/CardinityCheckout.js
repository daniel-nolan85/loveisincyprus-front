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

  const dispatch = useDispatch();

  let history = useHistory();

  const isFirstRun = useRef(true);

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
      <PaymentForm
        handleSubmit={handleSubmit}
        processing={processing}
        succeeded={succeeded}
        cartTotal={cartTotal}
      />
    </>
  );
};

export default CardinityCheckout;
