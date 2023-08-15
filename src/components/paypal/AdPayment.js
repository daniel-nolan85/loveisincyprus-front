import React, { useState, useEffect, useRef } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdPayment = ({ duration, setAuthId }) => {
  const [amount, setAmount] = useState('5.00');

  const amountRef = useRef(amount);

  useEffect(() => {
    if (duration === 'one day') {
      setAmount('5.0');
    }
    if (duration === 'one week') {
      setAmount('20.0');
    }
    if (duration === 'two weeks') {
      setAmount('30.0');
    }
    if (duration === 'one month') {
      setAmount('50.0');
    }
    amountRef.current = amount;
  }, [amount, duration]);

  const initialOptions = {
    'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: 'EUR',
    intent: 'authorize',
  };

  const createAuthorization = async (data) => {
    return await axios
      .post(
        `${process.env.REACT_APP_API}/create-ad-paypal-authorization`,
        {
          product: {
            description: 'Ad submission for Love Is In Cyprus member',
            value: amountRef.current,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => res.data.id)
      .catch((err) => {
        console.log(err);
      });
  };

  const onApprove = (data) => {
    axios
      .post(`${process.env.REACT_APP_API}/authorize-paypal-ad-order`, {
        orderID: data.orderID,
      })
      .then((response) => response.data)
      .then((authorizePayload) => {
        const authorizationID =
          authorizePayload.purchase_units[0].payments.authorizations[0].id;
        setAuthId(authorizationID);
        toast.success(
          'Your payment has been authorized successfully. You will not be charged until your submission has been approved',
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      })
      .catch((error) => {
        console.error('Error authorizing PayPal order:', error);
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
        createOrder={createAuthorization}
        onApprove={onApprove}
        onError={(err) => onError(err)}
        onCancel={(data) => onCancel(data)}
      />
    </PayPalScriptProvider>
  );
};

export default AdPayment;
