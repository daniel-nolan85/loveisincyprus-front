import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import defaultProfile from '../../assets/defaultProfile.png';
import TinderCard from 'react-tinder-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Match from '../../components/modals/Match';
import { addPoints } from '../../functions/user';

const Swipe = () => {
  const [users, setUsers] = useState([]);
  const [match, setMatch] = useState({});
  const [matchModalIsOpen, setMatchModalIsOpen] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) {
      usersToSwipe();
    }
  }, [user && user.token]);

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
      })
      .catch((err) => {
        console.log(err);
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
        toast.error(
          `You don't like ${u.name ? u.name : u.email.split('@')[0]}.`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
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
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            following: res.data.following,
            followers: res.data.followers,
            matches: res.data.matches,
          },
        });
        usersToSwipe();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <div className='tinder-card-container'>
          {users.length < 1 && (
            <h1 className='center'>There is no one to swipe on right now...</h1>
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
                  >
                    <h3>{u.name || u.email.split('@')[0]}</h3>
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
      </div>
      <RightSidebar />
    </div>
  );
};

export default Swipe;
