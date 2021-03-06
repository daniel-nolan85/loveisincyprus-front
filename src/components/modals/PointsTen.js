import React from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { spentPoints } from '../../functions/user';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const PointsTen = ({
  pointsTenModalIsOpen,
  setPointsTenModalIsOpen,
  points,
  fetchUserPointsTotal,
}) => {
  const { user } = useSelector((state) => ({ ...state }));

  const tenPercent = async () => {
    spentPoints(250, 'ten', user.token, user, 'NEWCOUPON10');
    toast.success(
      'Congratulations! Check your inbox, you will soon receive a new message containing your coupon code.',
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
    fetchUserPointsTotal();
    setPointsTenModalIsOpen(false);
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
      isOpen={pointsTenModalIsOpen}
      onRequestClose={() => setPointsTenModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='points-info'>
        <h2>
          Do you want to spend 250 points to gain a 10% discount in our online
          store?
        </h2>
        <br />
        <p>
          You will receive a coupon that you can use on an online purchase which
          grants you a 10% discount from your total bill.
        </p>
        <p>
          Doing so will leave you with a total of {points - 250} points
          remaining.
        </p>
        <br />
        <button className='submit-btn' onClick={tenPercent}>
          Yes, I'd like to receive a 10% discount
        </button>
        <button
          className='submit-btn cancel'
          onClick={() => setPointsTenModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default PointsTen;
