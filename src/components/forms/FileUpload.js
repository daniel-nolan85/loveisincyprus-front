import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FileUpload = ({ values, setValues }) => {
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.user);

  const fileUploadAndResize = (e) => {
    let files = e.target.files;
    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
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
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
              });
          },
          'base64'
        );
      }
    }
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API}/remove-image`,
        { public_id },
        {
          headers: { authtoken: token ? token : '' },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((image) => {
          return image.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className='add-post-links'>
      <label>
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} className='fa' spin />
        ) : (
          <FontAwesomeIcon icon={faCamera} className='fa' />
        )}
        <input
          onChange={fileUploadAndResize}
          type='file'
          multiple
          accept='images/*'
          hidden
        />
      </label>
      {values.images &&
        values.images.map((image) => (
          <div className='uploaded-imgs' key={image.public_id}>
            <span
              className='delete'
              onClick={() => handleImageRemove(image.public_id)}
            >
              X
            </span>
            <img
              src={image.url}
              style={{ marginTop: '5px', marginLeft: '10px' }}
              alt='uploaded'
            />
          </div>
        ))}
    </div>
  );
};

export default FileUpload;
