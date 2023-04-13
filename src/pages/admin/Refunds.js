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
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { Link } from 'react-router-dom';
import defaultProfile from '../../assets/defaultProfile.png';
import LargeRefundImage from '../../components/modals/LargeRefundImage';
import RefundReject from '../../components/modals/RefundReject';
import RefundApprove from '../../components/modals/RefundApprove';
import ItemsReturned from '../../components/modals/ItemsReturned';

const Refunds = ({ history }) => {
  const [refunds, setRefunds] = useState([]);
  const [currentRefund, setCurrentRefund] = useState({});
  const [rejectRefundModalIsOpen, setRejectRefundModalIsOpen] = useState(false);
  const [processRefundModalIsOpen, setProcessRefundModalIsOpen] =
    useState(false);
  const [reason, setReason] = useState('');
  const [refundImageModalIsOpen, setRefundImageModalIsOpen] = useState(false);
  const [itemsReturnedModalIsOpen, setItemsReturnedModalIsOpen] =
    useState(false);
  const [loadingRefunds, setLoadingRefunds] = useState(true);
  const [status, setStatus] = useState('');
  const [awaitingRefunds, setAwaitingRefunds] = useState([]);
  const [grantedRefunds, setGrantedRefunds] = useState([]);
  const [partialRefunds, setPartialRefunds] = useState([]);
  const [deniedRefunds, setDeniedRefunds] = useState([]);

  let { _id, token, role } = useSelector((state) => state.user);

  console.log('refunds => ', refunds);

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

  //   const fetchReportedContent = async () => {
  //     await axios
  //       .get(`${process.env.REACT_APP_API}/fetch-reported-content`)
  //       .then((res) => {
  //         setReportedContent(res.data);
  //       });
  //   };

  const handleReturns = (refund) => {
    setItemsReturnedModalIsOpen(true);
    setCurrentRefund(refund);
  };

  const processRefund = (refund) => {
    setProcessRefundModalIsOpen(true);
    setCurrentRefund(refund);
  };

  const rejectRefund = async (refund) => {
    setRejectRefundModalIsOpen(true);
    setCurrentRefund(refund);
  };

  const viewImages = (refund) => {
    setCurrentRefund(refund);
    setRefundImageModalIsOpen(true);
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
                      status === 'pending' ? 'submit-btn-active' : 'submit-btn'
                    }
                    onClick={awaiting}
                  >
                    Pending
                  </button>
                  <button
                    className={
                      status === 'granted' ? 'submit-btn-active' : 'submit-btn'
                    }
                    onClick={granted}
                  >
                    Granted
                  </button>
                  <button
                    className={
                      status === 'partial' ? 'submit-btn-active' : 'submit-btn'
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
              )}
              {status === 'all' && refunds.length === 0 ? (
                <h1 className='center'>There are currently no refunds.</h1>
              ) : (
                status === 'all' &&
                refunds.length > 0 &&
                refunds.map((r) => (
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
                      {!r.returned && (
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
                          Order Id: <span>{r._id}</span>
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
                              : !r.refundStatus
                              ? 'Awaiting return'
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
                            {r.messages.length > 0 ? (
                              <ol>
                                {r.messages.map((m, idx) => (
                                  <li key={idx}>{m}</li>
                                ))}
                              </ol>
                            ) : (
                              <p>No message has been sent</p>
                            )}
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
              {status === 'pending' && awaitingRefunds.length === 0 ? (
                <h1 className='center'>
                  There are currently no refunds pending.
                </h1>
              ) : (
                status === 'pending' &&
                awaitingRefunds.length > 0 &&
                awaitingRefunds.map((r) => (
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
                      {r.refundStatus !== 'granted' && (
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
                      )}
                    </div>
                    <br />
                    <div className='single-refund'>
                      <div className='refund-info'>
                        <h2>
                          Order Id: <span>{r._id}</span>
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
                grantedRefunds.map((r) => (
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
                    </div>
                    <br />
                    <div className='single-refund'>
                      <div className='refund-info'>
                        <h2>
                          Order Id: <span>{r._id}</span>
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
                        {r.messages.length > 0 ? (
                          <ol>
                            {r.messages.map((m, idx) => (
                              <li key={idx}>{m}</li>
                            ))}
                          </ol>
                        ) : (
                          <p>No message has been sent</p>
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
              {status === 'partial' && partialRefunds.length === 0 ? (
                <h1 className='center'>
                  There are currently no refunds that have been partially
                  granted.
                </h1>
              ) : (
                status === 'partial' &&
                partialRefunds.length > 0 &&
                partialRefunds.map((r) => (
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
                          Order Id: <span>{r._id}</span>
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
                        {r.messages.length > 0 ? (
                          <ol>
                            {r.messages.map((m, idx) => (
                              <li key={idx}>{m}</li>
                            ))}
                          </ol>
                        ) : (
                          <p>No message has been sent</p>
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
              {status === 'denied' && deniedRefunds.length === 0 ? (
                <h1 className='center'>
                  There are currently no refunds that have been denied.
                </h1>
              ) : (
                status === 'denied' &&
                deniedRefunds.length > 0 &&
                deniedRefunds.map((r) => (
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
                          Order Id: <span>{r._id}</span>
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
                        {r.messages.length > 0 ? (
                          <ol>
                            {r.messages.map((m, idx) => (
                              <li key={idx}>{m}</li>
                            ))}
                          </ol>
                        ) : (
                          <p>No message has been sent</p>
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
            </>
          )}
        </div>
      </div>
      <ItemsReturned
        itemsReturnedModalIsOpen={itemsReturnedModalIsOpen}
        setItemsReturnedModalIsOpen={setItemsReturnedModalIsOpen}
        currentRefund={currentRefund}
        fetchRefunds={fetchRefunds}
      />
      <RefundReject
        rejectRefundModalIsOpen={rejectRefundModalIsOpen}
        setRejectRefundModalIsOpen={setRejectRefundModalIsOpen}
        currentRefund={currentRefund}
        reason={reason}
        setReason={setReason}
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
    </div>
  );
};

export default Refunds;
