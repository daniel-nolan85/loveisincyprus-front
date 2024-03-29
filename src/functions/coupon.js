import axios from 'axios';

export const createCoupon = async (coupon, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getCoupons = async () =>
  await axios.get(`${process.env.REACT_APP_API}/coupons`);

export const removeCoupon = async (couponId, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
    headers: {
      authtoken,
    },
  });

export const updateCoupon = async (couponId, coupon, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/coupon/${couponId}`,
    { coupon },
    {
      headers: { authtoken },
    }
  );
