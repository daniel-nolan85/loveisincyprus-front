import React, { useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { ChatState } from '../../context/ChatProvider';

let socket;

Modal.setAppElement('#root');

const VerifApprove = ({
  verifApproveModalIsOpen,
  setVerifApproveModalIsOpen,
  currentVerif,
  fetchVerifs,
}) => {
  let { user } = useSelector((state) => ({ ...state }));

  const { setSocketConnected } = ChatState();

  useEffect(() => {
    socket = io(
      process.env.REACT_APP_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true }
    );
  }, []);

  const approveVerif = async (verif) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/approve-verif`,
        { verif },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        socket.emit('new message', res.data);
        toast.success(`You have approved this verification.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchVerifs();
        setVerifApproveModalIsOpen(false);
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
              src={image.url}
              //   alt={`${postedBy.name || postedBy.email.split('@')[0]}'s post`}
            />
          </div>
        )}
        <br />
        <button
          className='submit-btn'
          onClick={() => approveVerif(currentVerif)}
        >
          Yes, I approve
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setVerifApproveModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default VerifApprove;
