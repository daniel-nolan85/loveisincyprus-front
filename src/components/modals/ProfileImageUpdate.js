import React, { useState, useRef, useCallback } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCamera,
  faUndo,
  faSpinner,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import Webcam from 'react-webcam';
import ProfileUpload from '../forms/ProfileUpload';
import axios from 'axios';
import { useSelector } from 'react-redux';

Modal.setAppElement('#root');

const ProfileImageUpdate = ({
  profileImageUpdateModalIsOpen,
  setProfileImageUpdateModalIsOpen,
  newProfileImages,
  setNewProfileImages,
  setLoadingProfileImg,
}) => {
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [url, setUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.user);

  const webcamRef = useRef(null);

  const capturePhoto = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  }, [webcamRef]);

  const fileUploadAndResize = (e) => {
    let allUploadedFiles = newProfileImages;

    if (url) {
      setLoadingProfileImg(true);
      setProfileImageUpdateModalIsOpen(false);
      axios
        .post(
          `${process.env.REACT_APP_API}/upload-images`,
          { image: url },
          {
            headers: { authtoken: token ? token : '' },
          }
        )
        .then((res) => {
          setLoadingProfileImg(false);
          allUploadedFiles.push(res.data);
          setNewProfileImages([...allUploadedFiles]);
        })
        .catch((err) => {
          setLoadingProfileImg(false);
        });
    }
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
      isOpen={profileImageUpdateModalIsOpen}
      onRequestClose={() => {
        setProfileImageUpdateModalIsOpen(false);
        setWebcamEnabled(false);
      }}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        {!webcamEnabled && !url && (
          <>
            <h1 className='center'>
              How would you like to choose your profile picture?
            </h1>
            <div className='contact-form-btns'>
              <label className='submit-btn'>
                Select image(s)
                <ProfileUpload
                  newProfileImages={newProfileImages}
                  setNewProfileImages={setNewProfileImages}
                  setProfileImageUpdateModalIsOpen={
                    setProfileImageUpdateModalIsOpen
                  }
                  setLoadingProfileImg={setLoadingProfileImg}
                />
              </label>
              <button
                type='button'
                className='submit-btn reset'
                onClick={() => {
                  setWebcamEnabled(true);
                  setLoading(true);
                }}
              >
                Take photo
              </button>
            </div>
          </>
        )}

        {webcamEnabled && (
          <>
            {loading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                className='fa webcam-loader'
                spin
              />
            ) : (
              <>
                {!url && <h1 className='center'>Say cheese!</h1>}
                <div className='verif-icons'>
                  <FontAwesomeIcon
                    icon={faCamera}
                    className='fa camera'
                    onClick={capturePhoto}
                  />
                  <FontAwesomeIcon
                    icon={faUndo}
                    className='fa reset'
                    onClick={() => setUrl(null)}
                  />
                </div>
              </>
            )}
            {!url ? (
              <Webcam
                ref={webcamRef}
                screenshotFormat='image/jpeg'
                screenshotQuality={1}
                width={360}
                onUserMedia={() => setLoading(false)}
              />
            ) : (
              <>
                <img src={url} alt='screenshot' className='verif-img' />
                <button
                  type='button'
                  className='submit-btn'
                  onClick={() => fileUploadAndResize(url)}
                >
                  {uploading ? (
                    <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                  ) : (
                    <FontAwesomeIcon icon={faThumbsUp} className='fa' />
                  )}
                  Use this
                </button>
                <button
                  className='submit-btn trash'
                  onClick={() => {
                    setWebcamEnabled(false);
                    setUrl(null);
                  }}
                  disabled={uploading}
                >
                  Cancel
                </button>
              </>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default ProfileImageUpdate;
