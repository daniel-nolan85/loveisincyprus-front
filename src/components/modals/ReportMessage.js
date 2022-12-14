import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import renderHtml from 'react-render-html';

Modal.setAppElement('#root');

const ReportMessage = ({
  reportMessageModalIsOpen,
  setReportMessageModalIsOpen,
  currentMessage,
}) => {
  const [reporting, setReporting] = useState(false);

  let { _id, token } = useSelector((state) => state.user);

  const reportMessage = async (message) => {
    console.log('message => ', message);
    setReporting(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/report-message/${message._id}`,
        { _id, message },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.warning('This message has been reported', {
          position: toast.POSITION.TOP_CENTER,
        });
        setReporting(false);
        setReportMessageModalIsOpen(false);
      })
      .catch((err) => {
        setReporting(false);
        console.log(err);
      });
  };

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

  const { content, image } = currentMessage;
  console.log(currentMessage);

  return (
    <Modal
      isOpen={reportMessageModalIsOpen}
      onRequestClose={() => setReportMessageModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to report this message?</h1>
        <br />
        {image && (
          <div className='match-images'>
            <img src={image.url} alt='message image' />
          </div>
        )}
        <p>{content && renderHtml(content)}</p>
        <br />
        <button
          className='submit-btn'
          onClick={() => reportMessage(currentMessage)}
        >
          {reporting ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, report'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setReportMessageModalIsOpen(false)}
          disabled={reporting}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default ReportMessage;
