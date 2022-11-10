import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';

Modal.setAppElement('#root');

const ShowLikes = ({ likesModalIsOpen, setLikesModalIsOpen, post }) => {
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
      isOpen={likesModalIsOpen}
      onRequestClose={() => setLikesModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {post.likes &&
        post.likes.map((like) => (
          <div className='likes-container' key={like._id}>
            <div className='user-profile'>
              <Link
                to={
                  like._id === _id
                    ? `/user/profile/${_id}`
                    : `/user/${like._id}`
                }
              >
                <img
                  src={
                    like.profileImage ? like.profileImage.url : defaultProfile
                  }
                  alt={`${like.username || like.name}'s profile picture`}
                />
              </Link>
              <Link
                to={
                  _id === like._id
                    ? `/user/profile/${_id}`
                    : `/user/${like._id}`
                }
              >
                <p>{like.username || like.name}</p>
              </Link>
            </div>
            <br />
          </div>
        ))}
    </Modal>
  );
};

export default ShowLikes;
