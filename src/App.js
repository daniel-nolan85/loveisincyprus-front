import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import Header from './components/nav/Header';
import Home from './pages/Home';
import LoginAndRegister from './pages/LoginAndRegister';
import RegisterComplete from './components/forms/RegisterComplete';
import ForgotPassword from './components/forms/ForgotPassword';
import { currentUser } from './functions/auth';
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
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

const App = () => {
  const dispatch = useDispatch();

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
              },
            });
            console.log('logged in user ==> ', res);
          })
          .catch((err) => console.log(err));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

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
      <ToastContainer />
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
        <UserRoute exact path='/change/password' component={ChangePassword} />
        <UserRoute exact path='/user/dashboard' component={UserDashboard} />
        <UserRoute exact path='/user/profile/:userId' component={Profile} />
        <UserRoute exact path='/liked-users' component={Following} />
        <UserRoute exact path='/users-who-like-me' component={Followers} />
        <UserRoute exact path='/my-matches' component={Matches} />
        <UserRoute exact path='/users-who-visited-me' component={Visitors} />
        <UserRoute exact path='/user/:userId' component={UserProfile} />
        <UserRoute exact path='/swipe-to-match' component={Swipe} />
        <UserRoute exact path='/photos/:userId' component={Photos} />
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
        <AdminRoute exact path='/admin/posts' component={Posts} />
        <AdminRoute exact path='/admin/users' component={Users} />
        <AdminRoute exact path='/admin/geo-block' component={GeoBlock} />
      </Switch>
      {/* </Suspense> */}
    </>
  );
};

export default App;
