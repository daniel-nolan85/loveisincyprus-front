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

const UsersToSelect = ({
  selectedUsersModalIsOpen,
  setSelectedUsersModalIsOpen,
  optIns,
  values,
  setValues,
  removeSelected,
}) => {
  const { user } = useSelector((state) => ({ ...state }));

  const addSelected = (o) => {
    setValues({ ...values, selected: [...values.selected, o] });
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
  console.log(optIns);

  return (
    <Modal
      isOpen={selectedUsersModalIsOpen}
      onRequestClose={() => setSelectedUsersModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {optIns.length > 0
        ? optIns.map((o) => (
            <div className='invitees-container' key={o._id}>
              <div className='user-profile'>
                <div className='user-info'>
                  <Link to={`/user/${o._id}`}>
                    <img
                      src={o.profileImage ? o.profileImage.url : defaultProfile}
                      alt={`${
                        o.name || o.email.split('@'[0])
                      }'s profile picture`}
                    />
                  </Link>
                  <Link to={`/user/${o._id}`}>
                    <p>{o.name ? o.name : o.email.split('@')[0]}</p>
                  </Link>
                </div>
                <div className='icons'>
                  {o.featuredMember === true && (
                    <FontAwesomeIcon icon={faStar} className='fa star' />
                  )}
                  <div className='user-points'>
                    <FontAwesomeIcon icon={faCoins} className='fa points' />
                    <p>
                      {o.pointsGained.reduce((accumulator, object) => {
                        return accumulator + object.amount;
                      }, 0) -
                        o.pointsLost.reduce((accumulator, object) => {
                          return accumulator + object.amount;
                        }, 0)}
                    </p>
                  </div>
                  {!values.selected.some((ele) => ele._id == o._id) ? (
                    <FontAwesomeIcon
                      icon={faCalendarPlus}
                      className='fa add'
                      onClick={() => addSelected(o)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCalendarMinus}
                      className='fa minus'
                      onClick={() => removeSelected(o)}
                    />
                  )}
                </div>
              </div>
              <br />
            </div>
          ))
        : 'No users are currently opted in to receive messages'}
    </Modal>
  );
};

export default UsersToSelect;
