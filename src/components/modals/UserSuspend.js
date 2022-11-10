import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import defaultImage from '../../assets/defaultProfile.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const UserSuspend = ({
  userSuspendModalIsOpen,
  setUserSuspendModalIsOpen,
  userToSuspend,
  fetchUsers,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [suspending, setSuspending] = useState(false);
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);
  const [reason, setReason] = useState('');

  let { _id, token } = useSelector((state) => state.user);

  const suspendUser = async (u) => {
    setSuspending(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/admin/suspend-user/${u._id}`,
        { _id: u._id, endDate, reason },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.error('User suspended', {
          position: toast.POSITION.TOP_CENTER,
        });
        setUserSuspendModalIsOpen(false);
        fetchUsers && fetchUsers();
        setSuspending(false);
        setReason('');
        setStartDate(new Date());
        setEndDate(null);
      })
      .catch((err) => {
        setSuspending(false);
        console.log(err);
      });
  };

  const setRange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const { name, profileImage, username } = userToSuspend;

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

  const chooseDuration = () => {
    setDatePickerIsOpen(true);
  };

  return (
    <Modal
      isOpen={userSuspendModalIsOpen}
      onRequestClose={() => setUserSuspendModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match suspend-user'>
        <h1>Are you sure you want to suspend this user?</h1>
        <br />
        <p>{username || name}</p>
        <br />

        <div className='match-images'>
          <img
            src={profileImage ? profileImage.url : defaultImage}
            alt={`${username || name}'s post`}
          />
        </div>
        <button className='submit-btn' onClick={chooseDuration}>
          Select Duration
        </button>
        <DatePicker
          selected={startDate}
          onChange={(dates) => {
            setRange(dates);
            setDatePickerIsOpen(false);
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          //   inline
          open={datePickerIsOpen}
          onClickOutside={() => setDatePickerIsOpen(false)}
        />
        <input
          type='text'
          className='input-field'
          placeholder='Give a reason?'
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button
          className='submit-btn'
          onClick={() => suspendUser(userToSuspend)}
          disabled={!startDate && !endDate}
        >
          {suspending ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, suspend'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setUserSuspendModalIsOpen(false)}
          disabled={suspending}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default UserSuspend;
