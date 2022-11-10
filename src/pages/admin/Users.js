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
  faLock,
  faKey,
  faStar,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import UserDeleteAdmin from '../../components/modals/UserDeleteAdmin';
import AddUserToAdmin from '../../components/modals/AddUserToAdmin';
import RemoveUserFromAdmin from '../../components/modals/RemoveUserFromAdmin';
import AddUserToFeaturedMembers from '../../components/modals/AddUserToFeaturedMembers';
import RemoveUserFromFeaturedMembers from '../../components/modals/RemoveUserFromFeaturedMembers';
import UserSuspend from '../../components/modals/UserSuspend';
import RevokeSuspension from '../../components/modals/RevokeSuspension';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userDeleteModalIsOpen, setUserDeleteModalIsOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState({});
  const [addToAdminModalIsOpen, setAddToAdminModalIsOpen] = useState(false);
  const [userToAddToAdmin, setUserToAddToAdmin] = useState({});
  const [removeFromAdminModalIsOpen, setRemoveFromAdminModalIsOpen] =
    useState(false);
  const [userToRemoveFromAdmin, setUserToRemoveFromAdmin] = useState({});
  const [userToAddToFeaturedMembers, setUserToAddToFeaturedMembers] = useState(
    {}
  );
  const [userToRemoveFromFeaturedMembers, setUserToRemoveFromFeaturedMembers] =
    useState({});
  const [addToFeaturedMembersModalIsOpen, setAddToFeaturedMembersModalIsOpen] =
    useState(false);
  const [
    removeFromFeaturedMembersModalIsOpen,
    setRemoveFromFeaturedMembersModalIsOpen,
  ] = useState(false);
  const [userSuspendModalIsOpen, setUserSuspendModalIsOpen] = useState(false);
  const [userToSuspend, setUserToSuspend] = useState({});
  const [userRevokeModalIsOpen, setUserRevokeModalIsOpen] = useState(false);
  const [userToRevoke, setUserToRevoke] = useState({});

  const { token, _id } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const fetchUsers = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/users`,
        { _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const searchUsers = async (e) => {
  //   e.preventDefault();

  //   await axios
  //     .post(
  //       `${process.env.REACT_APP_API}/admin/search-users/${query}`,
  //       { _id },
  //       {
  //         headers: {
  //           authtoken: token,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       setUsers(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const removeFromFeaturedMembers = (u) => {
    setRemoveFromFeaturedMembersModalIsOpen(true);
    setUserToRemoveFromFeaturedMembers(u);
  };

  const addToFeaturedMembers = (u) => {
    setAddToFeaturedMembersModalIsOpen(true);
    setUserToAddToFeaturedMembers(u);
  };

  const addToAdmin = (u) => {
    setAddToAdminModalIsOpen(true);
    setUserToAddToAdmin(u);
  };

  const removeFromAdmin = (u) => {
    setRemoveFromAdminModalIsOpen(true);
    setUserToRemoveFromAdmin(u);
  };

  const handleDelete = async (u) => {
    setUserDeleteModalIsOpen(true);
    setUserToDelete(u);
  };

  const handleSuspend = async (u) => {
    setUserSuspendModalIsOpen(true);
    setUserToSuspend(u);
  };

  const handleRevoke = async (u) => {
    setUserRevokeModalIsOpen(true);
    setUserToRevoke(u);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value.toLowerCase());
  };

  const searched = (query) => (q) =>
    (q.name && q.name.toLowerCase().includes(query)) ||
    (q.email && q.email.toLowerCase().includes(query)) ||
    (q.username && q.username.toLowerCase().includes(query)) ||
    q.role.toLowerCase().includes(query);

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        {/* <form onSubmit={searchUsers}> */}
        <div className='search-box'>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            onClick={handleSearch}
            className='fa'
          />
          <input
            type='search'
            placeholder='Search Users'
            onChange={handleSearch}
            // onChange={(e) => {
            //   setQuery(e.target.value);
            //   setSearchResults([]);
            // }}
            value={query}
          />
          <input type='submit' hidden />
        </div>
        {/* </form> */}
        <div className='admin-cards'>
          {users &&
            users.filter(searched(query)).map((u) => (
              <div
                className={
                  u.userStatus.suspended ? 'admin-card suspended' : 'admin-card'
                }
                key={u._id}
              >
                <Link
                  to={_id === u._id ? `/user/profile/${_id}` : `/user/${u._id}`}
                >
                  <img
                    src={u.profileImage ? u.profileImage.url : defaultProfile}
                    alt={`${u.username || u.name}'s profile picture`}
                    className='admin-user-img'
                  />
                </Link>
                <Link
                  to={_id === u._id ? `/user/profile/${_id}` : `/user/${u._id}`}
                >
                  <p>{u.username || u.name}</p>
                </Link>
                {u.featuredMember === true ? (
                  <span>
                    <FontAwesomeIcon
                      icon={faStar}
                      className='fa star gold'
                      onClick={() => removeFromFeaturedMembers(u)}
                    />
                  </span>
                ) : (
                  u.featuredMember === false && (
                    <span>
                      <FontAwesomeIcon
                        icon={faStar}
                        className='fa star grey'
                        onClick={() => addToFeaturedMembers(u)}
                      />
                    </span>
                  )
                )}
                {u.role === 'subscriber' && (
                  <span>
                    <FontAwesomeIcon
                      icon={faLock}
                      className='fa admin'
                      onClick={() => addToAdmin(u)}
                    />
                  </span>
                )}
                {u.role === 'admin' && (
                  <span>
                    <FontAwesomeIcon
                      icon={faKey}
                      className='fa admin'
                      onClick={() => removeFromAdmin(u)}
                    />
                  </span>
                )}
                <span>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className='fa trash'
                    onClick={() => handleDelete(u)}
                  />
                </span>
                <span>
                  {!u.userStatus.suspended ? (
                    <FontAwesomeIcon
                      icon={faClock}
                      className='fa suspend'
                      onClick={() => handleSuspend(u)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faClock}
                      className='fa suspend'
                      onClick={() => handleRevoke(u)}
                    />
                  )}
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
      <AddUserToAdmin
        addToAdminModalIsOpen={addToAdminModalIsOpen}
        setAddToAdminModalIsOpen={setAddToAdminModalIsOpen}
        userToAddToAdmin={userToAddToAdmin}
        fetchUsers={fetchUsers}
      />
      <RemoveUserFromAdmin
        removeFromAdminModalIsOpen={removeFromAdminModalIsOpen}
        setRemoveFromAdminModalIsOpen={setRemoveFromAdminModalIsOpen}
        userToRemoveFromAdmin={userToRemoveFromAdmin}
        fetchUsers={fetchUsers}
      />
      <AddUserToFeaturedMembers
        addToFeaturedMembersModalIsOpen={addToFeaturedMembersModalIsOpen}
        setAddToFeaturedMembersModalIsOpen={setAddToFeaturedMembersModalIsOpen}
        userToAddToFeaturedMembers={userToAddToFeaturedMembers}
        fetchUsers={fetchUsers}
      />
      <RemoveUserFromFeaturedMembers
        removeFromFeaturedMembersModalIsOpen={
          removeFromFeaturedMembersModalIsOpen
        }
        setRemoveFromFeaturedMembersModalIsOpen={
          setRemoveFromFeaturedMembersModalIsOpen
        }
        userToRemoveFromFeaturedMembers={userToRemoveFromFeaturedMembers}
        fetchUsers={fetchUsers}
      />
      <UserSuspend
        userSuspendModalIsOpen={userSuspendModalIsOpen}
        setUserSuspendModalIsOpen={setUserSuspendModalIsOpen}
        userToSuspend={userToSuspend}
        fetchUsers={fetchUsers}
      />
      <RevokeSuspension
        userRevokeModalIsOpen={userRevokeModalIsOpen}
        setUserRevokeModalIsOpen={setUserRevokeModalIsOpen}
        userToRevoke={userToRevoke}
        fetchUsers={fetchUsers}
      />
    </div>
  );
};

export default Users;
