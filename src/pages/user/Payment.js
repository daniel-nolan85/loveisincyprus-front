import React, { useState, useEffect, useRef } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import Mobile from '../../components/user/Mobile';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEuroSign,
  faTruckFast,
  faCashRegister,
} from '@fortawesome/free-solid-svg-icons';
import defaultItem from '../../assets/defaultItem.png';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import Checkout from '../../components/paypal/Checkout';

const Payment = (props) => {
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);
  const [order, setOrder] = useState({});
  const [discount, setDiscount] = useState(0);

  const { token } = useSelector((state) => state.user);
  const { coupon } = useSelector((state) => ({ ...state }));
  const { cart } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  const isFirstRun = useRef(true);

  useEffect(() => {
    calcFinalAmount();
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      history.push({
        pathname: '/order-successful',
        state: { order },
      });
    }
  }, [order]);

  const calcFinalAmount = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/calculate-final-amount`,
        {
          coupon,
        },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setCartTotal(res.data.cartTotal);
        setTotalAfterDiscount(res.data.totalAfterDiscount);
        setPayable(res.data.payable);
        setDiscount(res.data.cartTotal - res.data.totalAfterDiscount);
      })
      .catch((err) => console.log(err));
  };

  const handleCoupon = async (cartTotal) => {
    await axios.put(
      `${process.env.REACT_APP_API}/handle-coupon/${couponApplied._id}`,
      { cartTotal },
      {
        headers: {
          authtoken: token,
        },
      }
    );
  };

  const { deliverTo, userAddress, couponApplied, deliveryFee } =
    props.location.state;

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        <h1 className='center'>Complete your purchase</h1>
        <div className='payment-amount'>
          {cart.length > 1 ? (
            <Carousel
              showArrows
              autoPlay
              infiniteLoop
              style={{
                height: '200px',
                width: '200px',
                objectFit: 'cover',
                marginBottom: '-50px',
              }}
            >
              {cart.map((item, index) =>
                !item.images.length ? (
                  <img src={defaultItem} key={index} />
                ) : (
                  <img src={item.images[0].url} key={index} />
                )
              )}
            </Carousel>
          ) : (
            <Card
              cover={
                <img
                  src={
                    cart.length && cart[0].images && cart[0].images.length > 0
                      ? cart[0].images[0].url
                      : defaultItem
                  }
                  style={{
                    height: '200px',
                    width: '200px',
                    objectFit: 'cover',
                    margin: '0 auto',
                  }}
                />
              }
            />
          )}
          <Card
            actions={[
              <>
                <FontAwesomeIcon icon={faEuroSign} className='fa euro' />
                <br />
                <p className='price'>Items: €{cartTotal.toFixed(2)}</p>
              </>,
              <>
                <FontAwesomeIcon icon={faTruckFast} className='fa euro' />
                <br />
                <p className='price'>Total: €{deliveryFee.toFixed(2)}</p>
              </>,
              <>
                <FontAwesomeIcon icon={faCashRegister} className='fa euro' />
                <br />
                {coupon && totalAfterDiscount !== undefined ? (
                  <p className='price'>{`Total after discount: €${(
                    totalAfterDiscount + deliveryFee
                  ).toFixed(2)}`}</p>
                ) : (
                  <p className='price'>{`Total amount: €${(
                    payable / 100 +
                    deliveryFee
                  ).toFixed(2)}`}</p>
                )}
              </>,
            ]}
          />
        </div>
        <Checkout
          deliverTo={deliverTo}
          userAddress={userAddress}
          couponApplied={couponApplied}
          deliveryFee={deliveryFee}
          payable={payable}
          cartTotal={cartTotal}
          handleCoupon={handleCoupon}
          discount={discount}
          setOrder={setOrder}
        />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Payment;
