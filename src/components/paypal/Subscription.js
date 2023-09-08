import React, { useEffect, useRef } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const Subscription = ({ payable, daysLeft }) => {
  const payableRef = useRef(payable);

  useEffect(() => {
    payableRef.current = payable;
  }, [payable]);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const history = useHistory();

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
            description: 'Subscription to Love Is In Cyprus',
            value: payableRef.current,
          },
          // payee: {
          //   payee_display_metadata: { brand_name: 'Love Is In Cyprus' },
          // },
        },
        {
          headers: {
            authtoken: user.token,
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
        `${process.env.REACT_APP_API}/capture-paypal-subscription-order`,
        {
          orderID: data.orderID,
          _id: user._id,
          payable: payableRef.current,
          daysLeft,
        },
        {
          headers: {
            authtoken: user.token,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        console.log(res);
        createSubscription(res);
        toast.success(
          `Payment successful! Your paid membership will last for ${
            payableRef.current === '5.00' || payableRef.current === '10.00'
              ? 'one month.'
              : payableRef.current === '50.00'
              ? 'six months.'
              : payableRef.current === '90.00' && 'one year.'
          }`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            membership: res.data.amendMembership.membership,
          },
        });
        history.push({
          pathname: '/subscription-successful',
          state: payableRef.current,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createSubscription = async (res) => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/create-subscription`,
        {
          membership: res.data.amendMembership.membership,
          paymentId: res.data.responseData.id,
          // paymentId:
          //   res.data.responseData.purchase_units[0].payments.captures[0].id,
          _id: user._id,
        },
        {
          headers: {
            authtoken: user.token,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const onError = (err) => {
    // Handle payment errors (PENDING, FAILED, or other errors)
    console.error('Payment error:', err);
    // Display an error message to the user or take appropriate action.
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

export default Subscription;
