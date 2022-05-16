import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import defaultProfile from '../../assets/defaultProfile.png';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import { toast } from 'react-toastify';
import Match from '../../components/modals/Match';
import Unfollow from '../../components/modals/Unfollow';

const Followers = ({ history }) => {
  const [users, setUsers] = useState([]);
  const [match, setMatch] = useState({});
  const [matchModalIsOpen, setMatchModalIsOpen] = useState(false);
  const [userToUnfollow, setUserToUnfollow] = useState({});
  const [unfollowModalIsOpen, setUnfollowModalIsOpen] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
    if (user && user.token) fetchFollowers();
  }, [user && user.token]);

  const fetchFollowers = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/users-who-like-me`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log('followers ==> ', res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFollow = async (u) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/user-follow`,
        {
          u,
          user,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        if (res.data.matches.includes(u._id)) {
          setMatchModalIsOpen(true);
          setMatch(u);
        }
        toast.success(`You like ${u.name ? u.name : u.email.split('@')[0]}.`, {
          position: toast.POSITION.TOP_CENTER,
        });
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
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnfollow = async (u) => {
    setUnfollowModalIsOpen(true);
    setUserToUnfollow(u);
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <h1 className='center'>
          {users.length > 0
            ? 'People Who Like Me'
            : 'No users have liked you yet'}
        </h1>
        <div className='story-gallery'>
          {users.map((u) => (
            <div
              className='story follow'
              key={u._id}
              style={{
                backgroundImage: `url(${
                  (u.profileImage && u.profileImage.url) || defaultProfile
                })`,
              }}
              onClick={() => history.push(`/user/${u._id}`)}
            >
              {user.following.includes(u._id) ? (
                <>
                  <FontAwesomeIcon
                    icon={faHeart}
                    className='fa liked'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnfollow(u);
                    }}
                  />
                  <p>{u.name ? `${u.name}` : `${u.email.split('@')[0]}`}</p>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faHeart}
                    className='fa'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFollow(u);
                    }}
                  />
                  <p>{u.name ? `${u.name}` : `${u.email.split('@')[0]}`}</p>
                </>
              )}
            </div>
          ))}
        </div>
        <Match
          matchModalIsOpen={matchModalIsOpen}
          setMatchModalIsOpen={setMatchModalIsOpen}
          match={match}
        />
        <Unfollow
          unfollowModalIsOpen={unfollowModalIsOpen}
          setUnfollowModalIsOpen={setUnfollowModalIsOpen}
          userToUnfollow={userToUnfollow}
        />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Followers;
