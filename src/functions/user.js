import axios from 'axios';

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserCart = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/cart`, {
    headers: {
      authtoken,
    },
  });

export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/cart`, {
    headers: {
      authtoken,
    },
  });

export const saveUserAddress = async (address, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );

export const applyUserCoupon = async (coupon, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
