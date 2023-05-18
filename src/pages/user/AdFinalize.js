import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import AdPayment from '../../components/forms/AdPayment';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import Mobile from '../../components/user/Mobile';
import { Link } from 'react-router-dom';
import { createAdPayment } from '../../functions/cardinity';
import CardinityPending from '../../components/modals/CardinityPending';
import axios from 'axios';

const AdFinalize = ({ history }) => {
  const [ad, setAd] = useState({});
  const [accountInfo, setAccountInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [payable, setPayable] = useState('');
  const [userAgent, setUserAgent] = useState('');
  const [cardinityPendingModalIsOpen, setCardinityPendingModalIsOpen] =
    useState(false);
  const [pendingFormData, setPendingFormData] = useState('');
  const [rerenderAds, setRerenderAds] = useState(false);
  const [status, setStatus] = useState('');
  const [succeeded, setSucceeded] = useState(false);
  const [approvedData, setApprovedData] = useState({});
  const [demographic, setDemographic] = useState([]);

  console.log('ad => ', ad);
  console.log('status => ', status);
  console.log('accountInfo => ', accountInfo);
  console.log('demographic => ', demographic);

  const isFirstRun = useRef(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const getAd = searchParams.get('ad');
    setAd(JSON.parse(decodeURIComponent(getAd)));
    setDemographic(JSON.parse(decodeURIComponent(getAd)).demographic);
  }, []);

  useEffect(() => {
    if (ad) {
      setLoading(false);
      preparePayment();
      checkAd();
    }
  }, [ad]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      if (accountInfo) adSubmit();
    }
  }, [accountInfo]);

  useEffect(() => {
    if (succeeded)
      history.push({
        pathname: '/ad-successful',
        state: { approvedData, demographic },
      });
  }, [approvedData]);

  const preparePayment = () => {
    if (ad.duration === 'one day') {
      setPayable('5.00');
    }
    if (ad.duration === 'one week') {
      setPayable('20.00');
    }
    if (ad.duration === 'two weeks') {
      setPayable('30.00');
    }
    if (ad.duration === 'one month') {
      setPayable('50.00');
    }
    setUserAgent(window.navigator.userAgent);
  };

  const checkAd = async () => {
    await axios
      .post(`${process.env.REACT_APP_API}/check-ad`, {
        ad,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === null) {
          setStatus('deleted');
        } else if (res.data.status === 'paid') {
          setStatus('paid');
        } else {
          setStatus('approved');
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const adSubmit = async () => {
    setProcessing(true);
    setRerenderAds(false);
    createAdPayment(accountInfo, payable, userAgent, ad._id, demographic).then(
      (res) => {
        console.log(res);
        if (res.data.errors) {
          toast.error(res.data.errors[0].message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setProcessing(false);
        }
        if (res.data.status === 'approved') {
          toast.success(`Payment successful!`, {
            position: toast.POSITION.TOP_CENTER,
          });
          setProcessing(false);
          setSucceeded(true);
          setUserAgent('');
          setRerenderAds(true);
          setApprovedData(res.data);
          setPayable('');
        } else if (res.data.status === 'pending') {
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
      }
    );
  };

  const { hyperlink, image, content } = ad;

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        {loading ? (
          <div className='spinner'>
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          </div>
        ) : status === 'deleted' ? (
          <>
            <h1 className='center'>This ad has since been deleted</h1>
            <br />
            <p className='center'>
              If you have another product or service you would like to submit a
              new advertisement for please click{' '}
              <Link to='/ad-submission' className='link'>
                here
              </Link>
              .
            </p>
          </>
        ) : status === 'paid' ? (
          <>
            <h1 className='center'>This ad has already been paid for</h1>
            <br />
            <p className='center'>
              If you have another product or service you would like to submit a
              new advertisement for please click{' '}
              <Link to='/ad-submission' className='link'>
                here
              </Link>
              .
            </p>
          </>
        ) : (
          <>
            <h1 className='center'>Advertisement Submission</h1>
            <br />
            <div className='advert-preview center'>
              {hyperlink ? (
                <Link
                  to={{
                    pathname: hyperlink,
                  }}
                  target='_blank'
                >
                  {image && image.url ? (
                    <>
                      <img src={image.url} alt='Your advertisement image' />
                      <br />
                      <p className='ad-content' style={{ color: '#626262' }}>
                        {content}
                      </p>
                    </>
                  ) : (
                    <div className='no-image'>
                      <p>{content}</p>
                    </div>
                  )}
                </Link>
              ) : image && image.url ? (
                <>
                  <img src={image.url} alt='Your advertisement image' />
                  <br />
                  <p className='ad-content'>{content}</p>
                </>
              ) : (
                <div className='no-image'>
                  <p>{content}</p>
                </div>
              )}
            </div>

            <div className='ad-section'>
              <div className='ad-header'>
                <span className='number'>1</span>
                <h2>Please enter your payment details.</h2>
              </div>
              <AdPayment setAccountInfo={setAccountInfo} loading={processing} />
            </div>
          </>
        )}
      </div>
      <RightSidebar rerenderAds={rerenderAds} />
      <CardinityPending
        cardinityPendingModalIsOpen={cardinityPendingModalIsOpen}
        pendingFormData={pendingFormData}
      />
    </div>
  );
};

export default AdFinalize;
