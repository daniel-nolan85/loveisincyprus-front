import React from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { spentPoints } from '../../functions/user';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const PointsFive = ({
  pointsFiveModalIsOpen,
  setPointsFiveModalIsOpen,
  points,
  fetchUserPointsTotal,
}) => {
  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  const fivePercent = () => {
    spentPoints(150, 'five', user.token, user, 'NEWCOUPON5');
    toast.success(
      'Congratulations! Check your inbox, you will soon receive a new message containing your coupon code.',
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
    fetchUserPointsTotal();
    setPointsFiveModalIsOpen(false);
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
  };

  return (
    <Modal
      isOpen={pointsFiveModalIsOpen}
      onRequestClose={() => setPointsFiveModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='points-info'>
        <h2>
          Do you want to spend 150 points to gain a 5% discount in our online
          store?
        </h2>
        <br />
        <p>
          You will receive a coupon that you can use on an online purchase which
          grants you a 5% discount from your total bill.
        </p>
        <p>
          Doing so will leave you with a total of {points - 150} points
          remaining.
        </p>
        <br />
        <button className='submit-btn' onClick={fivePercent}>
          Yes, I'd like to receive a 5% discount
        </button>
        <button
          className='submit-btn cancel'
          onClick={() => setPointsFiveModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default PointsFive;
