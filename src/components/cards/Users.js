import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import defaultProfile from '../../assets/defaultProfile.png';
import { useHistory } from 'react-router-dom';

const Users = ({ users, handleFollow }) => {
  const history = useHistory();

  return (
    <div className='story-gallery'>
      {users &&
        users.map((user) => (
          <div
            className='story'
            key={user._id}
            style={{
              backgroundImage: `url(${
                (user.profileImage && user.profileImage.url) || defaultProfile
              })`,
            }}
            onClick={() => history.push(`/user/${user._id}`)}
          >
            <FontAwesomeIcon
              icon={faHeart}
              className='fa'
              onClick={(e) => {
                e.stopPropagation();
                handleFollow(user);
              }}
            />
            <p>{user.name ? `${user.name}` : `${user.email.split('@')[0]}`}</p>
          </div>
        ))}
    </div>
  );
};

export default Users;
