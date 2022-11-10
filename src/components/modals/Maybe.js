import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';

Modal.setAppElement('#root');

const Maybe = ({ maybeModalIsOpen, setMaybeModalIsOpen, post }) => {
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

  // console.log(post);

  return (
    <Modal
      isOpen={maybeModalIsOpen}
      onRequestClose={() => setMaybeModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {post.notif && post.notif.maybe.length > 0 ? (
        post.notif.maybe.map((m) => (
          <div className='likes-container' key={m._id}>
            <div className='user-profile'>
              <Link
                to={m._id === _id ? `/user/profile/${_id}` : `/user/${m._id}`}
              >
                <img
                  src={m.profileImage ? m.profileImage.url : defaultProfile}
                  alt={`${m.username || m.name}'s profile picture`}
                />
              </Link>
              <Link
                to={_id === m._id ? `/user/profile/${_id}` : `/user/${m._id}`}
              >
                <p>{m.username || m.name}</p>
              </Link>
            </div>
            <br />
          </div>
        ))
      ) : post.maybe && post.maybe.length > 0 ? (
        post.maybe.map((a) => (
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
          No members have said they might come yet
        </div>
      )}
    </Modal>
  );
};

export default Maybe;
