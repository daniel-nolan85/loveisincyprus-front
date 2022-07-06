import React, { useState } from 'react';
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
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import PostDelete from '../../components/modals/PostDelete';
import SinglePost from '../../components/modals/SinglePost';
import ShowLikes from '../../components/modals/ShowLikes';
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
  notifToDelete,
  setNotifToDelete,
}) => {
  const [currentPost, setCurrentPost] = useState({});
  const [likesModalIsOpen, setLikesModalIsOpen] = useState(false);
  const [postModalIsOpen, setPostModalIsOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  // console.log('post ==> ', post);

  const editPost = (post) => {
    setCurrentPost(post);
    setPostModalIsOpen(true);
  };

  const showLikes = (post) => {
    setCurrentPost(post);
    setLikesModalIsOpen(true);
  };

  const deleteNotif = async (n) => {
    console.log(n);
    await axios
      .put(
        `${process.env.REACT_APP_API}/delete-notification`,
        { n },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        fetchNotifications();
      })
      .catch((err) => console.log(err));
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

  return (
    <Modal
      isOpen={notifModalIsOpen}
      onRequestClose={() => setNotifModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {post && user && (
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
                <span>{moment(post.createdAt).fromNow()}</span>
              </div>
            </div>
            <div className='post-icons'>
              <FontAwesomeIcon
                icon={faTrashCan}
                className='fa trash'
                onClick={() => {
                  handleDelete(post);
                  setNotifModalIsOpen(false);
                }}
              />
              <FontAwesomeIcon
                icon={faPenToSquare}
                className='fa edit'
                onClick={() => {
                  editPost(post);
                }}
              />
            </div>
          </div>
          <p className='post-text'>{post.content}</p>
          {post.image && (
            <img
              src={post.image.url}
              alt={`${user.name || user.email.split('@')[0]}'s post`}
              className='post-img'
            />
          )}
          <div className='post-row'>
            <div className='activity-icons'>
              {post.likes && (
                <div>
                  {post.likes.some((e) => e._id === user._id) ? (
                    <FontAwesomeIcon
                      icon={faHeart}
                      className='fa liked'
                      onClick={() => {
                        handleUnlike(post._id);
                        setNotifModalIsOpen(false);
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faHeart}
                      className='fa'
                      onClick={() => {
                        handleLike(post._id);
                        setNotifModalIsOpen(false);
                      }}
                    />
                  )}
                  <span className='show-likes' onClick={() => showLikes(post)}>
                    {post.likes.length === 1 && `${post.likes.length} like`}
                    {post.likes.length > 1 && `${post.likes.length} likes`}
                  </span>
                </div>
              )}
              <div>
                <FontAwesomeIcon
                  icon={faComments}
                  className='fa'
                  onClick={() => {
                    handleComment(post);
                    setNotifModalIsOpen(false);
                  }}
                />
                {post.comments &&
                  post.comments.length === 1 &&
                  `${post.comments.length} comment`}
                {post.comments &&
                  post.comments.length > 1 &&
                  `${post.comments.length} comments`}
              </div>
            </div>
          </div>
          {post.comments && post.comments.length > 0 && (
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
                  post={post}
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
                  setNotifModalIsOpen={setNotifModalIsOpen}
                />
              </div>
            </div>
          )}
        </div>
      )}
      <PostDelete
        postDeleteModalIsOpen={postDeleteModalIsOpen}
        setPostDeleteModalIsOpen={setPostDeleteModalIsOpen}
        postToDelete={postToDelete}
        // newsFeed={newsFeed}
        fetchNotifications={fetchNotifications}
        deleteNotif={deleteNotif}
        notifToDelete={notifToDelete}
        setNotifToDelete={setNotifToDelete}
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
    </Modal>
  );
};

export default NotifPost;
