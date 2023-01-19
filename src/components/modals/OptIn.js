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
        if (res.data.optIn == true) {
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

  return (
    <Modal
      isOpen={optinModalIsOpen}
      onRequestClose={() => setOptinModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>
          {user && user.optIn
            ? 'Opt out of receiving mass mail?'
            : 'Opt in to receive mass mail?'}
        </h1>
        <br />
        <div
          id='opt-btn'
          className={user && user.optIn ? 'opt-btn-on' : ''}
          onClick={handleOptInOrOut}
        >
          <span />
        </div>

        <br />
        <button
          className='submit-btn trash'
          onClick={() => setOptinModalIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default OptIn;
