import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  faHandBackFist,
  faArrowsRotate,
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
  const [flip, setFlip] = useState(false);
  const [loading, setLoading] = useState(false);

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
      top: '60%',
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
          sign that displays your username and email.
        </h2>
        <div>
          <div>
            {!webcamEnabled && !verifImg && (
              <label
                className='verif-upload'
                onClick={() => {
                  setWebcamEnabled(true);
                  setLoading(true);
                }}
              >
                <FontAwesomeIcon icon={faCamera} className='fa' />
              </label>
            )}
          </div>
          {webcamEnabled && (
            <>
              {loading ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className='fa webcam-loader'
                  spin
                />
              ) : (
                <div className='verif-icons'>
                  <div className='tooltip'>
                    <FontAwesomeIcon
                      icon={faCamera}
                      className='fa camera'
                      onClick={capturePhoto}
                    />
                    <span className='tooltip-text' style={{ zIndex: '9999' }}>
                      Take photo
                    </span>
                  </div>
                  <div className='tooltip'>
                    <FontAwesomeIcon
                      icon={faArrowsRotate}
                      className='fa camera'
                      onClick={() => setFlip(!flip)}
                    />
                    <span className='tooltip-text' style={{ zIndex: '9999' }}>
                      {flip ? 'Right-handed?' : 'Left-handed?'}
                    </span>
                  </div>
                  <div className='tooltip'>
                    <FontAwesomeIcon
                      icon={faUndo}
                      className='fa reset'
                      onClick={() => setVerifImg(null)}
                    />
                    <span className='tooltip-text' style={{ zIndex: '9999' }}>
                      Retake
                    </span>
                  </div>
                </div>
              )}
              {!verifImg ? (
                <div className='webcam-container'>
                  <Webcam
                    ref={webcamRef}
                    screenshotFormat='image/jpeg'
                    screenshotQuality={1}
                    width={360}
                    onUserMedia={() => setLoading(false)}
                  />
                  {!loading && (
                    <div
                      className={`${
                        flip ? 'webcam-overlay webcam-flip' : 'webcam-overlay '
                      }`}
                    >
                      <svg height='100%' width='100%'>
                        <defs>
                          <mask
                            id='mask'
                            x='0'
                            y='0'
                            width='100%'
                            height='100%'
                          >
                            <rect
                              width='100%'
                              height='100%'
                              fill='rgb(255, 255, 255)'
                            ></rect>
                            <ellipse
                              cx='110'
                              cy='115'
                              rx='75'
                              ry='100'
                            ></ellipse>
                            <rect
                              x='222'
                              y='72'
                              width='120'
                              height='150'
                              rx='5'
                              ry='5'
                            ></rect>
                          </mask>
                        </defs>
                        <rect
                          width='100%'
                          height='100%'
                          mask='url(#mask)'
                          fill='rgba(0, 0, 0, .8)'
                        ></rect>
                      </svg>
                      <div className='face-position-indicator' />
                      <div className='doc-position-indicator'></div>
                      <FontAwesomeIcon icon={faHandBackFist} className='fa' />
                    </div>
                  )}
                </div>
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
              setVerifImg(null);
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
