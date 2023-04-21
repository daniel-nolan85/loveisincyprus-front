import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LeftSidebar from '../../components/admin/LeftSidebar';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowsRotate,
  faCheck,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import LargeDataImage from '../../components/modals/LargeDataImage';
import ProfileProgress from '../../components/modals/ProfileProgress';

const Data = ({ history }) => {
  const [byPage, setByPage] = useState(50);
  const [filterBy, setFilterBy] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading50, setLoading50] = useState(false);
  const [loading100, setLoading100] = useState(false);
  const [loading500, setLoading500] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);
  const [loadingReverse, setLoadingReverse] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const [profileImageModalIsOpen, setProfileImageModalIsOpen] = useState(false);
  const [progressModalIsOpen, setProgressModalIsOpen] = useState(false);
  const [profileImages, setProfileImages] = useState([]);
  const [progress, setProgress] = useState({});

  const { token, role } = useSelector((state) => state.user);

  console.log('users => ', users);

  useEffect(() => {
    if (role !== 'main-admin') {
      history.push('/admin/dashboard');
    }
  }, []);

  useEffect(() => {
    fetchUsersData();
  }, [byPage, filterBy]);

  useEffect(() => {
    if (loadingReverse) {
      const reverseUsers = [...users].reverse();
      setUsers(reverseUsers);
      setLoadingReverse(false);
    }
  }, [loadingReverse]);

  useEffect(() => {
    if (Object.keys(progress).length !== 0) {
      console.log('progress => ', progress);
      setProgressModalIsOpen(true);
    }
  }, [progress]);

  const fetch50 = async () => {
    setLoading50(true);
    setByPage(50);
  };

  const fetch100 = () => {
    setLoading100(true);
    setByPage(100);
  };

  const fetch500 = () => {
    setLoading500(true);
    setByPage(500);
  };

  const fetchAll = () => {
    setLoadingAll(true);
    setByPage('all');
  };

  const reverse = () => {
    setLoadingReverse(true);
  };

  const fetchUsersData = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/users-data`,
        { byPage, filterBy },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
        setLoading(false);
        setLoading50(false);
        setLoading100(false);
        setLoading500(false);
        setLoadingAll(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setLoading50(false);
        setLoading100(false);
        setLoading500(false);
        setLoadingAll(false);
      });
  };

  const fetchProgressCompletion = async (id) => {
    setLoadingProgress(true);
    await axios
      .post(
        `${process.env.REACT_APP_API}/progress-completion-data`,
        {
          id,
        },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setProgress(res.data);
        setLoadingProgress(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingProgress(false);
      });
  };

  const viewProfilePics = (u) => {
    setProfileImageModalIsOpen(true);
    setProfileImages(u);
  };

  return (
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        {loading ? (
          <div className='spinner'>
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          </div>
        ) : (
          <>
            <div className='refund-filter-btns'>
              <button
                className={byPage === 50 ? 'submit-btn-active' : 'submit-btn'}
                onClick={fetch50}
              >
                {loading50 ? (
                  <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                ) : (
                  '50'
                )}
              </button>
              <button
                className={byPage === 100 ? 'submit-btn-active' : 'submit-btn'}
                onClick={fetch100}
              >
                {loading100 ? (
                  <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                ) : (
                  '100'
                )}
              </button>
              <button
                className={byPage === 500 ? 'submit-btn-active' : 'submit-btn'}
                onClick={fetch500}
              >
                {loading500 ? (
                  <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                ) : (
                  '500'
                )}
              </button>
              <button
                className={
                  byPage === 'all' ? 'submit-btn-active' : 'submit-btn'
                }
                onClick={fetchAll}
              >
                {loadingAll ? (
                  <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                ) : (
                  'All'
                )}
              </button>
            </div>
            {loadingReverse ? (
              <FontAwesomeIcon
                icon={faSpinner}
                className='fa center reverse'
                spin
              />
            ) : (
              <FontAwesomeIcon
                icon={faArrowsRotate}
                className='fa center reverse'
                onClick={reverse}
              />
            )}
            <div className='spreadsheet-wrapper'>
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Registered</th>
                    <th>Last Login</th>
                    <th>IP Address(es)</th>
                    <th>Mobile</th>
                    <th>Paid or Unpaid?</th>
                    <th>1 Month Member</th>
                    <th>6 Month Member</th>
                    <th>12 Month Member</th>
                    <th>Verified?</th>
                    <th># Profile Images</th>
                    <th>% Profile Completion</th>
                    <th># Points</th>
                    <th>Featured?</th>
                    <th># Following</th>
                    <th># Followers</th>
                    <th># Reports</th>
                    <th># Reported</th>
                    <th># Messages Sent</th>
                    <th># Messages Received</th>
                    <th># Items Ordered</th>
                    <th>€ Items Ordered</th>
                    <th># Gift Cards Sent</th>
                    <th>€ Gift Cards Sent</th>
                    <th># Gift Cards Received</th>
                    <th>€ Gift Cards Received</th>
                    <th># T-shirts</th>
                    <th># Sprays</th>
                    <th># Droppers</th>
                    <th># Perfumes</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td>{u.username}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td className='center-cell'>
                        {u.gender === 'male' ? 'Male' : 'Female'}
                      </td>
                      <td className='center-cell'>{u.age}</td>
                      <td>{moment(u.createdAt).format('MMMM Do YYYY')}</td>
                      <td>
                        {u.lastLogin
                          ? moment(u.lastLogin).format('MMMM Do YYYY')
                          : moment(u.createdAt).format('MMMM Do YYYY')}
                      </td>
                      <td>
                        {u.ipAddresses &&
                          u.ipAddresses.map((ip, idx) => <p key={idx}>{ip}</p>)}
                      </td>
                      <td>{u.mobile}</td>
                      <td className='center-cell'>
                        {u.membership.paid ? 'True' : 'False'}
                      </td>
                      <td className='center-cell'>
                        {u.membership.cost === '10.00' && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className='fa check'
                          />
                        )}
                      </td>
                      <td className='center-cell'>
                        {u.membership.cost === '50.00' && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className='fa check'
                          />
                        )}
                      </td>
                      <td className='center-cell'>
                        {u.membership.cost === '90.00' && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className='fa check'
                          />
                        )}
                      </td>
                      <td className='center-cell'>
                        {u.verified === 'true' ? 'True' : 'False'}
                      </td>
                      <td
                        className='center-cell link'
                        onClick={() => {
                          viewProfilePics(u.profilePhotos);
                        }}
                      >
                        {u.profilePhotos.length > 0 && u.profilePhotos.length}
                      </td>
                      <td
                        className='center-cell link'
                        onClick={() => fetchProgressCompletion(u._id)}
                      >
                        {u.profilePercentage && `${u.profilePercentage} %`}
                      </td>
                      <td className='center-cell link'>{u.pointsTotal}</td>
                      <td className='center-cell'>
                        {u.featuredMember ? 'True' : 'False'}
                      </td>
                      <td className='center-cell link'>
                        {u.following.length > 0 && u.following.length}
                      </td>
                      <td className='center-cell link'>
                        {u.followers.length > 0 && u.followers.length}
                      </td>
                      <td className='center-cell link'>
                        {u.reports.post.length +
                          u.reports.comment.length +
                          u.reports.message.length >
                          0 &&
                          u.reports.post.length +
                            u.reports.comment.length +
                            u.reports.message.length}
                      </td>
                      <td className='center-cell link'>
                        {u.reported.post.length +
                          u.reported.comment.length +
                          u.reported.message.length >
                          0 &&
                          u.reported.post.length +
                            u.reported.comment.length +
                            u.reported.message.length}
                      </td>
                      <td className='center-cell link'>{u.messagesSent}</td>
                      <td className='center-cell link'>{u.messagesReceived}</td>
                      <td className='center-cell link'>{u.itemsOrdered}</td>
                      <td className='center-cell link'>
                        {u.itemsOrderedValue &&
                          `€${u.itemsOrderedValue.toFixed(2)}`}
                      </td>
                      <td className='center-cell link'>{u.giftCardsSent}</td>
                      <td className='center-cell link'>
                        {u.giftCardsSentValue &&
                          `€${u.giftCardsSentValue.toFixed(2)}`}
                      </td>
                      <td className='center-cell link'>
                        {u.giftCardsReceived}
                      </td>
                      <td className='center-cell link'>
                        {u.giftCardsReceivedValue &&
                          `€${u.giftCardsReceivedValue.toFixed(2)}`}
                      </td>
                      <td className='center-cell'>{u.tShirts}</td>
                      <td className='center-cell'>{u.sprays}</td>
                      <td className='center-cell'>{u.droppers}</td>
                      <td className='center-cell'>{u.perfumes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <LargeDataImage
        profileImageModalIsOpen={profileImageModalIsOpen}
        setProfileImageModalIsOpen={setProfileImageModalIsOpen}
        images={profileImages}
      />
      <ProfileProgress
        progress={progress}
        progressModalIsOpen={progressModalIsOpen}
        setProgressModalIsOpen={setProgressModalIsOpen}
        page={'data'}
      />
    </div>
  );
};

export default Data;
