import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const NumberToRemove = ({
  numberToRemoveModalIsOpen,
  setNumberToRemoveModalIsOpen,
  numberToRemove,
  deleteNumber,
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

  const { mobile } = numberToRemove;

  return (
    <Modal
      isOpen={numberToRemoveModalIsOpen}
      onRequestClose={() => setNumberToRemoveModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>{mobile}</h1>
        <br />
        <h3>
          Would you like to remove this mobile number from the blocked list?
        </h3>
        <p>This will allow access to the site for members using this number</p>
        <button
          className='submit-btn'
          onClick={() => {
            deleteNumber();
            setNumberToRemoveModalIsOpen(false);
          }}
        >
          Yes, remove from blocked list
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setNumberToRemoveModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default NumberToRemove;
