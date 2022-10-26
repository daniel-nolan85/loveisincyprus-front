import React from 'react';
import Modal from 'react-modal';
import { refundSubscription } from '../../functions/cardinity';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const CancelSubscription = ({
  cancelSubscriptionModalIsOpen,
  setCancelSubscriptionModalIsOpen,
}) => {
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
      zIndex: '1000',
    },
  };

  const cancelSubscription = async () => {
    refundSubscription(user, user.token)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            membership: res.data.membership,
          },
        });
        toast.success(
          `Your subscription has been cancelled and your payment has been refunded.`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      isOpen={cancelSubscriptionModalIsOpen}
      onRequestClose={() => setCancelSubscriptionModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to cancel your subscription?</h1>
        <br />
        <p>
          You will lose access to all paid features such as compatibility
          analysis and user messaging services.
        </p>
        <br />
        <button
          className='submit-btn'
          onClick={() => {
            cancelSubscription();
            setCancelSubscriptionModalIsOpen(false);
          }}
        >
          Yes, I'm sure
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setCancelSubscriptionModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default CancelSubscription;
