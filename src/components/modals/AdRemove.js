import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

Modal.setAppElement('#root');

const AdRemove = ({
  adRemoveModalIsOpen,
  setAdRemoveModalIsOpen,
  currentAd,
  fetchAds,
  loading,
  setLoading,
}) => {
  let { token, _id } = useSelector((state) => state.user);

  const deleteAd = async (adId) => {
    await axios
      .delete(`${process.env.REACT_APP_API}/remove-ad/${adId}`, {
        headers: {
          authtoken: token,
        },
      })
      .then((res) => {
        toast.error('Ad deleted', {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchAds();
        setAdRemoveModalIsOpen(false);
      })
      .catch((err) => {
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

  const { content, image } = currentAd;
  console.log(currentAd);

  return (
    <Modal
      isOpen={adRemoveModalIsOpen}
      onRequestClose={() => setAdRemoveModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to delete this advertisement?</h1>
        <br />
        <p>{content}</p>
        <br />
        {image && (
          <div className='match-images'>
            <img src={image.url} alt='advertisement image' />
          </div>
        )}
        <br />
        <button className='submit-btn' onClick={() => deleteAd(currentAd._id)}>
          Yes, delete
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setAdRemoveModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default AdRemove;
