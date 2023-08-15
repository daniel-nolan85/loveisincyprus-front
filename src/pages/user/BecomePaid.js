import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import Mobile from '../../components/user/Mobile';
import Subscription from '../../components/paypal/Subscription';
import SubInfo from '../../components/modals/SubInfo';
import SubQuestions from '../../components/modals/SubQuestions';

const BecomePaid = () => {
  const [payable, setPayable] = useState('10.00');
  const [daysLeft, setDaysLeft] = useState(0);
  const [subInfoModalIsOpen, setSubInfoModalIsOpen] = useState(false);
  const [subQuestionsModalIsOpen, setSubQuestionsModalIsOpen] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const date1 = Date.now();
    const date2 = new Date(user.membership.expiry);
    const timeDifference = date2.getTime() - date1;
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    setDaysLeft(dayDifference);
  }, []);

  const handleInfo = () => {
    setSubInfoModalIsOpen(true);
  };

  const handleQuestions = () => {
    setSubQuestionsModalIsOpen(true);
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
