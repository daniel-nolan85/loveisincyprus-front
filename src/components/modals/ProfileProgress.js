import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ProfileProgress = ({
  progressModalIsOpen,
  setProgressModalIsOpen,
  progress,
  page,
}) => {
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
    percentage,
    coverImage,
    profileImage,
    username,
    name,
    gender,
    about,
    birthday,
    location,
    genderWanted,
    relWanted,
    vaccinated,
    language,
    maritalStatus,
    numOfChildren,
    drinks,
    smokes,
    nationality,
    height,
    build,
    hairColor,
    hairStyle,
    hairLength,
    eyeColor,
    ethnicity,
    feetType,
    education,
    occupation,
    politics,
    religion,
    foods,
    livesWith,
    roleInLife,
    managesEdu,
    marriage,
    income,
    ageOfPartner,
    changes,
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
  } = progress;

  return (
    <Modal
      isOpen={progressModalIsOpen}
      onRequestClose={() => setProgressModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <>
          <h2>
            {page === 'profile'
              ? `You have completed ${percentage}% of your profile`
              : `${username} has completed ${percentage}% of their profile`}
          </h2>
          <br />
          <div className='progress-container'>
            <ul>
              {coverImage && (
                <li>
                  {page === 'profile'
                    ? `You haven't uploaded a cover image yet`
                    : `${username} hasn't uploaded a cover image yet`}
                </li>
              )}
              {profileImage && (
                <li>
                  {page === 'profile'
                    ? `You haven't uploaded a profile image yet`
                    : `${username} hasn't uploaded a profile image yet`}
                </li>
              )}
              {name && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated your name yet`
                    : `${username} hasn't updated their name yet`}
                </li>
              )}
              {gender && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated your gender yet`
                    : `${username} hasn't updated their gender yet`}
                </li>
              )}
              {about && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated your bio yet`
                    : `${username} hasn't updated their bio yet`}
                </li>
              )}
              {birthday && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated your birthday yet`
                    : `${username} hasn't updated their birthday yet`}
                </li>
              )}
              {location && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated your location yet`
                    : `${username} hasn't updated their location yet`}
                </li>
              )}
              {genderWanted && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated which gender you are hoping to find yet`
                    : `${username} hasn't updated which gender they are hoping to find yet`}
                </li>
              )}
              {relWanted && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated what kind of relationship you are looking
                  for yet`
                    : `${username} hasn't updated what kind of relationship they are looking
                  for yet`}
                </li>
              )}
              {vaccinated && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated your Covid-19 vaccination status yet`
                    : `${username} hasn't updated their Covid-19 vaccination status yet`}
                </li>
              )}
              {language && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated what your native language is yet`
                    : `${username} hasn't updated what their native language is yet`}
                </li>
              )}
              {maritalStatus && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated your marital status yet`
                    : `${username} hasn't updated their marital status yet`}
                </li>
              )}
              {numOfChildren && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated the number of children you have yet`
                    : `${username} hasn't updated the number of children they have yet`}
                </li>
              )}
              {drinks && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated how often you like to drink yet`
                    : `${username} hasn't updated how often they like to drink yet`}
                </li>
              )}
              {smokes && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated whether or not you smoke yet`
                    : `${username} hasn't updated whether or not they smoke yet`}
                </li>
              )}
              {nationality && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated your nationality yet`
                    : `${username} hasn't updated their nationality yet`}
                </li>
              )}
              {height && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated your height yet`
                    : `${username} hasn't updated their height yet`}
                </li>
              )}
              {build && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated your build yet`
                    : `${username} hasn't updated their build yet`}
                </li>
              )}
              {hairColor && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated your hair colour yet`
                    : `${username} hasn't updated their hair colour yet`}
                </li>
              )}
              {hairStyle && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated your hair style yet`
                    : `${username} hasn't updated their hair style yet`}
                </li>
              )}
              {hairLength && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated your hair length yet`
                    : `${username} hasn't updated their hair length yet`}
                </li>
              )}
              {eyeColor && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated what colour eyes you have yet`
                    : `${username} hasn't updated what colour eyes they have yet`}
                </li>
              )}
              {ethnicity && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated your ethnicity yet`
                    : `${username} hasn't updated their ethnicity yet`}
                </li>
              )}
              {feetType && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated what type of feet you have yet`
                    : `${username} hasn't updated what type of feet they have yet`}
                </li>
              )}
              {education && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated what level of education you have achieved
                  yet`
                    : `${username} hasn't updated what level of education they have achieved
                  yet`}
                </li>
              )}
              {occupation && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated your occupation yet`
                    : `${username} hasn't updated their occupation yet`}
                </li>
              )}
              {politics && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated your views on politics yet`
                    : `${username} hasn't updated their views on politics yet`}
                </li>
              )}
              {religion && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated your feelings about religion yet`
                    : `${username} hasn't updated their feelings about religion yet`}
                </li>
              )}
              {foods && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated your taste in foods yet`
                    : `${username} hasn't updated their taste in foods yet`}
                </li>
              )}
              {livesWith && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated who you live with yet`
                    : `${username} hasn't updated who they live with yet`}
                </li>
              )}
              {roleInLife && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated what you believe your role in life is yet`
                    : `${username} hasn't updated what they believe their role in life is yet`}
                </li>
              )}
              {managesEdu && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated who you believe should manage your
                  children's education yet`
                    : `${username} hasn't updated who they believe should manage their
                  children's education yet`}
                </li>
              )}
              {marriage && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated your views on marriage yet`
                    : `${username} hasn't updated their views on marriage yet`}
                </li>
              )}
              {income && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated your annual income yet`
                    : `${username} hasn't updated their annual income yet`}
                </li>
              )}
              {ageOfPartner && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated what age you are looking for in a partner yet`
                    : `${username} hasn't updated what age they are looking for in a partner yet`}
                </li>
              )}
              {changes && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated what changes you would like to make in
                  yourself yet`
                    : `${username} hasn't updated what changes they would like to make in
                  themself yet`}
                </li>
              )}
              {relocate && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated whether you'd be willing to relocate yet`
                    : `${username} hasn't updated whether they'd be willing to relocate yet`}
                </li>
              )}
              {sexLikes && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated what you like in sex yet`
                    : `${username} hasn't updated what they like in sex yet`}
                </li>
              )}
              {sexFrequency && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated how often you like to have sex yet`
                    : `${username} hasn't updated how often they like to have sex yet`}
                </li>
              )}
              {loves && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated the things you love yet`
                    : `${username} hasn't updated the things they love yet`}
                </li>
              )}
              {hates && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated the things you hate yet`
                    : `${username} hasn't updated the things they hate yet`}
                </li>
              )}
              {pets && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated what pets you have (if any) yet`
                    : `${username} hasn't updated what pets they have (if any) yet`}
                </li>
              )}
              {interests && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated what interests you have yet`
                    : `${username} hasn't updated what interests they have yet`}
                </li>
              )}
              {music && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated what music you enjoy listening to yet`
                    : `${username} hasn't updated what music they enjoy listening to yet`}
                </li>
              )}
              {books && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated what books you have enjoyed reading yet`
                    : `${username} hasn't updated what books they have enjoyed reading yet`}
                </li>
              )}
              {films && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated what films you have enjoyed watching yet`
                    : `${username} hasn't updated what films they have enjoyed watching yet`}
                </li>
              )}
              {sports && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated what sports you are a fan of yet`
                    : `${username} hasn't updated what sports they are a fan of yet`}
                </li>
              )}
              {hobbies && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated what hobbies you enjoy doing yet`
                    : `${username} hasn't updated what hobbies they enjoy doing yet`}
                </li>
              )}
              {traits && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated what traits you have yet`
                    : `${username} hasn't updated what traits they have yet`}
                </li>
              )}
              {treatSelf && (
                <li>
                  {page === 'profile'
                    ? `You haven't updated what ways you enjoy treating yourself yet`
                    : `${username} hasn't updated what ways they enjoy treating themself yet`}
                </li>
              )}
              {percentage === 100 && (
                <li>
                  {page === 'profile'
                    ? `Amazing! Your chances of finding your ideal partner will have
                  improved significantly. Well done!`
                    : `${username} has completed 100% of their profile!`}
                </li>
              )}
            </ul>
          </div>
        </>
      </div>
    </Modal>
  );
};

export default ProfileProgress;
