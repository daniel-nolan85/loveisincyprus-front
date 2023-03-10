import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ProfileUpload = ({
  newProfileImages,
  setNewProfileImages,
  setProfileImageUpdateModalIsOpen,
  setLoadingProfileImg,
}) => {
  const { token } = useSelector((state) => state.user);

  const fileUploadAndResize = (e) => {
    let files = e.target.files;
    let allUploadedFiles = newProfileImages;

    if (files) {
      setLoadingProfileImg(true);
      setProfileImageUpdateModalIsOpen(false);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/upload-images`,
                { image: uri },
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
          },
          'base64'
        );
      }
    }
  };

  return (
    <div className='add-post-links'>
      <label>
        <input
          onChange={fileUploadAndResize}
          type='file'
          multiple
          accept='images/*'
          hidden
        />
      </label>
    </div>
  );
};

export default ProfileUpload;
