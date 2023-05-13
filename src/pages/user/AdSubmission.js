import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCamera,
  faSpinner,
  faPaperPlane,
  faBinoculars,
  faCircleInfo,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import axios from 'axios';
import AdPreview from '../../components/modals/AdPreview';
import AdContact from '../../components/forms/AdContact';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import HyperlinkInfo from '../../components/modals/HyperlinkInfo';
import DurationInfo from '../../components/modals/DurationInfo';
import TargetingInfo from '../../components/modals/TargetingInfo';
import Mobile from '../../components/user/Mobile';

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
  const [demographic, setDemographic] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [showGender, setShowGender] = useState(false);
  const [showAge, setShowAge] = useState(false);
  const [selectedAge, setSelectedAge] = useState([]);
  const [showLocation, setShowLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [hyperlink, setHyperlink] = useState('');
  const [hyperlinkInfoModalIsOpen, setHyperlinkInfoModalIsOpen] =
    useState(false);

  useEffect(() => {
    let selectedOpts = selectedGender.concat(selectedAge, selectedLocation);
    setDemographic(selectedOpts);
  }, [selectedGender, selectedAge, selectedLocation]);

  const handleHyperlinkInfo = () => {
    setHyperlinkInfoModalIsOpen(true);
  };

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
        hyperlink,
        content,
        image,
        duration,
        demographic,
        contactInfo,
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
          setContent('');
          setImage({});
          setDuration('one day');
          setContactInfo({});
          setDemographic([]);
          setSelectedGender([]);
          setSelectedAge([]);
          setSelectedLocation([]);
          setHyperlink('');
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

  const handleHyperlink = (e) => {
    let value = e.target.value.trim();
    value = value.replace(/^http:\/\//i, '');

    if (value && !value.startsWith('https://')) {
      value = `https://${value}`;
    }
    value = value.replace(/^https?:\/\/(https?:\/\/)/, 'https://');
    setHyperlink(value);
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        <h1 className='center'>Advertisement Submission</h1>
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
            <h2>Do you want to add an external link?</h2>
            <div className='tooltip'>
              <FontAwesomeIcon
                icon={faCircleInfo}
                className='fa'
                onClick={handleHyperlinkInfo}
              />
              <span className='tooltip-text'>Info about external links</span>
            </div>
          </div>
          <input
            className='input-field'
            type='text'
            placeholder='Add an external link to your site if you have one'
            onChange={handleHyperlink}
            value={hyperlink}
          />
        </div>
        <div className='ad-section'>
          <div className='ad-header'>
            <span className='number'>3</span>
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
            <span className='number'>4</span>
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
          <p>
            Hold down `Ctrl` on Windows or 'Command' on Mac to select multiple
            options.
          </p>
          <p>
            If you skip this section your ad will be displayed to all users.
          </p>
          <div className='ad-demographic'>
            <div className='ad-select-options'>
              <label
                htmlFor='gender'
                onClick={() => {
                  setShowGender(!showGender);
                  setShowAge(false);
                  setShowLocation(false);
                }}
              >
                Select gender
                <FontAwesomeIcon
                  icon={!showGender ? faCaretDown : faCaretUp}
                  className='fa'
                />
              </label>
              {showGender && (
                <select
                  id='gender'
                  onChange={(e) => {
                    setSelectedGender(
                      [...e.target.selectedOptions].map((opt) => opt.value)
                    );
                  }}
                  multiple
                  size={2}
                >
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                </select>
              )}
              <br />
              <label
                htmlFor='age'
                onClick={() => {
                  setShowAge(!showAge);
                  setShowGender(false);
                  setShowLocation(false);
                }}
              >
                Select age
                <FontAwesomeIcon
                  icon={!showAge ? faCaretDown : faCaretUp}
                  className='fa'
                />
              </label>
              {showAge && (
                <select
                  id='age'
                  onChange={(e) =>
                    setSelectedAge(
                      [...e.target.selectedOptions].map((opt) => opt.value)
                    )
                  }
                  multiple
                  size={4}
                >
                  <option value='18-30 year olds'>18-30 year olds</option>
                  <option value='30-45 year olds'>30-45 year olds</option>
                  <option value='45-60 year olds'>45-60 year olds</option>
                  <option value='Over 60s'>Over 60s</option>
                </select>
              )}
              <br />
              <label
                htmlFor='location'
                onClick={() => {
                  setShowLocation(!showLocation);
                  setShowGender(false);
                  setShowAge(false);
                }}
              >
                Select location
                <FontAwesomeIcon
                  icon={!showLocation ? faCaretDown : faCaretUp}
                  className='fa'
                />
              </label>
              {showLocation && (
                <select
                  id='location'
                  onChange={(e) =>
                    setSelectedLocation(
                      [...e.target.selectedOptions].map((opt) => opt.value)
                    )
                  }
                  multiple
                  size={5}
                >
                  <option value='Ayia Napa'>Ayia Napa</option>
                  <option value='Larnaca'>Larnaca</option>
                  <option value='Limassol'>Limassol</option>
                  <option value='Nicosia'>Nicosia</option>
                  <option value='Paphos'>Paphos</option>
                </select>
              )}
            </div>
            <div className='ad-selected-options'>
              {selectedGender &&
                selectedGender.map((g, i) => <span key={i}>{g}</span>)}
              <br />
              {selectedAge &&
                selectedAge.map((a, i) => <span key={i}>{a}</span>)}
              <br />
              {selectedLocation &&
                selectedLocation.map((l, i) => <span key={i}>{l}</span>)}
            </div>
          </div>
        </div>
        <div className='ad-section'>
          <div className='ad-header'>
            <span className='number'>5</span>
            <h2>How can we contact you?</h2>
          </div>
          <AdContact
            contactInfoSaved={contactInfoSaved}
            setContactInfoSaved={setContactInfoSaved}
            setContactInfo={setContactInfo}
            loading={loading}
          />
        </div>
        <button
          onClick={adSubmit}
          type='submit'
          className='submit-btn'
          disabled={
            !content ||
            Object.keys(contactInfo).length === 0 ||
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
        <AdPreview
          content={content}
          image={image}
          previewModalIsOpen={previewModalIsOpen}
          setPreviewModalIsOpen={setPreviewModalIsOpen}
          hyperlink={hyperlink}
        />
        <HyperlinkInfo
          hyperlinkInfoModalIsOpen={hyperlinkInfoModalIsOpen}
          setHyperlinkInfoModalIsOpen={setHyperlinkInfoModalIsOpen}
        />
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
