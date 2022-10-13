import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCheck,
  faUserClock,
  faUserXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import defaultEvent from '../../assets/defaultEvent.jpg';
import { Card } from 'antd';
import moment from 'moment';
import EventResponse from '../modals/EventResponse';
import Accepted from '../../components/modals/Accepted';
import Maybe from '../../components/modals/Maybe';
import Declined from '../../components/modals/Declined';
import { useSelector } from 'react-redux';

const SingleEvent = ({ event, fetchEvent }) => {
  const [currentEvent, setCurrentEvent] = useState({});
  const [eventResponseModalIsOpen, setEventResponseModalIsOpen] =
    useState(false);
  const [acceptedModalIsOpen, setAcceptedModalIsOpen] = useState(false);
  const [maybeModalIsOpen, setMaybeModalIsOpen] = useState(false);
  const [declinedModalIsOpen, setDeclinedModalIsOpen] = useState(false);

  const { _id } = useSelector((state) => state.user);

  const changeResponse = (event) => {
    setCurrentEvent(event);
    setEventResponseModalIsOpen(true);
  };

  const showAccepted = (event) => {
    setCurrentEvent(event);
    setAcceptedModalIsOpen(true);
  };

  const showMaybe = (event) => {
    setCurrentEvent(event);
    setMaybeModalIsOpen(true);
  };

  const showDeclined = (event) => {
    setCurrentEvent(event);
    setDeclinedModalIsOpen(true);
  };

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
      <h1 className='center'>
        {accepted && accepted.length > 0 && accepted.some((e) => e._id === _id)
          ? 'You are going to this event'
          : maybe && maybe.length > 0 && maybe.some((e) => e._id === _id)
          ? 'You might be going to this event'
          : declined &&
            declined.length > 0 &&
            declined.some((e) => e._id === _id) &&
            'You are not going to this event'}
      </h1>
      <button
        type='button'
        className='submit-btn response'
        onClick={() => changeResponse(event)}
      >
        Change response?
      </button>
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
            <p>{notes}</p>
          </Card>
        </div>
      </div>
      <div className='event-invitees'>
        <span className='tooltip'>
          <FontAwesomeIcon
            icon={faUserCheck}
            className='fa users accepted'
            onClick={() => showAccepted(event)}
          />
          <span className='tooltip-text'>See who's coming</span>
        </span>
        <span className='tooltip'>
          <FontAwesomeIcon
            icon={faUserClock}
            className='fa users maybe'
            onClick={() => showMaybe(event)}
          />
          <span className='tooltip-text'>See who might come</span>
        </span>
        <span className='tooltip'>
          <FontAwesomeIcon
            icon={faUserXmark}
            className='fa users declined'
            onClick={() => showDeclined(event)}
          />
          <span className='tooltip-text'>See who can't come</span>
        </span>
      </div>
      <EventResponse
        eventResponseModalIsOpen={eventResponseModalIsOpen}
        setEventResponseModalIsOpen={setEventResponseModalIsOpen}
        post={currentEvent}
        fetchEvent={fetchEvent}
      />
      <Accepted
        acceptedModalIsOpen={acceptedModalIsOpen}
        setAcceptedModalIsOpen={setAcceptedModalIsOpen}
        post={currentEvent}
      />
      <Maybe
        maybeModalIsOpen={maybeModalIsOpen}
        setMaybeModalIsOpen={setMaybeModalIsOpen}
        post={currentEvent}
      />
      <Declined
        declinedModalIsOpen={declinedModalIsOpen}
        setDeclinedModalIsOpen={setDeclinedModalIsOpen}
        post={currentEvent}
      />
    </div>
  );
};

export default SingleEvent;
