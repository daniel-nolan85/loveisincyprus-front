import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import UserSuspended from '../modals/UserSuspended';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { loginUser, loginUserWithSecret } from '../../functions/auth';
import { addPoints } from '../../functions/user';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

Modal.setAppElement('#root');

const Alternative = ({
  alternativeModalIsOpen,
  setAlternativeModalIsOpen,
  userSuspendedModalIsOpen,
  setUserSuspendedModalIsOpen,
  suspendedUser,
  setSuspendedUser,
}) => {
  const [showSecondary, setShowSecondary] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [mobile, setMobile] = useState('');
  const [prevMobile, setPrevMobile] = useState('');
  const [statement, setStatement] = useState('');
  const [answer, setAnswer] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [OTP, setOTP] = useState('');
  const [loading, setLoading] = useState(false);

  const isFirstRun = useRef(true);

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

  useEffect(() => {
    setValidEmail(validateEmail(email));
  }, [email]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      updateMobileFirebase();
    }
  }, [prevMobile]);

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
          //   checkCallingCode();
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
          updateMobileDatabase();
        } else {
          toast.error('Access is not currently permitted from this location.', {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        }
      });
  };

  const updateMobileDatabase = async () => {
    await axios
      .put(`${process.env.REACT_APP_API}/update-mobile-numbers`, {
        mobile,
        email,
      })
      .then((res) => {
        setPrevMobile(res.data.mobile);
      })
      .catch((err) => {
        console.log(err);
        toast.error('No user exists with the given information.', {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      });
  };

  const updateMobileFirebase = async () => {
    await axios
      .put(`${process.env.REACT_APP_API}/update-firestore-user`, {
        prevMobile,
        mobile,
      })
      .then((res) => {
        requestOTP();
      })
      .catch((err) => {
        console.log(err);
        return;
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
              roleBasedRedirect(res);
              addPoints(1, 'login', idTokenResult.token).then((res) => {
                if (res.data.ok) {
                  toast.success(
                    `Welcome to Love is in Cyprus.
                  Your mobile number has now been updated to ${mobile}.
                  You can amend this any time from your profile page.`,
                    {
                      position: toast.POSITION.TOP_CENTER,
                    }
                  );
                } else {
                  toast.success(
                    `Welcome to Love is in Cyprus. You have been awarded 1 point!
                    Your mobile number has now been updated to ${mobile}.
                    You can amend this any time from your profile page.`,
                    {
                      position: toast.POSITION.TOP_CENTER,
                    }
                  );
                }
              });
              setEmail('');
              setMobile('');
              setAlternativeModalIsOpen(false);
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
          setEmail('');
          setMobile('');
          setAlternativeModalIsOpen(false);
        });
    }
  };

  const checkCredentials = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/check-credentials/${email}`)
      .then((res) => {
        if (res.data === null) {
          toast.error('No user exists with this email address.', {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        } else if (res.data.statement !== statement) {
          toast.error(
            'Looks like you have answered the wrong secret statement.',
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
          return;
        } else if (res.data.answer !== answer) {
          toast.error('The answer you gave is incorrect.', {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        } else secretLogin();
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };

  const secretLogin = () => {
    setLoading(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithEmailAndPassword(auth, email, answer, appVerifier)
      .then(async (res) => {
        const user = res.user;
        const idTokenResult = await user.getIdTokenResult();
        loginUserWithSecret(idTokenResult.token, email)
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
            setEmail('');
            setStatement('');
            setAnswer('');
            setAlternativeModalIsOpen(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
            toast.error(err.message, {
              position: toast.POSITION.TOP_CENTER,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
    },
    overlay: {
      position: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0, .8)',
      zIndex: '1000',
      overflowY: 'auto',
    },
  };

  return (
    <Modal
      isOpen={alternativeModalIsOpen}
      onRequestClose={() => setAlternativeModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <>
          <h1 className='center'>How would you like to log in?</h1>
          <div className='contact-form-btns'>
            <button
              type='button'
              className='submit-btn'
              onClick={() => {
                setShowSecondary(true);
                setShowSecret(false);
              }}
            >
              Secondary phone
            </button>
            <button
              type='button'
              className='submit-btn reset'
              onClick={() => {
                setShowSecret(true);
                setShowSecondary(false);
              }}
            >
              Secret statement
            </button>
          </div>
          <div
            className={
              showSecondary
                ? 'alt-secondary alt-secondary-show'
                : 'alt-secondary'
            }
          >
            <p className='center'>
              Logging in using your secondary number will replace the primary
              number you currently have saved. You can update this information
              again later from your profile page
            </p>
            <input
              type='email'
              className='input-field'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className='secondary-login-form'>
              <PhoneInput
                country={'cy'}
                className='input-field secondary'
                placeholder='Enter your secondary mobile number'
                value={mobile}
                onChange={(phone) => {
                  setMobile(`+${phone}`);
                }}
              />
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
              onClick={checkBlocked}
              type='button'
              className='submit-btn'
              disabled={!email || !validEmail || !mobile || showOTP}
            >
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} className='fa' spin />
              ) : (
                <FontAwesomeIcon icon={faArrowRightToBracket} className='fa' />
              )}
              Request OTP
            </button>
            <div id='recaptcha-container'></div>
          </div>
          <div
            className={showSecret ? 'alt-secret alt-secret-show' : 'alt-secret'}
          >
            <input
              type='email'
              className='input-field'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
            <input
              type='text'
              className={
                statement
                  ? 'input-field otp-container otp-container-show'
                  : 'otp-container'
              }
              placeholder='Enter your answer'
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button
              onClick={checkCredentials}
              type='button'
              className='submit-btn'
              disabled={
                !email || !validEmail || !statement || answer.length < 6
              }
            >
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} className='fa' spin />
              ) : (
                <FontAwesomeIcon icon={faArrowRightToBracket} className='fa' />
              )}
              Login
            </button>
          </div>
        </>
      </div>
      <UserSuspended
        userSuspendedModalIsOpen={userSuspendedModalIsOpen}
        setUserSuspendedModalIsOpen={setUserSuspendedModalIsOpen}
        suspendedUser={suspendedUser}
      />
    </Modal>
  );
};

export default Alternative;
