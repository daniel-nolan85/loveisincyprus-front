import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';

Modal.setAppElement('#root');

const Accepted = ({ acceptedModalIsOpen, setAcceptedModalIsOpen, post }) => {
  const { _id } = useSelector((state) => state.user);

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
      isOpen={acceptedModalIsOpen}
      onRequestClose={() => setAcceptedModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {post.notif && post.notif.accepted.length > 0 ? (
        post.notif.accepted.map((a) => (
          <div className='likes-container' key={a._id}>
            <div className='user-profile'>
              <Link
                to={a._id === _id ? `/user/profile/${_id}` : `/user/${a._id}`}
              >
                <img
                  src={a.profileImage ? a.profileImage.url : defaultProfile}
                  alt={`${a.username || a.name}'s profile picture`}
                />
              </Link>
              <Link
                to={_id === a._id ? `/user/profile/${_id}` : `/user/${a._id}`}
              >
                <p>{a.username || a.name}</p>
              </Link>
            </div>
            <br />
          </div>
        ))
      ) : post.accepted && post.accepted.length > 0 ? (
        post.accepted.map((a) => (
          <div className='likes-container' key={a._id}>
            <div className='user-profile'>
              <Link
                to={a._id === _id ? `/user/profile/${_id}` : `/user/${a._id}`}
              >
                <img
                  src={a.profileImage ? a.profileImage.url : defaultProfile}
                  alt={`${a.username || a.name}'s profile picture`}
                />
              </Link>
              <Link
                to={_id === a._id ? `/user/profile/${_id}` : `/user/${a._id}`}
              >
                <p>{a.username || a.name}</p>
              </Link>
            </div>
            <br />
          </div>
        ))
      ) : (
        <div className='likes-container'>
          No members have said they are coming yet
        </div>
      )}
    </Modal>
  );
};

export default Accepted;
