import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

Modal.setAppElement('#root');

const RemoveUserFromAdmin = ({
  removeFromAdminModalIsOpen,
  setRemoveFromAdminModalIsOpen,
  userToRemoveFromAdmin,
  fetchUsers,
}) => {
  let { token } = useSelector((state) => state.user);

  const removeFromAdmin = async (u) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/admin/remove-user-from-admin`,
        { u },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        toast.success(`${u.name || u.email.split('@')[0]} removed from admin`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setRemoveFromAdminModalIsOpen(false);
        fetchUsers();
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
  };

  const { name, email, profileImage } = userToRemoveFromAdmin;

  return (
    <Modal
      isOpen={removeFromAdminModalIsOpen}
      onRequestClose={() => setRemoveFromAdminModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to remove this user from admin?</h1>
        <br />
        {profileImage && (
          <div className='match-images'>
            <img
              src={profileImage.url}
              alt={`${name || email.split('@')[0]}'s post`}
            />
          </div>
        )}
        <br />
        <button
          className='submit-btn'
          onClick={() => removeFromAdmin(userToRemoveFromAdmin)}
        >
          Yes, remove this user
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setRemoveFromAdminModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default RemoveUserFromAdmin;
