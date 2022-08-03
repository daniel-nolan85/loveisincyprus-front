import React from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { spentPoints } from '../../functions/user';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const PointsEvents = ({
  pointsEventsModalIsOpen,
  setPointsEventsModalIsOpen,
  points,
  fetchUserPointsTotal,
}) => {
  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  const eventInvites = () => {
    spentPoints(300, 'events', user.token, user);
    toast.success(
      'Congratulations! You will now be placed on our guest list and will receive an invitation to an upcoming event near you.',
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
    fetchUserPointsTotal();
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: {
        ...user,
        eventsEligible: true,
      },
    });
    setPointsEventsModalIsOpen(false);
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
  };

  return (
    <Modal
      isOpen={pointsEventsModalIsOpen}
      onRequestClose={() => setPointsEventsModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='points-info'>
        <h2>
          Do you want to spend 300 points to become eligible for event invites?
        </h2>
        <br />
        <p>
          You will be placed on our guest list and receive a welcoming to one of
          our upcoming events.
        </p>
        <p>
          Doing so will leave you with a total of {points - 300} points
          remaining.
        </p>
        <br />
        <button className='submit-btn' onClick={eventInvites}>
          Yes, I'd like to become eligible for event invites
        </button>
        <button
          className='submit-btn cancel'
          onClick={() => setPointsEventsModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default PointsEvents;
