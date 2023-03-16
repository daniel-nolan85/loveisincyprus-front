import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const PostDelete = ({
  postDeleteModalIsOpen,
  setPostDeleteModalIsOpen,
  postToDelete,
  newsFeed,
  fetchUserPosts,
  fetchPosts,
  fetchComments,
  fetchReportedContent,
}) => {
  const [deleting, setDeleting] = useState(false);

  let { _id, token } = useSelector((state) => state.user);

  const deletePost = async (post) => {
    setDeleting(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/admin/delete-post/${post._id}`,
        { _id, post },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        toast.error('Post deleted', {
          position: toast.POSITION.TOP_CENTER,
        });
        setPostDeleteModalIsOpen(false);
        newsFeed && newsFeed();
        fetchUserPosts && fetchUserPosts();
        fetchPosts && fetchPosts();
        fetchComments && fetchComments();
        fetchReportedContent && fetchReportedContent();
        setDeleting(false);
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

  const { content, postImages, postedBy } = postToDelete;

  return (
    <Modal
      isOpen={postDeleteModalIsOpen}
      onRequestClose={() => setPostDeleteModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to delete this post?</h1>
        <br />
        <p>{content}</p>
        <br />
        {postImages && postImages.length > 0 && (
          <div className='match-images'>
            <img
              src={postImages[0].url}
              alt={`${postedBy.username || postedBy.name}'s post`}
            />
          </div>
        )}
        <br />
        <button className='submit-btn' onClick={() => deletePost(postToDelete)}>
          {deleting ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, delete'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setPostDeleteModalIsOpen(false)}
          disabled={deleting}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default PostDelete;
