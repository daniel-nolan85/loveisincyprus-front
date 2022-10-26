import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCamera,
  faSpinner,
  faPaperPlane,
  faBinoculars,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import axios from 'axios';
import AdPreview from '../../components/modals/AdPreview';
import AdContact from '../../components/forms/AdContact';
import AdPayment from '../../components/forms/AdPayment';
import { Checkbox } from 'antd';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import DurationInfo from '../../components/modals/DurationInfo';
import TargetingInfo from '../../components/modals/TargetingInfo';

const AdSubmission = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState('one day');
  const [durationInfoModalIsOpen, setDurationInfoModalIsOpen] = useState(false);
  const [targetingInfoModalIsOpen, setTargetingInfoModalIsOpen] =
    useState(false);
  const [previewModalIsOpen, setPreviewModalIsOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({});
  const [contactInfoSaved, setContactInfoSaved] = useState(false);
  const [accountInfo, setAccountInfo] = useState({});
  const [accountInfoSaved, setAccountInfoSaved] = useState(false);
  const [demographic, setDemographic] = useState([]);

  const handleDurationInfo = () => {
    setDurationInfoModalIsOpen(true);
  };

  const handleTargetingInfo = () => {
    setTargetingInfoModalIsOpen(true);
  };

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
          console.log('post submit => ', res.data);
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
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <h1 className='center'>Advertisement submission</h1>
        <br />
        <div className='ad-section'>
          <div className='ad-header'>
            <span className='number'>1</span>
            <h2>How long would you like your ad to be displayed?</h2>
            <div className='tooltip'>
              <FontAwesomeIcon
                icon={faCircleInfo}
                className='fa'
                onClick={handleDurationInfo}
              />
              <span className='tooltip-text'>Info about duration options</span>
            </div>
          </div>
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
        </div>
        <div className='ad-section'>
          <div className='ad-header'>
            <span className='number'>2</span>
            <h2>How do you want your ad to look?</h2>
          </div>
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
        </div>
        <div className='ad-section'>
          <div className='ad-header'>
            <span className='number'>3</span>
            <h2>Who are you targeting?</h2>
            <div className='tooltip'>
              <FontAwesomeIcon
                icon={faCircleInfo}
                className='fa'
                onClick={handleTargetingInfo}
              />
              <span className='tooltip-text'>Info about targeting options</span>
            </div>
          </div>
          <p>Select as many as you'd like.</p>
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
        </div>
        <div className='ad-section'>
          <div className='ad-header'>
            <span className='number'>4</span>
            <h2>How can we contact you?</h2>
          </div>
          <AdContact
            contactInfoSaved={contactInfoSaved}
            setContactInfoSaved={setContactInfoSaved}
            setContactInfo={setContactInfo}
            loading={loading}
          />
        </div>
        <div className='ad-section'>
          <div className='ad-header'>
            <span className='number'>5</span>
            <h2>Finally, please enter your payment details.</h2>
          </div>
          <p>
            You will not be charged until your submission has been approved.
          </p>
          <AdPayment
            accountInfoSaved={accountInfoSaved}
            setAccountInfoSaved={setAccountInfoSaved}
            setAccountInfo={setAccountInfo}
            loading={loading}
          />
          <AdPreview
            content={content}
            image={image}
            previewModalIsOpen={previewModalIsOpen}
            setPreviewModalIsOpen={setPreviewModalIsOpen}
          />
        </div>
        <button
          onClick={adSubmit}
          type='submit'
          className='submit-btn'
          disabled={
            !content ||
            Object.keys(contactInfo).length === 0 ||
            Object.keys(accountInfo).length === 0 ||
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
        <DurationInfo
          durationInfoModalIsOpen={durationInfoModalIsOpen}
          setDurationInfoModalIsOpen={setDurationInfoModalIsOpen}
        />
        <TargetingInfo
          targetingInfoModalIsOpen={targetingInfoModalIsOpen}
          setTargetingInfoModalIsOpen={setTargetingInfoModalIsOpen}
        />
      </div>
      <RightSidebar />
    </div>
  );
};

export default AdSubmission;
