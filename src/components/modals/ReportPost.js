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
        console.log(res.data);
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
