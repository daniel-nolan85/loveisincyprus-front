import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const IPInfo = ({
  ipInfoModalIsOpen,
  setIpInfoModalIsOpen,
  ipToLookup,
  handleSubmit,
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

  const { ip, city, country, postal, region, timezone } = ipToLookup;

  return (
    <Modal
      isOpen={ipInfoModalIsOpen}
      onRequestClose={() => setIpInfoModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Information on this IP Address</h1>
        <br />
        <div className='ip-info'>
          <p className='ip-field'>Address:</p>
          <p>{ip}</p>
        </div>
        <div className='ip-info'>
          <p className='ip-field'>City:</p>
          <p>{city}</p>
        </div>
        <div className='ip-info'>
          <p className='ip-field'>Country:</p>
          <p>{country}</p>
        </div>
        <div className='ip-info'>
          <p className='ip-field'>Postal code:</p>
          <p>{postal}</p>
        </div>
        <div className='ip-info'>
          <p className='ip-field'>Region:</p>
          <p>{region}</p>
        </div>
        <div className='ip-info'>
          <p className='ip-field'>Timezone:</p>
          <p>{timezone}</p>
        </div>
        <br />
        <p>Would you like to ban this IP?</p>
        <button
          className='submit-btn'
          onClick={() => {
            handleSubmit();
            setIpInfoModalIsOpen(false);
          }}
        >
          Yes, ban IP
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setIpInfoModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default IPInfo;
