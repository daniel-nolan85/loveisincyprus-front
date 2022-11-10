import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import io from 'socket.io-client';
import { ChatState } from '../../context/ChatProvider';

let socket;

Modal.setAppElement('#root');

const PointsFive = ({
  pointsFiveModalIsOpen,
  setPointsFiveModalIsOpen,
  points,
  fetchUserPointsTotal,
}) => {
  const { _id, token } = useSelector((state) => state.user);

  const { setSocketConnected } = ChatState();

  useEffect(() => {
    socket = io(
      process.env.REACT_APP_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true }
    );
  }, []);

  const fivePercent = async (number, reason, couponName) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/spent-points`,
        { number, reason, _id, couponName },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        socket.emit('new message', res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
    },s
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
        <button
          className='submit-btn'
          onClick={() => fivePercent(150, 'five', 'NEWCOUPON5')}
        >
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
