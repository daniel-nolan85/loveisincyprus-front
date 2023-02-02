import React from 'react';
import Modal from 'react-modal';
import defaultImage from '../../assets/defaultProfile.png';
import moment from 'moment';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

const UserSuspended = ({
  userSuspendedModalIsOpen,
  setUserSuspendedModalIsOpen,
  suspendedUser,
}) => {
  const { name, profileImage, username, userStatus } = suspendedUser;

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
      isOpen={userSuspendedModalIsOpen}
      onRequestClose={() => setUserSuspendedModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {userStatus && (
        <div className='match'>
          <h1>Your account has been temporarily suspended</h1>
          <br />
          <p>{username || name}</p>
          <br />

          <div className='match-images'>
            <img
              src={profileImage ? profileImage.url : defaultImage}
              alt={`${username || name}'s post`}
            />
          </div>
          <br />
          <p>
            Your account has been suspended until{' '}
            {moment(userStatus.until).format('MMMM Do YYYY')} for the following
            reason:
          </p>
          <p>{userStatus.reason}</p>
          <p>
            If you would like to appeal this decision you can email us at
            lovecustomer@loveisincyprus.com or through our{' '}
            <Link to='/contact-us' className='link'>
              contact form
            </Link>
            .
          </p>

          <button
            className='submit-btn trash'
            onClick={() => setUserSuspendedModalIsOpen(false)}
          >
            Ok
          </button>
        </div>
      )}
    </Modal>
  );
};

export default UserSuspended;
