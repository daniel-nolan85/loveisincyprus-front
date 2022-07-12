import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';

Modal.setAppElement('#root');

const Declined = ({ declinedModalIsOpen, setDeclinedModalIsOpen, post }) => {
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
      isOpen={declinedModalIsOpen}
      onRequestClose={() => setDeclinedModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {post.notif && post.notif.declined.length > 0 ? (
        post.notif.declined.map((d) => (
          <div className='likes-container' key={d._id}>
            <div className='user-profile'>
              <Link
                to={
                  d._id === user._id
                    ? `/user/profile/${user._id}`
                    : `/user/${d._id}`
                }
              >
                <img
                  src={d.profileImage ? d.profileImage.url : defaultProfile}
                  alt={`${d.name || d.email.split('@'[0])}'s profile picture`}
                />
              </Link>
              <Link
                to={
                  user._id === d._id
                    ? `/user/profile/${user._id}`
                    : `/user/${d._id}`
                }
              >
                <p>{d.name ? d.name : d.email.split('@')[0]}</p>
              </Link>
            </div>
            <br />
          </div>
        ))
      ) : (
        <div className='likes-container'>
          No members have said they are not coming yet
        </div>
      )}
    </Modal>
  );
};

export default Declined;
