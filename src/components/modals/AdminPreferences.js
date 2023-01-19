import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { Checkbox } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

Modal.setAppElement('#root');

const AdminPreferences = ({
  adminPreferencesModalIsOpen,
  setAdminPreferencesModalIsOpen,
  secondaryAdmin,
  fetchUsers,
}) => {
  const [preferences, setPreferences] = useState([]);
  const [loading, setLoading] = useState(false);

  let { _id, token } = useSelector((state) => state.user);

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      handlePreferences();
    }
  }, [preferences]);

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

  const handleChecked = (e) => {
    e.preventDefault();

    let checkedItems = [];
    let uncheckedItems = [];
    let target = e.target;

    for (let i = 0; i < 11; i++) {
      if (target[i].checked) {
        checkedItems.push(target[i].name);
      } else {
        uncheckedItems.push(target[i].name);
      }
    }

    let prefs = checkedItems.filter((el) => !uncheckedItems.includes(el));
    setPreferences(prefs);
  };

  const handlePreferences = async () => {
    setLoading(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/set-preferences`,
        {
          _id,
          preferences,
          secondaryAdmin,
        },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        if (res.data.error) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.success(
            `Your preferences for ${username || name} have been set.`,
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
          fetchUsers();
          setAdminPreferencesModalIsOpen(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const {
    name,
    username,
    canVerify,
    canReported,
    canPosts,
    canUsers,
    canMassMail,
    canEvents,
    canOrders,
    canProducts,
    canCategories,
    canSubs,
    canCoupon,
  } = secondaryAdmin;

  return (
    <Modal
      isOpen={adminPreferencesModalIsOpen}
      onRequestClose={() => setAdminPreferencesModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h2>
          Which secondary admin fields would you like {username || name} to have
          access to?
        </h2>
        {Object.keys(secondaryAdmin).length !== 0 && (
          <form className='preferences' onSubmit={handleChecked}>
            <Checkbox name='verified' defaultChecked={canVerify}>
              Verified user submissions
            </Checkbox>
            <Checkbox name='reported' defaultChecked={canReported}>
              Reported content
            </Checkbox>
            <Checkbox name='posts' defaultChecked={canPosts}>
              Posts
            </Checkbox>
            <Checkbox name='users' defaultChecked={canUsers}>
              Users
            </Checkbox>
            <Checkbox name='mail' defaultChecked={canMassMail}>
              Mass mail
            </Checkbox>
            <Checkbox name='events' defaultChecked={canEvents}>
              Events
            </Checkbox>
            <Checkbox name='orders' defaultChecked={canOrders}>
              Orders
            </Checkbox>
            <Checkbox name='products' defaultChecked={canProducts}>
              Products
            </Checkbox>
            <Checkbox name='categories' defaultChecked={canCategories}>
              Categories
            </Checkbox>
            <Checkbox name='subs' defaultChecked={canSubs}>
              Sub-categories
            </Checkbox>
            <Checkbox name='coupon' defaultChecked={canCoupon}>
              Coupon
            </Checkbox>
            <button className='submit-btn' type='submit'>
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} className='fa' spin />
              ) : (
                'Set preferences'
              )}
            </button>
          </form>
        )}
        <button
          className='submit-btn trash'
          onClick={() => setAdminPreferencesModalIsOpen(false)}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default AdminPreferences;
