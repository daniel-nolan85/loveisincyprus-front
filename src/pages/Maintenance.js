import React from 'react';
import maintenance from '../assets/maintenance.jpg';

const Maintenance = () => {
  return (
    <div className='maintenance-page'>
      <img src={maintenance} alt='maintenance image' />
      <div className='maintenance-text'>
        <h1 className='center'>Our site is getting a little tune up</h1>
        <p>
          We apologize for the inconvenience, but we're performing an upgrade to{' '}
          <span>Love Is In Cyprus</span>.
        </p>
        <p>We'll be back very soon.</p>
        <br />
        <p>
          In the meanwhile, you can contact us at{' '}
          <span>customercare@loveisincyprus.com</span>.
        </p>
      </div>
    </div>
  );
};

export default Maintenance;
