import React, { useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ChatState } from '../../context/ChatProvider';

Modal.setAppElement('#root');

const Popup = ({ popupModalIsOpen, setPopupModalIsOpen }) => {
  let { user } = useSelector((state) => ({ ...state }));

  const { setModalIsOpen, setPointsQuestionsModalIsOpen } = ChatState();

  const history = useHistory();

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
      zIndex: '1000',
    },
  };

  return (
    <Modal
      isOpen={popupModalIsOpen}
      onRequestClose={() => setPopupModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Your profile is still incomplete</h1>
        <br />
        <h2>
          Having a more complete profile will help you to find a partner by
          increasing your compatibility with other users. You will also earn
          points for completing 100% of your profile, which can be used in many
          exciting ways.
        </h2>
        <br />
        {user && (
          <>
            <p
              onClick={() => {
                if (
                  window.location.href !==
                  `${process.env.REACT_APP_POPUP}/user/profile/${user._id}`
                ) {
                  history.push({
                    pathname: `/user/profile/${user._id}`,
                    state: { clickedfromPopup: true },
                  });
                } else {
                  setModalIsOpen(true);
                }
                setPopupModalIsOpen(false);
              }}
              className='popup-links'
            >
              Update your profile now
            </p>
            <p
              onClick={() => {
                if (
                  window.location.href !==
                  `${process.env.REACT_APP_POPUP}/points`
                ) {
                  history.push({
                    pathname: `/points`,
                    state: { clickedfromPopup: true },
                  });
                } else {
                  setPointsQuestionsModalIsOpen(true);
                }
                setPopupModalIsOpen(false);
              }}
              className='popup-links'
            >
              Learn more about how you can spend points
            </p>
          </>
        )}
        <br />
        {/* <Link className='popup-links'>
          Learn more about how you can spend points
        </Link> */}
        <button
          className='submit-btn trash'
          onClick={() => setPopupModalIsOpen(false)}
        >
          Remind me later
        </button>
      </div>
    </Modal>
  );
};

export default Popup;
