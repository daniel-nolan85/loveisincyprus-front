import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const CommentReport = ({
  commentReportModalIsOpen,
  setCommentReportModalIsOpen,
  commentToReport,
  postOfCommentToReport,
}) => {
  const [reporting, setReporting] = useState(false);

  let { token, _id } = useSelector((state) => state.user);

  const repComment = async (postId, comment) => {
    setReporting(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/report-comment`,
        { postId, comment, _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        toast.warning('This comment has been reported', {
          position: toast.POSITION.TOP_CENTER,
        });
        setReporting(false);
        setCommentReportModalIsOpen(false);
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

  const { text, image, postedBy } = commentToReport;

  return (
    <Modal
      isOpen={commentReportModalIsOpen}
      onRequestClose={() => setCommentReportModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to report this comment?</h1>
        <br />
        <p>{text}</p>
        <br />
        {image && (
          <div className='match-images'>
            <img
              src={image.url}
              alt={`${postedBy.username || postedBy.name}'s post`}
            />
          </div>
        )}
        <br />
        <button
          className='submit-btn'
          onClick={() => repComment(postOfCommentToReport, commentToReport)}
        >
          {reporting ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, report'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setCommentReportModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default CommentReport;
