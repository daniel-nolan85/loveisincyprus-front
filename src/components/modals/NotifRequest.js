import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

Modal.setAppElement('#root');

const NotifRequest = ({
  notifRequestModalIsOpen,
  setNotifRequestModalIsOpen,
}) => {
  const [permission, setPermission] = useState(false);

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      handleOptInOrOutNotifs();
    }
  }, [permission]);

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

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

  const handleOptInOrOutNotifs = () => {
    console.log(permission);
    console.log(navigator.serviceWorker);
    navigator.serviceWorker.ready.then((registration) => {
      registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.REACT_APP_WEB_PUSH_PUBLIC,
        })
        .then(async (subscription) => {
          await axios
            .put(
              `${process.env.REACT_APP_API}/notif-permission`,
              {
                _id: user._id,
                permission,
                subscription,
              },
              {
                headers: {
                  authtoken: user.token,
                },
              }
            )
            .then((res) => {
              console.log(res.data);
              dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                  ...user,
                  notifSubscription: res.data.notifSubscription,
                },
              });
              if (res.data.notifSubscription.permission === 'granted') {
                toast.success(
                  'You will now receive push notifications to your mobile device',
                  {
                    position: toast.POSITION.TOP_CENTER,
                  }
                );
              } else {
                toast.error(
                  'You will not receive push notifications to your mobile device',
                  {
                    position: toast.POSITION.TOP_CENTER,
                  }
                );
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });
    });
  };

  return (
    <Modal
      isOpen={notifRequestModalIsOpen}
      onRequestClose={() => setNotifRequestModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h2>
          Would you like to subscribe to receive push notifications to your
          mobile device?
        </h2>
        <br />
        <div
          id='opt-btn-notifs'
          className={
            user &&
            user.notifSubscription &&
            user.notifSubscription.permission === 'granted'
              ? 'opt-btn-notifs-on'
              : ''
          }
          onClick={() => {
            setPermission(!permission);
          }}
        >
          <span />
        </div>

        <br />
        <button
          className='submit-btn trash'
          onClick={() => setNotifRequestModalIsOpen(false)}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default NotifRequest;
