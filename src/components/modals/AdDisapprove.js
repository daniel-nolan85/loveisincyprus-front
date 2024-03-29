import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const AdDisapprove = ({
  adDisapproveModalIsOpen,
  setAdDisapproveModalIsOpen,
  currentAd,
  reason,
  setReason,
  fetchAds,
  loading,
  setLoading,
}) => {
  let { token } = useSelector((state) => state.user);

  const voidPayment = async (ad) => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_API}/void-paypal-ad-auth`,
        { authId: ad.authId },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        toast.success(`Payment returned to user.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        disapproveAd(ad);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const disapproveAd = async (ad) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/disapprove-ad`,
        { ad, reason },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        toast.error(
          `You have rejected this ad. A confirmation email has been sent to the user.`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        fetchAds();
        setAdDisapproveModalIsOpen(false);
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

  const { content, image, contactInfo } = currentAd;

  return (
    <Modal
      isOpen={adDisapproveModalIsOpen}
      onRequestClose={() => setAdDisapproveModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to reject approval on this ad?</h1>
        <br />
        <h3>
          Rejecting the ad will return the member's payment and this ad will
          then be deleted.
        </h3>
        <br />
        <p>{content}</p>
        <br />
        {image && (
          <div className='match-images'>
            <img src={image.url} alt={`${contactInfo.name}'s post`} />
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
        <button className='submit-btn' onClick={() => voidPayment(currentAd)}>
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, reject'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setAdDisapproveModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default AdDisapprove;
