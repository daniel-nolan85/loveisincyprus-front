import React from 'react';
import CardinityCheckout from '../../components/cards/CardinityCheckout';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';

const Payment = (props) => {
  const { deliverTo, userAddress } = props.location.state;

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <h1 className='center'>Complete your purchase</h1>
        <CardinityCheckout deliverTo={deliverTo} userAddress={userAddress} />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Payment;
