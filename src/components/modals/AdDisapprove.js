import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

Modal.setAppElement('#root');

const AdDisapprove = ({
  adDisapproveModalIsOpen,
  setAdDisapproveModalIsOpen,
  currentAd,
  reason,
  setReason,
}) => {
  let { user } = useSelector((state) => ({ ...state }));

  const disapproveAd = async (ad) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/disapprove-ad`,
        { user, ad, reason },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        toast.error(`You have rejected this ad.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setAdDisapproveModalIsOpen(false);
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
  };

  const { content, image, postedBy } = currentAd;

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
        <p>{content}</p>
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
        <input
          type='text'
          className='input-field'
          placeholder='Give a reason?'
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button className='submit-btn' onClick={() => disapproveAd(currentAd)}>
          Yes, reject
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
