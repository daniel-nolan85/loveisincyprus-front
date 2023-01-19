import React from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faQuestion,
  faThumbsDown,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const EventResponse = ({
  eventResponseModalIsOpen,
  setEventResponseModalIsOpen,
  post,
  fetchEvent,
}) => {
  const { user } = useSelector((state) => ({ ...state }));

  const acceptInvite = async (post) => {
    toast.success(`Great! We can't wait to see you there!`, {
      position: toast.POSITION.TOP_CENTER,
    });
    setEventResponseModalIsOpen(false);
    await axios
      .post(
        `${process.env.REACT_APP_API}/accept-event-invite`,
        { user, post },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        fetchEvent();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const maybe = async (post) => {
    toast.success(`Ok, we'll keep our fingers crossed!`, {
      position: toast.POSITION.TOP_CENTER,
    });
    setEventResponseModalIsOpen(false);
    await axios
      .post(
        `${process.env.REACT_APP_API}/maybe-event-invite`,
        { user, post },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        fetchEvent();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const declineInvite = async (post) => {
    toast.success(`Too bad! We hope to see you at the next one!`, {
      position: toast.POSITION.TOP_CENTER,
    });
    setEventResponseModalIsOpen(false);
    await axios
      .post(
        `${process.env.REACT_APP_API}/decline-event-invite`,
        { user, post },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        fetchEvent();
      })
      .catch((err) => {
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
      isOpen={eventResponseModalIsOpen}
      onRequestClose={() => setEventResponseModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='post-container'>
        <div className='inv-response'>
          <button
            onClick={() => acceptInvite(post)}
            type='button'
            className='submit-btn'
            disabled={
              post.accepted &&
              post.accepted.length > 0 &&
              post.accepted.some((a) => a._id === user._id)
            }
          >
            <FontAwesomeIcon icon={faThumbsUp} className='fa' />
            Count me in!
          </button>
        </div>
        <div className='inv-response'>
          <button
            onClick={() => maybe(post)}
            type='button'
            className='submit-btn maybe'
            disabled={
              post.maybe &&
              post.maybe.length > 0 &&
              post.maybe.some((a) => a._id === user._id)
            }
          >
            <FontAwesomeIcon icon={faQuestion} className='fa' />
            Not sure yet
          </button>
        </div>
        <div className='inv-response'>
          <button
            onClick={() => declineInvite(post)}
            type='button'
            className='submit-btn decline'
            disabled={
              post.declined &&
              post.declined.length > 0 &&
              post.declined.some((a) => a._id === user._id)
            }
          >
            <FontAwesomeIcon icon={faThumbsDown} className='fa' />
            Can't make it
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EventResponse;
