import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const ReportPost = ({
  reportPostModalIsOpen,
  setReportPostModalIsOpen,
  post,
}) => {
  const [reporting, setReporting] = useState(false);

  let { _id, token } = useSelector((state) => state.user);

  const reportPost = async (post) => {
    setReporting(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/report-post/${post._id}`,
        { _id, post },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        toast.warning('This post has been reported', {
          position: toast.POSITION.TOP_CENTER,
        });
        setReporting(false);
        setReportPostModalIsOpen(false);
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

  const { content, image, postedBy } = post;

  return (
    <Modal
      isOpen={reportPostModalIsOpen}
      onRequestClose={() => setReportPostModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to report this post?</h1>
        <br />
        <p>{content}</p>
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
        <button className='submit-btn' onClick={() => reportPost(post)}>
          {reporting ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, report'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setReportPostModalIsOpen(false)}
          disabled={reporting}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default ReportPost;
