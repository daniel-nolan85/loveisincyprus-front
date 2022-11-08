import React, { useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { ChatState } from '../../context/ChatProvider';

let socket;

Modal.setAppElement('#root');

const VerifDisapprove = ({
  verifDisapproveModalIsOpen,
  setVerifDisapproveModalIsOpen,
  currentVerif,
  reason,
  setReason,
  fetchVerifs,
}) => {
  let { token } = useSelector((state) => state.user);

  const { setSocketConnected, setNewVerifs } = ChatState();

  useEffect(() => {
    socket = io(
      process.env.REACT_APP_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true }
    );
  }, []);

  const fetchNewVerifs = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-new-verifs`)
      .then((res) => {
        console.log('new verifs ==> ', res.data);
        setNewVerifs(res.data);
      });
  };

  const disapproveVerif = async (verif) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/disapprove-verif`,
        { verif, reason },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        socket.emit('new message', res.data);
        toast.error(
          `You have rejected this verification. A confirmation message has been sent to the user.`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        fetchNewVerifs();
        fetchVerifs();
        setVerifDisapproveModalIsOpen(false);
      })
      .catch((err) => console.log(err));
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
      zIndex: '1000',
    },
  };

  const { image, postedBy } = currentVerif;

  return (
    <Modal
      isOpen={verifDisapproveModalIsOpen}
      onRequestClose={() => setVerifDisapproveModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to reject approval on this verification?</h1>
        <br />
        {image && (
          <div className='match-images'>
            <img
              src={image.url}
              alt={`${postedBy.username || postedBy.name}'s post`}
            />
          </div>
        )}
        <br />
        <input
          type='text'
          className='input-field'
          placeholder='Give a reason?'
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button
          className='submit-btn'
          onClick={() => disapproveVerif(currentVerif)}
        >
          Yes, reject
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setVerifDisapproveModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default VerifDisapprove;
