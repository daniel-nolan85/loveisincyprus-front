import React from 'react';
import Modal from 'react-modal';
import defaultProfile from '../../assets/defaultProfile.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

Modal.setAppElement('#root');

const Unfollow = ({
  unfollowModalIsOpen,
  setUnfollowModalIsOpen,
  userToUnfollow,
  fetchMatches,
  fetchFollowing,
}) => {
  let { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  const unfollowUser = async (u) => {
    console.log('userToUnfollow => ', u);
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
        console.log('handle unfollow response => ', res);
        toast.error(
          `You no longer like ${u.name ? u.name : u.email.split('@')[0]}.`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            profileImage: res.data.profileImage,
            coverImage: res.data.coverImage,
            name: res.data.name,
            email: res.data.email,
            username: res.data.username,
            about: res.data.about,
            gender: res.data.gender,
            birthday: res.data.birthday,
            location: res.data.location,
            genderWanted: res.data.genderWanted,
            relWanted: res.data.relWanted,
            following: res.data.following,
            followers: res.data.followers,
            matches: res.data.matches,
            visitors: res.data.visitors,
            token: user.token,
            role: res.data.role,
            _id: res.data._id,
            createdAt: res.data.createdAt,
            address: res.data.address,
            wishlist: res.data.wishlist,
            points: res.data.points,
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
  };

  const { name, email, profileImage } = userToUnfollow;

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
          {/* {name || email.split('@')[0]}? */}
        </h1>
        <div className='match-images'>
          <img
            src={profileImage ? profileImage.url : defaultProfile}
            // alt={`${name || email.split('@')[0]}'s profile picture`}
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
