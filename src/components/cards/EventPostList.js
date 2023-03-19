import React, { useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faHeart,
  faPenToSquare,
  faTrashCan,
  faCaretDown,
  faCaretUp,
  faFlag,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultProfile from '../../assets/defaultProfile.png';
import Comments from '../cards/Comments';
import ShowLikes from '../../components/modals/ShowLikes';
import EventPostEdit from '../../components/modals/EventPostEdit';
import EventPostDelete from '../../components/modals/EventPostDelete';
import ReportPost from '../../components/modals/ReportPost';
import LargeEventPostImage from '../../components/modals/LargeEventPostImage';

const EventPostList = ({
  posts,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  removeComment,
  showComments,
  setShowComments,
  fetchEvent,
  postToDelete,
  postDeleteModalIsOpen,
  setPostDeleteModalIsOpen,
  eventCommentDeleteModalIsOpen,
  setEventCommentDeleteModalIsOpen,
  commentToDelete,
  postOfCommentToDelete,
  editComment,
  eventCommentEditModalIsOpen,
  setEventCommentEditModalIsOpen,
  commentToEdit,
  postOfCommentToEdit,
}) => {
  const [currentPost, setCurrentPost] = useState({});
  const [likesModalIsOpen, setLikesModalIsOpen] = useState(false);
  const [postModalIsOpen, setPostModalIsOpen] = useState(false);
  const [reportPostModalIsOpen, setReportPostModalIsOpen] = useState(false);
  const [eventPostImageModalIsOpen, setEventPostImageModalIsOpen] =
    useState(false);

  const { token, _id } = useSelector((state) => state.user);

  const showLikes = (post) => {
    setCurrentPost(post);
    setLikesModalIsOpen(true);
  };

  const editPost = (post) => {
    setCurrentPost(post);
    setPostModalIsOpen(true);
  };

  const reportPost = (post) => {
    setCurrentPost(post);
    setReportPostModalIsOpen(true);
  };

  const viewImages = (post) => {
    setCurrentPost(post);
    setEventPostImageModalIsOpen(true);
  };

  return (
    <>
      {posts &&
        posts.map((post, i) => (
          <div className='post-container' key={post._id}>
            <div className='post-row'>
              <div className='user-profile'>
                <Link
                  to={
                    _id === post.postedBy._id
                      ? `/user/profile/${_id}`
                      : `/user/${post.postedBy._id}`
                  }
                >
                  <img
                    src={
                      post.postedBy.profileImage
                        ? post.postedBy.profileImage.url
                        : defaultProfile
                    }
                    alt={`${
                      post.postedBy.username || post.postedBy.name
                    }'s profile picture`}
                  />
                </Link>
                <div>
                  <Link
                    to={
                      _id === post.postedBy._id
                        ? `/user/profile/${_id}`
                        : `/user/${post.postedBy._id}`
                    }
                  >
                    <p>{post.postedBy.username || post.postedBy.name}</p>
                  </Link>
                  <span>{moment(post.created).fromNow()}</span>
                </div>
              </div>
              <div className='post-icons'>
                {token && _id !== post.postedBy._id && (
                  <FontAwesomeIcon
                    icon={faFlag}
                    className='fa report'
                    onClick={() => reportPost(post)}
                  />
                )}
                {token && _id === post.postedBy._id && (
                  <>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className='fa trash'
                      onClick={() => handleDelete(post)}
                    />
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className='fa edit ml'
                      onClick={() => editPost(post)}
                    />
                  </>
                )}
              </div>
            </div>
            <p className='post-text'>{post.content}</p>
            {post.postImages && post.postImages.length > 0 && (
              <img
                src={post.postImages[0].url}
                alt={`${post.postedBy.username || post.postedBy.name}'s post`}
                className='post-img'
                style={{ cursor: 'zoom-in' }}
                onClick={() => viewImages(post)}
              />
            )}
            <div className='post-row'>
              <div className='activity-icons'>
                <div>
                  {post.likes.some((e) => e._id === _id) ? (
                    <FontAwesomeIcon
                      icon={faHeart}
                      className='fa liked'
                      onClick={() => handleUnlike(post._id)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faHeart}
                      className='fa'
                      onClick={() => handleLike(post._id)}
                    />
                  )}
                  <span className='show-likes' onClick={() => showLikes(post)}>
                    {post.likes.length === 1 && `${post.likes.length} like`}
                    {post.likes.length > 1 && `${post.likes.length} likes`}
                  </span>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faComments}
                    className='fa'
                    onClick={() => handleComment(post)}
                  />
                  {post.comments.length === 1 &&
                    `${post.comments.length} comment`}
                  {post.comments.length > 1 &&
                    `${post.comments.length} comments`}
                </div>
              </div>
            </div>
            {post.comments.length > 0 && (
              <div>
                <FontAwesomeIcon
                  icon={showComments !== i ? faCaretDown : faCaretUp}
                  className='fa center caret'
                  onClick={() => {
                    showComments === i
                      ? setShowComments(-1)
                      : setShowComments(i);
                  }}
                />
                <div
                  className={
                    i === showComments
                      ? 'comments-container comments-container-show'
                      : 'comments-container'
                  }
                >
                  <Comments
                    post={post}
                    removeComment={removeComment}
                    fetchEvent={fetchEvent}
                    eventCommentDeleteModalIsOpen={
                      eventCommentDeleteModalIsOpen
                    }
                    setEventCommentDeleteModalIsOpen={
                      setEventCommentDeleteModalIsOpen
                    }
                    commentToDelete={commentToDelete}
                    postOfCommentToDelete={postOfCommentToDelete}
                    editComment={editComment}
                    eventCommentEditModalIsOpen={eventCommentEditModalIsOpen}
                    setEventCommentEditModalIsOpen={
                      setEventCommentEditModalIsOpen
                    }
                    commentToEdit={commentToEdit}
                    postOfCommentToEdit={postOfCommentToEdit}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      <EventPostEdit
        postModalIsOpen={postModalIsOpen}
        setPostModalIsOpen={setPostModalIsOpen}
        post={currentPost}
        fetchEvent={fetchEvent}
      />
      <ShowLikes
        likesModalIsOpen={likesModalIsOpen}
        setLikesModalIsOpen={setLikesModalIsOpen}
        post={currentPost}
      />
      <EventPostDelete
        postDeleteModalIsOpen={postDeleteModalIsOpen}
        setPostDeleteModalIsOpen={setPostDeleteModalIsOpen}
        postToDelete={postToDelete}
        fetchEvent={fetchEvent}
      />
      <ReportPost
        reportPostModalIsOpen={reportPostModalIsOpen}
        setReportPostModalIsOpen={setReportPostModalIsOpen}
        post={currentPost}
      />
      <LargeEventPostImage
        eventPostImageModalIsOpen={eventPostImageModalIsOpen}
        setEventPostImageModalIsOpen={setEventPostImageModalIsOpen}
        post={currentPost}
        fetchEvent={fetchEvent}
      />
    </>
  );
};

export default EventPostList;
