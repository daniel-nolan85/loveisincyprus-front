import React from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { spentPoints } from '../../functions/user';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const PointsFeatured = ({
  pointsFeaturedModalIsOpen,
  setPointsFeaturedModalIsOpen,
  points,
  fetchUserPointsTotal,
}) => {
  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  const featuredMember = async () => {
    spentPoints(100, 'featured', user.token, user);
    toast.success(
      'Congratulations! You will now be listed as a featured member for the next two weeks.',
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
    fetchUserPointsTotal();
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: {
        ...user,
        featuredMember: true,
      },
    });
    setPointsFeaturedModalIsOpen(false);
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
      isOpen={pointsFeaturedModalIsOpen}
      onRequestClose={() => setPointsFeaturedModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='points-info'>
        <h2>Do you want to spend 100 points to become a Featured Member?</h2>
        <br />
        <p>
          Becoming a Featured Member will mean your profile image gets displayed
          on our home page, this can lead to a significant increase in
          interaction with other users.
        </p>
        <p>
          Doing so will leave you with a total of {points - 100} points
          remaining.
        </p>
        <br />
        <button
          className='submit-btn'
          onClick={featuredMember}
          disabled={points < 100}
        >
          Yes, I'd like to become a Featured Member
        </button>
        <button
          className='submit-btn cancel'
          onClick={() => setPointsFeaturedModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default PointsFeatured;
