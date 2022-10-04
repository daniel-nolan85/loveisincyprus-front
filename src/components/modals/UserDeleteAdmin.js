import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import defaultImage from '../../assets/defaultProfile.png';

Modal.setAppElement('#root');

const UserDeleteAdmin = ({
  userDeleteModalIsOpen,
  setUserDeleteModalIsOpen,
  userToDelete,
  fetchUsers,
}) => {
  let { _id, token } = useSelector((state) => state.user);

  const deleteUser = async (u) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/admin/delete-user/${u._id}`,
        { u, _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.error('User deleted', {
          position: toast.POSITION.TOP_CENTER,
        });
        setUserDeleteModalIsOpen(false);
        fetchUsers();
        // setUploading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { name, email, profileImage } = userToDelete;

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
      isOpen={userDeleteModalIsOpen}
      onRequestClose={() => setUserDeleteModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to delete this user?</h1>
        <br />
        {/* <p>{name || email.split('@')[0]}</p> */}
        <br />

        <div className='match-images'>
          <img
            src={profileImage ? profileImage.url : defaultImage}
            // alt={`${name || email.split('@')[0]}'s post`}
          />
        </div>
        <p>All trace of this user will be permanently deleted</p>
        <br />
        <button className='submit-btn' onClick={() => deleteUser(userToDelete)}>
          Yes, delete
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setUserDeleteModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default UserDeleteAdmin;
