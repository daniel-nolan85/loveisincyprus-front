import React from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const EventCancel = ({
  eventCancelModalIsOpen,
  setEventCancelModalIsOpen,
  eventToCancel,
  cancelEvent,
  loading,
  setLoading,
  loadEvents,
}) => {
  let { user } = useSelector((state) => ({ ...state }));

  const abandonEvent = async (event) => {
    setLoading(true);
    cancelEvent(event._id, user.token)
      .then((res) => {
        setLoading(false);
        toast.error(`${res.data.name} has been cancelled`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setEventCancelModalIsOpen(false);
        loadEvents();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) {
          toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
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
      zIndex: '1000',
    },
  };

  const { name } = eventToCancel;

  return (
    <Modal
      isOpen={eventCancelModalIsOpen}
      onRequestClose={() => setEventCancelModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to cancel {name}?</h1>
        <br />
        <button
          className='submit-btn'
          onClick={() => abandonEvent(eventToCancel)}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, cancel'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setEventCancelModalIsOpen(false)}
        >
          No, keep this event
        </button>
      </div>
    </Modal>
  );
};

export default EventCancel;
