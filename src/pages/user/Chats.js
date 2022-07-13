import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import defaultProfile from '../../assets/defaultProfile.png';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';
import { toast } from 'react-toastify';
import {
  isSameSender,
  isLastMessage,
  isSameSenderMargin,
  isSameUser,
} from '../../functions/chat';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import Lottie from 'react-lottie';
import animationData from '../../assets/animations/typingIndicator.json';
import moment from 'moment';

const ENDPOINT = 'http://localhost:8000';
let socket, selectedChatCompare;

const Chats = ({ history }) => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  // const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  // const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const messagesEndRef = useRef(null);

  const {
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
    messages,
    setMessages,
    // isTyping,
    // setIsTyping,
    socketConnected,
    setSocketConnected,
  } = ChatState();

  useEffect(() => {
    // console.log(user);
    if (user && user.token) {
      fetchChats();
      fetchMatches();
    }
  }, [user && user.token]);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    chats.sort(function (a, b) {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
    const usersToSort = [];
    chats.map((c) => {
      usersToSort.push(c.users[1]);
    });
    setUsers(usersToSort);
  }, [chats]);

  // console.log('notification => ', notification);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));
  }, []);

  // useEffect(() => {
  //   socket.on('message received', (newMessageReceived) => {
  //     if (
  //       !selectedChatCompare ||
  //       selectedChatCompare._id !== newMessageReceived.chat._id
  //     ) {
  //       if (!notification.includes(newMessageReceived)) {
  //         setNotification([newMessageReceived, ...notification]);
  //       }
  //     } else {
  //       setMessages([...messages, newMessageReceived]);
  //     }
  //   });
  // });

  const fetchMatches = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/my-matches`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log('users ==> ', res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sortUsers = () => {
    chats.sort(function (a, b) {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
    // console.log('chats => ', chats);
  };

  const accessChat = async (u) => {
    setNewMessage('');
    await axios
      .post(
        `${process.env.REACT_APP_API}/access-chat`,
        { user, u },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        if (!chats.find((c) => c._id === res.data._id)) {
          setChats([res.data, ...chats]);
        }
        setSelectedChat(res.data);
        // console.log('selectedChat => ', res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchChats = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-chats`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setChats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchMatches = async (e) => {
    e.preventDefault();
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      await axios
        .get(`${process.env.REACT_APP_API}/chats/${selectedChat._id}`, {
          headers: {
            authtoken: user.token,
          },
        })
        .then((res) => {
          setMessages(res.data);
          // console.log('messages => ', res.data);
          // console.log('selectedChat => ', selectedChat);
          socket.emit('join chat', selectedChat._id);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      toast.error('Messages failed to load', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage) {
      setNewMessage('');
      sortUsers();

      try {
        await axios
          .post(
            `${process.env.REACT_APP_API}/send-message`,
            { user, content: newMessage, chatId: selectedChat._id },
            {
              headers: {
                authtoken: user.token,
              },
            }
          )
          .then((res) => {
            // console.log('message sent ==> ', res);
            socket.emit('new message', res.data);
            setMessages([...messages, res.data]);
            socket.emit('stop typing', selectedChat._id);
            fetchChats();
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        toast.error('Message failed to send', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const scrollToBottom = () =>
    messagesEndRef.current.scrollIntoView({
      behavior: 'auto',
      block: 'end',
    });

  return (
    <div className='main'>
      <div className='chats-container'>
        <div className='chat-list'>
          {/* <form onSubmit={searchMatches}> */}
          <div className='search-box'>
            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={searchMatches} />
            <input
              type='search'
              placeholder='Search Your Matches to Start Chatting'
              onChange={searchMatches}
              value={query}
            />
          </div>
          {/* <input type='submit' hidden />
          </form> */}
          {users.length > 0 &&
            users.map((u, i) => (
              <div
                className='ms-a'
                key={u._id}
                onClick={() => {
                  scrollToBottom();
                  accessChat(u);
                }}
              >
                <div className='avatar'>
                  <img
                    src={u.profileImage ? u.profileImage.url : defaultProfile}
                    alt={`${u.name || u.email.split('@')[0]}'s profile picture`}
                  />
                </div>
                <div className='msg-info'>
                  <div className='ms-info'>
                    <span className='sender-name'>
                      {u.name || u.email.split('@')[0]}
                    </span>
                  </div>

                  {chats.length > 0 &&
                    chats.map(
                      (chat) =>
                        chat.users.some((e) => e._id === u._id) &&
                        chat.latestMessage && (
                          <div className='action' key={chat._id}>
                            <p>
                              {chat.latestMessage.content.length > 25
                                ? chat.latestMessage.content.substring(0, 26) +
                                  '...'
                                : chat.latestMessage.content}
                            </p>
                            <span className='time'>
                              {moment(chat.latestMessage.createdAt).fromNow()}
                            </span>
                          </div>
                        )
                    )}
                </div>
              </div>
            ))}
        </div>

        <div className='chat'>
          <div className='chat-header'>
            {selectedChat && (
              <div className='chat-header-content'>
                <Link to={`/user/${selectedChat.users[1]._id}`}>
                  <div className='sender-avatar'>
                    <img
                      src={
                        selectedChat.users[1].profileImage
                          ? selectedChat.users[1].profileImage.url
                          : defaultProfile
                      }
                      alt={`${
                        selectedChat.users[1].name ||
                        selectedChat.users[1].email.split('@')[0]
                      }'s profile picture`}
                    />
                  </div>
                </Link>
                <div className='sender-action'>
                  <Link to={`/user/${selectedChat.users[1]._id}`}>
                    <h3>
                      {selectedChat.users[1].name ||
                        selectedChat.users[1].email.split('@')[0]}
                    </h3>
                  </Link>
                </div>

                <div className='chat-icons'></div>
              </div>
            )}
          </div>
          <div className='chat-body'>
            {/* <ScrollableFeed> */}
            {messages &&
              messages.map((m, i) => (
                <div className='message-sender' key={m._id}>
                  {(isSameSender(messages, m, i, user._id) ||
                    isLastMessage(messages, i, user._id)) && (
                    <div className='message-sender-avatar'>
                      <img
                        src={
                          m.sender.profileImage
                            ? m.sender.profileImage.url
                            : defaultProfile
                        }
                        alt={`${
                          m.sender.name || m.sender.email.split('@')[0]
                        }'s profile picture`}
                      />
                    </div>
                  )}
                  <div
                    className='message-sender-message'
                    style={{
                      backgroundColor: `${
                        m.sender._id === user._id ? '#bee3f8' : '#b9f5d0'
                      }`,
                      marginLeft: isSameSenderMargin(messages, m, i, user._id),
                      marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                    }}
                  >
                    <p>{m.content}</p>
                  </div>
                </div>
              ))}
            {/* </ScrollableFeed> */}

            {isTyping && (
              <div>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData,
                    rendererSettings: {
                      preserveAspectRatio: 'xMidYMid slice',
                    },
                  }}
                  width={70}
                  style={{ marginLeft: 0 }}
                />
              </div>
            )}

            <form onSubmit={sendMessage}>
              <div className='message-box'>
                <div className='message-box-aria'>
                  <input
                    type='text'
                    placeholder='Type a message...'
                    onChange={typingHandler}
                    value={newMessage}
                  />
                  <i className='far fa-smile' />
                </div>
              </div>
            </form>
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
