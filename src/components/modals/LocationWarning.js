import React from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';

Modal.setAppElement('#root');

const LocationWarning = ({
  locationWarningModalIsOpen,
  setLocationWarningModalIsOpen,
}) => {
  let history = useHistory();

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
      isOpen={locationWarningModalIsOpen}
      onRequestClose={() => setLocationWarningModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>
          We have detected that you are currently outside of the Republic of
          Cyprus
        </h1>
        <br />
        <h2>
          Currently we are only able to offer delivery to customers who are
          located within Cyprus.
        </h2>
        <br />
        <h2>Are you sure you would like to continue?</h2>
        <br />
        <button
          className='submit-btn'
          onClick={() => setLocationWarningModalIsOpen(false)}
        >
          Yes, continue
        </button>
        <button
          className='submit-btn trash'
          onClick={() => {
            setLocationWarningModalIsOpen(false);
            history.push('/cart');
          }}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default LocationWarning;
