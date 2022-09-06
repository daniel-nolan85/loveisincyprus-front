import React from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const AdContactInfo = ({
  contactInfoModalIsOpen,
  setContactInfoModalIsOpen,
  currentAd,
}) => {
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
      zIndex: '1000',
    },
  };

  const { contactInfo } = currentAd;
  console.log('contactInfo => ', contactInfo);

  return (
    <Modal
      isOpen={contactInfoModalIsOpen}
      onRequestClose={() => setContactInfoModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {contactInfo && (
        <div className='match'>
          <h1>This ad has been submitted by:</h1>
          <br />
          <p>{contactInfo.name}</p>
          <br />
          <p>{contactInfo.email}</p>
          {contactInfo.phone && (
            <>
              <br />
              <p>{contactInfo.phone}</p>
            </>
          )}
        </div>
      )}
    </Modal>
  );
};

export default AdContactInfo;
