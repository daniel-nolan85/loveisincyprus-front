import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faQuoteLeft,
} from '@fortawesome/free-solid-svg-icons';
import defaultProfile from '../../assets/defaultProfile.png';
import moment from 'moment';
import UsersChat from '../../components/modals/UsersChat';

const Chats = ({ history }) => {
  const [query, setQuery] = useState('');
  const [chats, setChats] = useState([]);
  const [chatId, setChatId] = useState('');
  const [usersChatModalIsOpen, setUsersChatModalIsOpen] = useState(false);

  const { _id, token, role } = useSelector((state) => state.user);

  useEffect(() => {
    if (role !== 'main-admin') {
      history.push('/admin/dashboard');
    }
  }, []);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-all-chats`,
        { _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setChats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const viewChat = (id) => {
    setChatId(id);
    setUsersChatModalIsOpen(true);
  };

  // const viewChat = async (chatId) => {
  //   await axios
  //     .get(`${process.env.REACT_APP_API}/chats/${chatId}`, {
  //       headers: {
  //         authtoken: token,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value.toLowerCase());
  };

  const searched = (query) => (c) =>
    c.users.some((user) => user.name.includes(query)) ||
    c.users.some((user) => user.username.includes(query)) ||
    c.users.some((user) => user.email.includes(query));

  return (
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        <div className='search-box'>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            onClick={handleSearch}
            className='fa'
          />
          <input
            type='search'
            placeholder='Search Chats by User'
            onChange={handleSearch}
            value={query}
          />
          <input type='submit' hidden />
        </div>
        <div className='admin-cards'>
          {chats &&
            chats.filter(searched(query)).map((chat) => (
              <div
                className='admin-card'
                key={chat._id}
                style={{ cursor: 'pointer' }}
                onClick={() => viewChat(chat._id)}
              >
                <div className='user-chats'>
                  <div className='user-imgs'>
                    <img
                      src={
                        chat.users[0].profileImage
                          ? chat.users[0].profileImage.url
                          : defaultProfile
                      }
                      alt={`${
                        chat.users[0].username || chat.users[0].name
                      }'s profile picture`}
                      className='admin-user-img'
                    />

                    <img
                      src={
                        chat.users[1].profileImage
                          ? chat.users[1].profileImage.url
                          : defaultProfile
                      }
                      alt={`${
                        chat.users[1].username || chat.users[1].name
                      }'s profile picture`}
                      className='admin-user-img'
                    />
                  </div>
                  <div className='latest-msg'>
                    <FontAwesomeIcon icon={faQuoteLeft} className='fa' />
                    <p>{chat.latestMessage.content}</p>
                  </div>
                </div>
                <small className='user-chats-date'>
                  {moment(chat.latestMessage.createdAt).fromNow()}
                </small>
              </div>
            ))}
        </div>
      </div>
      <UsersChat
        chatId={chatId}
        usersChatModalIsOpen={usersChatModalIsOpen}
        setUsersChatModalIsOpen={setUsersChatModalIsOpen}
      />
    </div>
  );
};

export default Chats;
