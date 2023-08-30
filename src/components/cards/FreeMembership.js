import React from 'react';
import freeMembership from '../../assets/animations/freeMembership.gif';

const FreeMembership = () => {
  const currentDate = new Date();
  const startDate = new Date('2023-09-01');
  const expiryDate = new Date('2024-01-01');

  let content = null;

  if (currentDate < startDate) {
    content = (
      <div
        className='free-membership-banner'
        style={{
          backgroundImage: `url(${freeMembership})`,
          backgroundSize: 'cover',
        }}
      >
        <p className='small-text-1'>All members are welcome to enjoy</p>
        <p className='big-text'>100% FREE ACCESS</p>
        <p className='small-text-2'>Until 31st August 2023</p>
      </div>
    );
  } else if (currentDate < expiryDate) {
    content = (
      <div
        className='free-membership-banner'
        style={{
          backgroundImage: `url(${freeMembership})`,
          backgroundSize: 'cover',
        }}
      >
        <p className='small-text-1'>All members are welcome to enjoy</p>
        <p className='big-text'>50% FREE ACCESS</p>
        <p className='small-text-2'>Until 31st December 2023</p>
      </div>
    );
  }

  return <>{content}</>;
};

export default FreeMembership;
