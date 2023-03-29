import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarMinus,
  faCalendarPlus,
  faCoins,
  faStar,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { fetchUsersByFilter } from '../../functions/user';

Modal.setAppElement('#root');

const UsersToInvite = ({
  usersToInviteModalIsOpen,
  setUsersToInviteModalIsOpen,
  users,
  values,
  setValues,
  removeInvitee,
}) => {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    fetchSearches();
  }, []);

  const fetchSearches = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-user-searches`)
      .then((res) => {
        setSearches(res.data);
      });
  };

  const userSearch = async (arg) => {
    fetchUsersByFilter('event', 1, arg, token).then((res) => {
      const filtered = res.data.filter((u) => u.eventsEligible);
      filtered.map((u) => {
        setValues((prevValues) => ({
          ...prevValues,
          invitees: [...prevValues.invitees, u],
        }));
      });
    });
    setUsersToInviteModalIsOpen(false);
  };

  const addInvitee = (u) => {
    setValues({ ...values, invitees: [...values.invitees, u] });
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
      isOpen={usersToInviteModalIsOpen}
      onRequestClose={() => setUsersToInviteModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {values.invitees.length === 0 &&
        searches &&
        searches.map((s) => (
          <button
            onClick={() => userSearch(s.params)}
            type='button'
            className='submit-btn'
            key={s._id}
          >
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} className='fa' spin />
            ) : (
              <FontAwesomeIcon icon={faCalendarPlus} className='fa' />
            )}
            {s.name}
          </button>
        ))}
      {users.map((u) => (
        <div className='invitees-container' key={u._id}>
          <div className='user-profile'>
            <div className='user-info'>
              <Link to={`/user/${u._id}`}>
                <img
                  src={u.profileImage ? u.profileImage.url : defaultProfile}
                  alt={`${u.username || u.name}'s profile picture`}
                />
              </Link>
              <Link to={`/user/${u._id}`}>
                <p>{u.username || u.name}</p>
              </Link>
            </div>
            <div className='icons'>
              {u.featuredMember === true && (
                <FontAwesomeIcon icon={faStar} className='fa star' />
              )}
              <div className='user-points'>
                <FontAwesomeIcon icon={faCoins} className='fa points' />
                <p>
                  {u.pointsGained.reduce((accumulator, object) => {
                    return accumulator + object.amount;
                  }, 0) -
                    u.pointsLost.reduce((accumulator, object) => {
                      return accumulator + object.amount;
                    }, 0) -
                    u.pointsSpent.reduce((accumulator, object) => {
                      return accumulator + object.amount;
                    }, 0)}
                </p>
              </div>
              {!values.invitees.some((ele) => ele._id === u._id) ? (
                <FontAwesomeIcon
                  icon={faCalendarPlus}
                  className='fa add'
                  onClick={() => addInvitee(u)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCalendarMinus}
                  className='fa minus'
                  onClick={() => removeInvitee(u)}
                />
              )}
            </div>
          </div>
          <br />
        </div>
      ))}
    </Modal>
  );
};

export default UsersToInvite;
