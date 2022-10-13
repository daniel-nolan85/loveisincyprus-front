import React from 'react';
import CardinityCheckout from '../../components/cards/CardinityCheckout';

const Payment = (props) => {
  const { deliverTo, userAddress } = props.location.state;

  return (
    <div>
      <h1 className='center'>Complete your purchase</h1>
      <CardinityCheckout deliverTo={deliverTo} userAddress={userAddress} />
    </div>
  );
};

export default Payment;
