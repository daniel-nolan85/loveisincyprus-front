import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import defaultProfile from '../../assets/defaultProfile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const GCReceivedValueData = ({
  cards,
  gCReceivedValueDataModalIsOpen,
  setGCReceivedValueDataModalIsOpen,
  username,
}) => {
  const [modalContentRendered, setModalContentRendered] = useState(false);
  const [modalContentHeight, setModalContentHeight] = useState(0);
  const [totalCardsValue, setTotalCardsValue] = useState(0);

  useEffect(() => {
    if (Object.keys(cards).length !== 0) {
      const totalCardsReceivedValue = cards.reduce(
        (acc, curr) => {
          acc.totalAmount += curr.totalAmount;
          return acc;
        },
        { totalAmount: 0 }
      );
      setTotalCardsValue(totalCardsReceivedValue.totalAmount);
    }
  }, [cards]);

  const handleModalContentRef = (ref) => {
    if (ref && !modalContentRendered) {
      setModalContentRendered(true);
      const height = ref.clientHeight;
      setModalContentHeight(height);
    }
  };

  const modalStyles = {
    content: {
      top: `${modalContentRendered && modalContentHeight > 0 ? '0' : '50%'}`,
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: `${
        modalContentRendered && modalContentHeight > 0
          ? 'none'
          : 'translate(-50%, -50%)'
      }`,
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
      isOpen={gCReceivedValueDataModalIsOpen}
      onRequestClose={() => setGCReceivedValueDataModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {cards && cards.length && (
        <div ref={handleModalContentRef}>
          <h2 className='center'>
            {username} has currently received a total of
            <br />
            <span
              style={{ color: '#ef5b85', fontWeight: 'bold', fontSize: '24px' }}
            >
              €{totalCardsValue.toFixed(2)}
            </span>{' '}
            in gift cards from{' '}
            <span
              style={{ color: '#ef5b85', fontWeight: 'bold', fontSize: '24px' }}
            >
              {cards.length}
            </span>{' '}
            {cards.length === 1 ? 'member' : 'members'}
          </h2>
          {cards.map((c) => (
            <div className='invitees-container' key={c._id}>
              <div className='user-profile'>
                <div className='user-info center'>
                  <Link to={`/user/${c._id}`}>
                    <img
                      src={c.profileImage ? c.profileImage.url : defaultProfile}
                      alt={`${c.username || c.name}'s profile picture`}
                    />
                  </Link>
                  <Link to={`/user/${c._id}`}>
                    <p>{c.username || c.name}</p>
                  </Link>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className='fa arrow-or-xmark'
                  />
                  <p>€{c.totalAmount.toFixed(2)}</p>
                </div>
              </div>
              <br />
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default GCReceivedValueData;
