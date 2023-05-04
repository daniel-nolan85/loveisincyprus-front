import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import renderHtml from 'react-render-html';
import defaultProfile from '../../assets/defaultProfile.png';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

const UsersChat = ({
  chatId,
  usersChatModalIsOpen,
  setUsersChatModalIsOpen,
}) => {
  const [modalContentRendered, setModalContentRendered] = useState(false);
  const [modalContentHeight, setModalContentHeight] = useState(0);
  const [messages, setMessages] = useState([]);

  const { token } = useSelector((state) => state.user);

  const handleModalContentRef = (ref) => {
    if (ref && !modalContentRendered) {
      setModalContentRendered(true);
      const height = ref.clientHeight;
      setModalContentHeight(height);
    }
  };

  useEffect(() => {
    if (chatId) {
      axios
        .get(`${process.env.REACT_APP_API}/chats/${chatId}`, {
          headers: {
            authtoken: token,
          },
        })
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [chatId]);

  const modalStyles = {
    content: {
      top: `${modalContentRendered && modalContentHeight > 0 ? '0' : '50%'}`,
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: `${
        modalContentRendered && modalContentHeight > 0
          ? 'none'
          : 'translate(-50%, -50%)'
      }`,
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
      isOpen={usersChatModalIsOpen}
      onRequestClose={() => setUsersChatModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {messages && messages.length > 0 && (
        <div ref={handleModalContentRef}>
          <div className='messages-data'>
            {messages.map((m, i) => (
              <div key={m._id} style={{ padding: '10px 0' }}>
                {m.image && (
                  <div className='msg-image'>
                    <img
                      src={m.image.url}
                      alt={`${m.sender.username}'s post`}
                      className='message-img'
                    />
                  </div>
                )}
                <div className='message-sender'>
                  <div className='message-sender-avatar'>
                    <Link to={`/user/${m.sender._id}`}>
                      <img
                        src={
                          m.sender.profileImage
                            ? m.sender.profileImage.url
                            : defaultProfile
                        }
                        alt={`${
                          m.sender.username || m.sender.name
                        }'s profile picture`}
                      />
                    </Link>
                  </div>
                  <div
                    className='message-sender-message'
                    style={{
                      backgroundColor: `${
                        m.sender._id === m.chat.users[0] ? '#b9f5d0' : '#bee3f8'
                      }`,
                      padding: '5px 10px',
                      marginLeft: `${
                        m.sender._id === m.chat.users[0] ? '' : 'auto'
                      }`,
                    }}
                  >
                    <p>{renderHtml(m.content)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default UsersChat;
