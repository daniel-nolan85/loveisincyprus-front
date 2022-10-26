import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const TargetingInfo = ({
  targetingInfoModalIsOpen,
  setTargetingInfoModalIsOpen,
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

  return (
    <Modal
      isOpen={targetingInfoModalIsOpen}
      onRequestClose={() => setTargetingInfoModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='duration-info'>
        <h2 className='center'>
          Targeting a specific demographic can help get your product or service
          noticed.
        </h2>
        <h3>
          Setting your targets will ensure the right people see your ad
          resulting in a boost of sales.
        </h3>
      </div>
    </Modal>
  );
};

export default TargetingInfo;
