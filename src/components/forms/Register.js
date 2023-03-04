import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightToBracket,
  faSpinner,
  faCircleQuestion,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '../../functions/auth';
import { addPoints } from '../../functions/user';
import axios from 'axios';
import WhyNeedThisUsername from '../modals/WhyNeedThisUsername';
import WhyNeedThisEmail from '../modals/WhyNeedThisEmail';
import WhyNeedThisPhone from '../modals/WhyNeedThisPhone';
import WhyNeedThisSecondaryPhone from '../modals/WhyNeedThisSecondaryPhone';
import WhyNeedThisSecret from '../modals/WhyNeedThisSecret';
import WhyNeedThisAnswer from '../modals/WhyNeedThisAnswer';

const Register = ({ showLogin }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [mobile, setMobile] = useState('');
  const [secondMobile, setSecondMobile] = useState('');
  const [statement, setStatement] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [OTP, setOTP] = useState('');
  const [whyNeedThisUsernameModalIsOpen, setWhyNeedThisUsernameModalIsOpen] =
    useState(false);
  const [whyNeedThisEmailModalIsOpen, setWhyNeedThisEmailModalIsOpen] =
    useState(false);
  const [whyNeedThisPhoneModalIsOpen, setWhyNeedThisPhoneModalIsOpen] =
    useState(false);
  const [
    whyNeedThisSecondaryPhoneModalIsOpen,
    setWhyNeedThisSecondaryPhoneModalIsOpen,
  ] = useState(false);
  const [whyNeedThisSecretModalIsOpen, setWhyNeedThisSecretModalIsOpen] =
    useState(false);
  const [whyNeedThisAnswerModalIsOpen, setWhyNeedThisAnswerModalIsOpen] =
    useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  let dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setValidEmail(validateEmail(email));
  }, [email]);

  const userExists = async (e) => {
    e.preventDefault();
    await axios
      .get(`${process.env.REACT_APP_API}/user-exists/${mobile}`)
      .then((res) => {
        if (res.data.length === 0) {
          usernameExists();
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

  const usernameExists = async (e) => {
    if (username) {
      await axios
        .get(`${process.env.REACT_APP_API}/username-exists/${username}`)
        .then((res) => {
          if (res.data.length === 0) {
            secondMobileExists();
          } else {
            toast.error('This username is already taken.', {
              position: toast.POSITION.TOP_CENTER,
            });
            return;
          }
        });
    } else secondMobileExists();
  };

  const secondMobileExists = async () => {
    if (secondMobile) {
      await axios
        .get(
          `${process.env.REACT_APP_API}/second-mobile-exists/${secondMobile}`
        )
        .then((res) => {
          if (res.data.length === 0) {
            emailExists();
          } else {
            toast.error(
              'A user with this secondary phone number already exists. Have an account? Try logging in.',
              {
                position: toast.POSITION.TOP_CENTER,
              }
            );
            return;
          }
        });
    } else emailExists();
  };

  const emailExists = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/email-exists/${email}`)
      .then((res) => {
        if (res.data.length === 0) {
          checkAllowedAccess();
        } else {
          toast.error(
            'A user with this email address already exists. Have an account? Try logging in.',
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
          return;
        }
      });
  };

  const checkAllowedAccess = async (req, res) => {
    await axios
      .get(`${process.env.REACT_APP_API}/user-blocked/${mobile}`)
      .then((res) => {
        if (res.data.length === 0) {
          checkAllowedAccessSecondMobile();
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

  const checkAllowedAccessSecondMobile = async (req, res) => {
    if (secondMobile) {
      await axios
        .get(
          `${process.env.REACT_APP_API}/second-mobile-blocked/${secondMobile}`
        )
        .then((res) => {
          if (res.data.length === 0) {
            checkCallingCode();
          } else {
            toast.error(
              'Access from this secondary mobile number is denied. Please use another.',
              {
                position: toast.POSITION.TOP_CENTER,
              }
            );
            return;
          }
        });
    } else checkCallingCode();
  };

  const checkCallingCode = async (req, res) => {
    await axios
      .get(`${process.env.REACT_APP_API}/calling-code/${mobile}`)
      .then((res) => {
        if (res.data.permitted === 'true') {
          checkCallingCodeSecondMobile();
        } else {
          toast.error('Access is not currently permitted from this location.', {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        }
      });
  };

  const checkCallingCodeSecondMobile = async (req, res) => {
    if (secondMobile) {
      await axios
        .get(
          `${process.env.REACT_APP_API}/second-mobile-calling-code/${secondMobile}`
        )
        .then((res) => {
          if (res.data.permitted === 'true') {
            requestOTP();
          } else {
            toast.error(
              'Access from this secondary mobile number is denied. Please use another.',
              {
                position: toast.POSITION.TOP_CENTER,
              }
            );
            return;
          }
        });
    } else requestOTP();
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
          createUser(
            idTokenResult.token,
            name,
            username,
            email,
            mobile,
            secondMobile,
            statement,
            answer
          )
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
                },
              });

              history.push('/user/dashboard');
              addPoints(1, 'login', idTokenResult.token).then(
                toast.success(
                  `Welcome to Love is in Cyprus. You have been awarded 1 point!`,
                  {
                    position: toast.POSITION.TOP_CENTER,
                  }
                )
              );
              if (statement && answer) {
                updateEmail(auth.currentUser, email).then(() => {
                  updatePassword(auth.currentUser, answer);
                });
                toast.success(
                  `An email has been sent to ${email}. Please click the link to complete your registration.`,
                  {
                    position: toast.POSITION.TOP_CENTER,
                  }
                );
              }
              setName('');
              setUsername('');
              setEmail('');
              setMobile('');
              setSecondMobile('');
              setStatement('');
              setAnswer('');
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
          setUsername('');
          setEmail('');
          setMobile('');
          setSecondMobile('');
          setStatement('');
          setAnswer('');
        });
    }
  };

  const whyUsername = () => {
    setWhyNeedThisUsernameModalIsOpen(true);
  };

  const whyEmail = () => {
    setWhyNeedThisEmailModalIsOpen(true);
  };

  const whyPhone = () => {
    setWhyNeedThisPhoneModalIsOpen(true);
  };

  const whyPhone2 = () => {
    setWhyNeedThisSecondaryPhoneModalIsOpen(true);
  };

  const whySecret = () => {
    setWhyNeedThisSecretModalIsOpen(true);
  };

  const whyAnswer = () => {
    setWhyNeedThisAnswerModalIsOpen(true);
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
        placeholder='Enter your name *'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className='info-questions email'>
        <input
          type='text'
          className='input-field'
          placeholder='Enter your username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className='tooltip'>
          <FontAwesomeIcon
            icon={faCircleQuestion}
            className='fa'
            onClick={whyUsername}
          />
          <span className='tooltip-text'>Why do we need this?</span>
        </div>
      </div>
      <div className='info-questions email'>
        <input
          type='email'
          className='input-field'
          placeholder='Enter your email *'
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
          className='input-field'
          placeholder='Enter your mobile number *'
          value={mobile}
          onChange={(phone) => {
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
      <p className='tel csv'>Don't forget your country code (e.g. +357)</p>
      <div className='info-questions phone'>
        <PhoneInput
          className='input-field'
          placeholder='Enter your secondary mobile number'
          value={secondMobile}
          onChange={(phone) => {
            setSecondMobile(`+${phone}`);
          }}
        />
        <div className='tooltip'>
          <FontAwesomeIcon
            icon={faCircleQuestion}
            className='fa'
            onClick={whyPhone2}
          />
          <span className='tooltip-text'>What is this for?</span>
        </div>
      </div>
      <p className='tel csv'>Don't forget your country code (e.g. +357)</p>
      <div className='info-questions secret'>
        <select
          name='statement'
          id='statement'
          onChange={(e) => setStatement(e.target.value)}
          value={statement}
        >
          <option value=''>Select a secret statement</option>
          <option value='city'>Where you met your partner</option>
          <option value='middle'>Your youngest child's middle name</option>
          <option value='animal'>Name of your first stuffed toy</option>
          <option value='parents'>Where your parents met</option>
          <option value='cousin'>Your oldest cousin's middle name</option>
          <option value='exam'>First exam you failed</option>
        </select>
        <div className='tooltip'>
          <FontAwesomeIcon
            icon={faCircleQuestion}
            className='fa'
            onClick={whySecret}
          />
          <span className='tooltip-text'>What is this for?</span>
        </div>
      </div>
      <>
        <input
          type={showAnswer ? 'text' : 'password'}
          className={
            statement
              ? 'input-field otp-container otp-container-show'
              : 'otp-container'
          }
          placeholder='Enter your answer'
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <div className={statement ? 'info-questions answer' : 'hide'}>
          <div className='tooltip'>
            <FontAwesomeIcon
              icon={faCircleQuestion}
              className='fa'
              onClick={whyAnswer}
            />
            <span className='tooltip-text'>What is this?</span>
          </div>
          <FontAwesomeIcon
            icon={showAnswer ? faEyeSlash : faEye}
            className='fa eye'
            onClick={() => setShowAnswer(!showAnswer)}
          />
        </div>
      </>
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
      <p className='required'>
        * <span className='link'>Required fields</span>
      </p>
      <button
        onClick={userExists}
        type='submit'
        className='submit-btn'
        disabled={
          !name ||
          !email ||
          !validEmail ||
          !mobile ||
          showOTP ||
          (statement && answer.length < 6)
        }
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
      <WhyNeedThisUsername
        whyNeedThisUsernameModalIsOpen={whyNeedThisUsernameModalIsOpen}
        setWhyNeedThisUsernameModalIsOpen={setWhyNeedThisUsernameModalIsOpen}
      />
      <WhyNeedThisEmail
        whyNeedThisEmailModalIsOpen={whyNeedThisEmailModalIsOpen}
        setWhyNeedThisEmailModalIsOpen={setWhyNeedThisEmailModalIsOpen}
      />
      <WhyNeedThisPhone
        whyNeedThisPhoneModalIsOpen={whyNeedThisPhoneModalIsOpen}
        setWhyNeedThisPhoneModalIsOpen={setWhyNeedThisPhoneModalIsOpen}
      />
      <WhyNeedThisSecondaryPhone
        whyNeedThisSecondaryPhoneModalIsOpen={
          whyNeedThisSecondaryPhoneModalIsOpen
        }
        setWhyNeedThisSecondaryPhoneModalIsOpen={
          setWhyNeedThisSecondaryPhoneModalIsOpen
        }
      />
      <WhyNeedThisSecret
        whyNeedThisSecretModalIsOpen={whyNeedThisSecretModalIsOpen}
        setWhyNeedThisSecretModalIsOpen={setWhyNeedThisSecretModalIsOpen}
      />
      <WhyNeedThisAnswer
        whyNeedThisAnswerModalIsOpen={whyNeedThisAnswerModalIsOpen}
        setWhyNeedThisAnswerModalIsOpen={setWhyNeedThisAnswerModalIsOpen}
      />
    </form>
  );
};

export default Register;
