import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCamera,
  faSpinner,
  faPaperPlane,
  faBinoculars,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import axios from 'axios';
import GCPreview from '../../components/modals/GCPreview';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import Mobile from '../../components/user/Mobile';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';
import logo64 from '../../assets/logo64.png';
import io from 'socket.io-client';
import GiftCard from '../../components/paypal/GIftCard';

let socket;

const GiftCardCreate = () => {
  const [thisUser, setThisUser] = useState({});
  const [greeting, setGreeting] = useState('');
  const [image, setImage] = useState({});
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('0.00');
  const [validAmount, setValidAmount] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [previewGCModalIsOpen, setPreviewGCModalIsOpen] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  const { userId } = useParams();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    fetchUser();
  }, [userId]);

  useEffect(() => {
    socket = io(
      process.env.REACT_APP_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true },
      { secure: true }
    );
  }, []);

  useEffect(() => {
    if (amount === '0.00' || amount === '.00') {
      setValidAmount(false);
      return;
    } else {
      setValidAmount(validateAmount(amount));
    }
  }, [amount]);

  useEffect(() => {
    function makeid(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
    if (!succeeded) setCouponCode('GIFT-' + makeid(8));
  }, [succeeded]);

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
        setUserLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { name, profileImage, username, _id } = thisUser;

  const handlePreview = (ad) => {
    setPreviewGCModalIsOpen(true);
  };

  const cardSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_API}/send-card`, {
        greeting,
        image,
        message,
        amount,
        succeeded,
        from: user._id,
        to: _id,
        couponCode,
      })
      .then(async (res) => {
        setLoading(false);
        if (res.data.error) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.success(`Your card has been sent to ${username || name}.`, {
            position: toast.POSITION.TOP_CENTER,
          });
          setGreeting('');
          setImage({});
          setMessage('');
          setAmount('0.00');
          setSucceeded(false);
          socket.emit('new gift card', res.data);
          await axios.post(
            `${process.env.REACT_APP_API}/send-push-notification`,
            {
              _id,
              payload: {
                title: 'New Gift Card',
                body: `${user.username || user.name} has sent you a gift card`,
                icon: logo64,
              },
            },
            {
              headers: {
                authtoken: user.token,
              },
            }
          );
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

  const validateAmount = (amount) => {
    var re = /^[0-9]*\.[0-9]{2}$/;
    return re.test(amount);
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        {userLoading ? (
          <div className='spinner'>
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          </div>
        ) : (
          <>
            <h1 className='center'>Create a gift card for</h1>
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
                          <FontAwesomeIcon
                            icon={faSpinner}
                            className='fa'
                            spin
                          />
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
                <h2>
                  How much would you like {username || name}'s gift voucher to
                  be worth?
                </h2>
              </div>
              <div className='write-post-container'>
                <div className='gift-card-amount'>
                  €
                  <input
                    type='number'
                    style={{ width: `${amount.length}ch` }}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    readOnly={succeeded}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handlePreview}
              type='button'
              className='submit-btn preview'
            >
              <FontAwesomeIcon icon={faBinoculars} className='fa' />
              See how your card will look
            </button>
            {!succeeded ? (
              <div className='ad-section'>
                <div className='ad-header'>
                  <span className='number'>4</span>
                  <h2>Finally, please choose a method of payment.</h2>
                </div>
                <GiftCard
                  amount={amount}
                  validAmount={validAmount}
                  succeeded={succeeded}
                  setSucceeded={setSucceeded}
                />
              </div>
            ) : (
              <div className='ps-success'>
                <div className='ps-icon-container'>
                  <FontAwesomeIcon icon={faCheck} className='fa' />
                </div>
                <h2>Thank You!</h2>
                <p>Your payment has been approved.</p>
              </div>
            )}
            <button
              onClick={cardSubmit}
              type='submit'
              className={succeeded ? 'mt submit-btn' : 'submit-btn'}
              style={{ marginTop: '0' }}
              disabled={
                !greeting ||
                !message ||
                !amount ||
                !validAmount ||
                uploading ||
                loading ||
                !succeeded
              }
            >
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} className='fa' spin />
              ) : (
                <FontAwesomeIcon icon={faPaperPlane} className='fa' />
              )}
              Send your card
            </button>
          </>
        )}
        <GCPreview
          greeting={greeting}
          image={image}
          message={message}
          amount={amount}
          previewGCModalIsOpen={previewGCModalIsOpen}
          setPreviewGCModalIsOpen={setPreviewGCModalIsOpen}
        />
      </div>
      <RightSidebar />
    </div>
  );
};

export default GiftCardCreate;
