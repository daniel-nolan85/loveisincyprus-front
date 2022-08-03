import React, { useState } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCamera,
  faSpinner,
  faPaperPlane,
  faBinoculars,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import AdPreview from '../../components/modals/AdPreview';

const AdSubmission = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [duration, setDuration] = useState('One day');
  const [previewModalIsOpen, setPreviewModalIsOpen] = useState(false);

  let { user } = useSelector((state) => ({ ...state }));

  const handlePreview = (ad) => {
    setPreviewModalIsOpen(true);
  };

  const adSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    await axios
      .post(
        `${process.env.REACT_APP_API}/submit-ad`,
        {
          content,
          image,
          user,
          duration,
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
          toast.success(`Your ad has been submitted for approval.`, {
            position: toast.POSITION.TOP_CENTER,
          });
          // console.log('post submit => ', res.data);
          setContent('');
          setImage({});
        }
      })
      .catch((err) => {
        setUploading(false);
        console.log(err);
      });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    await axios
      .post(`${process.env.REACT_APP_API}/upload-image`, formData, {
        headers: {
          authtoken: user.token,
        },
      })
      .then((res) => {
        setImage({
          url: res.data.url,
          public_id: res.data.public_id,
        });
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <h1 className='center'>
          Submitting an ad is as easy as creating a post...
        </h1>
        <h2>First, how long would you like your ad to be displayed?</h2>
        <select
          name='duration'
          onChange={(e) => setDuration(e.target.value)}
          value={duration}
        >
          <option value='one day'>One day</option>
          <option value='one week'>Every day</option>
          <option value='two weeks'>Two weeks</option>
          <option value='one month'>One month</option>
        </select>
        <br />
        <h2>Next, how do you want your ad to look?</h2>
        <div className='write-post-container'>
          <div className='user-profile'>
            <Link to={`/user/profile/${user._id}`}>
              <img
                src={user.profileImage ? user.profileImage.url : defaultProfile}
                alt={`${
                  user.name || user.email.split('@')[0]
                }'s profile picture`}
              />
            </Link>
            <Link to={`/user/profile/${user._id}`}>
              <p>{user.name || (user.email && user.email.split('@')[0])}</p>
            </Link>
          </div>
          <div className='post-input-container'>
            <form>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Say something about your product or service'
              />
            </form>
            <div className='write-post-footer'>
              <div className='add-post-links'>
                <label>
                  {image && image.url ? (
                    <img src={image.url} />
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
              </div>
              <button
                onClick={handlePreview}
                type='button'
                className='submit-btn preview'
                disabled={(!content && !image.url) || uploading}
              >
                <FontAwesomeIcon icon={faBinoculars} className='fa' />
                Preview
              </button>
              <button
                onClick={adSubmit}
                type='submit'
                className='submit-btn'
                disabled={(!content && !image.url) || uploading}
              >
                {uploading ? (
                  <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                ) : (
                  <FontAwesomeIcon icon={faPaperPlane} className='fa' />
                )}
                Submit
              </button>
            </div>
          </div>
        </div>
        <h2>Finally, enter your payment details.</h2>
        <p>You will not be charged until your submission has been approved.</p>
        <AdPreview
          content={content}
          image={image}
          previewModalIsOpen={previewModalIsOpen}
          setPreviewModalIsOpen={setPreviewModalIsOpen}
        />
      </div>
      <RightSidebar />
    </div>
  );
};

export default AdSubmission;
