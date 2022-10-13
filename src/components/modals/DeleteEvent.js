import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import defaultEvent from '../../assets/defaultEvent.jpg';

Modal.setAppElement('#root');

const DeleteEvent = ({
  deleteEventModalIsOpen,
  setDeleteEventModalIsOpen,
  currentEvent,
  fetchUserEvents,
  fetchPrevEvents,
  fetchComingEvents,
}) => {
  const { user } = useSelector((state) => ({ ...state }));
  const { _id } = user;

  const dispatch = useDispatch();

  const removeEvent = async (event) => {
    console.log(event);
    await axios
      .put(
        `${process.env.REACT_APP_API}/remove-user-event`,
        { _id, event },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.error('This event has been removed', {
          position: toast.POSITION.TOP_CENTER,
        });
        setDeleteEventModalIsOpen(false);
        fetchUserEvents && fetchUserEvents();
        fetchPrevEvents && fetchPrevEvents();
        fetchComingEvents && fetchComingEvents();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            events: res.data.events,
          },
        });
      })
      .catch((err) => console.log(err));
  };

  const { name, mainImage } = currentEvent;

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
      isOpen={deleteEventModalIsOpen}
      onRequestClose={() => setDeleteEventModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to remove this event?</h1>
        <br />
        <h2>{name}</h2>
        <br />
        <div className='match-images'>
          {mainImage ? (
            <img src={mainImage.url} alt='Event image' />
          ) : (
            <img src={defaultEvent} alt='Event image' />
          )}
        </div>
        <br />
        <button
          className='submit-btn'
          onClick={(e) => {
            e.stopPropagation();
            removeEvent(currentEvent);
          }}
        >
          Yes, delete
        </button>
        <button
          className='submit-btn trash'
          onClick={(e) => {
            e.stopPropagation();
            setDeleteEventModalIsOpen(false);
          }}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteEvent;
