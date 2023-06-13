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

  const { name, uploadedPhotos } = currentEvent;

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
          {uploadedPhotos && uploadedPhotos.length > 0 ? (
            <img src={uploadedPhotos[0].url} alt='Event image' />
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
