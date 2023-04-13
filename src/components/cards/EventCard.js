import React, { useState } from 'react';
import defaultEvent from '../../assets/defaultEvent.jpg';
import { Card } from 'antd';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import DeleteEvent from '../modals/DeleteEvent';

const { Meta } = Card;

const EventCard = ({
  event,
  fetchUserEvents,
  fetchPrevEvents,
  fetchComingEvents,
}) => {
  const [deleteEventModalIsOpen, setDeleteEventModalIsOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});

  const deleteEvent = (event) => {
    setDeleteEventModalIsOpen(true);
    setCurrentEvent(event);
  };

  const { name, when, notes, uploadedPhotos } = event;

  return (
    <Card
      cover={
        <img
          className='product-image'
          src={
            uploadedPhotos && uploadedPhotos.length > 0
              ? uploadedPhotos[0].url
              : defaultEvent
          }
        />
      }
    >
      <Meta
        title={
          <div className='event-card'>
            <FontAwesomeIcon
              icon={faTrashCan}
              className='fa trash'
              onClick={(e) => {
                e.stopPropagation();
                deleteEvent(event);
              }}
            />
            <span>{name}</span>
            <br />
            <span>{moment(when).format('MMMM Do YYYY')}</span>
          </div>
        }
        description={
          notes && notes.length > 50 ? `${notes.substring(0, 50)}...` : notes
        }
      />
      <DeleteEvent
        deleteEventModalIsOpen={deleteEventModalIsOpen}
        setDeleteEventModalIsOpen={setDeleteEventModalIsOpen}
        currentEvent={currentEvent}
        fetchUserEvents={fetchUserEvents}
        fetchPrevEvents={fetchPrevEvents}
        fetchComingEvents={fetchComingEvents}
      />
    </Card>
  );
};

export default EventCard;
