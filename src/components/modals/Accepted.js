import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';

Modal.setAppElement('#root');

const Accepted = ({ acceptedModalIsOpen, setAcceptedModalIsOpen, post }) => {
  const { user } = useSelector((state) => ({ ...state }));

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
  };

  console.log(post);

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
                to={
                  a._id === user._id
                    ? `/user/profile/${user._id}`
                    : `/user/${a._id}`
                }
              >
                <img
                  src={a.profileImage ? a.profileImage.url : defaultProfile}
                  alt={`${a.name || a.email.split('@'[0])}'s profile picture`}
                />
              </Link>
              <Link
                to={
                  user._id === a._id
                    ? `/user/profile/${user._id}`
                    : `/user/${a._id}`
                }
              >
                <p>{a.name ? a.name : a.email.split('@')[0]}</p>
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
