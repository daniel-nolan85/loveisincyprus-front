import React from 'react';
import freeMembership from '../../assets/animations/freeMembership.gif';

const BecomePaid = () => {
  return (
    <div
      class='free-membership-banner'
      style={{
        backgroundImage: `url(${freeMembership})`,
        backgroundSize: 'cover',
      }}
    >
      <p className='small-text-1'>All members are welcome to enjoy</p>
      <p class=' big-text'>100% FREE ACCESS</p>
      <p className='small-text-2'>Until 30th June 2023</p>
    </div>
  );
};

export default BecomePaid;
