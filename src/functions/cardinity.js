import axios from 'axios';

export const createPayment = (values, payable, userAgent, authtoken) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-payment`,
    { values, payable, userAgent },
    { headers: { authtoken } }
  );

export const createAdPayment = (values, payable, userAgent, authtoken, _id) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-ad-payment`,
    { values, payable, userAgent, _id },
    { headers: { authtoken } }
  );
