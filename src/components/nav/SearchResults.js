import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import defaultProfile from '../../assets/defaultProfile.png';
import { Link } from 'react-router-dom';
import Match from '../../components/modals/Match';
import Unfollow from '../../components/modals/Unfollow';
import io from 'socket.io-client';
import { addPoints } from '../../functions/user';

let socket;

const SearchResults = ({ searchResults, setSearchResults, setQuery }) => {
  const [match, setMatch] = useState({});
  const [matchModalIsOpen, setMatchModalIsOpen] = useState(false);
  const [userToUnfollow, setUserToUnfollow] = useState({});
  const [unfollowModalIsOpen, setUnfollowModalIsOpen] = useState(false);

  let { user } = useSelector((state) => ({ ...state }));

  const box = useRef(null);
  useOutsideAlerter(box);

  const dispatch = useDispatch();

  useEffect(() => {
    socket = io(
      process.env.REACT_APP_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true },
      { secure: true }
    );
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
        toast.warning(
          `Please update your subscription in order to follow other members.`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      });
  };

  const handleUnfollow = async (u) => {
    setUnfollowModalIsOpen(true);
    setUserToUnfollow(u);
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleOutsideClick(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setSearchResults([]);
        }
      }

      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick);
    }, [ref]);
  }

  return (
    <>
      {searchResults.length > 0 && (
        <div className='search-results-container' ref={box}>
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
                    alt={`${u.username || u.name}'s profile picture`}
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
                <span>{u.username || u.name}</span>
              </Link>

              {user._id === u._id ? (
                ''
              ) : user.following.some((e) => e._id === u._id) ||
                user.following.includes(u._id) ? (
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
