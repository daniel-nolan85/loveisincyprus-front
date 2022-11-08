import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import defaultProfile from '../../assets/defaultProfile.png';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faArrowsLeftRight,
  faCaretUp,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const Analyse = ({
  analyseModalIsOpen,
  setAnalyseModalIsOpen,
  userToAnalyse,
}) => {
  const [analysing, setAnalysing] = useState(false);
  const [breakdown, setBreakdown] = useState({});
  const [showAnalysis, setShowAnalysis] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  console.log('userToAnalyse => ', userToAnalyse);
  console.log('user => ', user);

  useEffect(() => {
    analyseUsers(userToAnalyse);
  }, [analyseModalIsOpen]);

  const analyseUsers = async (u) => {
    setAnalysing(true);
    await axios
      .post(
        `${process.env.REACT_APP_API}/analyse-users`,
        { u, user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setAnalysing(false);
        console.log(res.data);
        setBreakdown(res.data);
      })
      .catch((err) => {
        setAnalysing(false);
        console.log(err);
      });
  };

  const modalStyles = {
    content: {
      position: 'fixed',
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

  const {
    points,
    genderTheyWant,
    genderYouWant,
    location,
    theyWillRelocate,
    youWillRelocate,
    relWanted,
    language,
    drinks,
    smokes,
    education,
    occupation,
    politics,
    religion,
    foods,
    livesWith,
    roleInLife,
    managesEdu,
    relocate,
    sexLikes,
    sexFrequency,
    loves,
    hates,
    pets,
    interests,
    music,
    books,
    films,
    sports,
    hobbies,
    traits,
    treatSelf,
    ageYouWant,
    ageTheyWant,
  } = breakdown;

  return (
    <Modal
      isOpen={analyseModalIsOpen}
      onRequestClose={() => setAnalyseModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        {analysing ? (
          <>
            <h2>
              Analysing compatibility between you and{' '}
              {userToAnalyse.username || userToAnalyse.name} now
            </h2>
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          </>
        ) : (
          <>
            <div className='match-images'>
              <img
                src={
                  userToAnalyse.profileImage
                    ? userToAnalyse.profileImage.url
                    : defaultProfile
                }
                alt={`${
                  userToAnalyse.username || userToAnalyse.name
                }'s profile picture`}
              />
              <h1
                className={`score ${
                  points >= 0 && points <= 15
                    ? 'very-low'
                    : points > 15 && points <= 30
                    ? 'low'
                    : points > 30 && points <= 60
                    ? 'mid'
                    : points > 60 && points <= 75
                    ? 'high'
                    : points > 75 && points <= 100
                    ? 'very-high'
                    : points > 100 && 'super'
                }`}
              >
                {points}
              </h1>
              <img
                src={user.profileImage ? user.profileImage.url : defaultProfile}
                alt={`${user.username || user.name}'s profile picture`}
              />
            </div>
            <br />
            <h2>
              You and {userToAnalyse.username || userToAnalyse.name} have a
              compatibility score of {points} points!
            </h2>
            <h3>
              This is considered{' '}
              {points >= 0 && points <= 15
                ? 'ice cold'
                : points > 15 && points <= 30
                ? 'cold'
                : points > 30 && points <= 60
                ? 'medium'
                : points > 60 && points <= 75
                ? 'hot'
                : points > 75 && points <= 100
                ? 'red hot'
                : points > 100 && 'intense'}
              !
            </h3>
            <br />
            <p>
              Updating your profile fully will help you to achieve higher
              compatibility scores
            </p>
            <br />
            {!showAnalysis ? 'Show' : 'Hide'} Breakdown
            <FontAwesomeIcon
              icon={showAnalysis ? faCaretUp : faCaretDown}
              className='fa center caret'
              onClick={() => setShowAnalysis(!showAnalysis)}
            />
            <div
              className={`analysis-container ${
                showAnalysis && 'analysis-container-show'
              }`}
            >
              <ul>
                {genderYouWant && (
                  <li>
                    {userToAnalyse.username || userToAnalyse.name} fits the
                    gender you are looking for
                  </li>
                )}
                {genderTheyWant && (
                  <li>
                    You fit the gender{' '}
                    {userToAnalyse.username || userToAnalyse.name} is looking
                    for
                  </li>
                )}
                {ageYouWant && (
                  <li>
                    {userToAnalyse.username || userToAnalyse.name} is{' '}
                    {userToAnalyse.age} years old, and fits the age you are
                    looking for
                  </li>
                )}
                {ageTheyWant && (
                  <li>
                    You fit the age{' '}
                    {userToAnalyse.username || userToAnalyse.name} is looking
                    for
                  </li>
                )}
                {location && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    live in {user.location}
                  </li>
                )}
                {theyWillRelocate && (
                  <li>
                    {userToAnalyse.username || userToAnalyse.name} might be
                    willing to relocate to your area
                  </li>
                )}
                {youWillRelocate && (
                  <li>
                    You might be willing to relocate to{' '}
                    {userToAnalyse.username || userToAnalyse.name}
                    's area
                  </li>
                )}
                {relocate && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    might be willing to relocate
                  </li>
                )}
                {relWanted && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} are
                    both looking for {user.relWanted}
                  </li>
                )}
                {language && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    speak{' '}
                    {user.language.charAt(0).toUpperCase() +
                      user.language.slice(1)}{' '}
                    natively
                  </li>
                )}
                {drinks && user.drinks !== 'never' && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    like to drink {user.drinks}
                  </li>
                )}
                {drinks && user.drinks === 'never' && (
                  <li>
                    Neither you or{' '}
                    {userToAnalyse.username || userToAnalyse.name} like drinking
                    alcohol
                  </li>
                )}
                {smokes && user.smokes !== 'never' && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    smoke {user.smokes}
                  </li>
                )}
                {smokes && user.smokes === 'never' && (
                  <li>
                    Neither you or{' '}
                    {userToAnalyse.username || userToAnalyse.name} smoke
                  </li>
                )}
                {education && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name}{' '}
                    reached the same level of education
                  </li>
                )}
                {occupation && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    work as a {user.occupation}
                  </li>
                )}
                {politics && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} have
                    the same views on politics
                  </li>
                )}
                {religion && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} have
                    the same feelings about religion
                  </li>
                )}
                {foods && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} have
                    the same taste in foods
                  </li>
                )}
                {livesWith && user.livesWith !== 'alone' && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    live with your {user.livesWith}
                  </li>
                )}
                {livesWith && user.livesWith === 'alone' && (
                  <li>
                    Neither you or{' '}
                    {userToAnalyse.username || userToAnalyse.name} both live
                    alone
                  </li>
                )}
                {roleInLife && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    believe your role in life is to focus on your{' '}
                    {user.roleInLife}
                  </li>
                )}
                {managesEdu && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    believe your children's {user.managesEdu} should manage
                    their education
                  </li>
                )}
                {sexLikes && user.sexLikes !== 'nothing' && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    want to try{' '}
                    {user.sexLikes === 'everything'
                      ? user.sexLikes
                      : `${user.sexLikes} things`}{' '}
                    in sex
                  </li>
                )}
                {sexLikes && user.sexLikes === 'nothing' && (
                  <li>
                    Neither you or{' '}
                    {userToAnalyse.username || userToAnalyse.name} want to try
                    anything in sex
                  </li>
                )}
                {sexFrequency && user.sexFrequency !== 'never' && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    like to have sex {user.sexFrequency}
                  </li>
                )}
                {sexFrequency && user.sexFrequency === 'never' && (
                  <li>
                    Neither you or{' '}
                    {userToAnalyse.username || userToAnalyse.name} want having
                    sex
                  </li>
                )}
                {loves && loves.length > 0 && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    love{' '}
                    {loves.length > 1
                      ? `${loves.slice(0, -1)} and ${loves[loves.length - 1]}`
                      : loves}
                  </li>
                )}
                {hates && hates.length > 0 && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    hate{' '}
                    {hates.length > 1
                      ? `${hates.slice(0, -1)} and ${hates[hates.length - 1]}`
                      : hates}
                  </li>
                )}
                {pets && pets.length > 0 && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    have{' '}
                    {pets.length > 1
                      ? `${pets.slice(0, -1)} and ${pets[pets.length - 1]}`
                      : pets}
                  </li>
                )}
                {interests && interests.length > 0 && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    share an initerest in{' '}
                    {interests.length > 1
                      ? `${interests.slice(0, -1)} and ${
                          interests[interests.length - 1]
                        }`
                      : interests}
                  </li>
                )}
                {music && music.length > 0 && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    enjoy listening to{' '}
                    {music.length > 1
                      ? `${music.slice(0, -1)} and ${music[music.length - 1]}`
                      : music}
                  </li>
                )}
                {books && books.length > 0 && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    enjoyed reading{' '}
                    {books.length > 1
                      ? `${books.slice(0, -1)} and ${books[books.length - 1]}`
                      : books}
                  </li>
                )}
                {films && films.length > 0 && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    enjoyed watching{' '}
                    {films.length > 1
                      ? `${films.slice(0, -1)} and ${films[films.length - 1]}`
                      : films}
                  </li>
                )}
                {sports && sports.length > 0 && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} are
                    both fans of{' '}
                    {sports.length > 1
                      ? `${sports.slice(0, -1)} and ${
                          sports[sports.length - 1]
                        }`
                      : sports}
                  </li>
                )}
                {hobbies && hobbies.length > 0 && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    enjoy{' '}
                    {hobbies.length > 1
                      ? `${hobbies.slice(0, -1)} and ${
                          hobbies[hobbies.length - 1]
                        }`
                      : hobbies}
                  </li>
                )}
                {traits && traits.length > 0 && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    see your selves as{' '}
                    {traits.length > 1
                      ? `${traits.slice(0, -1)} and ${
                          traits[traits.length - 1]
                        }`
                      : traits}
                  </li>
                )}
                {treatSelf && treatSelf.length > 0 && (
                  <li>
                    You and {userToAnalyse.username || userToAnalyse.name} both
                    enjoy treating yourselves with{' '}
                    {treatSelf.length > 1
                      ? `${treatSelf.slice(0, -1)} and ${
                          treatSelf[treatSelf.length - 1]
                        }`
                      : treatSelf}
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default Analyse;
