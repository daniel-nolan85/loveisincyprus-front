import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCamera,
  faSpinner,
  faPaperPlane,
  faBinoculars,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import axios from 'axios';
import AdPreview from '../../components/modals/AdPreview';
import AdContact from '../../components/forms/AdContact';
import AdPayment from '../../components/forms/AdPayment';
import { Checkbox } from 'antd';

const AdSubmission = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState('one day');
  const [previewModalIsOpen, setPreviewModalIsOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({});
  const [accountInfo, setAccountInfo] = useState({});
  const [demographic, setDemographic] = useState([]);

  const handlePreview = (ad) => {
    setPreviewModalIsOpen(true);
  };

  const adSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_API}/submit-ad`, {
        content,
        image,
        duration,
        demographic,
        contactInfo,
        accountInfo,
      })
      .then((res) => {
        setLoading(false);
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
          setDuration('one day');
          setContactInfo({});
          setAccountInfo({});
          setDemographic([]);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    await axios
      .post(`${process.env.REACT_APP_API}/upload-ad-image`, formData)
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

  const handleCheck = (e) => {
    let checkedItems = demographic;
    let index;

    if (e.target.checked) {
      checkedItems.push(e.target.name);
    } else {
      index = checkedItems.indexOf(e.target.value);
      checkedItems.splice(index, 1);
    }
    console.log('checkedItems => ', checkedItems);
    setDemographic(checkedItems);
  };

  return (
    <div
      className='container'
      style={{
        justifyContent: 'center',
      }}
    >
      <div className='main-content'>
        <h2>How long would you like your ad to be displayed?</h2>
        <select
          name='duration'
          onChange={(e) => setDuration(e.target.value)}
          value={duration}
        >
          <option value='one day'>One day</option>
          <option value='one week'>One week</option>
          <option value='two weeks'>Two weeks</option>
          <option value='one month'>One month</option>
        </select>
        <br />
        <h2>How do you want your ad to look?</h2>
        <div className='write-post-container'>
          <div className='ad-input-container'>
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
                  {uploading ? (
                    <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                  ) : image && image.url ? (
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
            </div>
          </div>
        </div>
        <span>
          <h2>Who are you targeting?</h2>
          <h3>(select as many as you'd like)</h3>
        </span>
        <Checkbox name='everyone' onChange={handleCheck}>
          Everyone
        </Checkbox>
        <Checkbox name='male' onChange={handleCheck}>
          Males
        </Checkbox>
        <Checkbox name='female' onChange={handleCheck}>
          Females
        </Checkbox>
        <Checkbox name='18-30' onChange={handleCheck}>
          18-30 year olds
        </Checkbox>
        <Checkbox name='30-45' onChange={handleCheck}>
          30-45 year olds
        </Checkbox>
        <Checkbox name='45-60' onChange={handleCheck}>
          45-60 year olds
        </Checkbox>
        <Checkbox name='over 60' onChange={handleCheck}>
          Over 60 year olds
        </Checkbox>
        <h2>How can we contact you?</h2>
        <AdContact setContactInfo={setContactInfo} />
        <h2>Finally, please enter your payment details.</h2>
        <p>You will not be charged until your submission has been approved.</p>
        <AdPayment setAccountInfo={setAccountInfo} />
        <AdPreview
          content={content}
          image={image}
          previewModalIsOpen={previewModalIsOpen}
          setPreviewModalIsOpen={setPreviewModalIsOpen}
        />
        <button
          onClick={adSubmit}
          type='submit'
          className='submit-btn'
          disabled={
            (!content && !image.url) ||
            !contactInfo ||
            !accountInfo ||
            uploading ||
            loading
          }
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} className='fa' />
          )}
          Submit your ad
        </button>
      </div>
    </div>
  );
};

export default AdSubmission;
