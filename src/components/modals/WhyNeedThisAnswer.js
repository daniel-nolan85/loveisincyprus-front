import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const WhyNeedThisAnswer = ({
  whyNeedThisAnswerModalIsOpen,
  setWhyNeedThisAnswerModalIsOpen,
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
      isOpen={whyNeedThisAnswerModalIsOpen}
      onRequestClose={() => setWhyNeedThisAnswerModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='why-do-we-need-this'>
        <h2 className='center'>
          The answer you provide to your secret statement will act as your
          password.
        </h2>
        <p>
          Due to this, your answer needs to be at least 6 characters long and
          will be case-sensitive.
        </p>
        <p>
          This information will not be displayed to any of our other members.
        </p>
      </div>
    </Modal>
  );
};

export default WhyNeedThisAnswer;
