import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const AddUserToFeaturedMembers = ({
  addToFeaturedMembersModalIsOpen,
  setAddToFeaturedMembersModalIsOpen,
  userToAddToFeaturedMembers,
  fetchUsers,
}) => {
  const [loading, setLoading] = useState(false);

  let { token } = useSelector((state) => state.user);

  const addToFeaturedMembers = async (u) => {
    setLoading(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/admin/add-user-to-featured-members`,
        { u },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        toast.success(`${u.username || u.name} added to featured members`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setAddToFeaturedMembersModalIsOpen(false);
        fetchUsers();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
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

  const { name, username, profileImage } = userToAddToFeaturedMembers;

  return (
    <Modal
      isOpen={addToFeaturedMembersModalIsOpen}
      onRequestClose={() => setAddToFeaturedMembersModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to make this user a featured member?</h1>
        <br />
        {profileImage && (
          <div className='match-images'>
            <img src={profileImage.url} alt={`${username || name}'s post`} />
          </div>
        )}
        <br />
        <button
          className='submit-btn'
          onClick={() => addToFeaturedMembers(userToAddToFeaturedMembers)}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, add this user'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setAddToFeaturedMembersModalIsOpen(false)}
          disabled={loading}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default AddUserToFeaturedMembers;
