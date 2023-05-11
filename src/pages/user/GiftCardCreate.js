import React, { useState, useEffect, useRef } from 'react';
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
import GCPaymentForm from '../../components/forms/GCPaymentForm';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import Mobile from '../../components/user/Mobile';
import { createGCPayment } from '../../functions/cardinity';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';
import io from 'socket.io-client';
import CardinityPending from '../../components/modals/CardinityPending';

let socket;

const GiftCardCreate = () => {
  const [thisUser, setThisUser] = useState({});
  const [greeting, setGreeting] = useState('');
  const [image, setImage] = useState({});
  const [message, setMessage] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardHolder: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [formReady, setFormReady] = useState(false);
  const [amount, setAmount] = useState('0.00');
  const [validAmount, setValidAmount] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [previewGCModalIsOpen, setPreviewGCModalIsOpen] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [userAgent, setUserAgent] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [cardinityPendingModalIsOpen, setCardinityPendingModalIsOpen] =
    useState(false);
  const [pendingFormData, setPendingFormData] = useState('');

  const { userId } = useParams();

  const { user } = useSelector((state) => ({ ...state }));

  const isFirstRun = useRef(true);
  const formikRef = useRef();

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
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      if (formReady) paymentSubmit();
    }
  }, [paymentDetails, formReady]);

  useEffect(() => {
    setUserAgent(window.navigator.userAgent);
  }, []);

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

  useEffect(() => {
    const pendingGCDataString = localStorage.getItem('pendingGCData');
    const pendingGCDataObj = JSON.parse(pendingGCDataString);
    if (pendingGCDataString !== null) {
      setAmount(pendingGCDataObj.amount);
      setGreeting(pendingGCDataObj.greeting);
      setImage(pendingGCDataObj.image);
      setMessage(pendingGCDataObj.message);
      setSucceeded(pendingGCDataObj.succeeded);
      setPaymentDetails(pendingGCDataObj.paymentDetails);
    }
  }, []);

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
        console.log(res.data);
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

  const paymentSubmit = () => {
    if (!amount || !validAmount) {
      toast.error(`Please enter an amount.`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setFormReady(false);
      return;
    }
    const pendingGCData = {
      _id,
      greeting,
      image,
      message,
      amount,
      succeeded,
      paymentDetails,
    };
    localStorage.setItem('pendingGCData', JSON.stringify(pendingGCData));
    setProcessing(true);
    createGCPayment(paymentDetails, amount, userAgent, user.token)
      .then((res) => {
        if (res.data.errors) {
          toast.error(res.data.errors[0].message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setProcessing(false);
        }
        if (res.data.status === 'approved') {
          toast.success(`Payment successful! Your card is ready to send.`, {
            position: toast.POSITION.TOP_CENTER,
          });
          localStorage.removeItem('pendingGCData');
          setProcessing(false);
          setSucceeded(true);
        } else if (res.data.status === 'pending') {
          console.log(res.data);
          setCardinityPendingModalIsOpen(true);
          setPendingFormData(res.data);
          toast.warning(`Payment pending.`, {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        } else if (res.data.status === 'declined') {
          toast.error(`Payment declined.`, {
            position: toast.POSITION.TOP_CENTER,
          });
          setProcessing(false);
        } else if (res.data.status === 401) {
          toast.error(res.data.detail, {
            position: toast.POSITION.TOP_CENTER,
          });
          setProcessing(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Payment declined.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setProcessing(false);
      });
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
      .then((res) => {
        setLoading(false);
        if (res.data.error) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          localStorage.removeItem('pendingGCData');
          toast.success(`Your card has been sent to ${username || name}.`, {
            position: toast.POSITION.TOP_CENTER,
          });
          setGreeting('');
          setImage({});
          setMessage('');
          setAmount('0.00');
          setSucceeded(false);
          setFormReady(false);
          setPaymentDetails({
            cardHolder: '',
            cardNumber: '',
            expiry: '',
            cvc: '',
          });
          formikRef.current.resetForm();
          socket.emit('new gift card', res.data);
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
            <div className='ad-section'>
              <div className='ad-header'>
                <span className='number'>5</span>
                <h2>Finally, please enter your payment details.</h2>
              </div>
              <GCPaymentForm
                paymentDetails={paymentDetails}
                setPaymentDetails={setPaymentDetails}
                setFormReady={setFormReady}
                processing={processing}
                succeeded={succeeded}
                formikRef={formikRef}
              />
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
              onClick={cardSubmit}
              type='submit'
              className='submit-btn'
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
      </div>
      <RightSidebar />
      <CardinityPending
        cardinityPendingModalIsOpen={cardinityPendingModalIsOpen}
        pendingFormData={pendingFormData}
      />
    </div>
  );
};

export default GiftCardCreate;
