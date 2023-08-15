import React, { useState, useEffect, useRef } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import axios from 'axios';
import Mobile from '../../components/user/Mobile';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addPoints } from '../../functions/user';
import { createNewOrder, emptyUserCart } from '../../functions/user';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const FinalizingPayment = () => {
  const [status, setStatus] = useState('');
  const [response, setResponse] = useState({});
  const [order, setOrder] = useState({});

  const { token } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const isFirstRun = useRef(true);

  let history = useHistory();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const getStatus = searchParams.get('status');
    const getResponse = searchParams.get('response');
    setStatus(getStatus);
    setResponse(JSON.parse(decodeURIComponent(getResponse)));
  }, []);

  const pendingDataString = localStorage.getItem('pendingData');
  const pendingData = JSON.parse(pendingDataString);

  const {
    discount,
    deliverTo,
    userAddress,
    couponApplied,
    deliveryFee,
    cartTotal,
    payable,
  } = pendingData || {};

  useEffect(() => {
    if (status && status === 'approved') {
      if (discount) handleCoupon();
      addPoints(Math.floor(payable / 100), 'store purchase', token);
      toast.success(
        `Payment successful!
                  Thanks for your purchase. You have been awarded ${Math.floor(
                    payable / 100
                  )} points!`,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      createNewOrder(
        response,
        token,
        deliverTo,
        userAddress,
        discount,
        deliveryFee
      ).then((response) => {
        if (response.data.paymentIntent.status === 'approved') {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('cart');
            localStorage.removeItem('pendingData');
          }
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
      });
    }
  }, [status, response]);

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

  const handleCoupon = async () => {
    await axios.put(
      `${process.env.REACT_APP_API}/handle-coupon/${couponApplied._id}`,
      { cartTotal },
      {
        headers: {
          authtoken: token,
        },
      }
    );
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        <div className='spinner'>
          <FontAwesomeIcon icon={faSpinner} className='fa' spin />
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default FinalizingPayment;
