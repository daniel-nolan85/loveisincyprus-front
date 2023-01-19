import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faPaperPlane,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import { getEvent } from '../../functions/event';
import axios from 'axios';

Modal.setAppElement('#root');

const initialState = {
  name: '',
  location: '',
  when: '',
  notes: '',
  invitees: [],
};

const EventEdit = ({
  eventEditModalIsOpen,
  setEventEditModalIsOpen,
  eventToEdit,
  updateEvent,
  loading,
  setLoading,
  loadEvents,
  uploading,
  setUploading,
}) => {
  const [values, setValues] = useState(initialState);

  let { token } = useSelector((state) => state.user);

  useEffect(() => {
    loadEvent();
  }, [eventToEdit]);

  const loadEvent = () => {
    getEvent(eventToEdit._id).then((e) => {
      setValues({ ...values, ...e.data });
    });
  };

  const handleMainImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    await axios
      .post(`${process.env.REACT_APP_API}/upload-image`, formData, {
        headers: {
          authtoken: token,
        },
      })
      .then((res) => {
        setValues({
          ...values,
          mainImage: { url: res.data.url, public_id: res.data.public_id },
        });
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  const editEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    updateEvent(values, token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.name} has been updated`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setEventEditModalIsOpen(false);
        loadEvents();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) {
          toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const { mainImage, name, location, when, notes, invitees } = values;

  const eventForm = () => (
    <div className='form-box event update'>
      <div className='button-box'>
        <p className='form-header'>Update Event</p>
      </div>
      <form>
        <div className='add-post-links'>
          <label>
            {uploading ? (
              <FontAwesomeIcon icon={faSpinner} className='fa' spin />
            ) : mainImage && mainImage.url ? (
              <img src={mainImage.url} />
            ) : (
              <FontAwesomeIcon icon={faCamera} className='fa' />
            )}
            <input
              onChange={handleMainImage}
              type='file'
              accept='images/*'
              hidden
            />
          </label>
        </div>
        <input
          type='text'
          name='name'
          className='input-field'
          placeholder='Name'
          value={name}
          onChange={handleChange}
          autoFocus
        />
        <input
          type='text'
          name='location'
          className='input-field'
          placeholder='Location'
          value={location}
          onChange={handleChange}
        />
        <input
          type='datetime-local'
          name='when'
          className='input-field'
          placeholder='When'
          value={when}
          onChange={handleChange}
        />
        <input
          type='text'
          name='notes'
          className='input-field'
          placeholder='Description'
          value={notes}
          onChange={handleChange}
        />
        <button onClick={editEvent} type='submit' className='submit-btn'>
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} className='fa' />
          )}
          Update
        </button>
      </form>
    </div>
  );

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
    },
    overlay: {
      position: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0, .8)',
      zIndex: '1000',
      overflowY: 'auto',
    },
  };

  return (
    <Modal
      isOpen={eventEditModalIsOpen}
      onRequestClose={() => setEventEditModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {eventForm()}
    </Modal>
  );
};

export default EventEdit;
