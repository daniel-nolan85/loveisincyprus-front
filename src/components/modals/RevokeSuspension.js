import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import defaultImage from '../../assets/defaultProfile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const RevokeSuspension = ({
  userRevokeModalIsOpen,
  setUserRevokeModalIsOpen,
  userToRevoke,
  fetchUsers,
}) => {
  const [revoking, setRevoking] = useState(false);

  let { token } = useSelector((state) => state.user);

  const revokeUser = async (u) => {
    setRevoking(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/admin/revoke-suspension/${u._id}`,
        { _id: u._id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        toast.error('User revoked', {
          position: toast.POSITION.TOP_CENTER,
        });
        setUserRevokeModalIsOpen(false);
        fetchUsers && fetchUsers();
        setRevoking(false);
      })
      .catch((err) => {
        setRevoking(false);
        console.log(err);
      });
  };

  const { name, profileImage, username } = userToRevoke;

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
      isOpen={userRevokeModalIsOpen}
      onRequestClose={() => setUserRevokeModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match suspend-user'>
        <h1>Are you sure you want to revoke this users suspension?</h1>
        <br />
        <p>{username || name}</p>
        <br />

        <div className='match-images'>
          <img
            src={profileImage ? profileImage.url : defaultImage}
            alt={`${username || name}'s post`}
          />
        </div>
        <button className='submit-btn' onClick={() => revokeUser(userToRevoke)}>
          {revoking ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, revoke'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setUserRevokeModalIsOpen(false)}
          disabled={revoking}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default RevokeSuspension;
