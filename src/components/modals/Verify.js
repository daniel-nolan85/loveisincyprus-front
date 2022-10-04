import React, { useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCamera,
  faSpinner,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const Verify = ({
  verifyModalIsOpen,
  setVerifyModalIsOpen,
  uploading,
  setUploading,
  verifImg,
  setVerifImg,
  loadingImg,
  setLoadingImg,
}) => {
  let { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('image', file);
    setLoadingImg(true);

    await axios
      .post(`${process.env.REACT_APP_API}/upload-image`, formData, {
        headers: {
          authtoken: user.token,
        },
      })
      .then((res) => {
        setVerifImg({
          url: res.data.url,
          public_id: res.data.public_id,
        });
        setLoadingImg(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingImg(false);
      });
  };

  const getVerified = async (e) => {
    console.log('verifImg => ', verifImg);
    e.preventDefault();
    setUploading(true);

    await axios
      .post(
        `${process.env.REACT_APP_API}/submit-verif`,
        {
          verifImg,
          user,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setUploading(false);
        if (res.data.error) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.success(`Your submission has been sent.`, {
            position: toast.POSITION.TOP_CENTER,
          });
          setVerifImg({});
          setVerifyModalIsOpen(false);
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              ...user,
              verified: 'pending',
            },
          });
        }
      })
      .catch((err) => {
        setUploading(false);
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
      zIndex: '1000',
    },
  };

  return (
    <Modal
      isOpen={verifyModalIsOpen}
      onRequestClose={() => setVerifyModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>
          To get verified, please update a photo of yourself holding a sign that
          displays your name
        </h1>
        <br />
        <div>
          <div>
            {loadingImg ? (
              <FontAwesomeIcon icon={faSpinner} className='fa' spin />
            ) : (
              <label className='verif-upload'>
                {verifImg && verifImg.url ? (
                  <img src={verifImg.url} />
                ) : (
                  <FontAwesomeIcon icon={faCamera} className='fa' />
                )}
                <input
                  onChange={handleImage}
                  type='file'
                  accept='images/*'
                  hidden
                />
              </label>
            )}
          </div>
          <button
            onClick={getVerified}
            type='submit'
            className='submit-btn'
            disabled={!verifImg.url || uploading}
          >
            {uploading ? (
              <FontAwesomeIcon icon={faSpinner} className='fa' spin />
            ) : (
              <FontAwesomeIcon icon={faPaperPlane} className='fa' />
            )}
            Submit
          </button>
          <button
            className='submit-btn trash'
            onClick={() => setVerifyModalIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Verify;
