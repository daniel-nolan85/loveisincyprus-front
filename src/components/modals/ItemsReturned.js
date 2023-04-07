import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

Modal.setAppElement('#root');

const ItemsReturned = ({
  itemsReturnedModalIsOpen,
  setItemsReturnedModalIsOpen,
  currentRefund,
  fetchRefunds,
}) => {
  const [loadingReturned, setLoadingReturned] = useState(false);
  const [loadingUnreturned, setLoadingUnreturned] = useState(false);

  let { _id, token } = useSelector((state) => state.user);

  const handleReturnedItems = async (refund) => {
    setLoadingReturned(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/handle-returns`,
        { refund },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success('Confirmed - Items returned', {
          position: toast.POSITION.TOP_CENTER,
        });
        setItemsReturnedModalIsOpen(false);
        fetchRefunds();
        setLoadingReturned(false);
      })
      .catch((err) => {
        setLoadingReturned(false);
        console.log(err);
      });
  };

  const handleUnReturnedItems = async (refund) => {
    setLoadingUnreturned(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/handle-unreturns`,
        { refund },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.error('Confirmed - Items not returned', {
          position: toast.POSITION.TOP_CENTER,
        });
        setItemsReturnedModalIsOpen(false);
        fetchRefunds();
        setLoadingUnreturned(false);
      })
      .catch((err) => {
        setLoadingUnreturned(false);
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
      isOpen={itemsReturnedModalIsOpen}
      onRequestClose={() => setItemsReturnedModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Have these items been returned?</h1>
        <button
          className='submit-btn'
          onClick={() => handleReturnedItems(currentRefund)}
          disabled={loadingReturned || loadingUnreturned}
        >
          {loadingReturned ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faCheck} className='fa' />
          )}
          Yes
        </button>
        <button
          className='submit-btn trash'
          onClick={() => handleUnReturnedItems(currentRefund)}
          disabled={loadingReturned || loadingUnreturned}
        >
          {loadingUnreturned ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faXmark} className='fa' />
          )}
          No
        </button>
      </div>
    </Modal>
  );
};

export default ItemsReturned;
