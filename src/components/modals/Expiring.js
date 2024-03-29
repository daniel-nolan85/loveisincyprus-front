import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

Modal.setAppElement('#root');

const Expiring = ({ expiringModalIsOpen, setExpiringModalIsOpen }) => {
  const [daysLeft, setDaysLeft] = useState(0);

  let { token, membership } = useSelector((state) => state.user) || {};

  const history = useHistory();

  useEffect(() => {
    membership && token && getDaysLeft();
  }, [membership && token]);

  const getDaysLeft = () => {
    const date1 = Date.now();
    const date2 = new Date(membership.expiry);
    const timeDifference = date2.getTime() - date1;
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    setDaysLeft(dayDifference);
  };

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
    },
    overlay: {
      position: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0, .8)',
      zIndex: '1000',
      overflowY: 'auto',
    },
  };

  return (
    <Modal
      isOpen={expiringModalIsOpen}
      onRequestClose={() => setExpiringModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>
          Your subscription is coming to an end{' '}
          {daysLeft === 1 ? `tomorrow` : `in ${daysLeft} days`}
        </h1>
        <br />
        <p>
          If you do not renew you will lose access to a number of great features
          such as live chat and swipe to match.
        </p>
        <br />
        <p>Would you like to renew your subscription now?</p>
        <br />
        <button
          type='button'
          className='submit-btn'
          onClick={() => {
            history.push('/become-paid-member');
            setExpiringModalIsOpen(false);
          }}
        >
          Yes, renew now
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setExpiringModalIsOpen(false)}
        >
          Maybe later
        </button>
      </div>
    </Modal>
  );
};

export default Expiring;
