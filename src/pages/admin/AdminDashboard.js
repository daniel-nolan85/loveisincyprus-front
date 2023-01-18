import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMessage,
  faMoneyBill1Wave,
  faSignsPost,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';
import moment from 'moment';

const AdminDashboard = () => {
  const [numPosts, setNumPosts] = useState(0);
  const [numUsers, setNumUsers] = useState(0);
  const [numMessages, setNumMessages] = useState(0);
  const [incomeTaken, setIncomeTaken] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  const { _id, token } = useSelector((state) => state.user);

  useEffect(() => {
    fetchNumOfPosts();
    fetchNumOfUsers();
    fetchNumOfMessages();
    fetchIncomeTaken();
    fetchRecentOrders();
    fetchRecentUsers();
  }, []);

  const fetchNumOfPosts = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/total-posts`)
      .then((res) => setNumPosts(res.data));
  };

  const fetchNumOfUsers = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/total-users`)
      .then((res) => setNumUsers(res.data));
  };

  const fetchNumOfMessages = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/total-messages`)
      .then((res) => setNumMessages(res.data));
  };

  const fetchIncomeTaken = async () => {
    await axios.get(`${process.env.REACT_APP_API}/income-taken`).then((res) => {
      console.log('income => ', res.data);
      setIncomeTaken(res.data);
    });
  };

  const fetchRecentOrders = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/recent-orders`,
        { _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setRecentOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRecentUsers = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/recent-users`,
        { _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setRecentUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        <div className='admin-cards'>
          <div className='admin-card'>
            <div>
              <h1>{numPosts}</h1>
              <h3>Posts</h3>
            </div>
            <FontAwesomeIcon icon={faSignsPost} className='fa' />
          </div>

          <div className='admin-card'>
            <div>
              <h1>{numUsers}</h1>
              <h3>Users</h3>
            </div>
            <FontAwesomeIcon icon={faUsers} className='fa' />
          </div>

          <div className='admin-card'>
            <div>
              <h1>{numMessages}</h1>
              <h3>Messages</h3>
            </div>
            <FontAwesomeIcon icon={faMessage} className='fa' />
          </div>

          <div className='admin-card'>
            <div>
              <h1>€{incomeTaken.toFixed(2)}</h1>
              <h3>Income</h3>
            </div>
            <FontAwesomeIcon icon={faMoneyBill1Wave} className='fa' />
          </div>
        </div>

        <div className='admin-info'>
          <div className='recent-payments'>
            <div className='title'>
              <h2>Recent Orders</h2>
              <Link to='/admin/orders' className='submit-btn'>
                View All
              </Link>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders &&
                  recentOrders.map((o) => (
                    <tr key={o._id}>
                      <td>{o.paymentIntent.id}</td>
                      <td>{moment(o.createdAt).format('L')}</td>
                      <td>{o.paymentIntent.amount}</td>
                      <td>{o.orderStatus}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className='new-members'>
            <div className='title'>
              <h2>New Members</h2>
              <Link to='/admin/users' className='submit-btn'>
                View All
              </Link>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers &&
                  recentUsers.map((u) => (
                    <tr key={u._id}>
                      <td>
                        <Link
                          to={
                            u._id === _id
                              ? `/user/profile/${_id}`
                              : `/user/${u._id}`
                          }
                        >
                          <img
                            src={
                              u.profileImage
                                ? u.profileImage.url
                                : defaultProfile
                            }
                            alt={`${u.username || u.name}'s profile picture`}
                          />
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={
                            u._id === _id
                              ? `/user/profile/${_id}`
                              : `/user/${u._id}`
                          }
                        >
                          <p>{u.username || u.name}</p>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
