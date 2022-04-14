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
    },
  };

  const mobileDevice = window.matchMedia('(max-width: 900px)');

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
            <option value='long-term relationship'>
              Long-term relationship
            </option>
            <option value='marriage'>Marriage</option>
          </select>

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
      </div>
    </Modal>
  );
};

export default ProfileUpdate;
