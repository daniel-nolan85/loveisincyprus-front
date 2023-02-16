import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { ChatState } from '../../context/ChatProvider';
import { addPoints } from '../../functions/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

let socket;

Modal.setAppElement('#root');

const VerifApprove = ({
  verifApproveModalIsOpen,
  setVerifApproveModalIsOpen,
  currentVerif,
  fetchVerifs,
}) => {
  const [loading, setLoading] = useState(false);

  const {} = ChatState();

  let { token } = useSelector((state) => state.user);

  const { setNewVerifs } = ChatState();

  useEffect(() => {
    socket = io(
      process.env.REACT_APP_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true },
      { secure: true }
    );
  }, []);

  const fetchNewVerifs = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-new-verifs`)
      .then((res) => {
        setNewVerifs(res.data);
      });
  };

  const approveVerif = async (verif) => {
    setLoading(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/approve-verif`,
        { verif },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        socket.emit('new message', res.data.message);
        toast.success(
          `You have approved this verification. A confirmation message has been sent to the user.`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        fetchNewVerifs();
        fetchVerifs();
        setVerifApproveModalIsOpen(false);
        addPoints(80, 'verified', token, res.data.userStatus);
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

  const { image, postedBy } = currentVerif;

  return (
    <Modal
      isOpen={verifApproveModalIsOpen}
      onRequestClose={() => setVerifApproveModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to approve this verification?</h1>
        <br />
        {image && (
          <div className='match-images'>
            <img
              src={image}
              alt={`${postedBy.username || postedBy.name}'s post`}
            />
          </div>
        )}
        <br />
        <button
          className='submit-btn'
          onClick={() => approveVerif(currentVerif)}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faThumbsUp} className='fa' />
          )}
          Yes, I approve
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setVerifApproveModalIsOpen(false)}
          disabled={loading}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default VerifApprove;
