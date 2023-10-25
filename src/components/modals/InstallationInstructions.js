import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Bowser from 'bowser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpFromBracket,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const InstallationInstructions = ({
  installationInstructionsModalIsOpen,
  setInstallationInstructionsModalIsOpen,
}) => {
  const [safari, setSafari] = useState(false);

  useEffect(() => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    const browserName = browser.getBrowser().name.toLowerCase();
    if (browserName.includes('safari')) setSafari(true);
  }, []);

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
      isOpen={installationInstructionsModalIsOpen}
      onRequestClose={() => setInstallationInstructionsModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='points-info'>
        <h2 style={{ marginBottom: '20px' }}>
          Instructions on how to install the Love is in Cyprus mobile app
        </h2>
        {safari ? (
          <>
            <h3>
              <span className='pink bold'>Step 1: </span>From within your Safari
              browser, tap the{' '}
              <FontAwesomeIcon
                icon={faArrowUpFromBracket}
                className='fa app-install'
              />{' '}
              button. You can find this at the bottom of the screen on iPhones
              or at the top on iPads.
            </h3>
            <h3>
              <span className='pink bold'>Step 2: </span>From the sharing
              options, select "Add to Home Screen."
            </h3>
            <h3>
              <span className='pink bold'>Step 3: </span>You may be asked to
              confirm the installation. Confirm by tapping "Add."
            </h3>
          </>
        ) : (
          <>
            <h3>
              <span className='pink bold'>Step 1: </span>Tap the{' '}
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className='fa app-install'
              />{' '}
              button. It's usually located in the top-right or top-left corner
              of the browser window.
            </h3>
            <h3>
              <span className='pink bold'>Step 2: </span>Within the menu, search
              for an option like "Add to Home Screen" or "Install App." The
              wording may vary depending on your browser.
            </h3>
            <h3>
              <span className='pink bold'>Step 3: </span>You might be prompted
              to confirm the installation. Confirm by tapping "Add" or
              "Install."
            </h3>
          </>
        )}
      </div>
    </Modal>
  );
};

export default InstallationInstructions;
