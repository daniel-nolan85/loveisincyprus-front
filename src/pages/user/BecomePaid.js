import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faCircleQuestion,
  faPaperPlane,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import Mobile from '../../components/user/Mobile';
import Subscription from '../../components/paypal/Subscription';
import SubInfo from '../../components/modals/SubInfo';
import SubQuestions from '../../components/modals/SubQuestions';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const BecomePaid = () => {
  const [payable, setPayable] = useState('10.00');
  const [daysLeft, setDaysLeft] = useState(0);
  const [subInfoModalIsOpen, setSubInfoModalIsOpen] = useState(false);
  const [subQuestionsModalIsOpen, setSubQuestionsModalIsOpen] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    const date1 = Date.now();
    const date2 = new Date(user.membership.expiry);
    const timeDifference = date2.getTime() - date1;
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    setDaysLeft(dayDifference);
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const expiryDate = new Date('2024-01-01');

    if (currentDate < expiryDate) {
      setPayable('5.00');
    } else {
      setPayable('10.00');
    }
  }, []);

  const handleInfo = () => {
    setSubInfoModalIsOpen(true);
  };

  const handleQuestions = () => {
    setSubQuestionsModalIsOpen(true);
  };

  const handleCoupon = async () => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_API}/validate-sub-coupon`,
        { coupon },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        if (res.data.err) {
          setLoading(false);
          toast.error(res.data.err, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          console.log(res.data);
          toast.success('Coupon applied successfully!', {
            position: toast.POSITION.TOP_CENTER,
          });
          updateMembership();
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const updateMembership = async () => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/update-free-membership`,
        { _id: user._id, coupon },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            membership: res.data.membership,
          },
        });
        history.push({
          pathname: '/subscription-successful',
          state: '0.00',
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
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
              <FontAwesomeIcon
                icon={faCircleInfo}
                className='fa'
                onClick={handleInfo}
              />
              <span className='tooltip-text'>Info about memberships</span>
            </div>
            <div className='tooltip'>
              <FontAwesomeIcon
                icon={faCircleQuestion}
                className='fa'
                onClick={handleQuestions}
              />
              <span className='tooltip-text'>Questions about memberships</span>
            </div>
          </div>
          <div className='ad-section' style={{ marginTop: '40px' }}>
            <div className='ad-header'>
              <span className='number'>1</span>
              <h2>Do you have a subscription coupon?</h2>
            </div>
            <input
              className='input-field'
              type='text'
              placeholder='Please enter your coupon code here if you have one'
              onChange={(e) => setCoupon(e.target.value)}
              value={coupon}
            />
            <button
              onClick={handleCoupon}
              type='submit'
              className='submit-btn coupon'
              disabled={!coupon}
            >
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} className='fa' spin />
              ) : (
                <FontAwesomeIcon icon={faPaperPlane} className='fa' />
              )}
              Apply
            </button>
          </div>
          <div className='ad-section'>
            <div className='ad-header'>
              <span className='number'>2</span>
              <h2>How long would you like your paid membership to last?</h2>
            </div>
            <select
              name='payable'
              onChange={(e) => setPayable(e.target.value)}
              value={payable}
            >
              <option
                value={
                  payable === '10.00' ? '10.00' : payable === '5.00' && '5.00'
                }
              >
                One month
              </option>
              <option value='50.00'>Six months</option>
              <option value='90.00'>One year</option>
            </select>
          </div>

          <Subscription payable={payable} daysLeft={daysLeft} />
        </>
      </div>
      <RightSidebar />
      <SubInfo
        subInfoModalIsOpen={subInfoModalIsOpen}
        setSubInfoModalIsOpen={setSubInfoModalIsOpen}
      />
      <SubQuestions
        subQuestionsModalIsOpen={subQuestionsModalIsOpen}
        setSubQuestionsModalIsOpen={setSubQuestionsModalIsOpen}
      />
    </div>
  );
};

export default BecomePaid;
