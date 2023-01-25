import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightToBracket,
  faSpinner,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ProfileImageUpdate from '../modals/ProfileImageUpdate';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

Modal.setAppElement('#root');

const ProfileUpdate = ({
  profileImage,
  handleProfileImage,
  coverImage,
  handleCoverImage,
  username,
  setUsername,
  about,
  setAbout,
  name,
  setName,
  mobile,
  setMobile,
  updatedMobile,
  setUpdatedMobile,
  secondMobile,
  setSecondMobile,
  statement,
  setStatement,
  answer,
  setAnswer,
  email,
  setEmail,
  loading,
  modalIsOpen,
  setModalIsOpen,
  handleSubmit,
  gender,
  setGender,
  birthday,
  setBirthday,
  location,
  setLocation,
  genderWanted,
  setGenderWanted,
  relWanted,
  setRelWanted,
  language,
  setLanguage,
  maritalStatus,
  setMaritalStatus,
  numOfChildren,
  setNumOfChildren,
  drinks,
  setDrinks,
  smokes,
  setSmokes,
  nationality,
  setNationality,
  height,
  setHeight,
  build,
  setBuild,
  hairColor,
  setHairColor,
  hairStyle,
  setHairStyle,
  hairLength,
  setHairLength,
  eyeColor,
  setEyeColor,
  ethnicity,
  setEthnicity,
  feetType,
  setFeetType,
  loves,
  setLoves,
  hates,
  setHates,
  education,
  setEducation,
  occupation,
  setOccupation,
  politics,
  setPolitics,
  religion,
  setReligion,
  pets,
  setPets,
  interests,
  setInterests,
  music,
  setMusic,
  foods,
  setFoods,
  books,
  setBooks,
  films,
  setFilms,
  sports,
  setSports,
  livesWith,
  setLivesWith,
  roleInLife,
  setRoleInLife,
  managesEdu,
  setManagesEdu,
  hobbies,
  setHobbies,
  marriage,
  setMarriage,
  income,
  setIncome,
  ageOfPartner,
  setAgeOfPartner,
  traits,
  setTraits,
  changes,
  setChanges,
  relocate,
  setRelocate,
  treatSelf,
  setTreatSelf,
  sexLikes,
  setSexLikes,
  sexFrequency,
  setSexFrequency,
  loadingProfileImg,
  loadingCoverImg,
  profileImageUpdateModalIsOpen,
  setProfileImageUpdateModalIsOpen,
  handleLiveImage,
}) => {
  const [showAboutMe, setShowAboutMe] = useState(true);
  const [showBackground, setShowBackground] = useState(false);
  const [showAppearance, setShowAppearance] = useState(false);
  const [showPlus, setShowPlus] = useState(false);

  const modalStyles = {
    content: {
      top: '200%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
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

  const modalStylesModal = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
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

  const mobileDevice = window.matchMedia('(max-width: 900px)');

  const aboutMe = () => {
    setShowAboutMe(true);
    setShowBackground(false);
    setShowAppearance(false);
    setShowPlus(false);
  };

  const myBackground = () => {
    setShowBackground(true);
    setShowAboutMe(false);
    setShowAppearance(false);
    setShowPlus(false);
  };

  const myAppearance = () => {
    setShowAppearance(true);
    setShowAboutMe(false);
    setShowBackground(false);
    setShowPlus(false);
  };

  const profilePlus = () => {
    setShowPlus(true);
    setShowAboutMe(false);
    setShowBackground(false);
    setShowAppearance(false);
  };

  const imagesSection = () =>
    showAboutMe && (
      <>
        <div className='add-post-links update-form'>
          {loadingCoverImg ? (
            <label>
              <small>Cover Image: </small>
              <FontAwesomeIcon icon={faSpinner} className='fa' spin />
            </label>
          ) : (
            <label>
              <small>Cover Image: </small>
              {coverImage && coverImage.url ? (
                <img src={coverImage.url} />
              ) : (
                <FontAwesomeIcon
                  icon={faCamera}
                  className='fa'
                ></FontAwesomeIcon>
              )}
              <input
                onChange={handleCoverImage}
                type='file'
                accept='images/*'
                hidden
              />
            </label>
          )}
        </div>
        <div className='add-post-links update-form'>
          {loadingProfileImg ? (
            <label>
              <small>Profile Image: </small>
              <FontAwesomeIcon icon={faSpinner} className='fa' spin />
            </label>
          ) : (
            <label onClick={() => setProfileImageUpdateModalIsOpen(true)}>
              <small>Profile Image: </small>
              {profileImage && profileImage.url ? (
                <img src={profileImage.url} />
              ) : (
                <FontAwesomeIcon
                  icon={faCamera}
                  className='fa'
                ></FontAwesomeIcon>
              )}
            </label>
          )}
        </div>
      </>
    );

  const aboutMeSection = () =>
    showAboutMe && (
      <>
        <input
          type='text'
          className='input-field'
          placeholder='What is your name?'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />

        <input
          type='text'
          className='input-field'
          placeholder='Choose a username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className='csv'>
          Your username will be how you are referred to throughout the site.
          (Can be changed anytime)
        </label>

        <PhoneInput
          className='input-field'
          placeholder='Enter your mobile number'
          value={updatedMobile || mobile}
          onChange={(phone) => {
            setUpdatedMobile(`+${phone}`);
          }}
        />
        <label className='csv'>
          Updating your primary mobile number will result in you being logged
          out. To return to the site, please re-authenticate using your new
          mobile number.
        </label>

        <PhoneInput
          className='input-field'
          placeholder='Enter your secondary mobile number*'
          value={secondMobile}
          onChange={(phone) => {
            setSecondMobile(`+${phone}`);
          }}
        />

        <input
          type='email'
          className='input-field'
          placeholder='What is your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          name='gender'
          onChange={(e) => setGender(e.target.value)}
          value={gender}
        >
          <option value=''>What is your gender?</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>

        <textarea
          className='input-field bio'
          placeholder='Write something about yourself...'
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        <DatePicker
          selected={birthday}
          onChange={(date) => setBirthday(date)}
          dateFormat='dd/MM/yyyy'
          minDate={new Date('01-01-1900')}
          maxDate={new Date()}
          showMonthDropdown
          showYearDropdown
          scrollableMonthDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          placeholderText='When is your birthday?'
        />

        <select
          name='location'
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        >
          <option value=''>Where do you live?</option>
          <option value='ayia napa'>Ayia Napa</option>
          <option value='larnaca'>Larnaca</option>
          <option value='limassol'>Limassol</option>
          <option value='nicosia'>Nicosia</option>
          <option value='paphos'>Paphos</option>
        </select>

        <select
          name='genderWanted'
          onChange={(e) => setGenderWanted(e.target.value)}
          value={genderWanted}
        >
          <option value=''>Who are you looking for?</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>

        <select
          name='relWanted'
          onChange={(e) => setRelWanted(e.target.value)}
          value={relWanted}
        >
          <option value=''>
            What kind of relationship are you looking for?
          </option>
          <option value='casual dating'>Casual dating</option>
          <option value='friendship'>Friendship</option>
          <option value='long-term relationship'>Long-term relationship</option>
          <option value='marriage'>Marriage</option>
        </select>
      </>
    );

  const myBackgroundSection = () =>
    showBackground && (
      <>
        <select
          name='language'
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
        >
          <option value=''>What is your native language?</option>
          <option value='arabic'>Arabic</option>
          <option value='armenian'>Armenian</option>
          <option value='bulgarian'>Bulgarian</option>
          <option value='catalan'>Catalan</option>
          <option value='chinese'>Chinese</option>
          <option value='croatian'>Croatian</option>
          <option value='czech'>Czech</option>
          <option value='danish'>Danish</option>
          <option value='dutch'>Dutch</option>
          <option value='english'>English</option>
          <option value='estonian'>Estonian</option>
          <option value='finnish'>Finnish</option>
          <option value='french'>French</option>
          <option value='german'>German</option>
          <option value='greek'>Greek</option>
          <option value='hebrew'>Hebrew</option>
          <option value='hindi'>Hindi</option>
          <option value='hungarian'>Hungarian</option>
          <option value='icelandic'>Icelandic</option>
          <option value='italian'>Italian</option>
          <option value='japanese'>Japanese</option>
          <option value='korean'>Korean</option>
          <option value='letton'>Letton</option>
          <option value='latvian'>Latvian</option>
          <option value='lithuanian'>Lithuanian</option>
          <option value='luxembourgian'>Luxembourgian</option>
          <option value='moldovan'>Moldovan</option>
          <option value='norwegian'>Norwegian</option>
          <option value='polish'>Polish</option>
          <option value='portuguese'>Portuguese</option>
          <option value='romanian'>Romanian</option>
          <option value='russian'>Russian</option>
          <option value='serbian'>Serbian</option>
          <option value='slovak'>Slovak</option>
          <option value='slovenian'>Slovenian</option>
          <option value='spanish'>Spanish</option>
          <option value='swedish'>Swedish</option>
          <option value='ukrainian'>Ukrainian</option>
          <option value='welsh'>Welsh</option>
          <option value='yiddish'>Yiddish</option>
          <option value='other'>Other</option>
        </select>

        <select
          name='marital-status'
          onChange={(e) => setMaritalStatus(e.target.value)}
          value={maritalStatus}
        >
          <option value=''>What is your marital status?</option>
          <option value='divorced'>Divorced</option>
          <option value='married'>Married</option>
          <option value='never married'>Never married</option>
          <option value='separated'>Separated</option>
          <option value='widowed'>Widowed</option>
        </select>

        <input
          type='number'
          className='input-field'
          placeholder='How many children do you have?'
          value={numOfChildren}
          onChange={(e) => setNumOfChildren(e.target.value)}
        />

        <select
          name='drinks'
          onChange={(e) => setDrinks(e.target.value)}
          value={drinks}
        >
          <option value=''>Do you like to drink?</option>
          <option value='never'>Never</option>
          <option value='often'>Often</option>
          <option value='sometimes'>Sometimes</option>
        </select>

        <select
          name='smokes'
          onChange={(e) => setSmokes(e.target.value)}
          value={smokes}
        >
          <option value=''>Do you smoke?</option>
          <option value='never'>Never</option>
          <option value='often'>Often</option>
          <option value='sometimes'>Sometimes</option>
        </select>

        <select
          name='nationality'
          onChange={(e) => setNationality(e.target.value)}
          value={nationality}
        >
          <option value=''>What is your nationality?</option>
          <option value='american'>American</option>
          <option value='argentinian'>Argentinian</option>
          <option value='armenian'>Armenian</option>
          <option value='australian'>Australian</option>
          <option value='austrian'>Austrian</option>
          <option value='belgian'>Belgian</option>
          <option value='brazilian'>Brazilian</option>
          <option value='bulgarian'>Bulgarian</option>
          <option value='canadian'>Canadian</option>
          <option value='colombian'>Colombian</option>
          <option value='croatian'>Croatian</option>
          <option value='cuban'>Cuban</option>
          <option value='cypriot'>Cypriot</option>
          <option value='czech'>Czech</option>
          <option value='danish'>Danish</option>
          <option value='dutch'>Dutch</option>
          <option value='east asian'>East Asian</option>
          <option value='english'>English</option>
          <option value='estonian'>Estonian</option>
          <option value='finnish'>Finnish</option>
          <option value='french'>French</option>
          <option value='georgian'>Georgian</option>
          <option value='german'>German</option>
          <option value='greek'>Greek</option>
          <option value='hungarian'>Hungarian</option>
          <option value='icelandic'>Icelandic</option>
          <option value='irish'>Irish</option>
          <option value='israeli'>Israeli</option>
          <option value='italian'>Italian</option>
          <option value='japanese'>Japanese</option>
          <option value='kazakh'>Kazakh</option>
          <option value='kirghizian'>Kirghizian</option>
          <option value='latvian'>Latvian</option>
          <option value='lebanese'>Lebanese</option>
          <option value='liechtensteiner'>Liechtensteiner</option>
          <option value='lithuanian'>Lithuanian</option>
          <option value='luxembourger'>Luxembourger</option>
          <option value='maltese'>Maltese</option>
          <option value='mauritian'>Mauritian</option>
          <option value='moldovan'>Moldovan</option>
          <option value='monegasque'>Monegasque</option>
          <option value='new zealander'>New Zealander</option>
          <option value='norwegian'>Norwegian</option>
          <option value='polish'>Polish</option>
          <option value='portuguese'>Portuguese</option>
          <option value='romanian'>Romanian</option>
          <option value='russian'>Russian</option>
          <option value='scottish'>Scottish</option>
          <option value='serbian'>Serbian</option>
          <option value='slovak'>Slovak</option>
          <option value='slovenian'>Slovenian</option>
          <option value='south african'>South African</option>
          <option value='south east asian'>South East Asian</option>
          <option value='spanish'>Spanish</option>
          <option value='swedish'>Swedish</option>
          <option value='tadzhik'>Tadzhik</option>
          <option value='ukrainian'>Ukrainian</option>
          <option value='welsh'>Welsh</option>
          <option value='other'>Other</option>
        </select>
      </>
    );

  const myAppearanceSection = () =>
    showAppearance && (
      <>
        <select
          name='height'
          onChange={(e) => setHeight(e.target.value)}
          value={height}
        >
          <option value=''>How tall are you?</option>
          <option value='4-11'>4'11" / 150 cm</option>
          <option value='5-0'>5'0" / 153 cm</option>
          <option value='5-1'>5'1" / 154 cm</option>
          <option value='5-2'>5'2" / 157 cm</option>
          <option value='5-3'>5'3" / 159 cm</option>
          <option value='5-4'>5'4" / 162 cm</option>
          <option value='5-5'>5'5" / 164 cm</option>
          <option value='5-6'>5'6" / 167 cm</option>
          <option value='5-7'>5'7" / 169 cm</option>
          <option value='5-8'>5'8" / 172 cm</option>
          <option value='5-9'>5'9" / 175 cm</option>
          <option value='5-10'>5'10" / 177 cm</option>
          <option value='5-11'>5'11" / 180 cm</option>
          <option value='6-0'>6'0" / 183 cm</option>
          <option value='6-1'>6'1" / 185 cm</option>
          <option value='6-2'>6'2" / 187 cm</option>
          <option value='6-3'>6'3" / 190 cm</option>
          <option value='6-4'>6'4" / 192 cm</option>
          <option value='6-5'>6'5" / 195 cm</option>
          <option value='6-6'>6'6" / 197 cm</option>
          <option value='6-7'>6'7" / 200 cm</option>
        </select>

        <select
          name='build'
          onChange={(e) => setBuild(e.target.value)}
          value={build}
        >
          <option value=''>What is your build?</option>
          <option value='athletic'>Athletic</option>
          <option value='average'>Average</option>
          <option value='extra large'>Extra Large</option>
          <option value='large'>Large</option>
          <option value='skinny'>Skinny</option>
          <option value='slim'>Slim</option>
        </select>

        <select
          name='hair color'
          onChange={(e) => setHairColor(e.target.value)}
          value={hairColor}
        >
          <option value=''>What colour hair do you have?</option>
          <option value='black'>Black</option>
          <option value='blonde'>Blonde</option>
          <option value='brown'>Brown</option>
          <option value='chestnut'>Chestnut</option>
          <option value='dyed'>Dyed</option>
          <option value='golden'>Golden</option>
          <option value='red'>Red</option>
          <option value='white'>White</option>
        </select>

        <select
          name='hair style'
          onChange={(e) => setHairStyle(e.target.value)}
          value={hairStyle}
        >
          <option value=''>What hairstyle do you have?</option>
          <option value='curvy'>Curvy</option>
          <option value='straight'>Straight</option>
          <option value='wavy'>Wavy</option>
        </select>

        <select
          name='hair length'
          onChange={(e) => setHairLength(e.target.value)}
          value={hairLength}
        >
          <option value=''>How long is your hair?</option>
          <option value='bald'>Bald</option>
          <option value='short'>Short</option>
          <option value='medium'>Medium</option>
          <option value='long'>Long</option>
        </select>

        <select
          name='eye color'
          onChange={(e) => setEyeColor(e.target.value)}
          value={eyeColor}
        >
          <option value=''>What colour eyes do you have?</option>
          <option value='blue'>Blue</option>
          <option value='brown'>Brown</option>
          <option value='green'>Green</option>
          <option value='hazel'>Hazel</option>
        </select>

        <select
          name='ethnicity'
          onChange={(e) => setEthnicity(e.target.value)}
          value={ethnicity}
        >
          <option value=''>What is your ethnicity?</option>
          <option value='asian'>Asian</option>
          <option value='black'>Black</option>
          <option value='hispanic'>Hispanic / Latin</option>
          <option value='indian'>Indian</option>
          <option value='mediterranean'>Mediterranean</option>
          <option value='middle eastern'>Middle Eastern</option>
          <option value='white'>White</option>
          <option value='other'>Other</option>
        </select>

        <select
          name='feet type'
          onChange={(e) => setFeetType(e.target.value)}
          value={feetType}
        >
          <option value=''>What type of feet do you have?</option>
          <option value='egyptian'>Egyptian</option>
          <option value='greek'>Greek</option>
          <option value='roman'>Roman</option>
        </select>
      </>
    );

  const profilePlusSection = () =>
    showPlus && (
      <>
        <input
          type='text'
          className='input-field'
          placeholder='What things do you love?'
          value={loves}
          onChange={(e) => {
            const lovesArr = e.target.value.split(',');
            setLoves(lovesArr);
          }}
        />
        <label className='csv'>Please separate each item with a comma</label>

        <input
          type='text'
          className='input-field'
          placeholder='What things do you hate?'
          value={hates}
          onChange={(e) => {
            const hatesArr = e.target.value.split(',');
            setHates(hatesArr);
          }}
        />
        <label className='csv'>Please separate each item with a comma</label>

        <select
          name='education'
          onChange={(e) => setEducation(e.target.value)}
          value={education}
        >
          <option value=''>What is your highest level of education?</option>
          <option value='high school'>High school</option>
          <option value='vocational'>Vocational school</option>
          <option value='foundation'>Foundation degree</option>
          <option value='bachelors'>Bachelor's degree</option>
          <option value='masters'>Masters degree</option>
          <option value='doctoral'>Doctoral degree</option>
        </select>

        <input
          type='text'
          className='input-field'
          placeholder='What is your occupation?'
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
        />

        <select
          name='politics'
          onChange={(e) => setPolitics(e.target.value)}
          value={politics}
        >
          <option value=''>What is your view on politics?</option>
          <option value='anarchism'>Anarchism</option>
          <option value='panarchism'>Panarchism</option>
          <option value='far left'>Far left</option>
          <option value='left wing'>Left wing</option>
          <option value='center'>Center</option>
          <option value='right wing'>Right wing</option>
          <option value='far right'>Far right</option>
        </select>

        <select
          name='religion'
          onChange={(e) => setReligion(e.target.value)}
          value={religion}
        >
          <option value=''>What religion do you have?</option>
          <option value='agnostic'>Agnostic</option>
          <option value='atheist'>Atheist</option>
          <option value='buddhist'>Buddhist</option>
          <option value='catholic'>Catholic</option>
          <option value='christian'>Christian</option>
          <option value='deist'>Deist</option>
          <option value='jewish'>Jewish</option>
          <option value='orthodox'>Orthodox</option>
          <option value='pagan'>Pagan</option>
          <option value='protestant'>Protestant</option>
          <option value='spiritual'>Spiritual (not religious)</option>
          <option value='other'>Other</option>
        </select>

        <input
          type='text'
          className='input-field'
          placeholder='What pets do you have, if any?'
          value={pets}
          onChange={(e) => {
            const petsArr = e.target.value.split(',');
            setPets(petsArr);
          }}
        />
        <label className='csv'>Please separate each pet with a comma</label>

        <input
          type='text'
          className='input-field'
          placeholder='What are some of your interests?'
          value={interests}
          onChange={(e) => {
            const interestsArr = e.target.value.split(',');
            setInterests(interestsArr);
          }}
        />
        <label className='csv'>
          Please separate each interest with a comma
        </label>

        <input
          type='text'
          className='input-field'
          placeholder='What are some of your favourite genres of music?'
          value={music}
          onChange={(e) => {
            const musicArr = e.target.value.split(',');
            setMusic(musicArr);
          }}
        />
        <label className='csv'>Please separate each genre with a comma</label>

        <select
          name='foods'
          onChange={(e) => setFoods(e.target.value)}
          value={foods}
        >
          <option value=''>What taste do you have in foods?</option>
          <option value='everything'>Everything</option>
          <option value='kosher'>Kosher</option>
          <option value='macrobiotic'>Macrobiotic</option>
          <option value='organic'>Organic</option>
          <option value='vegan'>Vegan</option>
          <option value='vegetarian'>Vegetarian</option>
        </select>

        <input
          type='text'
          className='input-field'
          placeholder='What are some of your favourite books?'
          value={books}
          onChange={(e) => {
            const booksArr = e.target.value.split(',');
            setBooks(booksArr);
          }}
        />
        <label className='csv'>Please separate each book with a comma</label>

        <input
          type='text'
          className='input-field'
          placeholder='What are some of your favourite films?'
          value={films}
          onChange={(e) => {
            const filmsArr = e.target.value.split(',');
            setFilms(filmsArr);
          }}
        />
        <label className='csv'>Please separate each film with a comma</label>

        <input
          type='text'
          className='input-field'
          placeholder='What are some of your favourite sports?'
          value={sports}
          onChange={(e) => {
            const sportsArr = e.target.value.split(',');
            setSports(sportsArr);
          }}
        />
        <label className='csv'>Please separate each sport with a comma</label>

        <select
          name='lives with'
          onChange={(e) => setLivesWith(e.target.value)}
          value={livesWith}
        >
          <option value=''>Who do you currently live with?</option>
          <option value='alone'>Alone</option>
          <option value='children'>Children</option>
          <option value='flatmates'>Flatmates</option>
          <option value='parents'>Parents</option>
          <option value='partner'>Partner</option>
        </select>

        <select
          name='role in life'
          onChange={(e) => setRoleInLife(e.target.value)}
          value={roleInLife}
        >
          <option value=''>What is your role in life?</option>
          <option value='career'>Focusing on career</option>
          <option value='children'>Taking care of children</option>
          <option value='partner'>Taking care of partner</option>
          <option value='parents'>Taking care of parents</option>
        </select>

        <select
          name='manages education'
          onChange={(e) => setManagesEdu(e.target.value)}
          value={managesEdu}
        >
          <option value=''>
            Who do you believe should manage children's education?
          </option>
          <option value='nanny'>A nanny</option>
          <option value='tutor'>A private tutor</option>
          <option value='father'>The father</option>
          <option value='mother'>The mother</option>
          <option value='parents'>Both parents</option>
          <option value='school'>The school</option>
        </select>

        <input
          type='text'
          className='input-field'
          placeholder='What are some of your favourite hobbies?'
          value={hobbies}
          onChange={(e) => {
            const hobbiesArr = e.target.value.split(',');
            setHobbies(hobbiesArr);
          }}
        />
        <label className='csv'>Please separate each hobby with a comma</label>

        <textarea
          className='input-field bio'
          placeholder='What are your views on marriage?'
          value={marriage}
          onChange={(e) => setMarriage(e.target.value)}
        />

        <span>
          <input
            type='number'
            className='input-field'
            placeholder='What is your annual income (€)'
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            step='500'
          />
        </span>

        <select
          name='age of partner'
          onChange={(e) => setAgeOfPartner(e.target.value)}
          value={ageOfPartner}
        >
          <option value=''>What age of partner are you hoping to find?</option>
          <option value='18-21'>18-21</option>
          <option value='21-30'>21-30</option>
          <option value='31-40'>31-40</option>
          <option value='41-50'>41-50</option>
          <option value='51-60'>51-60</option>
          <option value='61-70'>61-70</option>
          <option value='71-80'>71-80</option>
          <option value='Over 80'>Over 80</option>
        </select>

        <input
          type='text'
          className='input-field'
          placeholder='What are some of your best character traits?'
          value={traits}
          onChange={(e) => {
            const traitsArr = e.target.value.split(',');
            setTraits(traitsArr);
          }}
        />
        <label className='csv'>Please separate each trait with a comma</label>

        <textarea
          className='input-field bio'
          placeholder='Is there anything you would like to change about yourself?'
          value={changes}
          onChange={(e) => setChanges(e.target.value)}
        />

        <select
          name='relocate'
          onChange={(e) => setRelocate(e.target.value)}
          value={relocate}
        >
          <option value=''>Would you be willing to relocate?</option>
          <option value='no'>No</option>
          <option value='abroad'>Yes, even abroad</option>
          <option value='country'>Yes, in the same country</option>
          <option value='region'>Yes, in the same region</option>
          <option value='town'>Yes, in the same town</option>
        </select>

        <input
          type='text'
          className='input-field'
          placeholder='In what ways do you enjoy treating yourself?'
          value={treatSelf}
          onChange={(e) => {
            const treatSelfArr = e.target.value.split(',');
            setTreatSelf(treatSelfArr);
          }}
        />
        <label className='csv'>Please separate each way with a comma</label>

        <select
          name='sex likes'
          onChange={(e) => setSexLikes(e.target.value)}
          value={sexLikes}
        >
          <option value=''>What do you like in sex?</option>
          <option value='everything'>Everything</option>
          <option value='nothing'>Nothing</option>
          <option value='unusual'>Unusual things</option>
          <option value='usual'>Usual things</option>
        </select>

        <select
          name='sex frequency'
          onChange={(e) => setSexFrequency(e.target.value)}
          value={sexFrequency}
        >
          <option value=''>How often do you like to have sex?</option>
          <option value='daily'>Daily</option>
          <option value='never'>Never</option>
          <option value='often'>Often</option>
          <option value='rarely'>Rarely</option>
          <option value='sometimes'>Sometimes</option>
        </select>
      </>
    );

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={mobileDevice.matches ? modalStylesModal : modalStyles}
      contentLabel='Example Modal'
    >
      <div className='prof-update-form-box'>
        <div className='button-box'>
          <p className='form-header' style={{ paddingLeft: '50px' }}>
            Update Profile
          </p>
        </div>
        <div className='points-filter-btns'>
          <button className='submit-btn' onClick={aboutMe}>
            About Me
          </button>
          <button className='submit-btn' onClick={myBackground}>
            My Background
          </button>
          <button className='submit-btn' onClick={myAppearance}>
            My Appearance
          </button>
          <button className='submit-btn' onClick={profilePlus}>
            Profile +
          </button>
        </div>
        <form>
          {imagesSection()}
          {aboutMeSection()}
          {myBackgroundSection()}
          {myAppearanceSection()}
          {profilePlusSection()}
          <button
            onClick={handleSubmit}
            type='submit'
            className='submit-btn'
            disabled={loading}
          >
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} className='fa' spin />
            ) : (
              <FontAwesomeIcon icon={faArrowRightToBracket} className='fa' />
            )}
            Update
          </button>
        </form>
        <ProfileImageUpdate
          profileImageUpdateModalIsOpen={profileImageUpdateModalIsOpen}
          setProfileImageUpdateModalIsOpen={setProfileImageUpdateModalIsOpen}
          handleProfileImage={handleProfileImage}
          handleLiveImage={handleLiveImage}
        />
      </div>
    </Modal>
  );
};

export default ProfileUpdate;
