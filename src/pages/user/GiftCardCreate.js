import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCamera,
  faSpinner,
  faPaperPlane,
  faBinoculars,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import axios from 'axios';
import GCPreview from '../../components/modals/GCPreview';
import AdPayment from '../../components/forms/AdPayment';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import Mobile from '../../components/user/Mobile';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';

const GiftCardCreate = () => {
  const [thisUser, setThisUser] = useState({});
  const [greeting, setGreeting] = useState('');
  const [image, setImage] = useState({});
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('0.00');
  const [validAmount, setValidAmount] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewGCModalIsOpen, setPreviewGCModalIsOpen] = useState(false);
  const [accountInfo, setAccountInfo] = useState({});

  const { userId } = useParams();

  const { user } = useSelector((state) => ({ ...state }));

  console.log('validAmount => ', validAmount);
  console.log('amount => ', amount);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  useEffect(() => {
    setValidAmount(validateAmount(amount));
  }, [amount]);

  const fetchUser = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/gc-user/${userId}`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setThisUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { name, profileImage, username, _id } = thisUser;

  const handlePreview = (ad) => {
    setPreviewGCModalIsOpen(true);
  };

  // const adSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   await axios
  //     .post(`${process.env.REACT_APP_API}/submit-ad`, {
  //       content,
  //       image,
  //       duration,
  //       demographic,
  //       contactInfo,
  //       accountInfo,
  //     })
  //     .then((res) => {
  //       setLoading(false);
  //       if (res.data.error) {
  //         toast.error(res.data.error, {
  //           position: toast.POSITION.TOP_CENTER,
  //         });
  //       } else {
  //         toast.success(`Your ad has been submitted for approval.`, {
  //           position: toast.POSITION.TOP_CENTER,
  //         });
  //         setContent('');
  //         setImage({});
  //         setDuration('one day');
  //         setContactInfo({});
  //         setAccountInfo({});
  //         setDemographic([]);
  //         setSelectedGender([]);
  //         setSelectedAge([]);
  //         setSelectedLocation([]);
  //       }
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       console.log(err);
  //     });
  // };

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

  const validateAmount = (amount) => {
    var re = /^[0-9]*\.[0-9]{2}$/;
    return re.test(amount);
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        <h1 className='center'>Create gift card for</h1>
        <div className='target-user-info'>
          <Link to={`/user/${_id}`}>
            <img
              src={profileImage ? profileImage.url : defaultProfile}
              alt={`${username || name}'s profile picture`}
            />
            <h2>{username || name}</h2>
          </Link>
        </div>
        <br />
        <div className='ad-section'>
          <div className='ad-header'>
            <span className='number'>1</span>
            <h2>How would you like the front of your card to look?</h2>
          </div>
          <div className='write-post-container'>
            <div className='ad-input-container'>
              <form>
                <textarea
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  placeholder={`Write a greeting to ${username || name}`}
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
              </div>
            </div>
          </div>
        </div>
        <div className='ad-section'>
          <div className='ad-header'>
            <span className='number'>2</span>
            <h2>What would you like to say to {username || name}?</h2>
          </div>
          <div className='write-post-container'>
            <div className='ad-input-container'>
              <form>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Write a message to ${username || name}`}
                />
              </form>
            </div>
          </div>
        </div>
        <div className='ad-section'>
          <div className='ad-header'>
            <span className='number'>3</span>
            <h2>How much would you like your gift voucher to be worth?</h2>
          </div>
          <div className='write-post-container'>
            <div className='gift-card-amount'>
              €
              <input
                type='number'
                style={{ width: `${amount.length}ch` }}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          onClick={handlePreview}
          type='button'
          className='submit-btn preview'
          // disabled={(!content && !image.url) || uploading}
        >
          <FontAwesomeIcon icon={faBinoculars} className='fa' />
          See how your card will look
        </button>
        <div className='ad-section'>
          <div className='ad-header'>
            <span className='number'>5</span>
            <h2>Finally, please enter your payment details.</h2>
          </div>
          {/* <AdPayment
            accountInfoSaved={accountInfoSaved}
            setAccountInfoSaved={setAccountInfoSaved}
            setAccountInfo={setAccountInfo}
            loading={loading}
          /> */}
          <GCPreview
            greeting={greeting}
            image={image}
            message={message}
            amount={amount}
            previewGCModalIsOpen={previewGCModalIsOpen}
            setPreviewGCModalIsOpen={setPreviewGCModalIsOpen}
          />
        </div>
        <button
          // onClick={adSubmit}
          type='submit'
          className='submit-btn'
          disabled={!greeting || uploading || loading}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} className='fa' />
          )}
          Send your card
        </button>
      </div>
      <RightSidebar />
    </div>
  );
};

export default GiftCardCreate;
