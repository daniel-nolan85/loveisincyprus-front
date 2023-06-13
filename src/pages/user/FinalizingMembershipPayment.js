import React, { useState, useEffect, useRef } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import Mobile from '../../components/user/Mobile';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';

const FinalizingMembershipPayment = () => {
  const [status, setStatus] = useState('');
  const [response, setResponse] = useState({});
  const [amendMembership, setAmendMembership] = useState({});
  const [ok, setOk] = useState(false);
  const [userBankDetails, setUserBankDetails] = useState({});
  const [payable, setPayable] = useState('10.00');

  const { user } = useSelector((state) => ({ ...state }));

  const isFirstRun = useRef(true);

  const dispatch = useDispatch();

  let history = useHistory();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const getStatus = searchParams.get('status');
    const getResponse = searchParams.get('response');
    const getAmendMembership = searchParams.get('amendMembership');

    setStatus(getStatus);
    setResponse(JSON.parse(decodeURIComponent(getResponse)));
    setAmendMembership(JSON.parse(decodeURIComponent(getAmendMembership)));
  }, []);

  const { amount } = response;

  useEffect(() => {
    if (status && status === 'approved') {
      setOk(true);
      setPayable(response.amount);
    }
  }, [status, response]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      if (ok) {
        toast.success(
          `Payment successful! Your paid membership will last for ${
            amount === '10.00'
              ? 'one month.'
              : amount === '50.00'
              ? 'six months.'
              : amount === '90.00' && 'one year.'
          }`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            membership: amendMembership.membership,
            bankDetails: amendMembership.bankDetails,
          },
        });
        const result = amendMembership.bankDetails.filter((obj) => {
          return (
            obj.cardBrand === response.payment_instrument.card_brand &&
            obj.cardHolder === response.payment_instrument.holder &&
            obj.cardNumber.slice(-4) === response.payment_instrument.pan &&
            parseInt(obj.expiry.slice(0, 2)) ===
              response.payment_instrument.exp_month &&
            parseInt(obj.expiry.slice(-4)) ===
              response.payment_instrument.exp_year
          );
        });
        setUserBankDetails(result);
      }
    }
  }, [ok]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else if (Object.keys(userBankDetails).length !== 0) {
      history.push({
        pathname: '/subscription-successful',
        state: { userBankDetails, payable },
      });
    }
  }, [userBankDetails]);

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        <div className='spinner'>
          <FontAwesomeIcon icon={faSpinner} className='fa' spin />
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default FinalizingMembershipPayment;
