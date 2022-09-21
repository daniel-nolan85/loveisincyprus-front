import React from 'react';
import defaultEvent from '../../assets/defaultEvent.jpg';
import { Card } from 'antd';
import moment from 'moment';

const { Meta } = Card;

const EventCard = ({ event }) => {
  const { name, when, notes, mainImage } = event;

  return (
    <Card
      cover={
        <img
          className='product-image'
          src={mainImage ? mainImage.url : defaultEvent}
        />
      }
    >
      <Meta
        title={
          <>
            <span>{name}</span>
            <br />
            <span>{moment(when).format('MMMM Do YYYY')}</span>
          </>
        }
        description={
          notes && notes.length > 50 ? `${notes.substring(0, 50)}...` : notes
        }
      />
    </Card>
  );
};

export default EventCard;
