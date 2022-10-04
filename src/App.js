import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './firebase';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ChatState } from './context/ChatProvider';
import io from 'socket.io-client';
import axios from 'axios';

// modals
import Popup from './components/modals/Popup';
import Expiring from './components/modals/Expiring';
import Expired from './components/modals/Expired';

import Header from './components/nav/Header';
import SideDrawer from './components/drawer/SideDrawer';
import Home from './pages/Home';
import LoginAndRegister from './pages/LoginAndRegister';
import RegisterComplete from './components/forms/RegisterComplete';
import ForgotPassword from './components/forms/ForgotPassword';
import { currentUser } from './functions/auth';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import SubscriberRoute from './components/routes/SubscriberRoute';
import ChangePassword from './components/forms/ChangePassword';
import UserDashboard from './pages/user/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import Profile from './pages/user/Profile';
import Following from './pages/user/Following';
import Followers from './pages/user/Followers';
import UserProfile from './pages/user/UserProfile';
import Posts from './pages/admin/Posts';
import Users from './pages/admin/Users';
import About from './pages/About';
import Help from './pages/Help';
import Contact from './pages/Contact';
import RelCoach from './pages/RelCoach';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TsAndCs from './pages/TsAndCs';
import Matches from './pages/user/Matches';
import Swipe from './pages/user/Swipe';
import Visitors from './pages/user/Visitors';
import Photos from './pages/user/Photos';
import GeoBlock from './pages/admin/GeoBlock';
import Category from './pages/admin/Category';
import Sub from './pages/admin/Sub';
import Products from './pages/admin/Products';
import Shop from './pages/user/Shop';
import Product from './pages/user/Product';
import CategoryHome from './pages/user/CategoryHome';
import SubHome from './pages/user/SubHome';
import ShopSearch from './pages/user/ShopSearch';
import Cart from './pages/user/Cart';
import Checkout from './pages/user/Checkout';
import Coupon from './pages/admin/Coupon';
import Payment from './pages/user/Payment';
import PurchaseHistory from './pages/user/PurchaseHistory';
import Orders from './pages/admin/Orders';
import Wishlist from './pages/user/Wishlist';
import Points from './pages/user/Points';
import Chats from './pages/user/Chats';
import Notifications from './pages/user/Notifications';
import Event from './pages/admin/Event';
import UserSearch from './pages/user/UserSearch';
import MassMail from './pages/admin/MassMail';
import AdSubmission from './pages/user/AdSubmission';
import AdSubmissions from './pages/admin/AdSubmissions';
import Events from './pages/user/Events';
import EventInfo from './pages/user/EventInfo';
import VerifSubmissions from './pages/admin/VerifSubmissions';
import BecomePaid from './pages/user/BecomePaid';
import MembershipCard from './pages/user/MembershipCard';
import PaymentSuccess from './pages/user/PaymentSuccess';
import UserSettings from './pages/user/UserSettings';
import IPBlock from './pages/admin/IPBlock';

//using lazy
// const Header = lazy(() => import('./components/nav/Header'));
// const Home = lazy(() => import('./pages/Home'));
// const LoginAndRegister = lazy(() => import('./pages/LoginAndRegister'));
// const RegisterComplete = lazy(() =>
//   import('./components/forms/RegisterComplete')
// );
// const ForgotPassword = lazy(() => import('./components/forms/ForgotPassword'));
// const { currentUser } = lazy(() => import('./functions/auth'));
// const UserRoute = lazy(() => import('./components/routes/UserRoute'));
// const AdminRoute = lazy(() => import('./components/routes/AdminRoute'));
// const ChangePassword = lazy(() => import('./components/forms/ChangePassword'));
// const UserDashboard = lazy(() => import('./pages/user/UserDashboard'));
// const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
// const Profile = lazy(() => import('./pages/user/Profile'));
// const Following = lazy(() => import('./pages/user/Following'));
// const Followers = lazy(() => import('./pages/user/Followers'));
// const UserProfile = lazy(() => import('./pages/user/UserProfile'));
// const Posts = lazy(() => import('./pages/admin/Posts'));
// const Users = lazy(() => import('./pages/admin/Users'));
// const About = lazy(() => import('./pages/About'));
// const Help = lazy(() => import('./pages/Help'));
// const Contact = lazy(() => import('./pages/Contact'));
// const RelCoach = lazy(() => import('./pages/RelCoach'));
// const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
// const TsAndCs = lazy(() => import('./pages/TsAndCs'));
// const Matches = lazy(() => import('./pages/user/Matches'));
// const Swipe = lazy(() => import('./pages/user/Swipe'));
// const Visitors = lazy(() => import('./pages/user/Visitors'));
// const Photos = lazy(() => import('./pages/user/Photos'));
// const GeoBlock = lazy(() => import('./pages/admin/GeoBlock'));

let socket, selectedChatCompare;

const App = () => {
  const [popupModalIsOpen, setPopupModalIsOpen] = useState(false);
  const [expiringModalIsOpen, setExpiringModalIsOpen] = useState(false);
  const [expiredModalIsOpen, setExpiredModalIsOpen] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  const isFirstRun = useRef(true);

  const {
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
    messages,
    setMessages,
    isTyping,
    setIsTyping,
    socketConnected,
    setSocketConnected,
  } = ChatState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                profileImage: res.data.profileImage,
                coverImage: res.data.coverImage,
                name: res.data.name,
                email: res.data.email,
                username: res.data.username,
                about: res.data.about,
                gender: res.data.gender,
                birthday: res.data.birthday,
                age: res.data.age,
                location: res.data.location,
                genderWanted: res.data.genderWanted,
                relWanted: res.data.relWanted,
                following: res.data.following,
                followers: res.data.followers,
                matches: res.data.matches,
                visitors: res.data.visitors,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
                createdAt: res.data.createdAt,
                address: res.data.address,
                wishlist: res.data.wishlist,
                points: res.data.points,
                notifications: res.data.notifications,
                featuredMember: res.data.featuredMember,
                events: res.data.events,
                eventsEligible: res.data.eventsEligible,
                optIn: res.data.optIn,
                verified: res.data.verified,
                messages: res.data.messages,
                newNotifs: res.data.newNotifs,
                profileComplete: res.data.profileComplete,
                language: res.data.language,
                maritalStatus: res.data.maritalStatus,
                numOfChildren: res.data.numOfChildren,
                drinks: res.data.drinks,
                smokes: res.data.smokes,
                nationality: res.data.nationality,
                height: res.data.height,
                build: res.data.build,
                hairColor: res.data.hairColor,
                hairStyle: res.data.hairStyle,
                hairLength: res.data.hairLength,
                eyeColor: res.data.eyeColor,
                ethnicity: res.data.ethnicity,
                feetType: res.data.feetType,
                loves: res.data.loves,
                hates: res.data.hates,
                education: res.data.education,
                occupation: res.data.occupation,
                politics: res.data.politics,
                religion: res.data.religion,
                pets: res.data.pets,
                interests: res.data.interests,
                music: res.data.music,
                foods: res.data.foods,
                books: res.data.books,
                films: res.data.films,
                sports: res.data.sports,
                livesWith: res.data.livesWith,
                roleInLife: res.data.roleInLife,
                managesEdu: res.data.managesEdu,
                hobbies: res.data.hobbies,
                marriage: res.data.marriage,
                income: res.data.income,
                ageOfPartner: res.data.ageOfPartner,
                traits: res.data.traits,
                changes: res.data.changes,
                relocate: res.data.relocate,
                treatSelf: res.data.treatSelf,
                sexLikes: res.data.sexLikes,
                sexFrequency: res.data.sexFrequency,
                membership: res.data.membership,
                clearPhoto: res.data.clearPhoto,
              },
            });
            console.log('logged in user ==> ', res);
          })
          .catch((err) => console.log(err));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  // useEffect(() => {
  //   if (user && user.profileComplete === false) {
  //     const timer = setTimeout(() => {
  //       setPopupModalIsOpen(true);
  //     }, 5000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [user && user.token]);

  useEffect(() => {
    if (user) {
      socket = io(
        process.env.REACT_APP_SOCKET_IO,
        { path: '/socket.io' },
        { reconnection: true }
      );
      socket.emit('setup', user);
      socket.on('connected', () => setSocketConnected(true));
      socket.on('typing', () => setIsTyping(true));
      socket.on('stop typing', () => setIsTyping(false));

      socket.on('post liked', (post) => {
        incrementNewNotifications(post, 'like');
      });
      socket.on('comment added', (p) => {
        incrementNewNotifications(p, 'comment');
      });
      socket.on('follower added', (f) => {
        incrementNewNotifications(f, 'follower');
      });
      socket.on('visitor added', (v) => {
        incrementNewNotifications(v, 'visitor');
      });
      socket.on('event added', (e) => {
        incrementNewNotifications(e, 'event');
      });
      removeExpiredFeatures();
      handleExpiredAds();
      handleExpiredMemberships();
    }
  }, [user && user.token]);

  useEffect(() => {
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      socket.on('message received', (newMessageReceived) => {
        // console.log('newMessageReceived => ', newMessageReceived);
        fetchChats();
        if (
          !selectedChatCompare ||
          selectedChatCompare._id != newMessageReceived.chat._id
        ) {
          // if (!notification.includes(newMessageReceived)) {
          //   setNotification([newMessageReceived, ...notification]);
          // }
          incrementNewMessages(newMessageReceived);
        } else {
          setMessages([...messages, newMessageReceived]);
        }
      });
    }
  });

  const incrementNewNotifications = async (notif, reason) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/new-notification-count`,
        { user, notif, reason },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            newNotifs: res.data.newNotifs,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const incrementNewMessages = async (message) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/new-message-count`,
        { user, message },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            messages: res.data.messages,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchChats = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-chats`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setChats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeExpiredFeatures = async () => {
    await axios.put(`${process.env.REACT_APP_API}/remove-expired-features`);
    // .then((res) => console.log(res.data));
  };

  const handleExpiredAds = async () => {
    await axios.put(`${process.env.REACT_APP_API}/expired-ad`);
    // .then((res) => console.log(res.data));
  };

  const handleExpiredMemberships = async () => {
    await axios
      .put(`${process.env.REACT_APP_API}/expired-membership`, {
        user,
      })
      .then((res) => {
        if (res.data.soon) {
          setExpiringModalIsOpen(true);
        }
        if (res.data._id === user._id) {
          setExpiredModalIsOpen(true);
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              ...user,
              membership: res.data.membership,
            },
          });
        }
      });
  };

  return (
    // <Suspense
    //   fallback={
    //     <div className='fallback'>
    //       <FontAwesomeIcon icon={faSpinner} spin />
    //     </div>
    //   }
    // >
    <>
      <Header />
      <SideDrawer />
      <ToastContainer />
      <Popup
        popupModalIsOpen={popupModalIsOpen}
        setPopupModalIsOpen={setPopupModalIsOpen}
      />
      <Expiring
        expiringModalIsOpen={expiringModalIsOpen}
        setExpiringModalIsOpen={setExpiringModalIsOpen}
      />
      <Expired
        expiredModalIsOpen={expiredModalIsOpen}
        setExpiredModalIsOpen={setExpiredModalIsOpen}
      />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/authentication' component={LoginAndRegister} />
        <Route exact path='/register/complete' component={RegisterComplete} />
        <Route exact path='/forgot/password' component={ForgotPassword} />
        <Route exact path='/about-us' component={About} />
        <Route exact path='/help' component={Help} />
        <Route exact path='/contact-us' component={Contact} />
        <Route exact path='/relationship-coaching' component={RelCoach} />
        <Route exact path='/privacy-policy' component={PrivacyPolicy} />
        <Route exact path='/terms-and-conditions' component={TsAndCs} />
        <Route exact path='/shop' component={Shop} />
        <Route exact path='/product/:slug' component={Product} />
        <Route exact path='/category/:slug' component={CategoryHome} />
        <Route exact path='/sub/:slug' component={SubHome} />
        <Route exact path='/shop/search' component={ShopSearch} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/ad-submission' component={AdSubmission} />
        <UserRoute exact path='/change/password' component={ChangePassword} />
        <UserRoute exact path='/user/dashboard' component={UserDashboard} />
        <UserRoute exact path='/user/profile/:userId' component={Profile} />
        <UserRoute exact path='/liked-users' component={Following} />
        <UserRoute exact path='/users-who-like-me' component={Followers} />
        <UserRoute exact path='/my-matches' component={Matches} />
        <UserRoute exact path='/users-who-visited-me' component={Visitors} />
        <UserRoute exact path='/user/:userId' component={UserProfile} />
        <UserRoute exact path='/photos/:userId' component={Photos} />
        <UserRoute exact path='/checkout' component={Checkout} />
        <UserRoute exact path='/payment' component={Payment} />
        <UserRoute exact path='/purchase/history' component={PurchaseHistory} />
        <UserRoute exact path='/wishlist' component={Wishlist} />
        <UserRoute exact path='/points' component={Points} />
        <UserRoute exact path='/notifications' component={Notifications} />
        <UserRoute exact path='/search-users' component={UserSearch} />
        <UserRoute exact path='/events' component={Events} />
        <UserRoute exact path='/event/:eventId' component={EventInfo} />
        <UserRoute exact path='/become-paid-member' component={BecomePaid} />
        <UserRoute exact path='/membership-card' component={MembershipCard} />
        <UserRoute
          exact
          path='/payment-successful'
          component={PaymentSuccess}
        />
        <UserRoute exact path='/user-settings' component={UserSettings} />
        <SubscriberRoute exact path='/swipe-to-match' component={Swipe} />
        <SubscriberRoute exact path='/chats' component={Chats} />
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
        <AdminRoute exact path='/admin/posts' component={Posts} />
        <AdminRoute exact path='/admin/users' component={Users} />
        <AdminRoute exact path='/admin/geo-block' component={GeoBlock} />
        <AdminRoute exact path='/admin/ip-block' component={IPBlock} />
        <AdminRoute exact path='/admin/category' component={Category} />
        <AdminRoute exact path='/admin/sub' component={Sub} />
        <AdminRoute exact path='/admin/product' component={Products} />
        <AdminRoute exact path='/admin/coupon' component={Coupon} />
        <AdminRoute exact path='/admin/orders' component={Orders} />
        <AdminRoute exact path='/admin/event' component={Event} />
        <AdminRoute exact path='/admin/mass-mail' component={MassMail} />
        <AdminRoute exact path='/ad-submissions' component={AdSubmissions} />
        <AdminRoute
          exact
          path='/verif-submissions'
          component={VerifSubmissions}
        />
      </Switch>
      {/* </Suspense> */}
    </>
  );
};

export default App;
