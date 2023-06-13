import React, { useState, useEffect, useRef } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import PaymentForm from '../../components/forms/PaymentForm';
import { toast } from 'react-toastify';
import { createMembershipPayment } from '../../functions/cardinity';
import Mobile from '../../components/user/Mobile';
import CardinityPending from '../../components/modals/CardinityPending';

const BecomePaid = ({ history }) => {
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [userAgent, setUserAgent] = useState('');
  const [payable, setPayable] = useState('10.00');
  const [daysLeft, setDaysLeft] = useState(0);
  const [userBankDetails, setUserBankDetails] = useState({});
  const [cardinityPendingModalIsOpen, setCardinityPendingModalIsOpen] =
    useState(false);
  const [pendingFormData, setPendingFormData] = useState('');

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  const isFirstRun = useRef(true);

  useEffect(() => {
    setUserAgent(window.navigator.userAgent);
    const date1 = Date.now();
    const date2 = new Date(user.membership.expiry);
    const timeDifference = date2.getTime() - date1;
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    setDaysLeft(dayDifference);
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      history.push({
        pathname: '/subscription-successful',
        state: { userBankDetails, payable },
      });
    }
  }, [userBankDetails]);

  const handleSubmit = async (values) => {
    setProcessing(true);
    createMembershipPayment(
      values,
      payable,
      userAgent,
      user,
      user.token,
      daysLeft
    ).then((res) => {
      if ((res.data.response && res.data.response.errors) || res.data.errors) {
        toast.error(res.data.response.errors[0].message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setProcessing(false);
      }
      if (res.data.response && res.data.response.status === 'approved') {
        toast.success(
          `Payment successful! Your paid membership will last for ${
            payable === '10.00'
              ? 'one month.'
              : payable === '50.00'
              ? 'six months.'
              : payable === '90.00' && 'one year.'
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
            membership: res.data.amendMembership.membership,
            bankDetails: res.data.amendMembership.bankDetails,
          },
        });
        const result = res.data.amendMembership.bankDetails.filter((obj) => {
          return (
            obj.cardBrand === res.data.response.payment_instrument.card_brand &&
            obj.cardHolder === res.data.response.payment_instrument.holder &&
            obj.cardNumber.slice(-4) ===
              res.data.response.payment_instrument.pan &&
            parseInt(obj.expiry.slice(0, 2)) ===
              res.data.response.payment_instrument.exp_month &&
            parseInt(obj.expiry.slice(-4)) ===
              res.data.response.payment_instrument.exp_year
          );
        });
        setUserBankDetails(result);
      } else if (res.data.status === 'pending') {
        setCardinityPendingModalIsOpen(true);
        setPendingFormData(res.data);
        toast.warning(`Payment pending.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      } else if (res.data.status === 'declined') {
        toast.error(`Payment declined.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setProcessing(false);
      } else if (res.data.status === 401) {
        toast.error(res.data.detail, {
          position: toast.POSITION.TOP_CENTER,
        });
        setProcessing(false);
      }
    });
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        {user.membership.paid ? (
          <>
            <h1 className='center'>
              You currently have{' '}
              {daysLeft === 1 ? `${daysLeft} day` : `${daysLeft} days`} of your
              paid membership remaining
            </h1>
            <h2 className='center'>
              These will be rolled over to your renewed subscription.
            </h2>
            <br />
          </>
        ) : (
          <h1 className='center'>
            Would you like to become a paid member and receive full access to
            the site?
          </h1>
        )}
        <>
          <div className='points-icons'>
            <div className='tooltip'>
              <FontAwesomeIcon icon={faCircleInfo} className='fa' />
              <span className='tooltip-text'>Info about memberships</span>
            </div>
            <div className='tooltip'>
              <FontAwesomeIcon icon={faCircleQuestion} className='fa' />
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
      <CardinityPending
        cardinityPendingModalIsOpen={cardinityPendingModalIsOpen}
        pendingFormData={pendingFormData}
      />
    </div>
  );
};

export default BecomePaid;
