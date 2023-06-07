import React, { useState, useEffect, useRef } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './firebase';
import { useSelector, useDispatch } from 'react-redux';
import { ChatState } from './context/ChatProvider';
import io from 'socket.io-client';
import axios from 'axios';

// modals
import Popup from './components/modals/Popup';
import Expiring from './components/modals/Expiring';
import Expired from './components/modals/Expired';
import CancelSubscription from './components/modals/CancelSubscription';
import OptIn from './components/modals/OptIn';
import DeleteAccount from './components/modals/DeleteAccount';

import Maintenance from './pages/Maintenance';
import Header from './components/nav/Header';
import SideDrawer from './components/drawer/SideDrawer';
import Home from './pages/Home';
import LoginAndRegister from './pages/LoginAndRegister';
import { currentUser } from './functions/auth';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import SubscriberRoute from './components/routes/SubscriberRoute';
import UserDashboard from './pages/user/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import Profile from './pages/user/Profile';
import Following from './pages/user/Following';
import Followers from './pages/user/Followers';
import UserProfile from './pages/user/UserProfile';
import Posts from './pages/admin/Posts';
import Users from './pages/admin/Users';
import About from './pages/About';
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
import SubscriptionSuccess from './pages/user/SubscriptionSuccess';
import OrderSuccess from './pages/user/OrderSuccess';
import IPBlock from './pages/admin/IPBlock';
import ReportedContent from './pages/admin/ReportedContent';
import ProductReview from './pages/admin/ProductReview';
import HighCompat from './pages/user/HighCompat';
import CallingCodeBlock from './pages/admin/CallingCodeBlock';
import GiftCardCreate from './pages/user/GiftCardCreate';
import Refunds from './pages/admin/Refunds';
import Data from './pages/admin/Data';
import UserChats from './pages/admin/UserChats';
import GiftCards from './pages/user/GiftCards';
import FinalizingPayment from './pages/user/FinalizingPayment';
import FinalizingGCPayment from './pages/user/FinalizingGCPayment';
import FinalizingMembershipPayment from './pages/user/FinalizingMembershipPayment';
import FinalizingAdPayment from './pages/user/FinalizingAdPayment';
import Analytics from './pages/admin/Analytics';
import AdFinalize from './pages/user/AdFinalize';
import AdSuccess from './pages/user/AdSuccess';
import MobileBlock from './pages/admin/MobileBlock';

let socket, selectedChatCompare;

const App = () => {
  const maintenance = false;

  const [popupModalIsOpen, setPopupModalIsOpen] = useState(false);
  const [expiringModalIsOpen, setExpiringModalIsOpen] = useState(false);
  const [expiredModalIsOpen, setExpiredModalIsOpen] = useState(false);
  const [cancelSubscriptionModalIsOpen, setCancelSubscriptionModalIsOpen] =
    useState(false);
  const [optinModalIsOpen, setOptinModalIsOpen] = useState(false);
  const [deleteAccountModalIsOpen, setDeleteAccountModalIsOpen] =
    useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  const isFirstRun = useRef(true);

  const {
    selectedChat,
    setSelectedChat,
    setChats,
    messages,
    setMessages,
    setIsTyping,
    setSocketConnected,
    setTypersId,
    timerFired,
    setTimerFired,
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
                mobile: res.data.mobile,
                secondMobile: res.data.secondMobile,
                statement: res.data.statement,
                answer: res.data.answer,
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
                nopes: res.data.nopes,
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
                lastLogin: res.data.lastLogin,
                userStatus: res.data.userStatus,
                canVerify: res.data.canVerify,
                canReported: res.data.canReported,
                canPosts: res.data.canPosts,
                canUsers: res.data.canUsers,
                canMassMail: res.data.canMassMail,
                canEvents: res.data.canEvents,
                canOrders: res.data.canOrders,
                canProducts: res.data.canProducts,
                canCategories: res.data.canCategories,
                canSubs: res.data.canSubs,
                canCoupon: res.data.canCoupon,
                profilePhotos: res.data.profilePhotos,
                coverPhotos: res.data.coverPhotos,
                uploadedPhotos: res.data.uploadedPhotos,
                ipAddresses: res.data.ipAddresses,
                reports: res.data.reports,
                reported: res.data.reported,
                messagesSent: res.data.messagesSent,
                messagesReceived: res.data.messagesReceived,
                itemsOrdered: res.data.itemsOrdered,
                itemsOrderedValue: res.data.itemsOrderedValue,
                giftCardsSent: res.data.giftCardsSent,
                giftCardsSentValue: res.data.giftCardsSentValue,
                giftCardsReceived: res.data.giftCardsReceived,
                giftCardsReceivedValue: res.data.giftCardsReceivedValue,
                tShirts: res.data.tShirts,
                sprays: res.data.sprays,
                droppers: res.data.droppers,
                perfumes: res.data.perfumes,
                visits: res.data.visits,
                productsViewed: res.data.productsViewed,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (user && user.profileComplete === false && timerFired === false) {
      const timer = setTimeout(() => {
        setPopupModalIsOpen(true);
      }, 30000);
      setTimerFired(true);
      return () => clearTimeout(timer);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      socket = io(
        process.env.REACT_APP_SOCKET_IO,
        { path: '/socket.io' },
        { reconnection: true },
        { secure: true }
      );
      socket.emit('setup', user);
      socket.on('connected', () => setSocketConnected(true));
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
      socket.on('gift card added', (g) => {
        incrementNewNotifications(g, 'gift');
      });
      removeExpiredFeatures();
      handleExpiredAds();
      handleExpiredMemberships();
      handleExpiredEvents();
      handleExpiredCoupons();
      handleExpiredSuspensions();
      updateUserAge();
      catchIp();
      calcPoints();
      updateUserProgress();
    }
  }, [user && user.token]);

  useEffect(() => {
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else if (user) {
      socket.on('message received', (newMessageReceived, theirId) => {
        fetchTheirChats(theirId);
        if (
          !selectedChatCompare ||
          selectedChatCompare._id != newMessageReceived.chat._id
        ) {
          incrementNewMessages(newMessageReceived);
        } else {
          setMessages([...messages, newMessageReceived]);
        }
      });
      socket.on('mass mail received', (newMessageReceived) => {
        fetchTheirChats(user._id);
        if (
          !selectedChatCompare ||
          selectedChatCompare._id != newMessageReceived.chat._id
        ) {
          incrementNewMessages(newMessageReceived);
        } else {
          setMessages([...messages, newMessageReceived]);
        }
      });
      socket.on('typing', (_id) => {
        setTypersId(_id);
        setIsTyping(true);
      });
      socket.on('stop typing', () => setIsTyping(false));
    }
  }, [user && user.token]);

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
        { _id: user._id, message },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
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

  const fetchTheirChats = async (theirId) => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-their-chats`,
        { theirId },
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
  };

  const handleExpiredAds = async () => {
    await axios.put(`${process.env.REACT_APP_API}/expired-ad`);
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

  const handleExpiredEvents = async () => {
    await axios.put(`${process.env.REACT_APP_API}/expired-event`);
  };

  const handleExpiredCoupons = async () => {
    await axios.delete(`${process.env.REACT_APP_API}/delete-expired-coupon`);
  };

  const handleExpiredSuspensions = async () => {
    await axios.put(`${process.env.REACT_APP_API}/expired-suspension`);
  };

  const updateUserAge = async () => {
    await axios.put(`${process.env.REACT_APP_API}/update-age`, {
      user,
    });
  };

  const catchIp = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    const userIp = res.data.IPv4;
    await axios.put(`${process.env.REACT_APP_API}/catch-ip`, {
      user,
      userIp,
    });
  };

  const calcPoints = async () => {
    await axios.put(`${process.env.REACT_APP_API}/calc-points`, {
      _id: user._id,
    });
  };

  const updateUserProgress = async () => {
    await axios.put(`${process.env.REACT_APP_API}/update-user-progress`, {
      _id: user._id,
    });
  };

  return (
    <>
      {maintenance ? (
        <Maintenance />
      ) : (
        <>
          <Header
            setCancelSubscriptionModalIsOpen={setCancelSubscriptionModalIsOpen}
            setOptinModalIsOpen={setOptinModalIsOpen}
            setDeleteAccountModalIsOpen={setDeleteAccountModalIsOpen}
          />
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
          <CancelSubscription
            cancelSubscriptionModalIsOpen={cancelSubscriptionModalIsOpen}
            setCancelSubscriptionModalIsOpen={setCancelSubscriptionModalIsOpen}
          />
          <OptIn
            optinModalIsOpen={optinModalIsOpen}
            setOptinModalIsOpen={setOptinModalIsOpen}
          />
          <DeleteAccount
            deleteAccountModalIsOpen={deleteAccountModalIsOpen}
            setDeleteAccountModalIsOpen={setDeleteAccountModalIsOpen}
          />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/authentication' component={LoginAndRegister} />
            <Route exact path='/about-us' component={About} />
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
            <Route exact path='/ad-finalize' component={AdFinalize} />
            <Route
              exact
              path='/finalizing-ad-payment'
              component={FinalizingAdPayment}
            />
            <Route exact path='/ad-successful' component={AdSuccess} />
            <UserRoute exact path='/user/dashboard' component={UserDashboard} />
            <UserRoute exact path='/user/profile/:userId' component={Profile} />
            <UserRoute exact path='/liked-users' component={Following} />
            <UserRoute exact path='/users-who-like-me' component={Followers} />
            <UserRoute exact path='/my-matches' component={Matches} />
            <UserRoute
              exact
              path='/users-who-visited-me'
              component={Visitors}
            />
            <UserRoute exact path='/user/:userId' component={UserProfile} />
            <UserRoute exact path='/photos/:userId' component={Photos} />
            <UserRoute exact path='/checkout' component={Checkout} />
            <UserRoute exact path='/payment' component={Payment} />
            <UserRoute
              exact
              path='/purchase/history'
              component={PurchaseHistory}
            />
            <UserRoute exact path='/wishlist' component={Wishlist} />
            <UserRoute exact path='/gift-cards' component={GiftCards} />
            <UserRoute exact path='/points' component={Points} />
            <UserRoute exact path='/notifications' component={Notifications} />
            <UserRoute exact path='/search-users' component={UserSearch} />
            <UserRoute exact path='/events' component={Events} />
            <UserRoute exact path='/event/:eventId' component={EventInfo} />
            <UserRoute
              exact
              path='/become-paid-member'
              component={BecomePaid}
            />
            <UserRoute
              exact
              path='/membership-card'
              component={MembershipCard}
            />
            <UserRoute
              exact
              path='/subscription-successful'
              component={SubscriptionSuccess}
            />
            <UserRoute
              exact
              path='/order-successful'
              component={OrderSuccess}
            />
            <UserRoute
              exact
              path='/chats'
              component={Chats}
              onLeave={() => setSelectedChat(undefined)}
            />
            <UserRoute
              exact
              path='/finalizing-payment'
              component={FinalizingPayment}
            />
            <UserRoute
              exact
              path='/finalizing-gc-payment'
              component={FinalizingGCPayment}
            />
            <UserRoute
              exact
              path='/finalizing-membership-payment'
              component={FinalizingMembershipPayment}
            />
            <SubscriberRoute exact path='/swipe-to-match' component={Swipe} />
            <SubscriberRoute
              exact
              path='/high-compatibility'
              component={HighCompat}
            />
            <SubscriberRoute
              exact
              path='/create-gift-card/:userId'
              component={GiftCardCreate}
            />
            <AdminRoute
              exact
              path='/admin/dashboard'
              component={AdminDashboard}
            />
            <AdminRoute exact path='/admin/posts' component={Posts} />
            <AdminRoute exact path='/admin/users' component={Users} />
            <AdminRoute exact path='/admin/geo-block' component={GeoBlock} />
            <AdminRoute exact path='/admin/ip-block' component={IPBlock} />
            <AdminRoute
              exact
              path='/admin/calling-code-block'
              component={CallingCodeBlock}
            />
            <AdminRoute
              exact
              path='/admin/mobile-phone-block'
              component={MobileBlock}
            />
            <AdminRoute exact path='/admin/category' component={Category} />
            <AdminRoute exact path='/admin/sub' component={Sub} />
            <AdminRoute exact path='/admin/product' component={Products} />
            <AdminRoute exact path='/admin/coupon' component={Coupon} />
            <AdminRoute exact path='/admin/orders' component={Orders} />
            <AdminRoute exact path='/admin/refunds' component={Refunds} />
            <AdminRoute exact path='/admin/data' component={Data} />
            <AdminRoute exact path='/admin/analytics' component={Analytics} />
            <AdminRoute exact path='/admin/event' component={Event} />
            <AdminRoute exact path='/admin/mass-mail' component={MassMail} />
            <AdminRoute exact path='/admin/chats' component={UserChats} />
            <AdminRoute
              exact
              path='/admin/ad-submissions'
              component={AdSubmissions}
            />
            <AdminRoute
              exact
              path='/admin/verif-submissions'
              component={VerifSubmissions}
            />
            <AdminRoute
              exact
              path='/admin/reported-content'
              component={ReportedContent}
            />
            <AdminRoute
              exact
              path='/admin/product-review'
              component={ProductReview}
            />
          </Switch>
        </>
      )}
    </>
  );
};

export default App;
