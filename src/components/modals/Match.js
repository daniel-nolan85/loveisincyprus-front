import React from 'react';
import Modal from 'react-modal';
import defaultProfile from '../../assets/defaultProfile.png';
import { useSelector } from 'react-redux';

Modal.setAppElement('#root');

const Match = ({ matchModalIsOpen, setMatchModalIsOpen, match }) => {
  const { profileImage, name, email } = useSelector((state) => state.user);

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
        {/* <pre>{JSON.stringify(match, null, 4)}</pre> */}
        {/* <h2>You matched with {match.name || match.email.split('@')[0]}</h2> */}
        <div className='match-images'>
          <img
            src={match.profileImage ? match.profileImage.url : defaultProfile}
            // alt={`${match.name || match.email.split('@')[0]}'s profile picture`}
          />
          <img
            src={profileImage ? profileImage.url : defaultProfile}
            alt={`${name || email.split('@')[0]}'s profile picture`}
          />
        </div>
        <br />
        <p>Visit their profile to start chatting with them now!</p>
      </div>
    </Modal>
  );
};

export default Match;
