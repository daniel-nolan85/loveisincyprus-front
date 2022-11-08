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
} from '@fortawesome/free-solid-svg-icons';
import UsersToSelect from '../../components/modals/UsersToSelect';
import axios from 'axios';
import defaultProfile from '../../assets/defaultProfile.png';
import { sendMassMail } from '../../functions/chat';
import io from 'socket.io-client';
import { ChatState } from '../../context/ChatProvider';

let socket;

const initialState = {
  content: 'hello there everybody',
  selected: [],
};

const MassMail = () => {
  const [optIns, setOptIns] = useState([]);
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [selectedUsersModalIsOpen, setSelectedUsersModalIsOpen] =
    useState(false);

  const { token, _id } = useSelector((state) => state.user);

  const { setSocketConnected } = ChatState();

  useEffect(() => {
    socket = io(
      process.env.REACT_APP_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true }
    );
  }, []);

  useEffect(() => {
    if (token) {
      fetchOptIns();
    }
  }, [token]);

  const fetchOptIns = async () => {
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
        console.log(res.data);
        setOptIns(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    sendMassMail(values, token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setValues(initialState);
        socket.emit('new message', res.data);
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
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const removeSelected = (o) => {
    console.log(o);
    for (var s = 0; s < values.selected.length; s++) {
      if (values.selected[s]._id == o._id) {
        values.selected.splice(s, 1);
      }
    }
    setValues({ ...values, selected: [...values.selected] });
  };

  const { content, selected } = values;

  const messageForm = () => (
    <div className='form-box event'>
      <div className='button-box'>
        <p className='form-header'>Create Message</p>
      </div>
      <form>
        <textarea
          className='input-field bio'
          placeholder='Write a message...'
          value={content}
          name='content'
          onChange={handleChange}
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
    <div className='container'>
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
        <UsersToSelect
          selectedUsersModalIsOpen={selectedUsersModalIsOpen}
          setSelectedUsersModalIsOpen={setSelectedUsersModalIsOpen}
          optIns={optIns}
          values={values}
          setValues={setValues}
          removeSelected={removeSelected}
        />
      </div>
    </div>
  );
};

export default MassMail;
