import React, { useState, useRef, useCallback } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCamera,
  faSpinner,
  faPaperPlane,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import Webcam from 'react-webcam';

Modal.setAppElement('#root');

const Verify = ({
  verifyModalIsOpen,
  setVerifyModalIsOpen,
  uploading,
  setUploading,
  verifImg,
  setVerifImg,
}) => {
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  let { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  const webcamRef = useRef(null);

  const capturePhoto = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setVerifImg(imageSrc);
  }, [webcamRef]);

  const getVerified = async (e) => {
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
        setUploading(false);
        if (res.data.error) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.success(`Your submission has been sent.`, {
            position: toast.POSITION.TOP_CENTER,
          });
          setVerifImg(null);
          setWebcamEnabled(false);
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
      backgroundColor: 'rgba(0,0,0, .8)',
      zIndex: '1000',
      overflowY: 'auto',
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
          Verified users appear more trustworthy to other members and are more
          likely to receive interactions.
        </h1>
        <h2>You will also receive 80 points for successful verification.</h2>
        <h2>
          To become verified, please upload a live photo of yourself holding a
          sign that displays your name.
        </h2>
        <div>
          <div>
            {!webcamEnabled && !verifImg && (
              <label
                className='verif-upload'
                onClick={() => setWebcamEnabled(true)}
              >
                <FontAwesomeIcon icon={faCamera} className='fa' />
              </label>
            )}
          </div>
          {webcamEnabled && (
            <>
              <div className='verif-icons'>
                <FontAwesomeIcon
                  icon={faCamera}
                  className='fa camera'
                  onClick={capturePhoto}
                />
                <FontAwesomeIcon
                  icon={faUndo}
                  className='fa reset'
                  onClick={() => setVerifImg(null)}
                />
              </div>
              {!verifImg ? (
                <Webcam
                  ref={webcamRef}
                  screenshotFormat='image/jpeg'
                  screenshotQuality={1}
                  width={360}
                />
              ) : (
                <>
                  <img src={verifImg} alt='screenshot' className='verif-img' />
                </>
              )}
            </>
          )}
          <button
            onClick={getVerified}
            type='submit'
            className='submit-btn'
            disabled={!verifImg}
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
            onClick={() => {
              setVerifyModalIsOpen(false);
              setWebcamEnabled(false);
            }}
            disabled={uploading}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Verify;
