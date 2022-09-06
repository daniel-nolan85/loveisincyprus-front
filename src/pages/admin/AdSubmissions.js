import React, { useState, useEffect, useRef } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashCan,
  faComments,
  faMagnifyingGlass,
  faThumbsDown,
  faThumbsUp,
  faUser,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import AdDisapprove from '../../components/modals/AdDisapprove';
import AdApprove from '../../components/modals/AdApprove';
import AdContactInfo from '../../components/modals/AdContactInfo';
import AdPayment from '../../components/modals/AdPayment';
import { createAdPayment } from '../../functions/cardinity';

const AdSubmissions = () => {
  const [ads, setAds] = useState([]);
  const [contactInfoModalIsOpen, setContactInfoModalIsOpen] = useState(false);
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false);
  const [adDisapproveModalIsOpen, setAdDisapproveModalIsOpen] = useState(false);
  const [adApproveModalIsOpen, setAdApproveModalIsOpen] = useState(false);
  const [currentAd, setCurrentAd] = useState({});
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState('');
  const [succeeded, setSucceeded] = useState(false);
  const [payable, setPayable] = useState('');
  const [userAgent, setUserAgent] = useState('');

  const { user } = useSelector((state) => ({ ...state }));

  const isFirstRun = useRef(true);

  useEffect(() => {
    fetchAds();
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else if (payable && userAgent) {
      console.log('ready to go');
      runPayment(currentAd);
    }
  }, [payable && userAgent]);

  const fetchAds = async () => {
    await axios
      .post(`${process.env.REACT_APP_API}/fetch-ads`)
      .then((res) => {
        console.log(res.data);
        setAds(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showContactInfo = (ad) => {
    setContactInfoModalIsOpen(true);
    setCurrentAd(ad);
  };

  const handlePayment = (ad) => {
    setSucceeded(false);
    setPaymentModalIsOpen(true);
    setCurrentAd(ad);
  };

  const handleDisapprove = (ad) => {
    setAdDisapproveModalIsOpen(true);
    setCurrentAd(ad);
  };

  const handleApprove = (ad) => {
    setAdApproveModalIsOpen(true);
    setCurrentAd(ad);
  };

  const preparePayment = (ad) => {
    console.log('preparing => ', ad);
    if (ad.duration === 'one day') {
      setPayable('30.00');
    }
    if (ad.duration === 'one week') {
      setPayable('200.00');
    }
    if (ad.duration === 'two weeks') {
      setPayable('350.00');
    }
    if (ad.duration === 'one month') {
      setPayable('600.00');
    }
    setUserAgent(window.navigator.userAgent);
  };

  const runPayment = async (ad) => {
    console.log('running => ', ad);
    setProcessing(true);
    createAdPayment(
      ad.accountInfo,
      payable,
      userAgent,
      user.token,
      ad._id
    ).then((res) => {
      console.log('create payment', res.data);
      if (res.data.errors) {
        toast.error(res.data.errors[0].message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setProcessing(false);
      }
      if (res.data.status === 'approved') {
        toast.success(`Payment successful.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setProcessing(false);
        setSucceeded(true);
        setPayable('');
        setUserAgent('');
        fetchAds();
      }
      if (res.data.status === 'pending') {
        toast.warning(`Payment pending.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setProcessing(false);
      }
      if (res.data.status === 'declined') {
        toast.error(`Payment declined.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setProcessing(false);
      }
    });
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        <div className='admin-cards'>
          {ads.length > 0 ? (
            ads.map((ad) => (
              <div className='post-container' key={ad._id}>
                <div className='post-row'>
                  <div className='user-profile'>
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        marginRight: '10px',
                      }}
                    >
                      {ad.contactInfo.name}
                    </span>
                    <span>{moment(ad.createdAt).fromNow()}</span>
                  </div>
                  <div className='submissioner-info'>
                    <FontAwesomeIcon
                      icon={faUser}
                      className='fa user'
                      onClick={() => showContactInfo(ad)}
                    />
                    <FontAwesomeIcon
                      icon={faCreditCard}
                      className='fa payment'
                      onClick={() => handlePayment(ad)}
                    />
                  </div>
                  <div className='post-icons'>
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      className='fa trash'
                      onClick={() => handleDisapprove(ad)}
                    />
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className='fa edit'
                      onClick={() => handleApprove(ad)}
                    />
                  </div>
                </div>
                <p className='post-text'>{ad.content}</p>
                {ad.image && (
                  <img
                    src={ad.image.url}
                    alt={`${ad.contactInfo.name}'s advertisement`}
                    className='post-img'
                  />
                )}
                <div className='ad-duration'>
                  <br />
                  {`${ad.contactInfo.name} would like this ad to be displayed for ${ad.duration}`}
                </div>
                <div
                  className={`${ad.status === 'rejected' && 'rejected'} ${
                    ad.status === 'approved' && 'approved'
                  } ${ad.status === 'expired' && 'expired'} ${
                    ad.status === 'paid' && 'paid'
                  }`}
                ></div>
              </div>
            ))
          ) : (
            <h1 className='center'>
              There are not currently any ad submissions to review.
            </h1>
          )}
        </div>
        <AdContactInfo
          contactInfoModalIsOpen={contactInfoModalIsOpen}
          setContactInfoModalIsOpen={setContactInfoModalIsOpen}
          currentAd={currentAd}
        />
        <AdPayment
          paymentModalIsOpen={paymentModalIsOpen}
          setPaymentModalIsOpen={setPaymentModalIsOpen}
          currentAd={currentAd}
          preparePayment={preparePayment}
          processing={processing}
          succeeded={succeeded}
        />
        <AdDisapprove
          adDisapproveModalIsOpen={adDisapproveModalIsOpen}
          setAdDisapproveModalIsOpen={setAdDisapproveModalIsOpen}
          currentAd={currentAd}
          reason={reason}
          setReason={setReason}
          fetchAds={fetchAds}
          loading={loading}
          setLoading={setLoading}
        />
        <AdApprove
          adApproveModalIsOpen={adApproveModalIsOpen}
          setAdApproveModalIsOpen={setAdApproveModalIsOpen}
          currentAd={currentAd}
          fetchAds={fetchAds}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};

export default AdSubmissions;
