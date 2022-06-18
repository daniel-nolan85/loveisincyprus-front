import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import defaultProfile from '../../assets/defaultProfile.png';
import { Link } from 'react-router-dom';
import Match from '../../components/modals/Match';
import Unfollow from '../../components/modals/Unfollow';

const SearchResults = ({ searchResults, setSearchResults, setQuery }) => {
  const [match, setMatch] = useState({});
  const [matchModalIsOpen, setMatchModalIsOpen] = useState(false);
  const [userToUnfollow, setUserToUnfollow] = useState({});
  const [unfollowModalIsOpen, setUnfollowModalIsOpen] = useState(false);

  let { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

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
            points: res.data.points,
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
