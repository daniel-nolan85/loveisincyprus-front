import React from 'react';
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
} from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const UsersToInvite = ({
  usersToInviteModalIsOpen,
  setUsersToInviteModalIsOpen,
  users,
  values,
  setValues,
  removeInvitee,
}) => {
  const { user } = useSelector((state) => ({ ...state }));

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
  };

  console.log(values);

  return (
    <Modal
      isOpen={usersToInviteModalIsOpen}
      onRequestClose={() => setUsersToInviteModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {users.map((u) => (
        <div className='invitees-container' key={u._id}>
          <div className='user-profile'>
            <div className='user-info'>
              <Link to={`/user/${u._id}`}>
                <img
                  src={u.profileImage ? u.profileImage.url : defaultProfile}
                  alt={`${u.name || u.email.split('@'[0])}'s profile picture`}
                />
              </Link>
              <Link to={`/user/${u._id}`}>
                <p>{u.name ? u.name : u.email.split('@')[0]}</p>
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
                    }, 0)}
                </p>
              </div>
              {!values.invitees.some((ele) => ele._id == u._id) ? (
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
