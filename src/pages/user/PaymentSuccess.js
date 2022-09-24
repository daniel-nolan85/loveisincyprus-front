import React from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import amex from '../../assets/amex.png';
import discover from '../../assets/discover.png';
import mastercard from '../../assets/mastercard.png';
import visa from '../../assets/visa.png';

const PaymentSuccess = (props) => {
  const { cardBrand, cardHolder, cardNumber, expiry, cvc } =
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
                <span className='ps-input'>{cardNumber}</span>
              </div>
              <div>
                <label className='ps-label'>Expiry:</label>
                <span className='ps-input'>{expiry}</span>
              </div>
            </div>
            <div className='ps-name-cvc'>
              <div>
                <label className='ps-label'>Name:</label>
                <span className='ps-input'>{cardHolder}</span>
              </div>
              <div className='ps-cvc'>
                <label className='ps-label'>CVC:</label>
                <span className='ps-input'>{cvc}</span>
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
            <p>Items:</p>
            <h3 className='ps-bought-items'>Corsair Mouse</h3>
            <p className='ps-bought-items ps-description'>
              Gaming mouse with shiny lights
            </p>
            <p className='ps-bought-items ps-price'>$200 (50% discount)</p>
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

export default PaymentSuccess;
