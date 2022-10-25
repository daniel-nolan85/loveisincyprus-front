import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
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

  const { _id, token } = useSelector((state) => state.user);

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
  } = ChatState();

  useEffect(() => {
    // console.log(user);
    if (token) {
      fetchChats();
      fetchMatches();
    }
  }, [token]);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
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
    chats.sort(function (a, b) {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
    const usersToSort = [];
    chats.map((c) => {
      usersToSort.push(c.users.filter((u) => u._id !== _id));
    });
    var sorted = [].concat.apply([], usersToSort);
    setUsers(sorted);
  }, [chats, messages]);

  // console.log('notification => ', notification);

  useEffect(() => {
    socket = io(
      process.env.REACT_APP_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true }
    );
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
        `${process.env.REACT_APP_API}/my-chat-matches`,
        { _id },
        {
          headers: {
            authtoken: token,
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

  const accessChat = async (u) => {
    setNewMessage('');
    await axios
      .post(
        `${process.env.REACT_APP_API}/access-chat`,
        { _id, u },
        {
          headers: {
            authtoken: token,
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

  const fetchChats = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-chats`,
        { _id },
        {
          headers: {
            authtoken: token,
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
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      await axios
        .get(`${process.env.REACT_APP_API}/chats/${selectedChat._id}`, {
          headers: {
            authtoken: token,
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

      try {
        await axios
          .post(
            `${process.env.REACT_APP_API}/send-message`,
            { _id, content: newMessage, chatId: selectedChat._id },
            {
              headers: {
                authtoken: token,
              },
            }
          )
          .then((res) => {
            // console.log('message sent ==> ', res.data);
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

  const scrollToBottom = () => {
    const element = document.getElementById('lastMessage');
    element.scrollIntoView();
  };

  const otherUser =
    selectedChat && selectedChat.users.filter((u) => u._id !== _id);

  return (
    <div className='main'>
      <div className='chats-container'>
        <div className='chat-list'>
          {/* <form onSubmit={searchMatches}> */}
          <div className='search-box'>
            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={searchMatches} />
            <input
              type='search'
              placeholder='Search your matches to start chatting'
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
                <Link to={`/user/${otherUser[0]._id}`}>
                  <div className='sender-avatar'>
                    <img
                      src={
                        otherUser[0].profileImage
                          ? otherUser[0].profileImage.url
                          : defaultProfile
                      }
                      alt={`${
                        otherUser[0].name || otherUser[0].email.split('@')[0]
                      }'s profile picture`}
                    />
                  </div>
                </Link>
                <div className='sender-action'>
                  <Link to={`/user/${otherUser[0]._id}`}>
                    <h3>
                      {otherUser[0].name || otherUser[0].email.split('@')[0]}
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
                  {(isSameSender(messages, m, i, _id) ||
                    isLastMessage(messages, i, _id)) && (
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
                        m.sender._id === _id ? '#bee3f8' : '#b9f5d0'
                      }`,
                      marginLeft: isSameSenderMargin(messages, m, i, _id),
                      marginTop: isSameUser(messages, m, i, _id) ? 3 : 10,
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
          </div>

          {selectedChat && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
