import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const SubInfo = ({ subInfoModalIsOpen, setSubInfoModalIsOpen }) => {
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
      isOpen={subInfoModalIsOpen}
      onRequestClose={() => setSubInfoModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='points-info'>
        <h2>Full access to the site grants you the following benefits:</h2>
        <div className='bullets' style={{ padding: '0 20px' }}>
          <ul>
            <li>Like other members</li>
            <li>Access swipe to match page</li>
            <li>See who you are highly compatible with</li>
            <li>View other members photos</li>
            <li>Spend your accumulated points</li>
            <li>Create and send gift cards to members</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default SubInfo;
