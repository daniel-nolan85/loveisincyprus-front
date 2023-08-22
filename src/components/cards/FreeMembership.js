import React from 'react';
import freeMembership from '../../assets/animations/freeMembership.gif';

const FreeMembership = () => {
  return (
    <div
      className='free-membership-banner'
      style={{
        backgroundImage: `url(${freeMembership})`,
        backgroundSize: 'cover',
      }}
    >
      <p className='small-text-1'>All members are welcome to enjoy</p>
      <p className=' big-text'>100% FREE ACCESS</p>
      <p className='small-text-2'>Until 31st August 2023</p>
    </div>
  );
};

export default FreeMembership;
