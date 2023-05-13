import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashCan,
  faThumbsDown,
  faThumbsUp,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import AdDisapprove from '../../components/modals/AdDisapprove';
import AdApprove from '../../components/modals/AdApprove';
import AdContactInfo from '../../components/modals/AdContactInfo';
import AdRemove from '../../components/modals/AdRemove';
import { Link } from 'react-router-dom';

const AdSubmissions = ({ history }) => {
  const [ads, setAds] = useState([]);
  const [contactInfoModalIsOpen, setContactInfoModalIsOpen] = useState(false);
  const [adRemoveModalIsOpen, setAdRemoveModalIsOpen] = useState(false);
  const [adDisapproveModalIsOpen, setAdDisapproveModalIsOpen] = useState(false);
  const [adApproveModalIsOpen, setAdApproveModalIsOpen] = useState(false);
  const [currentAd, setCurrentAd] = useState({});
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const { role } = useSelector((state) => state.user);

  useEffect(() => {
    if (role !== 'main-admin') {
      history.push('/admin/dashboard');
    }
  }, []);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    await axios
      .post(`${process.env.REACT_APP_API}/fetch-ads`)
      .then((res) => {
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

  const removeAd = (ad) => {
    setAdRemoveModalIsOpen(true);
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

  return (
    <div className='container search-container'>
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
                      icon={faTrashCan}
                      className='fa trash'
                      onClick={() => removeAd(ad)}
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
                      className='fa edit ml'
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
                {ad.hyperlink && (
                  <div className='ad-duration'>
                    <br />
                    <Link
                      to={{
                        pathname: ad.hyperlink,
                      }}
                      target='_blank'
                      className='link'
                    >
                      {ad.hyperlink}
                    </Link>
                  </div>
                )}
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
        <AdRemove
          adRemoveModalIsOpen={adRemoveModalIsOpen}
          setAdRemoveModalIsOpen={setAdRemoveModalIsOpen}
          currentAd={currentAd}
          fetchAds={fetchAds}
          loading={loading}
          setLoading={setLoading}
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
