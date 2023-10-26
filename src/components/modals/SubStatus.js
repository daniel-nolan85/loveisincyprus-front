import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import defaultImage from '../../assets/defaultProfile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Radio } from 'antd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

Modal.setAppElement('#root');

const SubStatus = ({
  subStatusModalIsOpen,
  setSubStatusModalIsOpen,
  userToUpdateStatus,
  fetchUsers,
}) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [expiry, setExpiry] = useState(new Date());
  const [partner, setPartner] = useState('');
  const [loading, setLoading] = useState('');

  useEffect(() => {
    if (membership && membership.free != undefined) {
      setSelectedStatus('Free');
    } else if (membership && membership.paid) {
      setSelectedStatus('Paid');
    } else setSelectedStatus('Unpaid');
  }, [userToUpdateStatus]);

  let { token } = useSelector((state) => state.user);

  const { name, profileImage, username, membership } = userToUpdateStatus;

  const membershipStatus = () => {
    if (membership && membership.free != undefined) {
      return 'Free';
    } else if (membership && membership.paid) {
      return 'Paid';
    } else return 'Unpaid';
  };

  const handleRadio = (e) => {
    setSelectedStatus(e.target.value);
  };

  const updateStatus = async (u) => {
    if (selectedStatus === 'Free' && !partner) {
      toast.warning('Please enter a partner', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    setLoading(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/admin/update-status/${u._id}`,
        { _id: u._id, selectedStatus, expiry, partner },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        toast.success('User status updated', {
          position: toast.POSITION.TOP_CENTER,
        });
        setSubStatusModalIsOpen(false);
        fetchUsers && fetchUsers();
        setLoading(false);
        setPartner('');
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
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
      isOpen={subStatusModalIsOpen}
      onRequestClose={() => setSubStatusModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        {membershipStatus() === 'Free' ? (
          <h1>
            This member currently has a subscription status of{' '}
            <span style={{ color: '#ef5b85' }}>{membershipStatus()}</span>{' '}
            courtesy of{' '}
            <span style={{ color: '#ef5b85' }}>{membership.free}</span>
          </h1>
        ) : (
          <h1>
            This member currently has a subscription status of{' '}
            <span style={{ color: '#ef5b85' }}>{membershipStatus()}</span>{' '}
          </h1>
        )}
        <br />
        <p>{username || name}</p>
        <br />

        <div className='match-images'>
          <img
            src={profileImage ? profileImage.url : defaultImage}
            alt={`${username || name}'s post`}
          />
        </div>
        <br />
        <h2>
          Would you like to update {username || name}'s subscription status?
        </h2>
        <Radio.Group
          onChange={handleRadio}
          name='status'
          defaultValue={selectedStatus}
        >
          <Radio value='Paid'>Paid</Radio>
          <Radio value='Unpaid'>Unpaid</Radio>
          <Radio value='Free'>Free</Radio>
        </Radio.Group>
        {selectedStatus === 'Paid' && membershipStatus() !== 'Paid' && (
          <>
            <DatePicker
              selected={new Date(expiry)}
              defaultValue={expiry}
              onChange={(date) => setExpiry(date)}
              dateFormat='dd/MM/yyyy'
              minDate={new Date()}
              showMonthDropdown
              showYearDropdown
              scrollableMonthDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              placeholderText='Select Expiry'
              style={{ zIndex: 100 }}
            />
          </>
        )}
        {selectedStatus === 'Free' && membershipStatus() !== 'Free' && (
          <>
            <input
              type='text'
              className='input-field'
              placeholder='Name of partner'
              value={partner}
              onChange={(e) => setPartner(e.target.value)}
            />
            <DatePicker
              selected={new Date(expiry)}
              defaultValue={expiry}
              onChange={(date) => setExpiry(date)}
              dateFormat='dd/MM/yyyy'
              minDate={new Date()}
              showMonthDropdown
              showYearDropdown
              scrollableMonthDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              placeholderText='Select Expiry'
              style={{ zIndex: 100 }}
            />
          </>
        )}
        <button
          className='submit-btn'
          type='submit'
          onClick={() => updateStatus(userToUpdateStatus)}
          disabled={membershipStatus() === selectedStatus}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Set status'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setSubStatusModalIsOpen(false)}
          disabled={loading}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default SubStatus;
