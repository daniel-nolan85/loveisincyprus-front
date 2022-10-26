import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import amex from '../../assets/amex.png';
import discover from '../../assets/discover.png';
import mastercard from '../../assets/mastercard.png';
import visa from '../../assets/visa.png';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';

const SubscriptionSuccess = (props) => {
  const [fortnight, setFortnight] = useState('');

  const { membership } = useSelector((state) => state.user);

  useEffect(() => {
    const twoWeeks = new Date(Date.now() + 12096e5);
    setFortnight(moment(twoWeeks).format('MMMM Do YYYY'));
  }, []);

  console.log(props);
  const { cardBrand, cardHolder, cardNumber, expiry } =
    props.location.state.userBankDetails[0];
  const payable = props.location.state.payable;

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <div className='ps-card'>
          <img
            src={cardBrand === 'MasterCard' ? mastercard : visa}
            className='ps-logo-card'
          />
          <div className='ps-cardinfo'>
            <div className='ps-number-expiry'>
              <div>
                <label className='ps-label'>Card number:</label>
                <span className='ps-input'>
                  XXXX-XXXX-XXXX-{cardNumber.slice(-4)}
                </span>
              </div>
            </div>
            <div className='ps-name-cvc'>
              <div>
                <label className='ps-label'>Name:</label>
                <span className='ps-input'>{cardHolder}</span>
              </div>
              <div>
                <label className='ps-label'>Expiry:</label>
                <span className='ps-input'>
                  {expiry.substring(0, 2)} / {expiry.slice(-4)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='ps-receipt'>
          <div className='ps-col'>
            <p>Cost:</p>
            <h2 className='ps-cost'>€{payable}</h2>
          </div>
          <div className='ps-col'>
            <p>Subscription:</p>
            <h3 className='ps-bought-items'>
              {payable === '10.00'
                ? 'One month'
                : payable === '50.00'
                ? 'Six months'
                : payable === '90.00' && 'One year'}
            </h3>
            <p className='ps-bought-items ps-description'>
              You now have full access to all areas of the site until{' '}
              {moment(membership.expiry).format('MMMM Do YYYY')}.
            </p>
            <p className='ps-bought-items ps-price'>
              You may cancel your subscription by clicking your avatar at the
              top of the page and selecting 'Cancel Subscription' to receive a
              full refund any time between now and {fortnight}.
            </p>
          </div>
          <p className='ps-comprobe'>
            This information will be sent to your email
          </p>
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default SubscriptionSuccess;
