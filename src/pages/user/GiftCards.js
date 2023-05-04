import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import Mobile from '../../components/user/Mobile';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import moment from 'moment';

const GiftCards = () => {
  const [loading, setLoading] = useState(true);
  const [cardsReceived, setCardsReceived] = useState([]);
  const [cardsSent, setCardsSent] = useState([]);
  const [showReceived, setShowReceived] = useState(true);
  const [showSent, setShowSent] = useState(false);
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  const [isCopied, setIsCopied] = useState(false);

  const { token, _id, name, username, email, profileImage } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    fetchGiftCardsReceived();
    fetchGiftCardsSent();
  }, []);

  const fetchGiftCardsReceived = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-gift-cards-received`,
        { _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setCardsReceived(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const fetchGiftCardsSent = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-gift-cards-sent`,
        { _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setCardsSent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        {loading ? (
          <div className='spinner'>
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          </div>
        ) : (
          <>
            <div className='refund-filter-btns'>
              <button
                className={showReceived ? 'submit-btn-active' : 'submit-btn'}
                onClick={() => {
                  setShowReceived(true);
                  setShowSent(false);
                }}
              >
                Received
              </button>
              <button
                className={showSent ? 'submit-btn-active' : 'submit-btn'}
                onClick={() => {
                  setShowSent(true);
                  setShowReceived(false);
                }}
              >
                Sent
              </button>
            </div>
            {showReceived && !cardsReceived.length ? (
              <h1 className='center'>
                You have not received any gift cards yet
              </h1>
            ) : (
              showReceived &&
              cardsReceived.length > 0 && (
                <div>
                  <h1 className='center'>
                    {deviceSize > 1280 ? 'Hover over' : 'Touch'} a card to open
                    it
                  </h1>
                  {cardsReceived.map((c) => (
                    <div className='gift-card gc-actual' key={c._id}>
                      <div className='card'>
                        <div className='outside'>
                          <div className='front'>
                            <p>{c.greeting}</p>
                            {c.image && c.image.url && (
                              <img
                                src={c.image.url}
                                alt='Your gift card image'
                              />
                            )}
                          </div>
                          <div className='back'></div>
                        </div>
                        <div className='inside'>
                          <p>{c.message}</p>
                          <div className='coupon-card'>
                            <img src={logo} className='logo' />
                            <h3>
                              Please enjoy €{c.amount.toFixed(2)} to spend in
                              our online store, courtesy of{' '}
                              <Link to={`/user/${c.from._id}`} className='link'>
                                {c.from.username || c.from.name}
                              </Link>
                            </h3>
                            <div className='coupon-row'>
                              <span id='cpnCode'>{c.couponCode}</span>
                              <span
                                id='cpnBtn'
                                onClick={() => handleCopyCode(c.couponCode)}
                              >
                                {isCopied ? 'COPIED' : 'COPY CODE'}
                              </span>
                            </div>
                            <br />
                            <p>
                              Valid until:{' '}
                              {moment(c.expiry).format('MMMM Do YYYY')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {showSent && !cardsSent.length ? (
              <h1 className='center'>You have not sent any gift cards yet</h1>
            ) : (
              showSent &&
              cardsSent.length > 0 && (
                <div>
                  <h1 className='center'>
                    {deviceSize > 1280 ? 'Hover over' : 'Touch'} a card to open
                    it
                  </h1>
                  {cardsSent.map((c) => (
                    <div className='gift-card gc-actual' key={c._id}>
                      <div className='card'>
                        <div className='outside'>
                          <div className='front'>
                            <p>{c.greeting}</p>
                            {c.image && c.image.url && (
                              <img
                                src={c.image.url}
                                alt='Your gift card image'
                              />
                            )}
                          </div>
                          <div className='back'></div>
                        </div>
                        <div className='inside'>
                          <p>{c.message}</p>
                          <div className='coupon-card'>
                            <img src={logo} className='logo' />
                            <h3>
                              Please enjoy €{c.amount.toFixed(2)} to spend in
                              our online store, courtesy of{' '}
                              <Link
                                to={`/user/profile/${_id}`}
                                className='link'
                              >
                                {username || name}
                              </Link>
                            </h3>
                            <div className='coupon-row'>
                              <span id='cpnCode'>GIFTCODE</span>
                              <span
                                id='cpnBtn'
                                onClick={() => handleCopyCode('GIFTCODE')}
                              >
                                {isCopied ? 'COPIED' : 'COPY CODE'}
                              </span>
                            </div>
                            <br />
                            <p>
                              Valid until:{' '}
                              {moment(c.expiry).format('MMMM Do YYYY')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </>
        )}
      </div>
      <RightSidebar />
    </div>
  );
};

export default GiftCards;
