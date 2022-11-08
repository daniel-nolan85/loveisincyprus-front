import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import defaultProfile from '../../assets/defaultProfile.png';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import Unfollow from '../../components/modals/Unfollow';

const Following = ({ history }) => {
  const [users, setUsers] = useState([]);
  const [userToUnfollow, setUserToUnfollow] = useState({});
  const [unfollowModalIsOpen, setUnfollowModalIsOpen] = useState(false);

  const { token, _id } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) fetchFollowing();
  }, [token]);

  const fetchFollowing = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/liked-users`,
        { _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log('following ==> ', res);
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
        <h1 className='center'>
          {users.length > 0 ? 'People I Like' : 'You have not liked anyone yet'}
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
              <FontAwesomeIcon
                icon={faHeart}
                className='fa liked'
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnfollow(u);
                }}
              />
              <p>{u.username || u.name}</p>
            </div>
          ))}
        </div>
        <Unfollow
          unfollowModalIsOpen={unfollowModalIsOpen}
          setUnfollowModalIsOpen={setUnfollowModalIsOpen}
          userToUnfollow={userToUnfollow}
          fetchFollowing={fetchFollowing}
        />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Following;
