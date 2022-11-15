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

const CropProfilePic = ({
  cropModalIsOpen,
  setCropModalIsOpen,
  profileImage,
  setProfileImage,
  imageUrl,
  crop,
  setCrop,
  croppedProfile,
  setCroppedProfile,
  profileImageCropped,
  setProfileImageCropped,
}) => {
  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  const isFirstRun = useRef(true);

  useEffect(() => {
    updateProfilePic();
  }, [croppedProfile]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      submitCropProfile();
    }
  }, [profileImageCropped]);

  const saveCropProfile = async () => {
    try {
      const canvas = document.createElement('canvas');
      const profImg = document.querySelector('.profile-image-to-crop');
      const scaleX = profImg.naturalWidth / profImg.width;
      const scaleY = profImg.naturalHeight / profImg.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        profImg,
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
      console.log('base64Image => ', base64Image);
      setCroppedProfile(base64Image);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProfilePic = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/crop-profile`,
        { user, croppedProfile },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setProfileImage({
          url: res.data.url,
          public_id: res.data.public_id,
        });
        setProfileImageCropped(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitCropProfile = async (e) => {
    // setLoading(true);

    await axios
      .put(
        `${process.env.REACT_APP_API}/profile-update`,
        {
          user,
          profileImage,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        // setLoading(false);
        console.log('submitCropProfile response ==> ', res.data);

        if (res.data.error) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.success(`Profile picture updated.`, {
            position: toast.POSITION.TOP_CENTER,
          });
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              ...user,
              profileImage: res.data.profileImage,
            },
          });
        }
        setCropModalIsOpen(false);
      })
      .catch((err) => {
        // setLoading(false);
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
      isOpen={cropModalIsOpen}
      onRequestClose={() => setCropModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <ReactCrop crop={crop} aspect={1} onChange={setCrop}>
        <img
          src={imageUrl}
          alt=''
          className='profile-image-to-crop'
          crossOrigin='anonymous'
        />
      </ReactCrop>
      <div className='crop-controls'>
        <p>Select an area to crop</p>
        <FontAwesomeIcon
          icon={faFloppyDisk}
          className='fa save-crop'
          // disabled={
          //   !profileCropCompleted.width || !profileCropCompleted?.height
          // }
          onClick={saveCropProfile}
        />
      </div>
    </Modal>
  );
};

export default CropProfilePic;
