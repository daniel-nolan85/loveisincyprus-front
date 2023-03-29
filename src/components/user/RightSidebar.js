import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ChatState } from '../../context/ChatProvider';

const RightSidebar = () => {
  const [numOfUpcomingEvents, setNumOfUpcomingEvents] = useState('');
  const [ads, setAds] = useState([]);
  const [targetedAds, setTargetedAds] = useState([]);

  const { setNewAds, setNewVerifs, setReportedContent, setProductsForReview } =
    ChatState();

  const { _id, token, events, gender, age, location } =
    useSelector((state) => state.user) || {};

  const history = useHistory();

  useEffect(() => {
    fetchNewAds();
    fetchNewVerifs();
    fetchReportedContent();
    fetchProductsForReview();
  }, []);

  const fetchNewAds = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-new-ads`)
      .then((res) => {
        setNewAds(res.data);
      });
  };

  const fetchNewVerifs = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-new-verifs`)
      .then((res) => {
        setNewVerifs(res.data);
      });
  };

  const fetchReportedContent = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-reported-content`)
      .then((res) => {
        setReportedContent(res.data);
      });
  };

  const fetchProductsForReview = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-products-for-review`)
      .then((res) => {
        setProductsForReview(res.data);
      });
  };

  useEffect(() => {
    fetchNumOfUpcomingEvents();
    fetchApprovedAds();
  }, []);

  useEffect(() => {
    filterTargeted();
  }, [ads]);

  const fetchNumOfUpcomingEvents = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-num-upcoming-events`,
        { _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setNumOfUpcomingEvents(res.data);
      });
  };

  const fetchApprovedAds = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-approved-ads`)
      .then((res) => {
        setAds(res.data);
      });
  };

  const filterTargeted = () => {
    const targeted = [];
    if (!token) {
      ads.map((ad) => {
        if (ad.demographic.includes('everyone')) {
          targeted.push(ad);
        }
      });
      setTargetedAds([...new Set(targeted)]);
      return;
    } else {
      ads.map((ad) => {
        if (ad.demographic.includes('everyone')) {
          targeted.push(ad);
        }
        if (ad.demographic.includes('Male') && gender === 'male') {
          targeted.push(ad);
        }
        if (ad.demographic.includes('Female') && gender === 'female') {
          targeted.push(ad);
        }
        if (
          ad.demographic.includes('18-30 year olds') &&
          age > 17 &&
          age < 31
        ) {
          targeted.push(ad);
        }
        if (
          ad.demographic.includes('30-45 year olds') &&
          age > 29 &&
          age < 46
        ) {
          targeted.push(ad);
        }
        if (
          ad.demographic.includes('45-60 year olds') &&
          age > 44 &&
          age < 61
        ) {
          targeted.push(ad);
        }
        if (ad.demographic.includes('Over 60s') && age > 59) {
          targeted.push(ad);
        }
        if (ad.demographic.includes('Ayia Napa') && location === 'ayia napa') {
          targeted.push(ad);
        }
        if (ad.demographic.includes('Larnaca') && location === 'larnaca') {
          targeted.push(ad);
        }
        if (ad.demographic.includes('Limassol') && location === 'limassol') {
          targeted.push(ad);
        }
        if (ad.demographic.includes('Nicosia') && location === 'nicosia') {
          targeted.push(ad);
        }
        if (ad.demographic.includes('Paphos') && location === 'paphos') {
          targeted.push(ad);
        }
      });
      setTargetedAds([...new Set(targeted)]);
    }
  };

  return (
    <div className='right-sidebar'>
      {token && (
        <div className='sidebar-title'>
          <h4>Events</h4>
          <Link to='/events'>All Events</Link>
        </div>
      )}
      {events && numOfUpcomingEvents > 0
        ? events.map(
            (e) =>
              !e.expired && (
                <div key={e._id}>
                  <div className='events'>
                    <div className='left-event'>
                      <h3>{moment(e.when).format('DD')}</h3>
                      <span>{moment(e.when).format('MMMM')}</span>
                    </div>
                    <div className='right-event'>
                      <h4>{e.name}</h4>
                      <p>
                        <FontAwesomeIcon icon={faLocationDot} className='fa' />{' '}
                        {e.location}
                      </p>
                      <p
                        className='link'
                        onClick={() => {
                          history.push(`/event/${e._id}`);
                        }}
                      >
                        More Info
                      </p>
                    </div>
                  </div>
                </div>
              )
          )
        : token && <p>There are no upcoming events to display right now</p>}
      <br />
      <div className='sidebar-title'>
        <h4>Advertisements</h4>
        <Link to='/ad-submission'>Submit an Ad</Link>
      </div>
      {targetedAds.length > 0 ? (
        targetedAds.map((ad) => (
          <div key={ad._id}>
            {ad.hyperlink ? (
              <Link
                to={{
                  pathname: ad.hyperlink,
                }}
                target='_blank'
              >
                {ad.image ? (
                  <div className='sidebar-ad'>
                    <img
                      src={ad.image.url}
                      alt={`${ad.contactInfo.name}'s advertisement`}
                      className='sidebar-ads'
                    />
                    <p
                      className='sidebar-ad-content'
                      style={{ color: '#626262' }}
                    >
                      {ad.content}
                    </p>
                  </div>
                ) : (
                  <div className='sidebar-ads no-image'>
                    <p>{ad.content}</p>
                  </div>
                )}
              </Link>
            ) : ad.image ? (
              <div className='sidebar-ad'>
                <img
                  src={ad.image.url}
                  alt={`${ad.contactInfo.name}'s advertisement`}
                  className='sidebar-ads'
                />
                <p className='sidebar-ad-content'>{ad.content}</p>
              </div>
            ) : (
              <div className='sidebar-ads no-image'>
                <p>{ad.content}</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>There are no ads to display right now</p>
      )}
    </div>
  );
};

export default RightSidebar;
