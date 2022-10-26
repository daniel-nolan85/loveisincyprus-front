import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faMoneyCheck } from '@fortawesome/free-solid-svg-icons';

const TakeAdPayment = ({
  currentAd,
  preparePayment,
  processing,
  succeeded,
}) => {
  const { cardHolder, cardNumber, expiry, cvc } = currentAd.accountInfo;

  return (
    <div className='form-box take-ad-payment'>
      <div className='button-box'>
        <p className='form-header'>Payment Information</p>
      </div>
      <form>
        <input className='input-field' value={cardHolder} readOnly />
        <input className='input-field' value={cardNumber} readOnly />
        <input className='input-field' value={expiry} readOnly />
        <input className='input-field' value={cvc} readOnly />
        <button
          onClick={() => preparePayment(currentAd)}
          type='button'
          className='submit-btn'
        >
          {processing ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faMoneyCheck} className='fa' />
          )}
          Submit
        </button>
        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          Payment successful
        </p>
      </form>
    </div>
  );
};

export default TakeAdPayment;
