import React from 'react';
import { Link } from 'react-router-dom';
import allAccess from '../../assets/allAccess.jpg';

const BecomePaid = () => {
  return (
    <Link to='/become-paid-member'>
      <div className='become-paid-banner'>
        <div className='become-paid-header'>
          <div className='become-paid-line'>
            <span>Become Paid Member</span>
          </div>
        </div>

        <div className='become-paid-box'>
          <div className='become-paid-content'>
            <img src={allAccess} alt='' />
            <div className='become-paid-text1'>Access all features</div>
            <div className='become-paid-text2'>Click to learn more</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BecomePaid;
