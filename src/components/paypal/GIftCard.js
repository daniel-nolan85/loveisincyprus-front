import React, { useEffect, useRef } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const GiftCard = ({ amount, validAmount, setSucceeded }) => {
  const amountRef = useRef(amount);

  useEffect(() => {
    amountRef.current = amount;
  }, [amount]);

  let { token } = useSelector((state) => state.user);

  const initialOptions = {
    'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: 'EUR',
    intent: 'capture',
  };

  const createOrder = async (data) => {
    if (!amountRef.current || amountRef.current === '0.00') {
      toast.error('Please enter a valid amount', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    return await axios
      .post(
        `${process.env.REACT_APP_API}/create-paypal-order`,
        {
          product: {
            description: 'Gift card for Love Is In Cyprus member',
            value: amountRef.current,
          },
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
        `${process.env.REACT_APP_API}/capture-paypal-gc-order`,
        {
          orderID: data.orderID,
        },
        {
          headers: {
            authtoken: token,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        toast.success(`Payment successful! Your card is ready to send.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setSucceeded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onError = (err) => {
    if (!amountRef.current || amountRef.current === '0.00') {
      return;
    }
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
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
        onError={(err) => onError(err)}
        onCancel={(data) => onCancel(data)}
      />
    </PayPalScriptProvider>
  );
};

export default GiftCard;
