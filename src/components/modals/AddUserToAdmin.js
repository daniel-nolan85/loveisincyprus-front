import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

Modal.setAppElement('#root');

const AddUserToAdmin = ({
  addToAdminModalIsOpen,
  setAddToAdminModalIsOpen,
  userToAddToAdmin,
  fetchUsers,
}) => {
  let { token } = useSelector((state) => state.user);

  const addToAdmin = async (u) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/admin/add-user-to-admin`,
        { u },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(`${u.username || u.name} added to admin`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setAddToAdminModalIsOpen(false);
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

  const { name, username, profileImage } = userToAddToAdmin;

  return (
    <Modal
      isOpen={addToAdminModalIsOpen}
      onRequestClose={() => setAddToAdminModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to add this user to admin?</h1>
        <br />
        {profileImage && (
          <div className='match-images'>
            <img src={profileImage.url} alt={`${username || name}'s post`} />
          </div>
        )}
        <br />
        <button
          className='submit-btn'
          onClick={() => addToAdmin(userToAddToAdmin)}
        >
          Yes, add this user
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setAddToAdminModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default AddUserToAdmin;
