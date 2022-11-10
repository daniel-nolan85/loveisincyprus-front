import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { removePoints } from '../../functions/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const PassPost = ({
  passPostModalIsOpen,
  setPassPostModalIsOpen,
  postToPass,
  fetchPosts,
  fetchReportedContent,
}) => {
  const [passing, setPassing] = useState(false);

  let { _id, token } = useSelector((state) => state.user);

  const approvePost = async (post) => {
    setPassing(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/approve-post/${post._id}`,
        { _id, post },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        toast.success('You have approved this post for display', {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchPosts();
        fetchReportedContent();
        setPassPostModalIsOpen(false);
        setPassing(false);
      })
      .catch((err) => {
        setPassing(false);
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

  const { content, image, postedBy } = postToPass;

  return (
    <Modal
      isOpen={passPostModalIsOpen}
      onRequestClose={() => setPassPostModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to approve this post?</h1>
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
        <button className='submit-btn' onClick={() => approvePost(postToPass)}>
          {passing ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, approve'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setPassPostModalIsOpen(false)}
          disabled={passing}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default PassPost;
