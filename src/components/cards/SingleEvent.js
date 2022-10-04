import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faCartArrowDown,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import defaultEvent from '../../assets/defaultEvent.jpg';
import { Card } from 'antd';
import moment from 'moment';

const SingleEvent = ({ event }) => {
  const {
    invitees,
    accepted,
    maybe,
    declined,
    name,
    location,
    link,
    when,
    notes,
    mainImage,
    uploadedPhotos,
  } = event;

  return (
    <div className='small-container single-product'>
      <div className='row'>
        <div className='col-2'>
          {uploadedPhotos && uploadedPhotos.length ? (
            <Carousel showArrows autoPlay infiniteLoop>
              {uploadedPhotos.map((i) => (
                <img src={i.url} key={i.public_id} />
              ))}
            </Carousel>
          ) : (
            <Card
              cover={
                <img
                  src={mainImage ? mainImage.url : defaultEvent}
                  className='card-image'
                />
              }
            ></Card>
          )}
        </div>
        <div className='col-2'>
          <Card>
            <h1>{name}</h1>
            <h4>{moment(when).format('MMMM Do YYYY')}</h4>
            {link && (
              <Link
                to={{
                  pathname: link,
                }}
                target='_blank'
              >
                View location
              </Link>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
