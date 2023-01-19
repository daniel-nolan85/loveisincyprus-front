import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const IPToRemove = ({
  ipToRemoveModalIsOpen,
  setIpToRemoveModalIsOpen,
  ipToRemove,
  deleteIp,
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
      backgroundColor: 'rgba(0,0,0, .8)',
      zIndex: '1000',
      overflowY: 'auto',
    },
  };

  const { ip, city, country, postal, region, timezone } = ipToRemove;

  return (
    <Modal
      isOpen={ipToRemoveModalIsOpen}
      onRequestClose={() => setIpToRemoveModalIsOpen(false)}
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
        <h3>Would you like to remove this IP from the blacklist?</h3>
        <p>This will allow access to the site for users from this IP</p>
        <button
          className='submit-btn'
          onClick={() => {
            deleteIp();
            setIpToRemoveModalIsOpen(false);
          }}
        >
          Yes, remove from blacklist
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setIpToRemoveModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default IPToRemove;
