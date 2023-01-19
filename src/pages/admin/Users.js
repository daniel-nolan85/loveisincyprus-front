import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashCan,
  faMagnifyingGlass,
  faLock,
  faKey,
  faStar,
  faClock,
  faCalendarDays,
  faFolderOpen,
  faUserTie,
  faUserGraduate,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import UserDeleteAdmin from '../../components/modals/UserDeleteAdmin';
import AddUserToAdmin from '../../components/modals/AddUserToAdmin';
import RemoveUserFromAdmin from '../../components/modals/RemoveUserFromAdmin';
import AddUserToFeaturedMembers from '../../components/modals/AddUserToFeaturedMembers';
import RemoveUserFromFeaturedMembers from '../../components/modals/RemoveUserFromFeaturedMembers';
import UserSuspend from '../../components/modals/UserSuspend';
import RevokeSuspension from '../../components/modals/RevokeSuspension';
import AddUserToEventsEligible from '../../components/modals/AddUserToEventsEligible';
import RemoveUserFromEventsEligible from '../../components/modals/RemoveUserFromEventsEligible';
import ShowMain from '../../components/modals/ShowMain';
import ShowSecondary from '../../components/modals/ShowSecondary';
import AdminPreferences from '../../components/modals/AdminPreferences';

const Users = ({ history }) => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
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
  const [
    removeFromEventsEligibleModalIsOpen,
    setRemoveFromEventsEligibleModalIsOpen,
  ] = useState(false);
  const [userToRemoveFromEventsEligible, setUserToRemoveFromEventsEligible] =
    useState({});
  const [addToEventsEligibleModalIsOpen, setAddToEventsEligibleModalIsOpen] =
    useState(false);
  const [userToAddToEventsEligible, setUserToAddToEventsEligible] = useState(
    {}
  );
  const [userRevokeModalIsOpen, setUserRevokeModalIsOpen] = useState(false);
  const [userToRevoke, setUserToRevoke] = useState({});
  const [mainAdminModalIsOpen, setMainAdminModalIsOpen] = useState(false);
  const [userIsMainAdmin, setUserIsMainAdmin] = useState({});
  const [secondaryAdminModalIsOpen, setSecondaryAdminModalIsOpen] =
    useState(false);
  const [userIsSecondaryAdmin, setUserIsSecondaryAdmin] = useState({});
  const [adminPreferencesModalIsOpen, setAdminPreferencesModalIsOpen] =
    useState(false);
  const [secondaryAdmin, setSecondaryAdmin] = useState({});

  const { token, _id, role, canUsers } = useSelector((state) => state.user);

  useEffect(() => {
    if (!canUsers) {
      history.push('/admin/dashboard');
    }
  }, []);

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
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromEventsEligible = (u) => {
    setRemoveFromEventsEligibleModalIsOpen(true);
    setUserToRemoveFromEventsEligible(u);
  };

  const addToEventsEligible = (u) => {
    setAddToEventsEligibleModalIsOpen(true);
    setUserToAddToEventsEligible(u);
  };

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

  const showMain = async (u) => {
    setMainAdminModalIsOpen(true);
    setUserIsMainAdmin(u);
  };

  const showSecondary = async (u) => {
    setSecondaryAdminModalIsOpen(true);
    setUserIsSecondaryAdmin(u);
  };

  const handlePreferences = async (u) => {
    setAdminPreferencesModalIsOpen(true);
    setSecondaryAdmin(u);
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
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content'>
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
            value={query}
          />
          <input type='submit' hidden />
        </div>
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
                {u.eventsEligible === true ? (
                  <span>
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className='fa event green'
                      onClick={() => removeFromEventsEligible(u)}
                    />
                  </span>
                ) : (
                  u.eventsEligible === false && (
                    <span>
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        className='fa event grey'
                        onClick={() => addToEventsEligible(u)}
                      />
                    </span>
                  )
                )}
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
                {u.role === 'main-admin' ? (
                  <span>
                    <FontAwesomeIcon
                      icon={faKey}
                      className='fa admin'
                      onClick={() => removeFromAdmin(u)}
                    />
                  </span>
                ) : (
                  u.role === 'secondary-admin' && (
                    <span>
                      <FontAwesomeIcon
                        icon={faKey}
                        className='fa admin'
                        onClick={() => removeFromAdmin(u)}
                      />
                    </span>
                  )
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
                      className='fa suspend grey'
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
                {u.role === 'main-admin' && (
                  <span>
                    <FontAwesomeIcon
                      icon={faUserTie}
                      className='fa admin-member'
                      onClick={() => showMain(u)}
                    />
                  </span>
                )}
                {u.role === 'secondary-admin' && (
                  <span>
                    <FontAwesomeIcon
                      icon={faUserGraduate}
                      className='fa admin-member'
                      onClick={() => showSecondary(u)}
                    />
                  </span>
                )}
                {role === 'main-admin' && u.role === 'secondary-admin' && (
                  <span>
                    <FontAwesomeIcon
                      icon={faFolderOpen}
                      className='fa folder'
                      onClick={() => handlePreferences(u)}
                    />
                  </span>
                )}
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
      <AddUserToEventsEligible
        addToEventsEligibleModalIsOpen={addToEventsEligibleModalIsOpen}
        setAddToEventsEligibleModalIsOpen={setAddToEventsEligibleModalIsOpen}
        userToAddToEventsEligible={userToAddToEventsEligible}
        fetchUsers={fetchUsers}
      />
      <RemoveUserFromEventsEligible
        removeFromEventsEligibleModalIsOpen={
          removeFromEventsEligibleModalIsOpen
        }
        setRemoveFromEventsEligibleModalIsOpen={
          setRemoveFromEventsEligibleModalIsOpen
        }
        userToRemoveFromEventsEligible={userToRemoveFromEventsEligible}
        fetchUsers={fetchUsers}
      />
      <ShowMain
        mainAdminModalIsOpen={mainAdminModalIsOpen}
        setMainAdminModalIsOpen={setMainAdminModalIsOpen}
        userIsMainAdmin={userIsMainAdmin}
      />
      <ShowSecondary
        secondaryAdminModalIsOpen={secondaryAdminModalIsOpen}
        setSecondaryAdminModalIsOpen={setSecondaryAdminModalIsOpen}
        userIsSecondaryAdmin={userIsSecondaryAdmin}
      />
      <AdminPreferences
        adminPreferencesModalIsOpen={adminPreferencesModalIsOpen}
        setAdminPreferencesModalIsOpen={setAdminPreferencesModalIsOpen}
        secondaryAdmin={secondaryAdmin}
        fetchUsers={fetchUsers}
      />
    </div>
  );
};

export default Users;
