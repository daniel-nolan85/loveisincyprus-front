import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCashRegister,
  faMoneyBill1Wave,
  faSignsPost,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';

const AdminDashboard = () => {
  const [recentUsers, setRecentUsers] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API}/recent-users`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setRecentUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        <div className='admin-cards'>
          <div className='admin-card'>
            <div>
              <h1>2194</h1>
              <h3>Posts</h3>
            </div>
            <FontAwesomeIcon icon={faSignsPost} className='fa' />
          </div>

          <div className='admin-card'>
            <div>
              <h1>705</h1>
              <h3>Users</h3>
            </div>
            <FontAwesomeIcon icon={faUsers} className='fa' />
          </div>

          <div className='admin-card'>
            <div>
              <h1>587</h1>
              <h3>Purchases</h3>
            </div>
            <FontAwesomeIcon icon={faCashRegister} className='fa' />
          </div>

          <div className='admin-card'>
            <div>
              <h1>&euro;25,000</h1>
              <h3>Income</h3>
            </div>
            <FontAwesomeIcon icon={faMoneyBill1Wave} className='fa' />
          </div>
        </div>

        <div className='admin-info'>
          <div className='recent-payments'>
            <div className='title'>
              <h2>Recent Payments</h2>
              <Link to='#' className='submit-btn'>
                View All
              </Link>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Invoice #</th>
                  <th>Amount</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>0123456789</td>
                  <td>&euro;120</td>
                  <td>
                    <Link to='#'>View</Link>
                  </td>
                </tr>
                <tr>
                  <td>John Doe</td>
                  <td>0123456789</td>
                  <td>&euro;120</td>
                  <td>
                    <Link to='#'>View</Link>
                  </td>
                </tr>
                <tr>
                  <td>John Doe</td>
                  <td>0123456789</td>
                  <td>&euro;120</td>
                  <td>
                    <Link to='#'>View</Link>
                  </td>
                </tr>
                <tr>
                  <td>John Doe</td>
                  <td>0123456789</td>
                  <td>&euro;120</td>
                  <td>
                    <Link to='#'>View</Link>
                  </td>
                </tr>
                <tr>
                  <td>John Doe</td>
                  <td>0123456789</td>
                  <td>&euro;120</td>
                  <td>
                    <Link to='#'>View</Link>
                  </td>
                </tr>
                <tr>
                  <td>John Doe</td>
                  <td>0123456789</td>
                  <td>&euro;120</td>
                  <td>
                    <Link to='#'>View</Link>
                  </td>
                </tr>
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
                            u._id === user._id
                              ? `/user/profile/${user._id}`
                              : `/user/${u._id}`
                          }
                        >
                          <img
                            src={
                              u.profileImage
                                ? u.profileImage.url
                                : defaultProfile
                            }
                            alt={`${
                              u.name || u.email.split('@'[0])
                            }'s profile picture`}
                          />
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={
                            u._id === user._id
                              ? `/user/profile/${user._id}`
                              : `/user/${u._id}`
                          }
                        >
                          <p>{u.name ? u.name : u.email.split('@')[0]}</p>
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
