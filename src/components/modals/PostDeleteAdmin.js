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
  };

  const { content, image, postedBy } = postToDelete;

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
        {image && (
          <div className='match-images'>
            <img
              src={image.url}
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
