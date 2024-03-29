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
import { getUsersByPage, fetchUsersByFilter } from '../../functions/user';

Modal.setAppElement('#root');

const UsersToSelect = ({
  selectedUsersModalIsOpen,
  setSelectedUsersModalIsOpen,
  optIns,
  values,
  setValues,
  removeSelected,
  loadingOpen,
}) => {
  const [searches, setSearches] = useState([]);
  const [loadingAll, setLoadingAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalContentRendered, setModalContentRendered] = useState(false);
  const [modalContentHeight, setModalContentHeight] = useState(0);
  const [clickedSearch, setClickedSearch] = useState(null);

  const { token } = useSelector((state) => state.user);

  const handleModalContentRef = (ref) => {
    if (ref && !modalContentRendered) {
      setModalContentRendered(true);
      const height = ref.clientHeight;
      setModalContentHeight(height);
    }
  };

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

  const searchAll = () => {
    setLoadingAll(true);
    getUsersByPage('mail', 1, token).then((res) => {
      const filtered = res.data.filter((u) => u.optIn);
      filtered.map((u) => {
        setValues((prevValues) => ({
          ...prevValues,
          selected: [...prevValues.selected, u],
        }));
      });
      setLoadingAll(false);
      setSelectedUsersModalIsOpen(false);
    });
  };

  const userSearch = async (arg) => {
    setLoading(true);
    fetchUsersByFilter('mail', 1, arg, token).then((res) => {
      const filtered = res.data.filteredUsers.filter((u) => u.optIn);
      filtered.map((u) => {
        setValues((prevValues) => ({
          ...prevValues,
          selected: [...prevValues.selected, u],
        }));
      });
      setLoading(false);
      setSelectedUsersModalIsOpen(false);
    });
  };

  const addSelected = (o) => {
    setValues({ ...values, selected: [...values.selected, o] });
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
      isOpen={selectedUsersModalIsOpen}
      onRequestClose={() => setSelectedUsersModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div ref={handleModalContentRef}>
        <button onClick={searchAll} type='button' className='submit-btn'>
          {loadingAll ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faCalendarPlus} className='fa' />
          )}
          Everyone
        </button>
        {loadingAll && <p className='center'>This may take a few minutes</p>}
        {values.selected.length === 0 &&
          searches &&
          searches.map((s) => (
            <div key={s._id}>
              <button
                onClick={() => {
                  userSearch(s.params);
                  setClickedSearch(s._id);
                }}
                type='button'
                className='submit-btn'
              >
                {loading && clickedSearch === s._id ? (
                  <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                ) : (
                  <FontAwesomeIcon icon={faCalendarPlus} className='fa' />
                )}
                {s.name}
              </button>
              {loading && clickedSearch === s._id && (
                <p className='center'>This may take a few minutes</p>
              )}
            </div>
          ))}
        {loadingOpen ? (
          <div style={{ textAlign: 'center' }}>
            <FontAwesomeIcon
              icon={faSpinner}
              className='fa'
              spin
              style={{ fontSize: '25px', color: '#ef5b85' }}
            />
          </div>
        ) : optIns.length > 0 ? (
          optIns.map((o) => (
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
                  {!values.selected.some((ele) => ele._id === o._id) ? (
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
        ) : (
          'No users are currently opted in to receive messages'
        )}
      </div>
    </Modal>
  );
};

export default UsersToSelect;
