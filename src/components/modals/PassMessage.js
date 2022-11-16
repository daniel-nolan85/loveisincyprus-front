import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { removePoints } from '../../functions/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const PassMessage = ({
  passMessageModalIsOpen,
  setPassMessageModalIsOpen,
  messageToPass,
  fetchMessages,
  fetchReportedContent,
}) => {
  const [passing, setPassing] = useState(false);

  let { _id, token } = useSelector((state) => state.user);

  const approveMessage = async (message) => {
    setPassing(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/approve-message/${message._id}`,
        { _id, message },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        toast.success('You have approved this message for display', {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchMessages();
        fetchReportedContent();
        setPassMessageModalIsOpen(false);
        setPassing(false);
      })
      .catch((err) => {
        setPassing(false);
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

  const { content, sender } = messageToPass;

  return (
    <Modal
      isOpen={passMessageModalIsOpen}
      onRequestClose={() => setPassMessageModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to approve this message?</h1>
        <br />
        <p>{content}</p>
        {/* <br />
        {image && (
          <div className='match-images'>
            <img
              src={image.url}
              alt={`${postedBy.username || postedBy.name}'s post`}
            />
          </div>
        )} */}
        <br />
        <button
          className='submit-btn'
          onClick={() => approveMessage(messageToPass)}
        >
          {passing ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, approve'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setPassMessageModalIsOpen(false)}
          disabled={passing}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default PassMessage;
