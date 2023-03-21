import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  createEvent,
  getEvents,
  cancelEvent,
  updateEvent,
} from '../../functions/event';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faPaperPlane,
  faCalendarPlus,
  faCalendarMinus,
  faStar,
  faBan,
  faEdit,
  faMagnifyingGlass,
  faCoins,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import UsersToInvite from '../../components/modals/UsersToInvite';
import axios from 'axios';
import defaultProfile from '../../assets/defaultProfile.png';
import EventCancel from '../../components/modals/EventCancel';
import EventEdit from '../../components/modals/EventEdit';
import moment from 'moment';
import io from 'socket.io-client';
import EventUpload from '../../components/forms/EventUpload';

let socket;

const initialState = {
  uploadedPhotos: [],
  name: '',
  location: '',
  link: '',
  when: '',
  notes: '',
  invitees: [],
};

const Events = ({ history }) => {
  const [users, setUsers] = useState([]);
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventCancelModalIsOpen, setEventCancelModalIsOpen] = useState(false);
  const [eventToCancel, setEventToCancel] = useState({});
  const [eventEditModalIsOpen, setEventEditModalIsOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState({});
  const [usersToInviteModalIsOpen, setUsersToInviteModalIsOpen] =
    useState(false);
  const [query, setQuery] = useState('');

  const { token, _id, canEvents } = useSelector((state) => state.user);

  useEffect(() => {
    if (!canEvents) {
      history.push('/admin/dashboard');
    }
  }, []);

  useEffect(() => {
    socket = io(
      process.env.REACT_APP_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true },
      { secure: true }
    );
  }, []);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () =>
    getEvents().then((res) => {
      setEvents(res.data);
    });

  useEffect(() => {
    if (token) {
      fetchEventUsers();
    }
  }, [token]);

  const fetchEventUsers = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/event-users`,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createEvent(values, token)
      .then((res) => {
        setLoading(false);
        setValues({
          uploadedPhotos: [],
          name: '',
          location: '',
          link: '',
          when: '',
          notes: '',
          invitees: [],
        });
        toast.success(`${res.data.name} has been created`, {
          position: toast.POSITION.TOP_CENTER,
        });
        loadEvents();
        socket.emit('new event', res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const removeInvitee = (u) => {
    for (var i = 0; i < values.invitees.length; i++) {
      if (values.invitees[i]._id === u._id) {
        values.invitees.splice(i, 1);
      }
    }
    setValues({ ...values, invitees: [...values.invitees] });
  };

  const handleCancel = async (event) => {
    setEventCancelModalIsOpen(true);
    setEventToCancel(event);
  };

  const handleEdit = async (event) => {
    setEventEditModalIsOpen(true);
    setEventToEdit(event);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value.toLowerCase());
  };

  const searched = (query) => (e) =>
    e.location.toLowerCase().includes(query) || e.when.includes(query);

  const { name, location, link, when, notes, invitees } = values;

  const eventForm = () => (
    <div className='form-box event'>
      <div className='button-box'>
        <p className='form-header'>Create Event</p>
      </div>
      <form>
        <EventUpload values={values} setValues={setValues} />
        <input
          type='text'
          name='name'
          className='input-field'
          placeholder='Name'
          value={name}
          onChange={handleChange}
          autoFocus
          required
        />
        <input
          type='text'
          name='location'
          className='input-field'
          placeholder='Location'
          value={location}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='link'
          className='input-field'
          placeholder='Paste a link to maps'
          value={link}
          onChange={handleChange}
          required
        />
        <input
          type='datetime-local'
          name='when'
          className='input-field'
          placeholder='When'
          value={when}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='notes'
          className='input-field'
          placeholder='Description'
          value={notes}
          onChange={handleChange}
          required
        />
        <button
          onClick={() => setUsersToInviteModalIsOpen(true)}
          type='button'
          className='submit-btn add'
        >
          <FontAwesomeIcon icon={faCalendarPlus} className='fa' />
          Invite Members
        </button>
        <button onClick={handleSubmit} type='submit' className='submit-btn'>
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} className='fa' />
          )}
          Create
        </button>
      </form>
    </div>
  );

  return (
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        {eventForm()}
        <div className='admin-cards'>
          {invitees &&
            invitees.map((i) => (
              <div className='admin-card' key={i._id}>
                <img
                  src={i.profileImage ? i.profileImage.url : defaultProfile}
                  alt={`${i.username || i.name}'s profile picture`}
                  className='admin-user-img'
                />
                <p>{i.username || i.name}</p>
                {i.featuredMember === true && (
                  <span>
                    <FontAwesomeIcon icon={faStar} className='fa star gold' />
                  </span>
                )}
                {i.pointsGained && (
                  <span>
                    <FontAwesomeIcon icon={faCoins} className='fa points' />
                    <p className='points'>
                      {i.pointsGained.reduce((accumulator, object) => {
                        return accumulator + object.amount;
                      }, 0) -
                        i.pointsLost.reduce((accumulator, object) => {
                          return accumulator + object.amount;
                        }, 0) -
                        i.pointsSpent.reduce((accumulator, object) => {
                          return accumulator + object.amount;
                        }, 0)}
                    </p>
                  </span>
                )}
                <span>
                  <FontAwesomeIcon
                    icon={faCalendarMinus}
                    className='fa trash'
                    onClick={() => removeInvitee(i)}
                  />
                </span>
              </div>
            ))}
        </div>
        <br />
        <div className='search-box'>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            onClick={handleSearch}
            className='fa'
          />
          <input
            type='search'
            placeholder='Search Events'
            onChange={handleSearch}
            value={query}
          />
        </div>
        <div className='admin-cards'>
          {events.filter(searched(query)).map((e) =>
            !e.cancelled ? (
              <div
                className='admin-card event'
                key={e._id}
                onClick={() => history.push(`/event/${e._id}`)}
              >
                <h3 className='name'>{e.name}</h3>
                <h3>{e.location}</h3>
                <h3>{moment(e.when).format('MMMM Do YYYY, h:mm:ss a')}</h3>
                <FontAwesomeIcon
                  icon={faBan}
                  className='fa trash'
                  onClick={(evt) => {
                    evt.stopPropagation();
                    handleCancel(e);
                  }}
                />
                <FontAwesomeIcon
                  icon={faEdit}
                  className='fa update'
                  onClick={(evt) => {
                    evt.stopPropagation();
                    handleEdit(e);
                  }}
                />
              </div>
            ) : (
              <div
                className='admin-card event cancelled'
                key={e._id}
                onClick={() => history.push(`/event/${e._id}`)}
              >
                <h3 className='name'>{e.name}</h3>
                <h3>{e.location}</h3>
                <h3>{moment(e.when).format('MMMM Do YYYY, h:mm:ss a')}</h3>
                <div className='cancelled'></div>
              </div>
            )
          )}
        </div>
        <UsersToInvite
          usersToInviteModalIsOpen={usersToInviteModalIsOpen}
          setUsersToInviteModalIsOpen={setUsersToInviteModalIsOpen}
          users={users}
          values={values}
          setValues={setValues}
          removeInvitee={removeInvitee}
        />
        <EventCancel
          eventCancelModalIsOpen={eventCancelModalIsOpen}
          setEventCancelModalIsOpen={setEventCancelModalIsOpen}
          eventToCancel={eventToCancel}
          cancelEvent={cancelEvent}
          loading={loading}
          setLoading={setLoading}
          loadEvents={loadEvents}
        />
        <EventEdit
          eventEditModalIsOpen={eventEditModalIsOpen}
          setEventEditModalIsOpen={setEventEditModalIsOpen}
          eventToEdit={eventToEdit}
          updateEvent={updateEvent}
          loading={loading}
          setLoading={setLoading}
          loadEvents={loadEvents}
          uploading={uploading}
          setUploading={setUploading}
        />
      </div>
    </div>
  );
};

export default Events;
