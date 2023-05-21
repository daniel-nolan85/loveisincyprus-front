import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faPaperPlane,
  faCalendarPlus,
  faCalendarMinus,
  faStar,
  faCoins,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import UsersToSelect from '../../components/modals/UsersToSelect';
import axios from 'axios';
import defaultProfile from '../../assets/defaultProfile.png';
import { sendMassMail } from '../../functions/chat';
import io from 'socket.io-client';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHtml from 'react-render-html';
import moment from 'moment';
import Logo from '../../assets/logo.png';

let socket;

const initialState = {
  image: {},
  content: '',
  selected: [],
};

const MassMail = ({ history }) => {
  const [optIns, setOptIns] = useState([]);
  const [massMessages, setMassMessages] = useState([]);
  const [values, setValues] = useState(initialState);
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUsersModalIsOpen, setSelectedUsersModalIsOpen] =
    useState(false);
  const [subject, setSubject] = useState('');

  const { token, _id, canMassMail } = useSelector((state) => state.user);

  useEffect(() => {
    if (!canMassMail) {
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
    if (token) {
      fetchOptIns();
      fetchMassMessages();
    }
  }, [token]);

  const fetchOptIns = async () => {
    setLoadingOpen(true);
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-optins`,
        { _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setOptIns(res.data);
        setLoadingOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingOpen(false);
      });
  };

  const fetchMassMessages = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-mass-messages`,
        { _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setMassMessages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImage = async (e) => {
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
          image: { url: res.data.url, public_id: res.data.public_id },
        });
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content) {
      setLoading(true);
      sendMassMail(values, subject, token, Logo)
        .then((res) => {
          setLoading(false);
          setValues({
            image: {},
            content: '',
            selected: [],
          });
          setSubject('');
          fetchMassMessages();
          socket.emit('new mass mail', res.data);
          toast.success('Your message has been sent', {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error('Please fill in all fields', {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    } else {
      toast.error('Please add a message to send', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const removeSelected = (o) => {
    for (var s = 0; s < values.selected.length; s++) {
      if (values.selected[s]._id === o._id) {
        values.selected.splice(s, 1);
      }
    }
    setValues({ ...values, selected: [...values.selected] });
  };

  const { image, content, selected } = values;

  const messageForm = () => (
    <div className='form-box mass-mail'>
      <div className='button-box'>
        <p className='form-header'>Create Message</p>
      </div>
      <form>
        <div className='add-post-links'>
          <label>
            {uploading ? (
              <FontAwesomeIcon icon={faSpinner} className='fa' spin />
            ) : image && image.url ? (
              <img src={image.url} />
            ) : (
              <FontAwesomeIcon icon={faCamera} className='fa' />
            )}
            <input
              onChange={handleImage}
              type='file'
              accept='images/*'
              hidden
            />
          </label>
        </div>
        <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
          <ReactQuill
            placeholder='Write a message...'
            value={content}
            name='content'
            onChange={(e) => setValues({ ...values, content: e })}
            modules={{ toolbar: ['bold', 'italic', 'underline', 'link'] }}
          />
        </div>
        <input
          type='text'
          className='input-field'
          placeholder='Add a subject'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <button
          onClick={() => setSelectedUsersModalIsOpen(true)}
          type='button'
          className='submit-btn add'
        >
          <FontAwesomeIcon icon={faCalendarPlus} className='fa' />
          Select Members
        </button>
        <button onClick={handleSubmit} type='submit' className='submit-btn'>
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} className='fa' />
          )}
          Send
        </button>
      </form>
    </div>
  );

  return (
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        {messageForm()}
        <div className='admin-cards'>
          {selected &&
            selected.map((s) => (
              <div className='admin-card' key={s._id}>
                <img
                  src={s.profileImage ? s.profileImage.url : defaultProfile}
                  alt={`${s.username || s.name}'s profile picture`}
                  className='admin-user-img'
                />
                <p>{s.username || s.name}</p>
                {s.featuredMember === true && (
                  <span>
                    <FontAwesomeIcon icon={faStar} className='fa star gold' />
                  </span>
                )}
                {s.pointsGained && (
                  <span>
                    <FontAwesomeIcon icon={faCoins} className='fa points' />
                    <p className='points'>
                      {s.pointsGained.reduce((accumulator, object) => {
                        return accumulator + object.amount;
                      }, 0) -
                        s.pointsLost.reduce((accumulator, object) => {
                          return accumulator + object.amount;
                        }, 0) -
                        s.pointsSpent.reduce((accumulator, object) => {
                          return accumulator + object.amount;
                        }, 0)}
                    </p>
                  </span>
                )}
                <span>
                  <FontAwesomeIcon
                    icon={faCalendarMinus}
                    className='fa trash'
                    onClick={() => removeSelected(s)}
                  />
                </span>
              </div>
            ))}
        </div>
        {massMessages &&
          massMessages.map((m) => (
            <div className='post-container' key={m._id}>
              <div className='post-row'>
                <div className='user-profile'>
                  <img src={Logo} alt="main admin's profile picture" />
                  <span>{moment(m.createdAt).fromNow()}</span>
                </div>
              </div>
              <p className='post-text'>{renderHtml(m.content)}</p>
              {m.image && (
                <img src={m.image.url} alt='mail image' className='post-img' />
              )}
            </div>
          ))}
        <UsersToSelect
          selectedUsersModalIsOpen={selectedUsersModalIsOpen}
          setSelectedUsersModalIsOpen={setSelectedUsersModalIsOpen}
          optIns={optIns}
          values={values}
          setValues={setValues}
          removeSelected={removeSelected}
          loadingOpen={loadingOpen}
        />
      </div>
    </div>
  );
};

export default MassMail;
