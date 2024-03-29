import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const HyperlinkInfo = ({
  hyperlinkInfoModalIsOpen,
  setHyperlinkInfoModalIsOpen,
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
      isOpen={hyperlinkInfoModalIsOpen}
      onRequestClose={() => setHyperlinkInfoModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='duration-info'>
        <h2 className='center'>
          Adding an external link to your ad will make your ad clickable, and
          redirect visitors to your own page.
        </h2>
        <h3>
          Including an external link will help drive traffic to your site
          resulting in a boost of sales.
        </h3>
      </div>
    </Modal>
  );
};

export default HyperlinkInfo;
