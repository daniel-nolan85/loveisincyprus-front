import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightToBracket,
  faSpinner,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
}) => {
  const modalStyles = {
    content: {
      top: '50%',
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
    //
  };

  const myBackground = () => {
    //
  };

  const myAppearance = () => {
    //
  };

  const profilePlus = () => {
    //
  };

  const aboutMeForm = () => (
    <>
      <div className='add-post-links update-form'>
        <label>
          <small>Cover Image: </small>
          {coverImage && coverImage.url ? (
            <img src={coverImage.url} />
          ) : (
            <FontAwesomeIcon icon={faCamera} className='fa'></FontAwesomeIcon>
          )}
          <input
            onChange={handleCoverImage}
            type='file'
            accept='images/*'
            hidden
          />
        </label>
      </div>
      <div className='add-post-links update-form'>
        <label>
          <small>Profile Image: </small>
          {profileImage && profileImage.url ? (
            <img src={profileImage.url} />
          ) : (
            <FontAwesomeIcon icon={faCamera} className='fa'></FontAwesomeIcon>
          )}
          <input
            onChange={handleProfileImage}
            type='file'
            accept='images/*'
            hidden
          />
        </label>
      </div>

      <form>
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

        {/* <input
            type='email'
            className='input-field'
            value={email}
            readOnly
            disabled
          /> */}

        <DatePicker
          selected={birthday}
          onChange={(date) => setBirthday(date)}
          dateFormat='dd/MM/yyyy'
          minDate={new Date('01-01-1900')}
          maxDate={new Date()}
          // isClearable
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

        {/* <button
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
        </button> */}
      </form>
    </>
  );

  const myBackgroundForm = () => (
    <form>
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

      {/* <button
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
      </button> */}
    </form>
  );

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={mobileDevice.matches ? modalStylesModal : modalStyles}
      contentLabel='Example Modal'
    >
      <div className='prof-update-form-box '>
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
        {aboutMeForm()}
        {myBackgroundForm()}
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
      </div>
    </Modal>
  );
};

export default ProfileUpdate;
