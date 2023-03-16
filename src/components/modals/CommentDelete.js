import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const CommentDelete = ({
  commentDeleteModalIsOpen,
  setCommentDeleteModalIsOpen,
  commentToDelete,
  postOfCommentToDelete,
  newsFeed,
  setCommentsModalIsOpen,
  fetchUserPosts,
  fetchThisUsersPosts,
  fetchComments,
  fetchReportedContent,
  fetchNotifications,
  populateNotifications,
  setNotifModalIsOpen,
}) => {
  const [deleting, setDeleting] = useState(false);

  let { token, _id } = useSelector((state) => state.user);

  const deleteComment = async (postId, comment) => {
    setDeleting(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/remove-comment`,
        { postId, comment, _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.error('Comment deleted', {
          position: toast.POSITION.TOP_CENTER,
        });
        setDeleting(false);
        newsFeed && newsFeed();
        fetchUserPosts && fetchUserPosts();
        fetchThisUsersPosts && fetchThisUsersPosts();
        fetchComments && fetchComments();
        fetchReportedContent && fetchReportedContent();
        setCommentsModalIsOpen && setCommentsModalIsOpen(false);
        fetchNotifications && fetchNotifications();
        populateNotifications && populateNotifications();
        setCommentDeleteModalIsOpen(false);
        setNotifModalIsOpen(false);
      })
      .catch((err) => {
        setDeleting(false);
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

  const { text, image, postedBy } = commentToDelete;

  return (
    <Modal
      isOpen={commentDeleteModalIsOpen}
      onRequestClose={() => setCommentDeleteModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to delete this comment?</h1>
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
          onClick={() => deleteComment(postOfCommentToDelete, commentToDelete)}
        >
          {deleting ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, delete'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setCommentDeleteModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default CommentDelete;
