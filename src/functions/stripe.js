import axios from 'axios';

export const createPaymentIntent = (coupon, authtoken) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    { coupon },
    { headers: { authtoken } }
  );
