import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

Modal.setAppElement('#root');

const OptIn = ({ optinModalIsOpen, setOptinModalIsOpen }) => {
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

  const handleOptInOrOut = async () => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/user-opt-in-or-out`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            optIn: res.data.optIn,
          },
        });
        if (res.data.optIn === true) {
          toast.success(
            'You will now receive occasional inbox messages from our admin team informing you about upcoming events and other exciting updates',
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        } else {
          toast.error(
            'You will not receive occasional inbox messages from our admin team informing you about upcoming events and other exciting updates',
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOptInOrOutNotifs = async () => {
    if (
      user.notifSubscription &&
      user.notifSubscription.permission !== 'granted'
    ) {
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
                  permission: 'granted',
                  endpoint: subscription.endpoint,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                dispatch({
                  type: 'LOGGED_IN_USER',
                  payload: {
                    ...user,
                    notifSubscription: res.data.notifSubscription,
                  },
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
      });
    } else {
      await axios
        .put(
          `${process.env.REACT_APP_API}/notif-permission`,
          {
            _id: user._id,
            permission: 'denied',
          },
          {
            headers: {
              authtoken: user.token,
            },
          }
        )
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              ...user,
              notifSubscription: res.data.notifSubscription,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (
      user.notifSubscription &&
      user.notifSubscription.permission === 'granted'
    ) {
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
  };

  return (
    <Modal
      isOpen={optinModalIsOpen}
      onRequestClose={() => setOptinModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h2>
          {user && user.optIn
            ? 'Opt out of receiving mass mail?'
            : 'Opt in to receive mass mail?'}
        </h2>
        <br />
        <div
          id='opt-btn'
          className={user && user.optIn ? 'opt-btn-on' : ''}
          onClick={handleOptInOrOut}
        >
          <span />
        </div>
        <h2>
          {user &&
          user.notifSubscription &&
          user.notifSubscription.permission !== 'granted'
            ? 'Subscribe to mobile notifications?'
            : 'Unsubscribe from mobile notifications?'}
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
          onClick={handleOptInOrOutNotifs}
        >
          <span />
        </div>

        <br />
        <button
          className='submit-btn trash'
          onClick={() => setOptinModalIsOpen(false)}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default OptIn;
