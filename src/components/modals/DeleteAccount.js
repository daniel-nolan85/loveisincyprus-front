import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase/compat/app';
import { useHistory } from 'react-router-dom';

Modal.setAppElement('#root');

const DeleteAccount = ({
  deleteAccountModalIsOpen,
  setDeleteAccountModalIsOpen,
}) => {
  const [deleting, setDeleting] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  const history = useHistory();

  const deleteUser = async () => {
    setDeleting(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/delete-self/${user._id}`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        toast.error('User deleted', {
          position: toast.POSITION.TOP_CENTER,
        });
        setDeleteAccountModalIsOpen(false);
        setDeleting(false);
        firebase.auth().signOut();
        dispatch({
          type: 'LOGOUT',
          payload: null,
        });
        history.push('/authentication');
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

  return (
    <Modal
      isOpen={deleteAccountModalIsOpen}
      onRequestClose={() => setDeleteAccountModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to delete your account?</h1>
        <br />
        <p>All trace of your account will be permanently deleted.</p>
        <br />
        <p className='warning'>This action is irreversible!</p>
        <br />
        <button className='submit-btn' onClick={() => deleteUser()}>
          {deleting ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, delete'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setDeleteAccountModalIsOpen(false)}
          disabled={deleting}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteAccount;
