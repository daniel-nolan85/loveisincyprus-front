import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import defaultProfile from '../../assets/defaultProfile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashCan,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import UserDeleteAdmin from '../../components/modals/UserDeleteAdmin';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userDeleteModalIsOpen, setUserDeleteModalIsOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState({});

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      fetchUsers();
    }
  }, [user && user.token]);

  const fetchUsers = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/users`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchUsers = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${process.env.REACT_APP_API}/admin/search-users/${query}`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (u) => {
    setUserDeleteModalIsOpen(true);
    setUserToDelete(u);
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        <form onSubmit={searchUsers}>
          <div className='search-box'>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              onClick={searchUsers}
              className='fa'
            />
            <input
              type='search'
              placeholder='Search Users'
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchResults([]);
              }}
              value={query}
            />
            <input type='submit' hidden />
          </div>
        </form>
        <div className='admin-cards'>
          {users &&
            users.map((u) => (
              <div className='admin-card' key={u._id}>
                <Link
                  to={
                    user._id === u._id
                      ? `/user/profile/${user._id}`
                      : `/user/${u._id}`
                  }
                >
                  <img
                    src={u.profileImage ? u.profileImage.url : defaultProfile}
                    alt={`${u.name || u.email.split('@')[0]}'s profile picture`}
                    className='admin-user-img'
                  />
                </Link>
                <Link
                  to={
                    user._id === u._id
                      ? `/user/profile/${user._id}`
                      : `/user/${u._id}`
                  }
                >
                  <p>{u.name || u.email.split('@')[0]}</p>
                </Link>
                <span>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className='fa trash'
                    onClick={() => handleDelete(u)}
                  />
                </span>
              </div>
            ))}
        </div>
      </div>
      <UserDeleteAdmin
        userDeleteModalIsOpen={userDeleteModalIsOpen}
        setUserDeleteModalIsOpen={setUserDeleteModalIsOpen}
        userToDelete={userToDelete}
        fetchUsers={fetchUsers}
      />
    </div>
  );
};

export default Users;
