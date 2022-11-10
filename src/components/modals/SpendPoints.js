import React from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import PointsFeatured from '../modals/PointsFeatured';
import PointsFive from '../modals/PointsFive';
import PointsTen from '../modals/PointsTen';
import PointsEvents from '../modals/PointsEvents';

Modal.setAppElement('#root');

const SpendPoints = ({
  spendPointsModalIsOpen,
  setSpendPointsModalIsOpen,
  points,
  setPoints,
  fetchUserPointsTotal,
  pointsFeaturedModalIsOpen,
  setPointsFeaturedModalIsOpen,
  pointsFiveModalIsOpen,
  setPointsFiveModalIsOpen,
  pointsTenModalIsOpen,
  setPointsTenModalIsOpen,
  pointsEventsModalIsOpen,
  setPointsEventsModalIsOpen,
}) => {
  const { featuredMember, eventsEligible } = useSelector((state) => state.user);

  const becomeFeatured = () => {
    setPointsFeaturedModalIsOpen(true);
  };

  const gainFivePercent = () => {
    setPointsFiveModalIsOpen(true);
  };

  const gainTenPercent = () => {
    setPointsTenModalIsOpen(true);
  };

  const eventInvites = () => {
    setPointsEventsModalIsOpen(true);
  };

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
      isOpen={spendPointsModalIsOpen}
      onRequestClose={() => setSpendPointsModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='points-info'>
        <h2>You currently have a total of {points} points</h2>
        <br />
        <button
          className='submit-btn'
          onClick={becomeFeatured}
          disabled={points < 100 || featuredMember == true}
        >
          Become a Featured Member
        </button>
        <button
          className='submit-btn'
          onClick={gainFivePercent}
          disabled={points < 150}
        >
          Earn a 5% discount in our store
        </button>
        <button
          className='submit-btn'
          onClick={gainTenPercent}
          disabled={points < 250}
        >
          Earn a 10% discount in our store
        </button>
        <button
          className='submit-btn'
          onClick={eventInvites}
          disabled={points < 300 || eventsEligible == true}
        >
          Become eligible for event invites
        </button>
        <PointsFeatured
          pointsFeaturedModalIsOpen={pointsFeaturedModalIsOpen}
          setPointsFeaturedModalIsOpen={setPointsFeaturedModalIsOpen}
          points={points}
          fetchUserPointsTotal={fetchUserPointsTotal}
        />
        <PointsFive
          pointsFiveModalIsOpen={pointsFiveModalIsOpen}
          setPointsFiveModalIsOpen={setPointsFiveModalIsOpen}
          points={points}
          fetchUserPointsTotal={fetchUserPointsTotal}
        />
        <PointsTen
          pointsTenModalIsOpen={pointsTenModalIsOpen}
          setPointsTenModalIsOpen={setPointsTenModalIsOpen}
          points={points}
          fetchUserPointsTotal={fetchUserPointsTotal}
        />
        <PointsEvents
          pointsEventsModalIsOpen={pointsEventsModalIsOpen}
          setPointsEventsModalIsOpen={setPointsEventsModalIsOpen}
          points={points}
          fetchUserPointsTotal={fetchUserPointsTotal}
        />
      </div>
    </Modal>
  );
};

export default SpendPoints;
