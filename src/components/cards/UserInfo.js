import React from 'react';
import defaultProfile from '../../assets/defaultProfile.png';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import _ from 'lodash';

const { Meta } = Card;

const UserInfo = ({ u }) => {
  const { _id, name, profileImage, age, about, username } = u;

  return (
    <>
      <Link to={`/user/${_id}`}>
        <Card
          cover={
            <img
              className='product-image'
              src={profileImage ? profileImage.url : defaultProfile}
              alt={`${username || name}'s profile picture`}
            />
          }
        >
          <Meta
            title={
              <>
                <span>{username || name}</span>
                <br />
                <span>{age}</span>
              </>
            }
            description={
              about && about.length > 50
                ? `${about.substring(0, 50)}...`
                : about
            }
          />
        </Card>
      </Link>
    </>
  );
};

export default UserInfo;
