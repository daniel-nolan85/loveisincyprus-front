import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../../functions/auth';
import { addPoints } from '../../functions/user';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';
import UserSuspended from '../modals/UserSuspended';
import Alternative from '../modals/Alternative';

const Login = ({ showRegister }) => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [OTP, setOTP] = useState('');
  const [userSuspendedModalIsOpen, setUserSuspendedModalIsOpen] =
    useState(false);
  const [suspendedUser, setSuspendedUser] = useState({});
  const [alternativeModalIsOpen, setAlternativeModalIsOpen] = useState(false);

  const { token } = useSelector((state) => state.user) || {};

  let dispatch = useDispatch();
  let history = useHistory();

  let intended = history.location.state;
  useEffect(() => {
    if (intended) {
      return;
    } else {
      if (token) history.push('/');
    }
  }, [token, history]);

  const roleBasedRedirect = (res) => {
    if (intended) {
      history.push(intended.from);
    } else {
      if (
        res.data.role === 'main-admin' ||
        res.data.role === 'secondary-admin'
      ) {
        history.push('/admin/dashboard');
      } else {
        history.push('/user/dashboard');
      }
    }
  };

  const checkBlocked = async (req, res) => {
    await axios
      .get(`${process.env.REACT_APP_API}/user-blocked/${mobile}`)
      .then((res) => {
        if (res.data.length === 0) {
          userExists();
        } else {
          toast.error(
            'Access from this mobile number is denied. Please use another.',
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
          return;
        }
      });
  };

  const userExists = async (req, res) => {
    await axios
      .get(`${process.env.REACT_APP_API}/user-exists/${mobile}`)
      .then((res) => {
        if (res.data.length > 0) {
          checkAllowedAccess();
        } else {
          toast.error('No user exists with this phone number.', {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        }
      });
  };

  const checkAllowedAccess = async (req, res) => {
    await axios
      .get(`${process.env.REACT_APP_API}/user-permitted/${mobile}`)
      .then((res) => {
        if (res.data[0].userStatus.suspended) {
          setUserSuspendedModalIsOpen(true);
          setSuspendedUser(res.data[0]);
          return;
        } else checkCallingCode();
      });
  };

  const checkCallingCode = async (req, res) => {
    await axios
      .get(`${process.env.REACT_APP_API}/calling-code/${mobile}`)
      .then((res) => {
        if (
          res.data.permitted === 'true' ||
          mobile === '+17148237775' ||
          mobile === '+33629823942'
        ) {
          requestOTP();
        } else {
          toast.error('Access is not currently permitted from this location.', {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        }
      });
  };

  const generateRecaptcha = (e) => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response) => {},
      },
      auth
    );
  };

  const requestOTP = () => {
    setLoading(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, mobile, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOTP(true);
        toast.success(
          `A One Time Password has been sent to ${mobile}. Please enter this code below to complete your registration.`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err.message}. Please refresh the page and try again`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      });
  };

  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);
    if (otp.length === 6) {
      setLoading(true);
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then(async (res) => {
          const user = res.user;
          const idTokenResult = await user.getIdTokenResult();
          loginUser(idTokenResult.token, mobile)
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
                  vaccinated: res.data.vaccinated,
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
                  notifSubscription: res.data.notifSubscription,
                },
              });
              roleBasedRedirect(res);
              addPoints(1, 'login', idTokenResult.token).then((res) => {
                if (res.data.ok) {
                  toast.success(`Welcome to Love is in Cyprus.`, {
                    position: toast.POSITION.TOP_CENTER,
                  });
                } else {
                  toast.success(
                    `Welcome to Love is in Cyprus. You have been awarded 1 point!`,
                    {
                      position: toast.POSITION.TOP_CENTER,
                    }
                  );
                }
              });
              setMobile('');
            })
            .catch((err) => {
              console.log(err);
              toast.error(err.message, {
                position: toast.POSITION.TOP_CENTER,
              });
            });
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setLoading(false);
          setMobile('');
        });
    }
  };

  const showAlternative = () => {
    setAlternativeModalIsOpen(true);
  };

  return (
    <form id='login' className='input-group'>
      <div className='info-questions phone'>
        <PhoneInput
          className='input-field'
          placeholder='Enter your mobile number'
          value={mobile}
          onChange={(phone) => {
            setMobile(`+${phone}`);
          }}
        />
      </div>
      <p className='tel csv'>Don't forget your country code (e.g. +357)</p>
      <input
        type='number'
        className={
          showOTP
            ? 'input-field otp-container otp-container-show'
            : 'otp-container'
        }
        placeholder='Enter your verification code'
        value={OTP}
        onChange={verifyOTP}
      />
      <button
        onClick={checkBlocked}
        type='button'
        className='submit-btn'
        disabled={!mobile || showOTP}
      >
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} className='fa' spin />
        ) : (
          <FontAwesomeIcon icon={faArrowRightToBracket} className='fa' />
        )}
        Request OTP
      </button>
      <div id='recaptcha-container'></div>
      <p className='center link' onClick={showRegister}>
        Don't have an account?
      </p>
      <p className='center link' onClick={showAlternative}>
        Alternative ways to log in
      </p>
      <UserSuspended
        userSuspendedModalIsOpen={userSuspendedModalIsOpen}
        setUserSuspendedModalIsOpen={setUserSuspendedModalIsOpen}
        suspendedUser={suspendedUser}
      />
      <Alternative
        alternativeModalIsOpen={alternativeModalIsOpen}
        setAlternativeModalIsOpen={setAlternativeModalIsOpen}
        userSuspendedModalIsOpen={userSuspendedModalIsOpen}
        setUserSuspendedModalIsOpen={setUserSuspendedModalIsOpen}
        suspendedUser={suspendedUser}
        setSuspendedUser={setSuspendedUser}
      />
    </form>
  );
};

export default Login;
