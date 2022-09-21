import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCashRegister,
  faChartLine,
  faCircleInfo,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import PaymentForm from '../../components/forms/PaymentForm';
import { toast } from 'react-toastify';
import { createMembershipPayment } from '../../functions/cardinity';

const BecomePaid = ({ history }) => {
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [userAgent, setUserAgent] = useState('');
  const [payable, setPayable] = useState('10.00');
  const [daysLeft, setDaysLeft] = useState(0);

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  useEffect(() => {
    setUserAgent(window.navigator.userAgent);
    const date1 = Date.now();
    const date2 = new Date(user.membership.expiry);
    console.log(date2.getTime());
    const timeDifference = date2.getTime() - date1;
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    setDaysLeft(dayDifference);
  }, []);

  const handleSubmit = async (values) => {
    setProcessing(true);
    console.log('payable => ', payable);
    createMembershipPayment(values, payable, userAgent, user, user.token).then(
      (res) => {
        console.log('create payment', res.data);
        if (res.data.errors) {
          toast.error(res.data.errors[0].message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setProcessing(false);
        }
        if (res.data._id === user._id) {
          toast.success(
            `Payment successful. Your paid membership will last for ${
              payable === '10.00'
                ? 'one month'
                : payable === '50.00'
                ? 'six months'
                : payable === '90.00' && 'one year'
            }`,
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
          setProcessing(false);
          setSucceeded(true);
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              ...user,
              membership: res.data.membership,
            },
          });
          history.push('/user/dashboard');
        }
        if (res.data.status === 'pending') {
          toast.warning(`Payment pending.`, {
            position: toast.POSITION.TOP_CENTER,
          });
          setProcessing(false);
        }
        if (res.data.status === 'declined') {
          toast.error(`Payment declined.`, {
            position: toast.POSITION.TOP_CENTER,
          });
          setProcessing(false);
        }
      }
    );
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        {user.membership.paid ? (
          <h1 className='center'>
            You currently have{' '}
            {daysLeft === 1 ? `${daysLeft} day` : `${daysLeft} days`} of your
            paid membership remaining
          </h1>
        ) : (
          <h1 className='center'>
            Would you like to become a paid member and receive full access to
            the site?
          </h1>
        )}
        <>
          <div className='points-icons'>
            <div className='tooltip'>
              <FontAwesomeIcon
                icon={faCircleInfo}
                className='fa'
                // onClick={handleInfo}
              />
              <span className='tooltip-text'>Info about memberships</span>
            </div>
            <div className='tooltip'>
              <FontAwesomeIcon
                icon={faCircleQuestion}
                className='fa'
                // onClick={handleQuestions}
              />
              <span className='tooltip-text'>Questions about memberships</span>
            </div>
          </div>
          <h2>How long would you like your paid membership to last?</h2>
          <select
            name='payable'
            onChange={(e) => setPayable(e.target.value)}
            value={payable}
          >
            <option value='10.00'>One month</option>
            <option value='50.00'>Six months</option>
            <option value='90.00'>One year</option>
          </select>
          <PaymentForm
            handleSubmit={handleSubmit}
            processing={processing}
            succeeded={succeeded}
          />
        </>
      </div>
      <RightSidebar />
    </div>
  );
};

export default BecomePaid;
