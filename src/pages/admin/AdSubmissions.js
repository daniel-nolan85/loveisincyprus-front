import React, { useState, useEffect } from 'react';
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
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
import defaultProfile from '../../assets/defaultProfile.png';
import AdDisapprove from '../../components/modals/AdDisapprove';
import AdApprove from '../../components/modals/AdApprove';

const Posts = () => {
  const [ads, setAds] = useState([]);
  const [adDisapproveModalIsOpen, setAdDisapproveModalIsOpen] = useState(false);
  const [adApproveModalIsOpen, setAdApproveModalIsOpen] = useState(false);
  const [currentAd, setCurrentAd] = useState({});
  const [reason, setReason] = useState('');

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      fetchAds();
    }
  }, [user && user.token]);

  const fetchAds = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-ads`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setAds(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
    <div className='container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        <div className='admin-cards'>
          {ads &&
            ads.map((ad) => (
              <div className='post-container' key={ad._id}>
                <div className='post-row'>
                  <div className='user-profile'>
                    <Link
                      to={
                        user._id === ad.postedBy._id
                          ? `/user/profile/${user._id}`
                          : `/user/${ad.postedBy._id}`
                      }
                    >
                      <img
                        src={
                          ad.postedBy.profileImage
                            ? ad.postedBy.profileImage.url
                            : defaultProfile
                        }
                        alt={`${
                          ad.postedBy.name || ad.postedBy.email.split('@')[0]
                        }'s profile picture`}
                      />
                    </Link>
                    <div>
                      <Link
                        to={
                          user._id === ad.postedBy._id
                            ? `/user/profile/${user._id}`
                            : `/user/${ad.postedBy._id}`
                        }
                      >
                        <p>
                          {ad.postedBy.name || ad.postedBy.email.split('@')[0]}
                        </p>
                      </Link>
                      <span>{moment(ad.createdAt).fromNow()}</span>
                    </div>
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
                    alt={`${
                      ad.postedBy.name || ad.postedBy.email.split('@')[0]
                    }'s post`}
                    className='post-img'
                  />
                )}
                <div className='ad-duration'>
                  <br />
                  {`${
                    ad.postedBy.name || ad.postedBy.email.split('@')[0]
                  } would like this ad to be displayed for ${ad.duration}`}
                </div>
              </div>
            ))}
        </div>
        <AdDisapprove
          adDisapproveModalIsOpen={adDisapproveModalIsOpen}
          setAdDisapproveModalIsOpen={setAdDisapproveModalIsOpen}
          currentAd={currentAd}
          reason={reason}
          setReason={setReason}
        />
        <AdApprove
          adApproveModalIsOpen={adApproveModalIsOpen}
          setAdApproveModalIsOpen={setAdApproveModalIsOpen}
          currentAd={currentAd}
        />
      </div>
    </div>
  );
};

export default Posts;
