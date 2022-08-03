import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

Modal.setAppElement('#root');

const AdApprove = ({
  adApproveModalIsOpen,
  setAdApproveModalIsOpen,
  currentAd,
}) => {
  let { user } = useSelector((state) => ({ ...state }));

  const approveAd = async (ad) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/approve-ad`,
        { user, ad },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        toast.success(`You have approved this ad.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setAdApproveModalIsOpen(false);
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
      isOpen={adApproveModalIsOpen}
      onRequestClose={() => setAdApproveModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to approve this ad?</h1>
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
        <button className='submit-btn' onClick={() => approveAd(currentAd)}>
          Yes, I approve
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
