import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const RemoveUserFromEventsEligible = ({
  removeFromEventsEligibleModalIsOpen,
  setRemoveFromEventsEligibleModalIsOpen,
  userToRemoveFromEventsEligible,
  fetchUsers,
}) => {
  const [loading, setLoading] = useState(false);

  let { token } = useSelector((state) => state.user);

  const removeFromEventsEligible = async (u) => {
    setLoading(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/admin/remove-user-from-events-eligible`,
        { u },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        toast.success(
          `${u.username || u.name}'s eligibility to receive
          event invites has been removed`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        setRemoveFromEventsEligibleModalIsOpen(false);
        fetchUsers();
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

  const { name, profileImage, username } = userToRemoveFromEventsEligible;

  return (
    <Modal
      isOpen={removeFromEventsEligibleModalIsOpen}
      onRequestClose={() => setRemoveFromEventsEligibleModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>
          Are you sure you want to remove this users eligibility to receive
          event invites?
        </h1>
        <br />
        {profileImage && (
          <div className='match-images'>
            <img src={profileImage.url} alt={`${username || name}'s post`} />
          </div>
        )}
        <br />
        <button
          className='submit-btn'
          onClick={() =>
            removeFromEventsEligible(userToRemoveFromEventsEligible)
          }
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, remove this user'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setRemoveFromEventsEligibleModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default RemoveUserFromEventsEligible;
