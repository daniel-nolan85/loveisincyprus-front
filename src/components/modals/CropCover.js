import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const CropCover = ({
  cropCoverModalIsOpen,
  setCropCoverModalIsOpen,
  coverImage,
  setCoverImage,
  imageUrl,
  crop,
  setCrop,
  croppedCover,
  setCroppedCover,
  coverImageCropped,
  setCoverImageCropped,
}) => {
  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  const isFirstRun = useRef(true);

  useEffect(() => {
    updateCover();
  }, [croppedCover]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      submitCropCover();
    }
  }, [coverImageCropped]);

  const saveCropCover = async () => {
    try {
      const canvas = document.createElement('canvas');
      const covImg = document.querySelector('.cover-image-to-crop');
      const scaleX = covImg.naturalWidth / covImg.width;
      const scaleY = covImg.naturalHeight / covImg.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        covImg,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
      const base64Image = canvas.toDataURL('image/jpeg', 1);
      setCroppedCover(base64Image);
    } catch (err) {
      console.log(err);
    }
  };

  const updateCover = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/crop-cover`,
        { user, croppedCover },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setCoverImage({
          url: res.data.url,
          public_id: res.data.public_id,
        });
        setCoverImageCropped(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitCropCover = async (e) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/profile-update`,
        {
          user,
          coverImage,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.success(`Cover picture updated.`, {
            position: toast.POSITION.TOP_CENTER,
          });
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              ...user,
              coverImage: res.data.coverImage,
            },
          });
        }
        setCropCoverModalIsOpen(false);
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
      height: '600px',
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
      isOpen={cropCoverModalIsOpen}
      onRequestClose={() => setCropCoverModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <ReactCrop crop={crop} aspect={16 / 9} onChange={setCrop}>
        <img
          src={imageUrl}
          alt=''
          className='cover-image-to-crop'
          crossOrigin='anonymous'
        />
      </ReactCrop>
      <div className='crop-controls'>
        <p>Select an area to crop</p>
        <FontAwesomeIcon
          icon={faFloppyDisk}
          className='fa save-crop'
          onClick={saveCropCover}
        />
      </div>
    </Modal>
  );
};

export default CropCover;
