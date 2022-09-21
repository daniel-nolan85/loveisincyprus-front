import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faComments,
  faCaretDown,
  faCaretUp,
  faTrashCan,
  faPenToSquare,
  faSpinner,
  faThumbsUp,
  faQuestion,
  faThumbsDown,
  faUserClock,
  faUserXmark,
  faUserCheck,
  faCalendarDays,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import PostDelete from '../../components/modals/PostDelete';
import SinglePost from '../../components/modals/SinglePost';
import ShowLikes from '../../components/modals/ShowLikes';
import Accepted from '../../components/modals/Accepted';
import Maybe from '../../components/modals/Maybe';
import Declined from '../../components/modals/Declined';
import Comments from '../cards/Comments';
import axios from 'axios';

Modal.setAppElement('#root');

const NotifPost = ({
  notifModalIsOpen,
  setNotifModalIsOpen,
  post,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  removeComment,
  // newsFeed,
  postToDelete,
  postDeleteModalIsOpen,
  setPostDeleteModalIsOpen,
  commentDeleteModalIsOpen,
  setCommentDeleteModalIsOpen,
  commentToDelete,
  postOfCommentToDelete,
  editComment,
  commentEditModalIsOpen,
  setCommentEditModalIsOpen,
  commentToEdit,
  postOfCommentToEdit,
  fetchNotifications,
  // notifToDelete,
  // setNotifToDelete,
  acceptInvite,
  maybe,
  declineInvite,
  loading,
}) => {
  const [currentPost, setCurrentPost] = useState({});
  const [likesModalIsOpen, setLikesModalIsOpen] = useState(false);
  const [postModalIsOpen, setPostModalIsOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [acceptedModalIsOpen, setAcceptedModalIsOpen] = useState(false);
  const [maybeModalIsOpen, setMaybeModalIsOpen] = useState(false);
  const [declinedModalIsOpen, setDeclinedModalIsOpen] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const editPost = (post) => {
    setCurrentPost(post);
    setPostModalIsOpen(true);
  };

  const showLikes = (post) => {
    setCurrentPost(post);
    setLikesModalIsOpen(true);
  };

  const showAccepted = (post) => {
    setCurrentPost(post);
    setAcceptedModalIsOpen(true);
  };

  const showMaybe = (post) => {
    setCurrentPost(post);
    setMaybeModalIsOpen(true);
  };

  const showDeclined = (post) => {
    setCurrentPost(post);
    setDeclinedModalIsOpen(true);
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

  console.log(post);

  return (
    <Modal
      isOpen={notifModalIsOpen}
      onRequestClose={() => setNotifModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {post.notif && user && post.notif.content ? (
        <div className='post-container'>
          <div className='post-row'>
            <div className='user-profile'>
              <img
                src={user.profileImage ? user.profileImage.url : defaultProfile}
                alt={`${
                  user.name || user.email.split('@')[0]
                }'s profile picture`}
              />
              <div>
                <p>{user.name || user.email.split('@')[0]}</p>
                <span>{moment(post.notif.createdAt).fromNow()}</span>
              </div>
            </div>
            <div className='post-icons'>
              <FontAwesomeIcon
                icon={faTrashCan}
                className='fa trash'
                onClick={() => {
                  handleDelete(post.notif);
                  // setNotifModalIsOpen(false);
                }}
              />
              <FontAwesomeIcon
                icon={faPenToSquare}
                className='fa edit'
                onClick={() => {
                  editPost(post.notif);
                }}
              />
            </div>
          </div>
          <p className='post-text'>{post.notif.content}</p>
          {post.notif.image && (
            <img
              src={post.notif.image.url}
              alt={`${user.name || user.email.split('@')[0]}'s post`}
              className='post-img'
            />
          )}
          <div className='post-row'>
            <div className='activity-icons'>
              {post.notif.likes && (
                <div>
                  {post.notif.likes.some((e) => e._id === user._id) ? (
                    <FontAwesomeIcon
                      icon={faHeart}
                      className='fa liked'
                      onClick={() => {
                        handleUnlike(post.notif._id);
                        setNotifModalIsOpen(false);
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faHeart}
                      className='fa'
                      onClick={() => {
                        handleLike(post.notif._id);
                        setNotifModalIsOpen(false);
                      }}
                    />
                  )}
                  <span
                    className='show-likes'
                    onClick={() => showLikes(post.notif)}
                  >
                    {post.notif.likes.length === 1 &&
                      `${post.notif.likes.length} like`}
                    {post.notif.likes.length > 1 &&
                      `${post.notif.likes.length} likes`}
                  </span>
                </div>
              )}
              <div>
                <FontAwesomeIcon
                  icon={faComments}
                  className='fa'
                  onClick={() => {
                    handleComment(post.notif);
                    setNotifModalIsOpen(false);
                  }}
                />
                {post.notif.comments &&
                  post.notif.comments.length === 1 &&
                  `${post.notif.comments.length} comment`}
                {post.notif.comments &&
                  post.notif.comments.length > 1 &&
                  `${post.notif.comments.length} comments`}
              </div>
            </div>
          </div>
          {post.notif.comments && post.notif.comments.length > 0 && (
            <div>
              <FontAwesomeIcon
                icon={showComments ? faCaretDown : faCaretUp}
                className='fa center'
                onClick={() => {
                  setShowComments(!showComments);
                }}
              />
              <div
                className={
                  showComments
                    ? 'comments-container comments-container-show'
                    : 'comments-container'
                }
              >
                <Comments
                  post={post.notif}
                  removeComment={removeComment}
                  // newsFeed={newsFeed}
                  commentDeleteModalIsOpen={commentDeleteModalIsOpen}
                  setCommentDeleteModalIsOpen={setCommentDeleteModalIsOpen}
                  commentToDelete={commentToDelete}
                  postOfCommentToDelete={postOfCommentToDelete}
                  editComment={editComment}
                  commentEditModalIsOpen={commentEditModalIsOpen}
                  setCommentEditModalIsOpen={setCommentEditModalIsOpen}
                  commentToEdit={commentToEdit}
                  postOfCommentToEdit={postOfCommentToEdit}
                  notifModalIsOpen={notifModalIsOpen}
                  setNotifModalIsOpen={setNotifModalIsOpen}
                />
              </div>
            </div>
          )}
        </div>
      ) : post.notif && post.notif.location ? (
        <div className='post-container'>
          <h1>{post.notif.name}</h1>
          <h2>
            <FontAwesomeIcon icon={faLocationDot} className='fa' />{' '}
            {post.notif.location}
          </h2>
          <h2>
            <FontAwesomeIcon icon={faCalendarDays} className='fa' />{' '}
            {moment(post.notif.when).format('MMMM Do YYYY, h:mm:ss a')}
          </h2>
          <h3>{post.notif.notes}</h3>

          <div className='inv-response'>
            <button
              onClick={() => acceptInvite(post)}
              type='button'
              className='submit-btn'
              disabled={post.notif.accepted.some((a) => a._id === user._id)}
            >
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} className='fa' spin />
              ) : (
                <FontAwesomeIcon icon={faThumbsUp} className='fa' />
              )}
              Count me in!
            </button>
            <span className='tooltip'>
              <FontAwesomeIcon
                icon={faUserCheck}
                className='fa users'
                onClick={() => showAccepted(post)}
              />
              <span className='tooltip-text'>See who's coming</span>
            </span>
          </div>
          <div className='inv-response'>
            <button
              onClick={() => maybe(post)}
              type='button'
              className='submit-btn maybe'
              disabled={post.notif.maybe.some((a) => a._id === user._id)}
            >
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} className='fa' spin />
              ) : (
                <FontAwesomeIcon icon={faQuestion} className='fa' />
              )}
              Not sure yet
            </button>
            <span className='tooltip'>
              <FontAwesomeIcon
                icon={faUserClock}
                className='fa users'
                onClick={() => showMaybe(post)}
              />
              <span className='tooltip-text'>See who might come</span>
            </span>
          </div>
          <div className='inv-response'>
            <button
              onClick={() => declineInvite(post)}
              type='button'
              className='submit-btn decline'
              disabled={post.notif.declined.some((a) => a._id === user._id)}
            >
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} className='fa' spin />
              ) : (
                <FontAwesomeIcon icon={faThumbsDown} className='fa' />
              )}
              Can't make it
            </button>
            <span className='tooltip'>
              <FontAwesomeIcon
                icon={faUserXmark}
                className='fa users'
                onClick={() => showDeclined(post)}
              />
              <span className='tooltip-text'>See who can't come</span>
            </span>
          </div>
        </div>
      ) : (
        <div className='post-container'>
          <p>This post has been deleted</p>
        </div>
      )}
      <PostDelete
        postDeleteModalIsOpen={postDeleteModalIsOpen}
        setPostDeleteModalIsOpen={setPostDeleteModalIsOpen}
        postToDelete={postToDelete}
        // newsFeed={newsFeed}
        fetchNotifications={fetchNotifications}
        // deleteNotif={deleteNotif}
        // notifToDelete={notifToDelete}
        // setNotifToDelete={setNotifToDelete}
        setNotifModalIsOpen={setNotifModalIsOpen}
      />
      <SinglePost
        postModalIsOpen={postModalIsOpen}
        setPostModalIsOpen={setPostModalIsOpen}
        post={currentPost}
        // newsFeed={newsFeed}
        setNotifModalIsOpen={setNotifModalIsOpen}
      />
      <ShowLikes
        likesModalIsOpen={likesModalIsOpen}
        setLikesModalIsOpen={setLikesModalIsOpen}
        post={currentPost}
      />
      <Accepted
        acceptedModalIsOpen={acceptedModalIsOpen}
        setAcceptedModalIsOpen={setAcceptedModalIsOpen}
        post={currentPost}
      />
      <Maybe
        maybeModalIsOpen={maybeModalIsOpen}
        setMaybeModalIsOpen={setMaybeModalIsOpen}
        post={currentPost}
      />
      <Declined
        declinedModalIsOpen={declinedModalIsOpen}
        setDeclinedModalIsOpen={setDeclinedModalIsOpen}
        post={currentPost}
      />
    </Modal>
  );
};

export default NotifPost;
