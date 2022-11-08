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

const UsersToSelect = ({
  selectedUsersModalIsOpen,
  setSelectedUsersModalIsOpen,
  optIns,
  values,
  setValues,
  removeSelected,
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
    console.log('arg => ', arg);
    fetchUsersByFilter(arg, token).then((res) => {
      const filtered = res.data.filter((u) => u.optIn);
      filtered.map((u) => {
        setValues((prevValues) => ({
          ...prevValues,
          selected: [...prevValues.selected, u],
        }));
        // };
      });
    });
    setSelectedUsersModalIsOpen(false);
  };

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
      {values.selected.length === 0 &&
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
      {optIns.length > 0
        ? optIns.map((o) => (
            <div className='invitees-container' key={o._id}>
              <div className='user-profile'>
                <div className='user-info'>
                  <Link to={`/user/${o._id}`}>
                    <img
                      src={o.profileImage ? o.profileImage.url : defaultProfile}
                      alt={`${o.username || o.name}'s profile picture`}
                    />
                  </Link>
                  <Link to={`/user/${o._id}`}>
                    <p>{o.username || o.name}</p>
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
