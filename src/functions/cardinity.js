import axios from 'axios';

export const createPayment = (values, payable, userAgent, authtoken) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-payment`,
    { values, payable, userAgent },
    { headers: { authtoken } }
  );
