import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightToBracket,
  faSpinner,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateUser } from '../../functions/auth';

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, []);

  const roleBasedRedirect = (res) => {
    if (res.data.role === 'admin') {
      history.push('/admin/dashboard');
    } else {
      history.push('/user/dashboard');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // validation
    if (!password) {
      toast.error('Please enter your password', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (password.length < 6) {
      toast.error('Your password must be at least 6 characters long', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem('emailForRegistration');
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        console.log('user', user, 'idTokenResult', idTokenResult);
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
          })
          .catch((err) => console.log(err));
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className='form-box'>
      <div className='button-box'>
        <p className='form-header'>Register Complete</p>
      </div>
      <form>
        <input
          type='email'
          className='input-field'
          value={email}
          readOnly
          disabled
        />
        <div className='password-row'>
          <input
            type={showPassword ? 'text' : 'password'}
            className='input-field'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
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
          disabled={password.length < 6}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faArrowRightToBracket} className='fa' />
          )}
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterComplete;
