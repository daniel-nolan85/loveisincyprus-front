import React, { useState, useEffect, useCallback } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import defaultProfile from '../../assets/defaultProfile.png';
import logo64 from '../../assets/logo64.png';
import TinderCard from 'react-tinder-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Match from '../../components/modals/Match';
import { addPoints } from '../../functions/user';
import io from 'socket.io-client';
import { ChatState } from '../../context/ChatProvider';
import Mobile from '../../components/user/Mobile';

let socket;

const Swipe = ({ history }) => {
  const [users, setUsers] = useState([]);
  const [match, setMatch] = useState({});
  const [matchModalIsOpen, setMatchModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => ({ ...state }));

  const { socketConnected, setSocketConnected } = ChatState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) {
      usersToSwipe();
    }
  }, [user && user.token]);

  useEffect(() => {
    socket = io(
      process.env.REACT_APP_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true },
      { secure: true }
    );
  }, []);

  const usersToSwipe = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/users-to-swipe`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleSwipe = (dir, u) => {
    if (dir === 'left') swipeLeft(u);
    if (dir === 'right') swipeRight(u);
  };

  const swipeLeft = async (u) => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/left-swipe`,
        { u, user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        toast.error(`You don't like ${u.username || u.name}.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        usersToSwipe();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const swipeRight = async (u) => {
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
      .then(async (res) => {
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
        await axios.post(
          `${process.env.REACT_APP_API}/send-push-notification`,
          {
            _id: u._id,
            payload: {
              title: 'New Follower',
              body: `${user.username || user.name} is now following you`,
              icon: logo64,
            },
          },
          {
            headers: {
              authtoken: user.token,
            },
          }
        );
        usersToSwipe();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let triggerTime;

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
            <div className='tinder-card-container'>
              {users.length < 1 && (
                <h1 className='center'>
                  There is no one to swipe on right now...
                </h1>
              )}
              {users.length > 0 && (
                <>
                  {users.map((u) => (
                    <TinderCard
                      className='swipe'
                      key={u._id}
                      onSwipe={(dir) => handleSwipe(dir, u)}
                      preventSwipe={['up', 'down']}
                    >
                      <div
                        className='tinder-card'
                        style={{
                          backgroundImage: u.profileImage
                            ? `url(${u.profileImage.url})`
                            : `url(${defaultProfile})`,
                        }}
                        onClick={(e) => {
                          if (triggerTime > 300) return;
                          else history.push(`/user/${u._id}`);
                        }}
                        onMouseDown={() => {
                          triggerTime = new Date().getTime();
                        }}
                        onMouseUp={() => {
                          let thisMoment = new Date().getTime();
                          triggerTime = thisMoment - triggerTime;
                        }}
                      >
                        <div className='tinder-card-info'>
                          <h3>{u.username || u.name}</h3>
                          <h3>{u.age}</h3>
                        </div>
                      </div>
                    </TinderCard>
                  ))}

                  <div className='swipe-buttons'>
                    <FontAwesomeIcon
                      icon={faXmark}
                      className='fa nope'
                      onClick={() => {
                        handleSwipe('left', users.slice(-1)[0]);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faHeart}
                      className='fa like'
                      onClick={() => {
                        handleSwipe('right', users.slice(-1)[0]);
                      }}
                    />
                  </div>
                </>
              )}
            </div>

            <Match
              matchModalIsOpen={matchModalIsOpen}
              setMatchModalIsOpen={setMatchModalIsOpen}
              match={match}
            />
          </>
        )}
      </div>
      <RightSidebar />
    </div>
  );
};

export default Swipe;
