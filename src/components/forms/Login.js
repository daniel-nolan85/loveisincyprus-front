import React, { useState, useEffect } from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faSpinner,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { createOrUpdateUser } from '../../functions/auth';
import { addPoints } from '../../functions/user';

const Login = () => {
  const [email, setEmail] = useState('loveisincyprus@gmail.com');
  const [password, setPassword] = useState('123456');
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();
  let history = useHistory();

  let intended = history.location.state;
  useEffect(() => {
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push('/');
    }
  }, [user, history]);

  const roleBasedRedirect = (res) => {
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === 'admin') {
        history.push('/admin/dashboard');
      } else {
        history.push('/user/dashboard');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailLoading(true);

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
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
            },
          });
          roleBasedRedirect(res);
          addPoints(1, 'login', idTokenResult.token);

          // addPoints(1, 'login', idTokenResult.token).then(
          //   toast.success(
          //     `Welcome to Love is in Cyprus. You have been awarded 1 point!`,
          //     {
          //       position: toast.POSITION.TOP_CENTER,
          //     }
          //   )
          // );

          // var hours = 24;
          // var now = new Date().getTime();
          // var setupTime = localStorage.getItem('setupTime');
          // if (setupTime == null) {
          //   localStorage.setItem('setupTime', now);
          // } else {
          //   if (now - setupTime > hours * 60 * 60 * 1000) {
          //     addPoints(1, 'login', idTokenResult.token).then(
          //       toast.success(
          //         `Welcome to Love is in Cyprus. You have been awarded 1 point!`,
          //         {
          //           position: toast.POSITION.TOP_CENTER,
          //         }
          //       )
          //     );
          //     localStorage.removeItem('setupTime');
          //     localStorage.setItem('setupTime', now);
          //   }
          // }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setEmailLoading(false);
    }
  };

  const googleLogin = async (e) => {
    e.preventDefault();
    setGoogleLoading(true);

    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
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
              },
            });
            roleBasedRedirect(res);
            addPoints(1, 'login', idTokenResult.token);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setGoogleLoading(false);
      });
  };

  return (
    <form id='login' className='input-group'>
      <input
        type='email'
        className='input-field'
        placeholder='Enter your email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <div className='password-row'>
        <input
          type={showPassword ? 'text' : 'password'}
          className='input-field'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          className='fa'
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
      <button
        onClick={handleSubmit}
        type='submit'
        className='submit-btn'
        disabled={!email || password.length < 6}
      >
        {emailLoading ? (
          <FontAwesomeIcon icon={faSpinner} className='fa' spin />
        ) : (
          <FontAwesomeIcon icon={faEnvelope} className='fa' />
        )}
        Login with Email
      </button>
      <button onClick={googleLogin} type='submit' className='submit-btn google'>
        {googleLoading ? (
          <FontAwesomeIcon icon={faSpinner} className='fa' spin />
        ) : (
          <FontAwesomeIcon icon={faGoogle} className='fa' />
        )}
        Login with Google
      </button>
      <div className='forgot-link'>
        <Link to='/forgot/password'>Forgot password?</Link>
      </div>
    </form>
  );
};

export default Login;
