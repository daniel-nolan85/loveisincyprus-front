import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import defaultProfile from '../../assets/defaultProfile.png';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import Unfollow from '../../components/modals/Unfollow';
import Mobile from '../../components/user/Mobile';

const Matches = ({ history }) => {
  const [users, setUsers] = useState([]);
  const [userToUnfollow, setUserToUnfollow] = useState({});
  const [unfollowModalIsOpen, setUnfollowModalIsOpen] = useState(false);

  const { token, _id, following } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) fetchMatches();
  }, [token]);

  const fetchMatches = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/my-matches`,
        { _id },
        {
          headers: {
            authtoken: token,
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
            ? "People I've matched with"
            : 'You have not matched with any users yet'}
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
              {following.some((e) => e._id === u._id) ||
              following.includes(u._id) ? (
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
                  <FontAwesomeIcon icon={faHeart} className='fa' />
                  <p>{u.username || u.name}</p>
                </>
              )}
            </div>
          ))}
        </div>
        <Unfollow
          unfollowModalIsOpen={unfollowModalIsOpen}
          setUnfollowModalIsOpen={setUnfollowModalIsOpen}
          userToUnfollow={userToUnfollow}
          fetchMatches={fetchMatches}
        />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Matches;
