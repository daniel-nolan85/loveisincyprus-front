import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSpinner } from '@fortawesome/free-solid-svg-icons';
import defaultProfile from '../../assets/defaultProfile.png';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import { toast } from 'react-toastify';
import Match from '../../components/modals/Match';
import Unfollow from '../../components/modals/Unfollow';
import io from 'socket.io-client';
import { addPoints } from '../../functions/user';
import Mobile from '../../components/user/Mobile';

let socket;

const HighCompat = ({ history }) => {
  const [highCompats, setHighCompats] = useState({});
  const [veryHighCompats, setVeryHighCompats] = useState({});
  const [superCompats, setSuperCompats] = useState({});
  const [match, setMatch] = useState({});
  const [matchModalIsOpen, setMatchModalIsOpen] = useState(false);
  const [userToUnfollow, setUserToUnfollow] = useState({});
  const [unfollowModalIsOpen, setUnfollowModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) fetchHighCompats();
  }, [user && user.token]);

  useEffect(() => {
    socket = io(
      process.env.REACT_APP_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true },
      { secure: true }
    );
  }, []);

  const fetchHighCompats = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/high-compat-users`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setHighCompats(res.data.highCompats);
        setVeryHighCompats(res.data.veryHighCompats);
        setSuperCompats(res.data.superCompats);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
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
        {loading ? (
          <div className='spinner'>
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          </div>
        ) : (
          <>
            <h1 className='center'>
              {!highCompats.length &&
                !veryHighCompats.length &&
                !superCompats.length &&
                `No users have a high compatibility rating with you yet.
            Fully updating your profile will help increase your compatibility score with other members.`}
            </h1>
            <div className='story-gallery'>
              {highCompats.length > 0 && (
                <h1 className='center'>
                  {highCompats.length === 1
                    ? 'This user has '
                    : 'These users have '}
                  a high compatibility score with you
                </h1>
              )}
              {highCompats.length > 0 &&
                highCompats.map((u) => (
                  <div
                    className='story follow'
                    key={u._id}
                    style={{
                      backgroundImage: `linear-gradient(rgb(253, 148, 21, 0.3), rgba(253, 148, 21, 1)), url('${
                        (u.profileImage && u.profileImage.url) || defaultProfile
                      }')`,
                    }}
                    onClick={() => history.push(`/user/${u._id}`)}
                  >
                    {user.following.some((e) => e._id === u._id) ||
                    user.following.includes(u._id) ? (
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
            <br />
            <div className='story-gallery'>
              {veryHighCompats.length > 0 && (
                <h1 className='center'>
                  {veryHighCompats.length === 1
                    ? 'This user has '
                    : 'These users have '}
                  a very high compatibility score with you
                </h1>
              )}
              {veryHighCompats.length > 0 &&
                veryHighCompats.map((u) => (
                  <div
                    className='story follow'
                    key={u._id}
                    style={{
                      backgroundImage: `linear-gradient(rgb(199, 0, 0, 0.3), rgba(199, 0, 0, 1)), url('${
                        (u.profileImage && u.profileImage.url) || defaultProfile
                      }')`,
                    }}
                    onClick={() => history.push(`/user/${u._id}`)}
                  >
                    {user.following.some((e) => e._id === u._id) ||
                    user.following.includes(u._id) ? (
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
            <br />
            <div className='story-gallery'>
              {superCompats.length > 0 && (
                <h1 className='center'>
                  {superCompats.length === 1
                    ? 'This user has '
                    : 'These users have '}
                  a super compatibility score with you
                </h1>
              )}
              {superCompats.length > 0 &&
                superCompats.map((u) => (
                  <div
                    className='story follow'
                    key={u._id}
                    style={{
                      backgroundImage: `linear-gradient(rgb(255, 215, 0, 0.3), rgba(255, 215, 0, 1)), url('${
                        (u.profileImage && u.profileImage.url) || defaultProfile
                      }')`,
                    }}
                    onClick={() => history.push(`/user/${u._id}`)}
                  >
                    {user.following.some((e) => e._id === u._id) ||
                    user.following.includes(u._id) ? (
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
          </>
        )}
      </div>
      <RightSidebar />
    </div>
  );
};

export default HighCompat;
