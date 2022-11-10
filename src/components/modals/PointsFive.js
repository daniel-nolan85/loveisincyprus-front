import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import io from 'socket.io-client';
import { ChatState } from '../../context/ChatProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

let socket;

Modal.setAppElement('#root');

const PointsFive = ({
  pointsFiveModalIsOpen,
  setPointsFiveModalIsOpen,
  points,
  fetchUserPointsTotal,
  fetchUserPointsSpentData,
  setSpendPointsModalIsOpen,
}) => {
  const [randomCode, setRandomCode] = useState('');
  const [loading, setLoading] = useState(false);

  const { _id, token } = useSelector((state) => state.user);

  const { setSocketConnected } = ChatState();

  useEffect(() => {
    socket = io(
      process.env.REACT_APP_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true }
    );
  }, []);

  useEffect(() => {
    function makeid(length) {
      var result = '';
      var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
    setRandomCode(makeid(8));
  }, []);

  const fivePercent = async (number, reason, couponName) => {
    setLoading(true);
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
        toast.success(
          'Congratulations! Check your inbox, you will soon receive a new message containing your coupon code.',
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        fetchUserPointsTotal();
        fetchUserPointsSpentData();
        setPointsFiveModalIsOpen(false);
        setSpendPointsModalIsOpen(false);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
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
          onClick={() => fivePercent(150, 'five', randomCode)}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            "Yes, I'd like to receive a 5% discount"
          )}
        </button>
        <button
          className='submit-btn cancel'
          onClick={() => setPointsFiveModalIsOpen(false)}
          disabled={loading}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default PointsFive;
