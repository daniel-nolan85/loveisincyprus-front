import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';

Modal.setAppElement('#root');

const ShowLikes = ({ likesModalIsOpen, setLikesModalIsOpen, post }) => {
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
                  like._id === user._id
                    ? `/user/profile/${user._id}`
                    : `/user/${like._id}`
                }
              >
                <img
                  src={
                    like.profileImage ? like.profileImage.url : defaultProfile
                  }
                  alt={`${
                    like.name || like.email.split('@'[0])
                  }'s profile picture`}
                />
              </Link>
              <Link
                to={
                  user._id === like._id
                    ? `/user/profile/${user._id}`
                    : `/user/${like._id}`
                }
              >
                <p>{like.name ? like.name : like.email.split('@')[0]}</p>
              </Link>
            </div>
          </div>
        ))}
    </Modal>
  );
};

export default ShowLikes;
