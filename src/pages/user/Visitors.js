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
import io from 'socket.io-client';
import { ChatState } from '../../context/ChatProvider';
import { addPoints } from '../../functions/user';
import Mobile from '../../components/user/Mobile';

let socket;

const Visitors = ({ history }) => {
  const [users, setUsers] = useState([]);
  const [match, setMatch] = useState({});
  const [matchModalIsOpen, setMatchModalIsOpen] = useState(false);
  const [userToUnfollow, setUserToUnfollow] = useState({});
  const [unfollowModalIsOpen, setUnfollowModalIsOpen] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const { socketConnected, setSocketConnected } = ChatState();

  const dispatch = useDispatch();

  useEffect(() => {
    socket = io(
      process.env.REACT_APP_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true }
    );
  }, []);

  useEffect(() => {
    console.log(user);
    if (user && user.token) fetchVisitors();
  }, [user && user.token]);

  const fetchVisitors = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/my-visitors`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log('visitors ==> ', res);
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
          addPoints(15, 'match', user.token);
          toast.success(
            `You matched with ${
              u.username || u.name
            }. You have been awarded 15 points!`,
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        }
        toast.success(`You like ${u.username || u.name}.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        socket.emit('new follower', res.data);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            following: res.data.following,
            followers: res.data.followers,
            matches: res.data.matches,
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
        <Mobile />
        <h1 className='center'>
          {users.length > 0
            ? 'People who have visited me'
            : 'No users have visited your profile yet'}
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
                  <p>{u.username || u.name}</p>
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
                  <p>{u.username || u.name}</p>
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

export default Visitors;
