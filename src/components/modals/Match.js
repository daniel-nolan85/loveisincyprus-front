import React from 'react';
import Modal from 'react-modal';
import defaultProfile from '../../assets/defaultProfile.png';
import { useSelector } from 'react-redux';

Modal.setAppElement('#root');

const Match = ({ matchModalIsOpen, setMatchModalIsOpen, match }) => {
  const { profileImage, name, username } = useSelector((state) => state.user);

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
      isOpen={matchModalIsOpen}
      onRequestClose={() => setMatchModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Congratulations!</h1>
        <h2>It's a match!</h2>
        <h2>You matched with {match.username || match.name}</h2>
        <div className='match-images'>
          <img
            src={match.profileImage ? match.profileImage.url : defaultProfile}
            alt={`${match.username || match.name}'s profile picture`}
          />
          <img
            src={profileImage ? profileImage.url : defaultProfile}
            alt={`${username || name}'s profile picture`}
          />
        </div>
        <br />
        <p>Visit their profile to start chatting with them now!</p>
      </div>
    </Modal>
  );
};

export default Match;
