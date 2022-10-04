import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faHandshakeAngle } from '@fortawesome/free-solid-svg-icons';
import defaultProfile from '../../assets/defaultProfile.png';

Modal.setAppElement('#root');

const Event = ({ eventModalIsOpen, setEventModalIsOpen, currentEvent }) => {
  const [loading, setLoading] = useState(false);

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

  // console.log(currentEvent);

  return (
    <Modal
      isOpen={eventModalIsOpen}
      onRequestClose={() => setEventModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='post-container'>
        <h1>{currentEvent.name}</h1>
        <h2>{currentEvent.location}</h2>
        <h2>{currentEvent.when}</h2>
        <h3>{currentEvent.notes}</h3>
        {currentEvent.invitees &&
          currentEvent.invitees.map((i) => (
            <img
              key={i._id}
              src={i.profileImage ? i.profileImage.url : defaultProfile}
              alt={`${i.name || i.email.split('@')}'s profile picture`}
              className='event-notification-user-img'
            />
          ))}
        <button
          //   onClick={() => acceptInvite(post)}
          type='button'
          className='submit-btn'
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faHandshakeAngle} className='fa' />
          )}
          Accept Invite
        </button>
      </div>
    </Modal>
  );
};

export default Event;
