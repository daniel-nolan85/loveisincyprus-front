import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import CommentDeleteAdmin from '../../components/modals/CommentDeleteAdmin';

Modal.setAppElement('#root');

const PostCommentsAdmin = ({
  commentsModalIsOpen,
  setCommentsModalIsOpen,
  post,
  removeComment,
  commentDeleteModalIsOpen,
  setCommentDeleteModalIsOpen,
  commentToDelete,
  postOfCommentToDelete,
  newsFeed,
}) => {
  const { _id } = useSelector((state) => state.user);

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
      isOpen={commentsModalIsOpen}
      onRequestClose={() => setCommentsModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {post.comments &&
        post.comments.map((c) => (
          <div className='admin-comments-container' key={c._id}>
            <div className='post-row'>
              <div className='user-profile'>
                <Link
                  to={
                    c.postedBy._id === _id
                      ? `/user/profile/${_id}`
                      : `/user/${c.postedBy._id}`
                  }
                >
                  <img
                    src={
                      c.postedBy.profileImage
                        ? c.postedBy.profileImage.url
                        : defaultProfile
                    }
                    alt={`${
                      c.postedBy.username || c.postedBy.name
                    }'s profile picture`}
                    className='admin-post-img'
                  />
                </Link>
                <Link
                  to={
                    c.postedBy._id === _id
                      ? `/user/profile/${_id}`
                      : `/user/${c.postedBy._id}`
                  }
                >
                  <p className='admin-postedBy'>
                    {c.postedBy.username || c.postedBy.name}
                  </p>
                </Link>
              </div>
              <div className='post-icons'>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className='fa trash'
                  onClick={() => removeComment(post._id, c)}
                />
              </div>
            </div>
            <div className='admin-comments-content'>
              <p>{c.text}</p>
              {c.image && (
                <img
                  src={c.image.url}
                  alt={`${
                    c.postedBy.username || c.postedBy.username
                  }'s commented picture`}
                  className='admin-comments-img'
                />
              )}
            </div>
            <CommentDeleteAdmin
              commentDeleteModalIsOpen={commentDeleteModalIsOpen}
              setCommentDeleteModalIsOpen={setCommentDeleteModalIsOpen}
              commentToDelete={commentToDelete}
              postOfCommentToDelete={postOfCommentToDelete}
              newsFeed={newsFeed}
              setCommentsModalIsOpen={setCommentsModalIsOpen}
            />
          </div>
        ))}
    </Modal>
  );
};

export default PostCommentsAdmin;
