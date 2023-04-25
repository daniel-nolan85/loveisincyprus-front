import React, { useState } from 'react';
import Modal from 'react-modal';
import renderHtml from 'react-render-html';
import defaultProfile from '../../assets/defaultProfile.png';

Modal.setAppElement('#root');

const MessagesData = ({
  messages,
  messagesDataModalIsOpen,
  setMessagesDataModalIsOpen,
  username,
}) => {
  const [modalContentRendered, setModalContentRendered] = useState(false);
  const [modalContentHeight, setModalContentHeight] = useState(0);

  const handleModalContentRef = (ref) => {
    if (ref && !modalContentRendered) {
      setModalContentRendered(true);
      const height = ref.clientHeight;
      setModalContentHeight(height);
    }
  };
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

  console.log('messages => ', messages);

  return (
    <Modal
      isOpen={messagesDataModalIsOpen}
      onRequestClose={() => setMessagesDataModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {messages && messages.length > 0 && (
        <div ref={handleModalContentRef}>
          <h2 className='center'>
            {username} has currently sent a total of{' '}
            <span
              style={{ color: '#ef5b85', fontWeight: 'bold', fontSize: '24px' }}
            >
              {messages.length}
            </span>{' '}
            {messages.length == 1 ? 'message' : 'messages'}
          </h2>
          <div className='messages-data'>
            {messages.map((m, i) => (
              <div
                key={m._id}
                style={{ borderBottom: '1px solid #efefef', padding: '10px 0' }}
              >
                {m.image && (
                  <div className='msg-image'>
                    <img
                      src={m.image.url}
                      alt={`${username}'s post`}
                      className='message-img'
                    />
                  </div>
                )}
                <div className='message-sender'>
                  <div className='message-sender-avatar'>
                    {m.hasOwnProperty('sender') ? (
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
                    ) : (
                      m.hasOwnProperty('receiver') && (
                        <img
                          src={
                            m.receiver.profileImage
                              ? m.receiver.profileImage.url
                              : defaultProfile
                          }
                          alt={`${
                            m.receiver.username || m.receiver.name
                          }'s profile picture`}
                        />
                      )
                    )}
                  </div>
                  <div
                    className='message-sender-message'
                    style={{
                      backgroundColor: `${
                        m.hasOwnProperty('sender') ? '#b9f5d0' : '#bee3f8'
                      }`,
                      padding: '5px 10px',
                      marginLeft: `${m.hasOwnProperty('sender') ? '' : 'auto'}`,
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

export default MessagesData;
