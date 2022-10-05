import React from 'react';
import CardinityCheckout from '../../components/cards/CardinityCheckout';

const Payment = (props) => {
  const { userAddress } = props.location.state;

  return (
    <div>
      <h4>Complete your purchase</h4>
      <CardinityCheckout userAddress={userAddress} />
    </div>
  );
};

export default Payment;
