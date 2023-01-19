import React from 'react';
import Modal from 'react-modal';
import defaultProfile from '../../assets/defaultProfile.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { removePoints } from '../../functions/user';

Modal.setAppElement('#root');

const Unfollow = ({
  unfollowModalIsOpen,
  setUnfollowModalIsOpen,
  userToUnfollow,
  fetchMatches,
  fetchFollowing,
}) => {
  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  const unfollowUser = async (u) => {
    if (user.matches.includes(u._id)) {
      removePoints(15, 'unmatch', user.token);
      toast.error(
        `You unmatched with ${u.username || u.name}. 15 points were removed`,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    }
    await axios
      .put(
        `${process.env.REACT_APP_API}/user-unfollow`,
        { u, user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        toast.error(`You no longer like ${u.username || u.name}.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            following: res.data.following,
            followers: res.data.followers,
            matches: res.data.matches,
          },
        });
        setUnfollowModalIsOpen(false);
        fetchMatches && fetchMatches();
        fetchFollowing && fetchFollowing();
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

  const { name, profileImage, username } = userToUnfollow;

  return (
    <Modal
      isOpen={unfollowModalIsOpen}
      onRequestClose={() => setUnfollowModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>
          Are you sure you want to unlike
          {username || name}?
        </h1>
        <div className='match-images'>
          <img
            src={profileImage ? profileImage.url : defaultProfile}
            alt={`${username || name}'s profile picture`}
          />
        </div>
        <br />
        <p>
          You will no longer be able to send them a message or see their posts.
        </p>
        <button
          className='submit-btn'
          onClick={() => unfollowUser(userToUnfollow)}
        >
          Yes, unlike
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setUnfollowModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default Unfollow;
