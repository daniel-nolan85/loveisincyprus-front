import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import defaultProfile from '../../assets/defaultProfile.png';
import { Link } from 'react-router-dom';
import Match from '../../components/modals/Match';
import Unfollow from '../../components/modals/Unfollow';
import io from 'socket.io-client';
import { ChatState } from '../../context/ChatProvider';
import { addPoints } from '../../functions/user';

const ENDPOINT = 'http://localhost:8000';
let socket;

const SearchResults = ({ searchResults, setSearchResults, setQuery }) => {
  const [match, setMatch] = useState({});
  const [matchModalIsOpen, setMatchModalIsOpen] = useState(false);
  const [userToUnfollow, setUserToUnfollow] = useState({});
  const [unfollowModalIsOpen, setUnfollowModalIsOpen] = useState(false);

  let { user } = useSelector((state) => ({ ...state }));

  const { socketConnected, setSocketConnected } = ChatState();

  const dispatch = useDispatch();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
  }, []);

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
              u.name || u.email.split('@')[0]
            }. You have been awarded 15 points!`,
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        }
        toast.success(`You like ${u.name ? u.name : u.email.split('@')[0]}.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        socket.emit('new follower', res.data);
        console.log(res.data);
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
    <>
      {searchResults.length > 0 && (
        <div className='search-results-container'>
          {searchResults.map((u) => (
            <div className='search-results' key={u._id}>
              <Link
                to={
                  user._id === u._id
                    ? `/user/profile/${user._id}`
                    : `/user/${u._id}`
                }
                onClick={() => {
                  setQuery('');
                  setSearchResults([]);
                }}
              >
                <div className='nav-user-icon'>
                  <img
                    src={u.profileImage ? u.profileImage.url : defaultProfile}
                    alt={`${u.name || u.email.split('@')[0]}'s profile picture`}
                  />
                </div>
              </Link>
              <Link
                to={
                  user._id === u._id
                    ? `/user/profile/${user._id}`
                    : `/user/${u._id}`
                }
                onClick={() => {
                  setQuery('');
                  setSearchResults([]);
                }}
              >
                <span>{u.name || u.email.split('@')[0]}</span>
              </Link>

              {user._id === u._id ? (
                ''
              ) : user.following.includes(u._id) ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  className='fa liked'
                  onClick={() => {
                    handleUnfollow(u);
                    setQuery('');
                    setSearchResults([]);
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faHeart}
                  className='fa'
                  onClick={() => {
                    handleFollow(u);
                    setQuery('');
                    setSearchResults([]);
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
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
    </>
  );
};

export default SearchResults;
