import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import renderHtml from 'react-render-html';

Modal.setAppElement('#root');

const MessageDelete = ({
  messageDeleteModalIsOpen,
  setMessageDeleteModalIsOpen,
  messageToDelete,
  fetchMessages,
  fetchReportedContent,
}) => {
  const [deleting, setDeleting] = useState(false);

  let { _id, token } = useSelector((state) => state.user);

  const deleteMessage = async (message) => {
    setDeleting(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/admin/delete-message/${message._id}`,
        { _id, message },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        toast.error('Message deleted', {
          position: toast.POSITION.TOP_CENTER,
        });
        setMessageDeleteModalIsOpen(false);
        fetchReportedContent();
        fetchMessages();
        setDeleting(false);
      })
      .catch((err) => {
        setDeleting(false);
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

  const { content, sender, image } = messageToDelete;

  return (
    <Modal
      isOpen={messageDeleteModalIsOpen}
      onRequestClose={() => setMessageDeleteModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to delete this message?</h1>
        <br />
        <p>{content && renderHtml(content)}</p>
        <br />
        {image && (
          <div className='match-images'>
            <img src={image.url} alt='message image' />
          </div>
        )}
        <br />
        <button
          className='submit-btn'
          onClick={() => deleteMessage(messageToDelete)}
        >
          {deleting ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, delete'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setMessageDeleteModalIsOpen(false)}
          disabled={deleting}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default MessageDelete;
