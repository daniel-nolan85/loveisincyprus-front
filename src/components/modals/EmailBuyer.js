import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import PostUpload from '../forms/PostUpload';

Modal.setAppElement('#root');

const EmailBuyer = ({
  emailBuyerModalIsOpen,
  setEmailBuyerModalIsOpen,
  currentRefund,
}) => {
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [refundImages, setRefundImages] = useState([]);

  let { token } = useSelector((state) => state.user);

  const sendMessage = async (refund) => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_API}/email-buyer`,
        { orderedBy, subject, message, refundImages },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setSubject('');
        setMessage('');
        setRefundImages([]);
        toast.success(`Your message has been sent.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setEmailBuyerModalIsOpen(false);
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

  const { orderedBy } = currentRefund;

  return (
    <Modal
      isOpen={emailBuyerModalIsOpen}
      onRequestClose={() => setEmailBuyerModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h2>Would you like to email this user regarding their refund?</h2>
        <input
          type='text'
          className='input-field'
          placeholder='Subject'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          className='input-field'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Write a message...'
        />
        <div className='ref-req-footer'>
          <PostUpload
            postImages={refundImages}
            setPostImages={setRefundImages}
          />
        </div>
        <button
          className='submit-btn'
          onClick={() => sendMessage(currentRefund)}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} className='fa' />
          )}
          Send
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setEmailBuyerModalIsOpen(false)}
          disabled={loading}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default EmailBuyer;
