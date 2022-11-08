import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightToBracket,
  faSpinner,
  faEye,
  faEyeSlash,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '../../functions/auth';
import { addPoints } from '../../functions/user';
import axios from 'axios';
import WhyNeedThisEmail from '../modals/WhyNeedThisEmail';
import WhyNeedThisPhone from '../modals/WhyNeedThisPhone';

const Register = ({ showLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [OTP, setOTP] = useState('');
  const [whyNeedThisEmailModalIsOpen, setWhyNeedThisEmailModalIsOpen] =
    useState(false);
  const [whyNeedThisPhoneModalIsOpen, setWhyNeedThisPhoneModalIsOpen] =
    useState(false);
  // const [newUser, setNewUser] = useState({});
  // const [password, setPassword] = useState('');
  // const [showPassword, setShowPassword] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const config = {
  //     url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
  //     handleCodeInApp: true,
  //   };
  //   await auth.sendSignInLinkToEmail(email, config);

  //   toast.success(
  //     `An email has been sent to ${email}. Please click the link to complete your registration.`,
  //     {
  //       position: toast.POSITION.TOP_CENTER,
  //     }
  //   );
  //   window.localStorage.setItem('emailForRegistration', email);
  //   setEmail('');
  //   setMobile('');
  //   setLoading(false);
  // };

  // const isFirstRun = useRef(true);

  // useEffect(async () => {
  //   if (isFirstRun.current) {
  //     isFirstRun.current = false;
  //     return;
  //   } else {
  //     console.log(newUser);
  //     const idTokenResult = await newUser.getIdTokenResult();
  //     console.log('newUser', newUser, 'idTokenResult', idTokenResult);
  //   }
  // }, [newUser]);

  let dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setValidEmail(validateEmail(email));
  }, [email]);

  const roleBasedRedirect = (res) => {
    if (res.data.role === 'admin') {
      history.push('/admin/dashboard');
    } else {
      history.push('/user/dashboard');
    }
  };

  const userExists = async (e) => {
    e.preventDefault();
    await axios
      .get(`${process.env.REACT_APP_API}/user-exists/${mobile}`)
      .then((res) => {
        if (res.data.length === 0) {
          requestOTP();
        } else {
          toast.error(
            'A user with this phone number already exists. Try logging in.',
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
          return;
        }
      });
  };

  const generateRecaptcha = (e) => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
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
          createUser(idTokenResult.token, name, email, mobile)
            .then((res) => {
              console.log(res.data);
              dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                  profileImage: res.data.profileImage,
                  coverImage: res.data.coverImage,
                  name: res.data.name,
                  email: res.data.email,
                  mobile: res.data.mobile,
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
                },
              });
              roleBasedRedirect(res);
              addPoints(1, 'login', idTokenResult.token).then(
                toast.success(
                  `Welcome to Love is in Cyprus. You have been awarded 1 point!`,
                  {
                    position: toast.POSITION.TOP_CENTER,
                  }
                )
              );
              setName('');
              setEmail('');
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
          setLoading(false);
          setName('');
          setEmail('');
          setMobile('');
        });
    }
  };

  const whyEmail = () => {
    setWhyNeedThisEmailModalIsOpen(true);
  };

  const whyPhone = () => {
    setWhyNeedThisPhoneModalIsOpen(true);
  };

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <form id='register' className='input-group'>
      <input
        type='text'
        className='input-field'
        placeholder='Enter your name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className='info-questions email'>
        <input
          type='email'
          className='input-field'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className='tooltip'>
          <FontAwesomeIcon
            icon={faCircleQuestion}
            className='fa'
            onClick={whyEmail}
          />
          <span className='tooltip-text'>Why do we need this?</span>
        </div>
      </div>
      <div className='info-questions phone'>
        <PhoneInput
          country={'cy'}
          className='input-field'
          placeholder='Enter your mobile phone number'
          value={mobile}
          onChange={(phone) => {
            console.log(phone);
            setMobile(`+${phone}`);
          }}
        />
        <div className='tooltip'>
          <FontAwesomeIcon
            icon={faCircleQuestion}
            className='fa'
            onClick={whyPhone}
          />
          <span className='tooltip-text'>Why do we need this?</span>
        </div>
      </div>
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
        onClick={userExists}
        type='submit'
        className='submit-btn'
        disabled={!name || !email || !validEmail || !mobile || showOTP}
      >
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} className='fa' spin />
        ) : (
          <FontAwesomeIcon icon={faArrowRightToBracket} className='fa' />
        )}
        Request OTP
      </button>
      <div id='recaptcha-container'></div>
      <p className='center link' onClick={showLogin}>
        Already have an account?
      </p>
      <WhyNeedThisEmail
        whyNeedThisEmailModalIsOpen={whyNeedThisEmailModalIsOpen}
        setWhyNeedThisEmailModalIsOpen={setWhyNeedThisEmailModalIsOpen}
      />
      <WhyNeedThisPhone
        whyNeedThisPhoneModalIsOpen={whyNeedThisPhoneModalIsOpen}
        setWhyNeedThisPhoneModalIsOpen={setWhyNeedThisPhoneModalIsOpen}
      />
    </form>
  );
};

export default Register;
