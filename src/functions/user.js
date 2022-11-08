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

export const createOrder = async (
  cardinityResponse,
  authtoken,
  deliverTo,
  deliveryAddress,
  discount,
  deliveryFee
) =>
  await axios.post(
    `${process.env.REACT_APP_API}/order`,
    { cardinityResponse, deliverTo, deliveryAddress, discount, deliveryFee },
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

export const getUserPointsTotal = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user-points-total`, {
    headers: {
      authtoken,
    },
  });

export const addPoints = async (number, reason, authtoken, otherUser) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/add-points`,
    { number, reason, otherUser },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const removePoints = async (number, reason, authtoken) => {
  await axios.put(
    `${process.env.REACT_APP_API}/remove-points`,
    { number, reason },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const spentPoints = async (
  number,
  reason,
  authtoken,
  user,
  couponName
) => {
  await axios.put(
    `${process.env.REACT_APP_API}/spent-points`,
    { number, reason, user, couponName },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getUserPointsGainedData = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user-points-gained-data`, {
    headers: {
      authtoken,
    },
  });

export const getUserPointsLostData = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user-points-lost-data`, {
    headers: {
      authtoken,
    },
  });

export const getUserPointsSpentData = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user-points-spent-data`, {
    headers: {
      authtoken,
    },
  });

export const getUsersByCount = async (count, authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/fetch-users/${count}`, {
    headers: {
      authtoken,
    },
  });

export const fetchUsersByFilter = async (arg, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/fetch-users/filters`, arg, {
    headers: {
      authtoken,
    },
  });
