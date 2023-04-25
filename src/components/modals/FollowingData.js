import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import defaultProfile from '../../assets/defaultProfile.png';

Modal.setAppElement('#root');

const FollowingData = ({
  users,
  followingDataModalIsOpen,
  setFollowingDataModalIsOpen,
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

  return (
    <Modal
      isOpen={followingDataModalIsOpen}
      onRequestClose={() => setFollowingDataModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {users && users.length && (
        <div ref={handleModalContentRef}>
          <h2 className='center'>
            {username} is currently following
            <br />
            <span
              style={{ color: '#ef5b85', fontWeight: 'bold', fontSize: '24px' }}
            >
              {users.length}
            </span>{' '}
            {users.length == 1 ? 'member' : 'members'}
          </h2>
          {users.length > 0 &&
            users.map((u) => (
              <div className='invitees-container' key={u._id}>
                <div className='user-profile'>
                  <div className='user-info center'>
                    <Link to={`/user/${u._id}`}>
                      <img
                        src={
                          u.profileImage ? u.profileImage.url : defaultProfile
                        }
                        alt={`${u.username || u.name}'s profile picture`}
                      />
                    </Link>
                    <Link to={`/user/${u._id}`}>
                      <p>{u.username || u.name}</p>
                    </Link>
                  </div>
                </div>
                <br />
              </div>
            ))}
        </div>
      )}
    </Modal>
  );
};

export default FollowingData;
