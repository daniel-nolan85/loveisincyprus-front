import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import defaultProfile from '../../assets/defaultProfile.png';
import { useSelector, useDispatch } from 'react-redux';
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
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';

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
  // const [isTyping, setIsTyping] = useState(false);
  const [lastMessage, setLastMessage] = useState(false);
  const [theirChatUsers, setTheirChatUsers] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  const isFirstRun = useRef(true);

  const {
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
    messages,
    setMessages,
    isTyping,
    setIsTyping,
    socketConnected,
    setSocketConnected,
    chatUsers,
    setChatUsers,
    theirChats,
    setTheirChats,
    typersId,
    setTypersId,
    theirId,
    setTheirId,
  } = ChatState();

  useEffect(() => {
    if (user.token) {
      fetchMatches();
    }
  }, [user.token]);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      setTheirId(selectedChat.users.find((x) => x._id !== user._id)._id);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      messages.length > 0 && scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    socket = io(
      process.env.REACT_APP_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true }
    );
  }, []);

  useEffect(() => {
    const usersToSort = chats
      .map((c) => c.users.filter((u) => u._id !== user._id))
      .flat();
    const matches = usersToSort.filter((us) => {
      return users.find((match) => {
        return us._id === match._id;
      });
    });
    const result = matches.concat(
      users.filter((bo) => matches.every((ao) => ao._id !== bo._id))
    );
    setChatUsers(result);
    const otherUser = matches.find((m) => m._id !== user._id);
    if (!selectedChat || !otherUser) return;
    else if (selectedChat.users.some((e) => e._id === otherUser._id))
      accessChat(otherUser);
  }, [chats]);

  const fetchMatches = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/my-chat-matches`,
        { _id: user._id },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log('users ==> ', res.data);
        // setChatUsers(res.data);
        setUsers(res.data);
        fetchChats();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const accessChat = async (u) => {
    markRead(u);
    setNewMessage('');
    await axios
      .post(
        `${process.env.REACT_APP_API}/access-chat`,
        { _id: user._id, u },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log('access chat => ', res);
        if (!chats.find((c) => c._id === res.data._id)) {
          setChats([res.data, ...chats]);
        }
        setSelectedChat(res.data);
        // scrollToBottom();
        // console.log('selectedChat => ', res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const markRead = async (u) => {
    await axios
      .put(`${process.env.REACT_APP_API}/mark-read`, {
        _id: user._id,
        u,
      })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            messages: res.data.messages,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchChats = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-chats`,
        { _id: user._id },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setChats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchMatches = async (e) => {
    e.preventDefault();
    setQuery(e.target.value.toLowerCase());
  };

  const searched = (query) => (q) =>
    (q.email && q.email.toLowerCase().includes(query)) ||
    (q.name && q.name.toLowerCase().includes(query)) ||
    (q.username && q.username.toLowerCase().includes(query));

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
          console.log('messages => ', res.data);
          console.log('selectedChat => ', selectedChat);
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
      setTypersId('');

      try {
        await axios
          .post(
            `${process.env.REACT_APP_API}/send-message`,
            { _id: user._id, content: newMessage, chatId: selectedChat._id },
            {
              headers: {
                authtoken: user.token,
              },
            }
          )
          .then((res) => {
            console.log('message sent ==> ', res.data);
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
      socket.emit('typing', user._id, theirId);
      console.log('typing');
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', theirId);
        setTyping(false);
        console.log('stop typing');
      }
    }, timerLength);
  };

  const scrollToBottom = () => {
    const element = document.getElementById('lastMessage');
    element.scrollIntoView();
  };

  const otherUser =
    selectedChat && selectedChat.users.filter((u) => u._id !== user._id);

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <div className='main'>
          <div className='chats-container'>
            <div className='chat-list'>
              <div className='search-box'>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  onClick={searchMatches}
                />
                <input
                  type='search'
                  placeholder='Search your matches to start chatting'
                  onChange={searchMatches}
                  value={query}
                />
              </div>
              {chatUsers.length > 0 &&
                chatUsers.filter(searched(query)).map((u, i) => (
                  <div
                    className='ms-a'
                    key={u._id}
                    onClick={() => {
                      accessChat(u);
                    }}
                  >
                    <div className='avatar'>
                      <img
                        src={
                          u.profileImage ? u.profileImage.url : defaultProfile
                        }
                        alt={`${
                          u.name || u.email.split('@')[0]
                        }'s profile picture`}
                      />
                    </div>
                    <div className='msg-info'>
                      <div className='ms-info'>
                        <span className='sender-name'>
                          {u.name || u.email.split('@')[0]}
                        </span>
                        <span className='ms-count'>
                          {user.messages.some((e) => e.sender === u._id) > 0 &&
                            user.messages.filter((m) => m.sender === u._id)
                              .length}
                        </span>
                      </div>

                      {chats.length > 0 &&
                        chats.map(
                          (chat) =>
                            chat.users.some((e) => e._id === u._id) &&
                            chat.latestMessage && (
                              <div className='action' key={chat._id}>
                                <p>
                                  {isTyping && typersId === u._id ? (
                                    <div className='typing-indicator'>
                                      <Lottie
                                        options={{
                                          loop: true,
                                          autoplay: true,
                                          animationData,
                                          rendererSettings: {
                                            preserveAspectRatio:
                                              'xMidYMid slice',
                                          },
                                        }}
                                        width={50}
                                        height={22}
                                        // style={{
                                        //   paddingTop: '15px',
                                        // }}
                                      />
                                    </div>
                                  ) : chat.latestMessage.content.length > 25 ? (
                                    chat.latestMessage.content.substring(
                                      0,
                                      26
                                    ) + '...'
                                  ) : (
                                    chat.latestMessage.content
                                  )}
                                </p>
                                <span className='time'>
                                  {moment(
                                    chat.latestMessage.createdAt
                                  ).fromNow()}
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
                    <Link to={`/user/${otherUser[0]._id}`}>
                      <div className='sender-avatar'>
                        <img
                          src={
                            otherUser[0].profileImage
                              ? otherUser[0].profileImage.url
                              : defaultProfile
                          }
                          alt={`${
                            otherUser[0].name ||
                            otherUser[0].email.split('@')[0]
                          }'s profile picture`}
                        />
                      </div>
                    </Link>
                    <div className='sender-action'>
                      <Link to={`/user/${otherUser[0]._id}`}>
                        <h3>
                          {isTyping && typersId === theirId ? (
                            <div className='typing-indicator'>
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
                                style={{ marginLeft: 0, color: 'fff' }}
                              />
                            </div>
                          ) : (
                            otherUser[0].name ||
                            otherUser[0].email.split('@')[0]
                          )}
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
                  messages.map((m, i, { length }) => (
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
                          marginLeft: isSameSenderMargin(
                            messages,
                            m,
                            i,
                            user._id
                          ),
                          marginTop: isSameUser(messages, m, i, user._id)
                            ? 3
                            : 10,
                        }}
                      >
                        {i + 1 === length ? (
                          <p id='lastMessage'>{m.content}</p>
                        ) : (
                          <p>{m.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                {/* </ScrollableFeed> */}
              </div>
              {selectedChat && (
                <div>
                  {isTyping && typersId === theirId && (
                    <div className='typing-indicator'>
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
                        <FontAwesomeIcon
                          icon={faPaperPlane}
                          onClick={sendMessage}
                          className='fa send-message'
                        />
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default Chats;
