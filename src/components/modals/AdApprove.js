import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const AdApprove = ({
  adApproveModalIsOpen,
  setAdApproveModalIsOpen,
  currentAd,
  fetchAds,
  loading,
  setLoading,
}) => {
  let { token } = useSelector((state) => state.user);

  const capturePayment = async (ad) => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_API}/capture-paypal-ad-auth`,
        { authId: ad.authId },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success(`Payment successfully captured.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        approveAd(ad);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const approveAd = async (ad) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/approve-ad`,
        { ad },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        toast.success(
          `You have approved this ad. A confirmation email has been sent to the user.`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        fetchAds();
        setAdApproveModalIsOpen(false);
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
      isOpen={adApproveModalIsOpen}
      onRequestClose={() => setAdApproveModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to approve this ad?</h1>
        <br />
        <h3>
          Approving the ad will result in capturing the member's payment. This
          ad will then be displayed to it's demographic upon successful receipt.
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
        <button
          className='submit-btn'
          onClick={() => capturePayment(currentAd)}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, I approve'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setAdApproveModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default AdApprove;
