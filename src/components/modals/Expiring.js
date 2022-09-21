import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

Modal.setAppElement('#root');

const Expiring = ({ expiringModalIsOpen, setExpiringModalIsOpen }) => {
  const [daysLeft, setDaysLeft] = useState(0);

  let { user } = useSelector((state) => ({ ...state }));

  const history = useHistory();

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      const date1 = Date.now();
      const date2 = new Date(user.membership.expiry);
      console.log(date2.getTime());
      const timeDifference = date2.getTime() - date1;
      const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      setDaysLeft(dayDifference);
    }
  }, [user && user.token]);

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
      zIndex: '1000',
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
          Your paid membership is coming to an end{' '}
          {daysLeft === 1 ? `tomorrow` : `in ${daysLeft} days`}
        </h1>
        <br />
        <p>Would you like to renew your paid membership now?</p>
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
