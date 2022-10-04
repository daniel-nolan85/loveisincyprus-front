import React, { useState } from 'react';
import defaultProfile from '../../assets/defaultProfile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faCartArrowDown,
  faEye,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';

const { Meta } = Card;

const UserInfo = ({ u }) => {
  // console.log(u);

  const { _id, name, email, profileImage, age, about } = u;

  return (
    <>
      <Link to={`/user/${_id}`}>
        <Card
          cover={
            <img
              className='product-image'
              src={profileImage ? profileImage.url : defaultProfile}
              alt={`${name || email.split('@')[0]}'s profile picture`}
            />
          }
        >
          <Meta
            title={
              <>
                <span>{name || email.split('@')[0]}</span>
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
