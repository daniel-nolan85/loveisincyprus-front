import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Mobile from '../../components/user/Mobile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const SubscriptionSuccess = (props) => {
  const [fortnight, setFortnight] = useState('');

  const { membership } = useSelector((state) => state.user);

  useEffect(() => {
    const twoWeeks = new Date(Date.now() + 12096e5);
    setFortnight(moment(twoWeeks).format('MMMM Do YYYY'));
  }, []);

  const payable = props.location.state;

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        <div className='ps-success'>
          <div className='ps-icon-container'>
            <FontAwesomeIcon icon={faCheck} className='fa' />
          </div>
          <h2>Thank You!</h2>
          {payable !== '0.00' ? (
            <>
              <p>Your payment has been approved.</p>
              <div className='ps-col'>
                <p>Cost:</p>
                <h3 className='ps-cost'>€{payable}</h3>
              </div>
              <div className='ps-col'>
                <p>Subscription:</p>
                <h3 className='ps-bought-items'>
                  {payable === '5.00' || payable === '10.00'
                    ? 'One month'
                    : payable === '50.00'
                    ? 'Six months'
                    : payable === '90.00' && 'One year'}
                </h3>
              </div>
              <p>
                You now have full access to all areas of the site until{' '}
                {moment(membership.expiry).format('MMMM Do YYYY')}.
              </p>
              <p>
                You may cancel your subscription by clicking your avatar at the
                top of the page and selecting 'Cancel Subscription' to receive a
                full refund any time between now and {fortnight}.
              </p>
            </>
          ) : (
            <>
              <p>Your subscription has been approved.</p>
              <p>
                You now have full access to all areas of the site until{' '}
                {moment(membership.expiry).format('MMMM Do YYYY')}, courtesy of{' '}
                {membership.free}
              </p>
            </>
          )}
          <p className='ps-comprobe'>
            This information has been sent to your email
          </p>
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default SubscriptionSuccess;
