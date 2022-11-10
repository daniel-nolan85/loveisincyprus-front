import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import defaultImage from '../../assets/defaultProfile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const UserDeleteAdmin = ({
  userDeleteModalIsOpen,
  setUserDeleteModalIsOpen,
  userToDelete,
  fetchUsers,
  fetchPosts,
  fetchComments,
  fetchReportedContent,
}) => {
  const [deleting, setDeleting] = useState(false);

  let { _id, token } = useSelector((state) => state.user);

  const deleteUser = async (u) => {
    setDeleting(true);
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
        fetchUsers && fetchUsers();
        fetchPosts && fetchPosts();
        fetchComments && fetchComments();
        fetchReportedContent && fetchReportedContent();
        setDeleting(false);
      })
      .catch((err) => {
        setDeleting(false);

        console.log(err);
      });
  };

  const { name, profileImage, username } = userToDelete;

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
      isOpen={userDeleteModalIsOpen}
      onRequestClose={() => setUserDeleteModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to delete this user?</h1>
        <br />
        <p>{username || name}</p>
        <br />

        <div className='match-images'>
          <img
            src={profileImage ? profileImage.url : defaultImage}
            alt={`${username || name}'s post`}
          />
        </div>
        <p>All trace of this user will be permanently deleted</p>
        <br />
        <button className='submit-btn' onClick={() => deleteUser(userToDelete)}>
          {deleting ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, delete'
          )}
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
