import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

Modal.setAppElement('#root');

const CommentDeleteAdmin = ({
  commentDeleteModalIsOpen,
  setCommentDeleteModalIsOpen,
  commentToDelete,
  postOfCommentToDelete,
  newsFeed,
  setCommentsModalIsOpen,
  fetchUserPosts,
}) => {
  let { user } = useSelector((state) => ({ ...state }));

  const deleteComment = async (postId, comment) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/admin-remove-comment`,
        { postId, comment, user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        toast.error('Comment deleted', {
          position: toast.POSITION.TOP_CENTER,
        });
        newsFeed && newsFeed();
        fetchUserPosts && fetchUserPosts();
        setCommentsModalIsOpen && setCommentsModalIsOpen(false);
        setCommentDeleteModalIsOpen(false);
      })
      .catch((err) => {
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
              alt={`${postedBy.name || postedBy.email.split('@')[0]}'s post`}
            />
          </div>
        )}
        <br />
        <button
          className='submit-btn'
          onClick={() => deleteComment(postOfCommentToDelete, commentToDelete)}
        >
          Yes, delete
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

export default CommentDeleteAdmin;
