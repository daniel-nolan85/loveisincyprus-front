import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ProfileProgress = ({
  progressModalIsOpen,
  setProgressModalIsOpen,
  progress,
  page,
}) => {
  console.log(page);
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
            {page == 'profile' ? 'You have' : `${username} has`} completed{' '}
            {percentage}% of your profile
          </h2>
          <br />
          <div className='progress-container'>
            <ul>
              {coverImage && <li>You haven't uploaded a cover image yet</li>}
              {profileImage && (
                <li>You haven't uploaded a profile image yet</li>
              )}
              {name && <li>You haven't updated your name yet</li>}
              {gender && <li>You haven't updated your gender yet</li>}
              {about && <li>You haven't updated your bio yet</li>}
              {birthday && <li>You haven't updated your birthday yet</li>}
              {location && <li>You haven't updated your location yet</li>}
              {genderWanted && (
                <li>
                  You haven't updated which gender you are hoping to find yet
                </li>
              )}
              {relWanted && (
                <li>
                  You haven't updated what kind of relationship you are looking
                  for yet
                </li>
              )}
              {language && (
                <li>You haven't updated what your native language is yet</li>
              )}
              {maritalStatus && (
                <li>You haven't updated your marital status yet</li>
              )}
              {numOfChildren && (
                <li>You haven't updated the number of children you have yet</li>
              )}
              {drinks && (
                <li>You haven't updated how often you like to drink yet</li>
              )}
              {smokes && (
                <li>You haven't updated whether or not you smoke yet</li>
              )}
              {nationality && <li>You haven't updated your nationality yet</li>}
              {height && <li>You haven't updated your height yet</li>}
              {build && <li>You haven't updated your build yet</li>}
              {hairColor && <li>You haven't updated your hair colour yet</li>}
              {hairStyle && <li>You haven't updated your hair style yet</li>}
              {hairLength && <li>You haven't updated your hair length yet</li>}
              {eyeColor && (
                <li>You haven't updated what colour eyes you have yet</li>
              )}
              {ethnicity && <li>You haven't updated your ethnicity yet</li>}
              {feetType && (
                <li>You haven't updated what type of feet you have yet</li>
              )}
              {education && (
                <li>
                  You haven't updated what level of education you have achieved
                  yet
                </li>
              )}
              {occupation && <li>You haven't updated your occupation yet</li>}
              {politics && (
                <li>You haven't updated your views on politics yet</li>
              )}
              {religion && (
                <li>You haven't updated your feelings about religion yet</li>
              )}
              {foods && <li>You haven't updated your taste in foods yet</li>}
              {livesWith && <li>You haven't updated who you live with yet</li>}
              {roleInLife && (
                <li>
                  You haven't updated what you believe your role in life is yet
                </li>
              )}
              {managesEdu && (
                <li>
                  You haven't updated who you believe should manage your
                  children's education yet
                </li>
              )}
              {marriage && (
                <li>You haven't updated your views on marriage yet</li>
              )}
              {income && <li>You haven't updated your annual income yet</li>}
              {ageOfPartner && (
                <li>
                  You haven't updated what age you are looking for in a partner
                  yet
                </li>
              )}
              {changes && (
                <li>
                  You haven't updated what changes you would like to make in
                  yourself yet
                </li>
              )}
              {relocate && (
                <li>
                  You haven't updated whether you'd be willing to relocate yet
                </li>
              )}
              {sexLikes && (
                <li>You haven't updated what you like in sex yet</li>
              )}
              {sexFrequency && (
                <li>You haven't updated how often you like to have sex yet</li>
              )}
              {loves && <li>You haven't updated the things you love yet</li>}
              {hates && <li>You haven't updated the things you hate yet</li>}
              {pets && (
                <li>You haven't updated what pets you have (if any) yet</li>
              )}
              {interests && (
                <li>You haven't updated what interests you have yet</li>
              )}
              {music && (
                <li>
                  You haven't updated what music you enjoy listening to yet
                </li>
              )}
              {books && (
                <li>
                  You haven't updated what books you have enjoyed reading yet
                </li>
              )}
              {films && (
                <li>
                  You haven't updated what films you have enjoyed watching yet
                </li>
              )}
              {sports && (
                <li>You haven't updated what sports you are a fan of yet</li>
              )}
              {hobbies && (
                <li>You haven't updated what hobbies you enjoy doing yet</li>
              )}
              {traits && <li>You haven't updated what traits you have yet</li>}
              {treatSelf && (
                <li>
                  You haven't updated what ways you enjoy treating yourself yet
                </li>
              )}
              {percentage === 100 && (
                <li>
                  Amazing! Your chances of finding your ideal partner will have
                  improved significantly. Well done!
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
