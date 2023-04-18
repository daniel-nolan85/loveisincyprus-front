import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsDown,
  faThumbsUp,
  faTruckFast,
  faSpinner,
  faEnvelope,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { Link } from 'react-router-dom';
import defaultProfile from '../../assets/defaultProfile.png';
import LargeRefundImage from '../../components/modals/LargeRefundImage';
import RefundReject from '../../components/modals/RefundReject';
import RefundApprove from '../../components/modals/RefundApprove';
import ItemsReturned from '../../components/modals/ItemsReturned';
import EmailBuyer from '../../components/modals/EmailBuyer';
import { ChatState } from '../../context/ChatProvider';

const Refunds = ({ history }) => {
  const [refunds, setRefunds] = useState([]);
  const [currentRefund, setCurrentRefund] = useState({});
  const [rejectRefundModalIsOpen, setRejectRefundModalIsOpen] = useState(false);
  const [processRefundModalIsOpen, setProcessRefundModalIsOpen] =
    useState(false);
  const [refundImageModalIsOpen, setRefundImageModalIsOpen] = useState(false);
  const [itemsReturnedModalIsOpen, setItemsReturnedModalIsOpen] =
    useState(false);
  const [loadingRefunds, setLoadingRefunds] = useState(true);
  const [status, setStatus] = useState('');
  const [requestedRefunds, setRequestedRefunds] = useState([]);
  const [awaitingRefunds, setAwaitingRefunds] = useState([]);
  const [grantedRefunds, setGrantedRefunds] = useState([]);
  const [partialRefunds, setPartialRefunds] = useState([]);
  const [deniedRefunds, setDeniedRefunds] = useState([]);
  const [emailBuyerModalIsOpen, setEmailBuyerModalIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  let { _id, token, role } = useSelector((state) => state.user);

  const { setNewRefunds } = ChatState();

  useEffect(() => {
    if (role !== 'main-admin') {
      history.push('/admin/dashboard');
    }
  }, []);

  useEffect(() => {
    fetchRefunds();
  }, []);

  const fetchRefunds = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-refunds`, {
        headers: {
          authtoken: token,
        },
      })
      .then((res) => {
        setRefunds(res.data);
        setLoadingRefunds(false);
        setStatus('all');
      })
      .catch((err) => {
        console.log(err);
        setLoadingRefunds(false);
      });
  };

  const fetchNewRefunds = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-new-refunds`)
      .then((res) => {
        setNewRefunds(res.data);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value.toLowerCase());
  };

  const searched = (query) => (r) => r._id.toLowerCase().includes(query);

  const requested = () => {
    const refRequested = refunds.filter((r) => r.refundStatus === 'requested');
    setRequestedRefunds(refRequested);
    setStatus('requested');
  };

  const awaiting = () => {
    const refAwaiting = refunds.filter((r) => r.refundStatus === 'pending');
    setAwaitingRefunds(refAwaiting);
    setStatus('pending');
  };

  const granted = () => {
    const refGranted = refunds.filter((r) => r.refundStatus === 'granted');
    setGrantedRefunds(refGranted);
    setStatus('granted');
  };

  const partial = () => {
    const refPartial = refunds.filter((r) => r.refundStatus === 'partial');
    setPartialRefunds(refPartial);
    setStatus('partial');
  };

  const denied = () => {
    const refDenied = refunds.filter((r) => r.refundStatus === 'denied');
    setDeniedRefunds(refDenied);
    setStatus('denied');
  };

  const handleReturns = (refund) => {
    setItemsReturnedModalIsOpen(true);
    setCurrentRefund(refund);
  };

  const processRefund = (refund) => {
    setProcessRefundModalIsOpen(true);
    setCurrentRefund(refund);
  };

  const rejectRefund = (refund) => {
    setRejectRefundModalIsOpen(true);
    setCurrentRefund(refund);
  };

  const viewImages = (refund) => {
    setCurrentRefund(refund);
    setRefundImageModalIsOpen(true);
  };

  const emailBuyer = (refund) => {
    setCurrentRefund(refund);
    setEmailBuyerModalIsOpen(true);
  };

  return (
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        <div>
          {loadingRefunds ? (
            <div className='spinner center'>
              <FontAwesomeIcon icon={faSpinner} className='fa' spin />
            </div>
          ) : (
            <>
              {refunds.length > 0 && (
                <>
                  <div className='search-box'>
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      onClick={handleSearch}
                      className='fa'
                    />
                    <input
                      type='search'
                      placeholder='Search refunds by Id'
                      onChange={handleSearch}
                      value={query}
                    />
                  </div>
                  <div className='refund-filter-btns'>
                    <button
                      className={
                        status === 'all' ? 'submit-btn-active' : 'submit-btn'
                      }
                      onClick={fetchRefunds}
                    >
                      All
                    </button>
                    <button
                      className={
                        status === 'requested'
                          ? 'submit-btn-active'
                          : 'submit-btn'
                      }
                      onClick={requested}
                    >
                      Requested
                    </button>
                    <button
                      className={
                        status === 'pending'
                          ? 'submit-btn-active'
                          : 'submit-btn'
                      }
                      onClick={awaiting}
                    >
                      Pending
                    </button>
                    <button
                      className={
                        status === 'granted'
                          ? 'submit-btn-active'
                          : 'submit-btn'
                      }
                      onClick={granted}
                    >
                      Granted
                    </button>
                    <button
                      className={
                        status === 'partial'
                          ? 'submit-btn-active'
                          : 'submit-btn'
                      }
                      onClick={partial}
                    >
                      Partial
                    </button>
                    <button
                      className={
                        status === 'denied' ? 'submit-btn-active' : 'submit-btn'
                      }
                      onClick={denied}
                    >
                      Denied
                    </button>
                  </div>
                </>
              )}
              {status === 'all' && refunds.length === 0 ? (
                <h1 className='center'>There are currently no refunds.</h1>
              ) : (
                status === 'all' &&
                refunds.length > 0 &&
                refunds.filter(searched(query)).map((r) => (
                  <div className='post-container' key={r._id}>
                    <div className='post-row'>
                      <div className='user-profile'>
                        <Link to={`/user/${r.orderedBy._id}`}>
                          <img
                            src={
                              r.orderedBy.profileImage
                                ? r.orderedBy.profileImage.url
                                : defaultProfile
                            }
                            alt={`${
                              r.orderedBy.username || r.orderedBy.name
                            }'s profile picture`}
                          />
                        </Link>
                        <div>
                          <Link to={`/user/${r.orderedBy._id}`}>
                            <p>{r.orderedBy.username || r.orderedBy.name}</p>
                          </Link>
                          <span>{moment(r.createdAt).fromNow()}</span>
                        </div>
                      </div>
                      <div className='email-buyer'>
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className='fa edit'
                          onClick={() => emailBuyer(r)}
                        />
                      </div>
                      {r.refundStatus === 'requested' && (
                        <div className='post-icons'>
                          <FontAwesomeIcon
                            icon={faTruckFast}
                            className='fa edit mr'
                            onClick={() => handleReturns(r)}
                          />
                        </div>
                      )}
                      {r.refundStatus === 'pending' ? (
                        <div className='post-icons'>
                          <FontAwesomeIcon
                            icon={faTruckFast}
                            className='fa edit mr'
                            onClick={() => handleReturns(r)}
                          />
                          <FontAwesomeIcon
                            icon={faThumbsUp}
                            className='fa pass'
                            onClick={() => processRefund(r)}
                          />
                          <FontAwesomeIcon
                            icon={faThumbsDown}
                            className='fa trash'
                            onClick={() => rejectRefund(r)}
                          />
                        </div>
                      ) : r.refundStatus === 'partial' ? (
                        <div className='post-icons'>
                          <FontAwesomeIcon
                            icon={faThumbsUp}
                            className='fa pass'
                            onClick={() => processRefund(r)}
                          />
                        </div>
                      ) : (
                        r.refundStatus === 'denied' && (
                          <div className='post-icons'>
                            <FontAwesomeIcon
                              icon={faThumbsUp}
                              className='fa pass'
                              onClick={() => processRefund(r)}
                            />
                          </div>
                        )
                      )}
                    </div>
                    <br />
                    <div className='single-refund'>
                      <div className='refund-info'>
                        <h2>
                          Order Id: <span>{r.paymentIntent.id}</span>
                        </h2>
                        <h2>
                          Refund status:{' '}
                          <span
                            className={
                              r.refundStatus === 'pending'
                                ? 'pending'
                                : '' || r.refundStatus === 'granted'
                                ? 'granted'
                                : '' || r.refundStatus === 'partial'
                                ? 'partial'
                                : '' || r.refundStatus === 'denied'
                                ? 'denied'
                                : ''
                            }
                          >
                            {r.refundStatus === 'partial'
                              ? r.refundStatus.charAt(0).toUpperCase() +
                                r.refundStatus.slice(1) +
                                'ly refunded'
                              : r.refundStatus.charAt(0).toUpperCase() +
                                r.refundStatus.slice(1)}
                          </span>
                        </h2>
                        {r.refundStatus !== 'granted' && (
                          <>
                            <h2>Items:</h2>
                            <ul>
                              {r.items.map((i, idx) => (
                                <li key={idx}>{i.title}</li>
                              ))}
                            </ul>
                          </>
                        )}
                        {(r.refundStatus === 'partial' ||
                          r.refundStatus === 'granted') && (
                          <>
                            <h2>Items refunded:</h2>
                            <ul>
                              {r.refundedItems.map((i, idx) => (
                                <li key={idx} className='it-ref'>
                                  {i.split(',')[2]}
                                </li>
                              ))}
                            </ul>
                            <h2>
                              Amount refunded:{' '}
                              <span className='am-ref'>
                                €{r.amountGranted.toFixed(2)}
                              </span>
                            </h2>
                          </>
                        )}
                        <h2>Reason for return:</h2>
                        <p>{r.reason}</p>
                        {(r.refundStatus === 'partial' ||
                          r.refundStatus === 'granted' ||
                          r.refundStatus === 'denied') && (
                          <>
                            <h2>Messages to user:</h2>
                            <ol>
                              {r.messages.map((m, idx) => (
                                <li key={idx}>{m}</li>
                              ))}
                            </ol>
                          </>
                        )}
                      </div>
                      <div className='refund-images'>
                        {r.refundImages && r.refundImages.length > 0 && (
                          <img
                            src={r.refundImages[0].url}
                            alt={`${
                              r.orderedBy.username || r.orderedBy.name
                            }'s post`}
                            className='post-img'
                            style={{ cursor: 'zoom-in' }}
                            onClick={() => viewImages(r)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              {status === 'requested' && requestedRefunds.length === 0 ? (
                <h1 className='center'>
                  There are currently no new refunds awaiting response.
                </h1>
              ) : (
                status === 'requested' &&
                requestedRefunds.length > 0 &&
                requestedRefunds.filter(searched(query)).map((r) => (
                  <div className='post-container' key={r._id}>
                    <div className='post-row'>
                      <div className='user-profile'>
                        <Link to={`/user/${r.orderedBy._id}`}>
                          <img
                            src={
                              r.orderedBy.profileImage
                                ? r.orderedBy.profileImage.url
                                : defaultProfile
                            }
                            alt={`${
                              r.orderedBy.username || r.orderedBy.name
                            }'s profile picture`}
                          />
                        </Link>
                        <div>
                          <Link to={`/user/${r.orderedBy._id}`}>
                            <p>{r.orderedBy.username || r.orderedBy.name}</p>
                          </Link>
                          <span>{moment(r.createdAt).fromNow()}</span>
                        </div>
                      </div>
                      <div className='email-buyer'>
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className='fa edit'
                          onClick={() => emailBuyer(r)}
                        />
                      </div>
                    </div>
                    <br />
                    <div className='single-refund'>
                      <div className='refund-info'>
                        <h2>
                          Order Id: <span>{r.paymentIntent.id}</span>
                        </h2>
                        <h2>
                          Refund status: <span>Requested</span>
                        </h2>
                        <h2>Items:</h2>
                        <ul>
                          {r.items.map((i, idx) => (
                            <li key={idx}>{i.title}</li>
                          ))}
                        </ul>
                        <h2>Reason for return:</h2>
                        <p>{r.reason}</p>
                      </div>
                      <div className='refund-images'>
                        {r.refundImages && r.refundImages.length > 0 && (
                          <img
                            src={r.refundImages[0].url}
                            alt={`${
                              r.orderedBy.username || r.orderedBy.name
                            }'s post`}
                            className='post-img'
                            style={{ cursor: 'zoom-in' }}
                            onClick={() => viewImages(r)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              {status === 'pending' && awaitingRefunds.length === 0 ? (
                <h1 className='center'>
                  There are currently no refunds pending.
                </h1>
              ) : (
                status === 'pending' &&
                awaitingRefunds.length > 0 &&
                awaitingRefunds.filter(searched(query)).map((r) => (
                  <div className='post-container' key={r._id}>
                    <div className='post-row'>
                      <div className='user-profile'>
                        <Link to={`/user/${r.orderedBy._id}`}>
                          <img
                            src={
                              r.orderedBy.profileImage
                                ? r.orderedBy.profileImage.url
                                : defaultProfile
                            }
                            alt={`${
                              r.orderedBy.username || r.orderedBy.name
                            }'s profile picture`}
                          />
                        </Link>
                        <div>
                          <Link to={`/user/${r.orderedBy._id}`}>
                            <p>{r.orderedBy.username || r.orderedBy.name}</p>
                          </Link>
                          <span>{moment(r.createdAt).fromNow()}</span>
                        </div>
                      </div>
                      <div className='email-buyer'>
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className='fa edit'
                          onClick={() => emailBuyer(r)}
                        />
                      </div>
                      <div className='post-icons'>
                        <FontAwesomeIcon
                          icon={faTruckFast}
                          className='fa edit mr'
                          onClick={() => handleReturns(r)}
                        />
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          className='fa pass'
                          onClick={() => processRefund(r)}
                        />

                        <FontAwesomeIcon
                          icon={faThumbsDown}
                          className='fa trash'
                          onClick={() => rejectRefund(r)}
                        />
                      </div>
                    </div>
                    <br />
                    <div className='single-refund'>
                      <div className='refund-info'>
                        <h2>
                          Order Id: <span>{r.paymentIntent.id}</span>
                        </h2>
                        <h2>
                          Refund status:{' '}
                          <span className='pending'>Pending</span>
                        </h2>
                        <h2>Items:</h2>
                        <ul>
                          {r.items.map((i, idx) => (
                            <li key={idx}>{i.title}</li>
                          ))}
                        </ul>
                        <h2>Reason for return:</h2>
                        <p>{r.reason}</p>
                      </div>
                      <div className='refund-images'>
                        {r.refundImages && r.refundImages.length > 0 && (
                          <img
                            src={r.refundImages[0].url}
                            alt={`${
                              r.orderedBy.username || r.orderedBy.name
                            }'s post`}
                            className='post-img'
                            style={{ cursor: 'zoom-in' }}
                            onClick={() => viewImages(r)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              {status === 'granted' && grantedRefunds.length === 0 ? (
                <h1 className='center'>
                  There are currently no refunds that have been fully granted.
                </h1>
              ) : (
                status === 'granted' &&
                grantedRefunds.length > 0 &&
                grantedRefunds.filter(searched(query)).map((r) => (
                  <div className='post-container' key={r._id}>
                    <div className='post-row'>
                      <div className='user-profile'>
                        <Link to={`/user/${r.orderedBy._id}`}>
                          <img
                            src={
                              r.orderedBy.profileImage
                                ? r.orderedBy.profileImage.url
                                : defaultProfile
                            }
                            alt={`${
                              r.orderedBy.username || r.orderedBy.name
                            }'s profile picture`}
                          />
                        </Link>
                        <div>
                          <Link to={`/user/${r.orderedBy._id}`}>
                            <p>{r.orderedBy.username || r.orderedBy.name}</p>
                          </Link>
                          <span>{moment(r.createdAt).fromNow()}</span>
                        </div>
                      </div>
                      <div className='email-buyer'>
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className='fa edit'
                          onClick={() => emailBuyer(r)}
                        />
                      </div>
                    </div>
                    <br />
                    <div className='single-refund'>
                      <div className='refund-info'>
                        <h2>
                          Order Id: <span>{r.paymentIntent.id}</span>
                        </h2>
                        <h2>
                          Refund status:{' '}
                          <span className='granted'>Granted</span>
                        </h2>
                        <h2>Items refunded:</h2>
                        <ul>
                          {r.refundedItems.map((i, idx) => (
                            <li key={idx} className='it-ref'>
                              {i.split(',')[2]}
                            </li>
                          ))}
                        </ul>
                        <h2>
                          Amount refunded:{' '}
                          <span className='am-ref'>
                            €{r.amountGranted.toFixed(2)}
                          </span>
                        </h2>
                        <h2>Reason for return:</h2>
                        <p>{r.reason}</p>
                        <h2>Messages to user:</h2>
                        <ol>
                          {r.messages.map((m, idx) => (
                            <li key={idx}>{m}</li>
                          ))}
                        </ol>
                      </div>
                      <div className='refund-images'>
                        {r.refundImages && r.refundImages.length > 0 && (
                          <img
                            src={r.refundImages[0].url}
                            alt={`${
                              r.orderedBy.username || r.orderedBy.name
                            }'s post`}
                            className='post-img'
                            style={{ cursor: 'zoom-in' }}
                            onClick={() => viewImages(r)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              {status === 'partial' && partialRefunds.length === 0 ? (
                <h1 className='center'>
                  There are currently no refunds that have been partially
                  granted.
                </h1>
              ) : (
                status === 'partial' &&
                partialRefunds.length > 0 &&
                partialRefunds.filter(searched(query)).map((r) => (
                  <div className='post-container' key={r._id}>
                    <div className='post-row'>
                      <div className='user-profile'>
                        <Link to={`/user/${r.orderedBy._id}`}>
                          <img
                            src={
                              r.orderedBy.profileImage
                                ? r.orderedBy.profileImage.url
                                : defaultProfile
                            }
                            alt={`${
                              r.orderedBy.username || r.orderedBy.name
                            }'s profile picture`}
                          />
                        </Link>
                        <div>
                          <Link to={`/user/${r.orderedBy._id}`}>
                            <p>{r.orderedBy.username || r.orderedBy.name}</p>
                          </Link>
                          <span>{moment(r.createdAt).fromNow()}</span>
                        </div>
                      </div>
                      <div className='email-buyer'>
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className='fa edit'
                          onClick={() => emailBuyer(r)}
                        />
                      </div>
                      <div className='post-icons'>
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          className='fa pass'
                          onClick={() => processRefund(r)}
                        />
                      </div>
                    </div>
                    <br />
                    <div className='single-refund'>
                      <div className='refund-info'>
                        <h2>
                          Order Id: <span>{r.paymentIntent.id}</span>
                        </h2>
                        <h2>
                          Refund status:{' '}
                          <span className='partial'>Partially refunded</span>
                        </h2>
                        <h2>Items:</h2>
                        <ul>
                          {r.items.map((i, idx) => (
                            <li key={idx}>{i.title}</li>
                          ))}
                        </ul>
                        <h2>Items refunded:</h2>
                        <ul>
                          {r.refundedItems.map((i, idx) => (
                            <li key={idx} className='it-ref'>
                              {i.split(',')[2]}
                            </li>
                          ))}
                        </ul>
                        <h2>
                          Amount refunded:{' '}
                          <span className='am-ref'>
                            €{r.amountGranted.toFixed(2)}
                          </span>
                        </h2>
                        <h2>Reason for return:</h2>
                        <p>{r.reason}</p>
                        <h2>Messages to user:</h2>
                        <ol>
                          {r.messages.map((m, idx) => (
                            <li key={idx}>{m}</li>
                          ))}
                        </ol>
                      </div>
                      <div className='refund-images'>
                        {r.refundImages && r.refundImages.length > 0 && (
                          <img
                            src={r.refundImages[0].url}
                            alt={`${
                              r.orderedBy.username || r.orderedBy.name
                            }'s post`}
                            className='post-img'
                            style={{ cursor: 'zoom-in' }}
                            onClick={() => viewImages(r)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              {status === 'denied' && deniedRefunds.length === 0 ? (
                <h1 className='center'>
                  There are currently no refunds that have been denied.
                </h1>
              ) : (
                status === 'denied' &&
                deniedRefunds.length > 0 &&
                deniedRefunds.filter(searched(query)).map((r) => (
                  <div className='post-container' key={r._id}>
                    <div className='post-row'>
                      <div className='user-profile'>
                        <Link to={`/user/${r.orderedBy._id}`}>
                          <img
                            src={
                              r.orderedBy.profileImage
                                ? r.orderedBy.profileImage.url
                                : defaultProfile
                            }
                            alt={`${
                              r.orderedBy.username || r.orderedBy.name
                            }'s profile picture`}
                          />
                        </Link>
                        <div>
                          <Link to={`/user/${r.orderedBy._id}`}>
                            <p>{r.orderedBy.username || r.orderedBy.name}</p>
                          </Link>
                          <span>{moment(r.createdAt).fromNow()}</span>
                        </div>
                      </div>
                      <div className='email-buyer'>
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className='fa edit'
                          onClick={() => emailBuyer(r)}
                        />
                      </div>
                      <div className='post-icons'>
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          className='fa pass'
                          onClick={() => processRefund(r)}
                        />
                      </div>
                    </div>
                    <br />
                    <div className='single-refund'>
                      <div className='refund-info'>
                        <h2>
                          Order Id: <span>{r.paymentIntent.id}</span>
                        </h2>
                        <h2>
                          Refund status: <span className='denied'>Denied</span>
                        </h2>
                        <h2>Items:</h2>
                        <ul>
                          {r.items.map((i, idx) => (
                            <li key={idx}>{i.title}</li>
                          ))}
                        </ul>
                        <h2>Reason for return:</h2>
                        <p>{r.reason}</p>
                        <h2>Messages to user:</h2>
                        <ol>
                          {r.messages.map((m, idx) => (
                            <li key={idx}>{m}</li>
                          ))}
                        </ol>
                      </div>
                      <div className='refund-images'>
                        {r.refundImages && r.refundImages.length > 0 && (
                          <img
                            src={r.refundImages[0].url}
                            alt={`${
                              r.orderedBy.username || r.orderedBy.name
                            }'s post`}
                            className='post-img'
                            style={{ cursor: 'zoom-in' }}
                            onClick={() => viewImages(r)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
      <ItemsReturned
        itemsReturnedModalIsOpen={itemsReturnedModalIsOpen}
        setItemsReturnedModalIsOpen={setItemsReturnedModalIsOpen}
        currentRefund={currentRefund}
        fetchRefunds={fetchRefunds}
        fetchNewRefunds={fetchNewRefunds}
      />
      <RefundReject
        rejectRefundModalIsOpen={rejectRefundModalIsOpen}
        setRejectRefundModalIsOpen={setRejectRefundModalIsOpen}
        currentRefund={currentRefund}
        fetchRefunds={fetchRefunds}
      />
      <RefundApprove
        processRefundModalIsOpen={processRefundModalIsOpen}
        setProcessRefundModalIsOpen={setProcessRefundModalIsOpen}
        currentRefund={currentRefund}
        fetchRefunds={fetchRefunds}
      />
      <LargeRefundImage
        refundImageModalIsOpen={refundImageModalIsOpen}
        setRefundImageModalIsOpen={setRefundImageModalIsOpen}
        refund={currentRefund}
      />
      <EmailBuyer
        emailBuyerModalIsOpen={emailBuyerModalIsOpen}
        setEmailBuyerModalIsOpen={setEmailBuyerModalIsOpen}
        currentRefund={currentRefund}
      />
    </div>
  );
};

export default Refunds;
