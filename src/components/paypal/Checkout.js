import React, { useEffect, useRef } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addPoints } from '../../functions/user';
import { createNewOrder, emptyUserCart } from '../../functions/user';

const Checkout = ({
  payable,
  handleCoupon,
  deliverTo,
  userAddress,
  deliveryFee,
  discount,
  setOrder,
  cartTotal,
}) => {
  const payableRef = useRef(payable);
  const discountRef = useRef(discount);
  const cartTotalRef = useRef(cartTotal);

  useEffect(() => {
    payableRef.current = parseFloat((payable / 100 + deliveryFee).toFixed(2));
  }, [payable]);

  useEffect(() => {
    discountRef.current = discount;
  }, [discount]);

  useEffect(() => {
    cartTotalRef.current = cartTotal;
  }, [cartTotal]);

  const { token, _id } = useSelector((state) => state.user);
  const { coupon } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  const initialOptions = {
    'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: 'EUR',
    intent: 'capture',
  };

  const createOrder = async (data) => {
    return await axios
      .post(
        `${process.env.REACT_APP_API}/create-paypal-order`,
        {
          product: {
            description: 'Shop purchase from Love Is In Cyprus',
            value: payableRef.current,
          },
          deliveryFee,
        },
        {
          headers: {
            authtoken: token,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => res.data.id)
      .catch((err) => {
        console.log(err);
      });
  };

  const onApprove = async (data) => {
    return await axios
      .post(
        `${process.env.REACT_APP_API}/capture-paypal-shop-order`,
        {
          orderID: data.orderID,
          _id,
          payable: payableRef.current,
        },
        {
          headers: {
            authtoken: token,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        if (coupon) handleCoupon(cartTotalRef.current);
        addPoints(Math.floor(payableRef.current), 'store purchase', token);
        toast.success(
          `Payment successful!
          Thanks for your purchase. You have been awarded ${Math.floor(
            payableRef.current
          )} points!`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        createNewOrder(
          res.data,
          token,
          deliverTo,
          userAddress,
          discountRef.current,
          deliveryFee
        ).then((response) => {
          if (response.data.paymentIntent.status === 'COMPLETED') {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onError = (err) => {
    toast.error('Payment Failed', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const onCancel = (data) => {
    toast.error('Payment Cancelled', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        onCancel={onCancel}
      />
    </PayPalScriptProvider>
  );
};

export default Checkout;
