import axios from 'axios';

export const createPayment = (
  values,
  payable,
  userAgent,
  authtoken,
  deliveryFee
) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-payment`,
    { values, payable, userAgent, deliveryFee },
    { headers: { authtoken } }
  );

export const createAdPayment = (values, payable, userAgent, _id, demographic) =>
  axios.post(`${process.env.REACT_APP_API}/create-ad-payment`, {
    values,
    payable,
    userAgent,
    _id,
    demographic,
  });

export const createGCPayment = (values, amount, userAgent, authtoken) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-gc-payment`,
    { values, amount, userAgent },
    { headers: { authtoken } }
  );

export const createMembershipPayment = (
  values,
  payable,
  userAgent,
  user,
  authtoken
) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-membership-payment`,
    { values, payable, userAgent, user },
    { headers: { authtoken } }
  );

export const refundSubscription = (user, authtoken) =>
  axios.post(
    `${process.env.REACT_APP_API}/refund-subscription`,
    { user },
    { headers: { authtoken } }
  );
