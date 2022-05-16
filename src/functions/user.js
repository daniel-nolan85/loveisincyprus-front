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

export const createOrder = async (stripeResponse, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/order`,
    { stripeResponse },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user-orders`, {
    headers: {
      authtoken,
    },
  });

export const getWishlist = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user-wishlist`, {
    headers: {
      authtoken,
    },
  });

export const removeFromWishlist = async (productId, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user-wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const addToWishlist = async (productId, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user-wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );
