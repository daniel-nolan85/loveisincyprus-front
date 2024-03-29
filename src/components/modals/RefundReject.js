import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const RefundReject = ({
  rejectRefundModalIsOpen,
  setRejectRefundModalIsOpen,
  currentRefund,
  fetchRefunds,
}) => {
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState('');

  let { token } = useSelector((state) => state.user);

  const rejectRefund = async (refund) => {
    setLoading(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/reject-refund`,
        { refund, reason },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        toast.error(
          `You have rejected this refund request. A confirmation email has been sent to the user.`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        fetchRefunds();
        setRejectRefundModalIsOpen(false);
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

  const { refundImages, orderedBy } = currentRefund;

  return (
    <Modal
      isOpen={rejectRefundModalIsOpen}
      onRequestClose={() => setRejectRefundModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to reject this refund request?</h1>
        <br />
        {refundImages && refundImages.length > 0 && (
          <div className='match-images'>
            <img
              src={refundImages[0].url}
              alt={`${orderedBy.username || orderedBy.name}'s post`}
            />
          </div>
        )}
        <br />
        <h2>
          Would you like to give the user a reason for rejecting their request?
        </h2>
        <input
          type='text'
          className='input-field'
          placeholder='Give a reason'
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button
          className='submit-btn'
          onClick={() => rejectRefund(currentRefund)}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faThumbsDown} className='fa' />
          )}
          Yes, reject
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setRejectRefundModalIsOpen(false)}
          disabled={loading}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default RefundReject;
