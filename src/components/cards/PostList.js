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
import SinglePost from '../../components/modals/SinglePost';
import PostDelete from '../../components/modals/PostDelete';
import ReportPost from '../modals/ReportPost';

const PostList = ({
  posts,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  removeComment,
  reportComment,
  showComments,
  setShowComments,
  newsFeed,
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
  commentReportModalIsOpen,
  setCommentReportModalIsOpen,
  commentToReport,
  postOfCommentToReport,
}) => {
  const [currentPost, setCurrentPost] = useState({});
  const [likesModalIsOpen, setLikesModalIsOpen] = useState(false);
  const [postModalIsOpen, setPostModalIsOpen] = useState(false);
  const [reportPostModalIsOpen, setReportPostModalIsOpen] = useState(false);

  const { token, _id } = useSelector((state) => state.user);

  const showLikes = (post) => {
    setCurrentPost(post);
    setLikesModalIsOpen(true);
    // console.log(post.likes);
  };

  const reportPost = (post) => {
    setCurrentPost(post);
    setReportPostModalIsOpen(true);
  };

  const editPost = (post) => {
    setCurrentPost(post);
    setPostModalIsOpen(true);
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
                  <span>{moment(post.createdAt).fromNow()}</span>
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
            {post.image && (
              <img
                src={post.image.url}
                alt={`${post.postedBy.username || post.postedBy.name}'s post`}
                className='post-img'
              />
            )}
            <div className='post-row'>
              <div className='activity-icons'>
                <div>
                  {/* {post.likes.includes(user._id) ? ( */}
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
                    newsFeed={newsFeed}
                    commentDeleteModalIsOpen={commentDeleteModalIsOpen}
                    setCommentDeleteModalIsOpen={setCommentDeleteModalIsOpen}
                    commentToDelete={commentToDelete}
                    postOfCommentToDelete={postOfCommentToDelete}
                    editComment={editComment}
                    commentEditModalIsOpen={commentEditModalIsOpen}
                    setCommentEditModalIsOpen={setCommentEditModalIsOpen}
                    commentToEdit={commentToEdit}
                    postOfCommentToEdit={postOfCommentToEdit}
                    reportComment={reportComment}
                    commentReportModalIsOpen={commentReportModalIsOpen}
                    setCommentReportModalIsOpen={setCommentReportModalIsOpen}
                    commentToReport={commentToReport}
                    postOfCommentToReport={postOfCommentToReport}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      <SinglePost
        postModalIsOpen={postModalIsOpen}
        setPostModalIsOpen={setPostModalIsOpen}
        post={currentPost}
        newsFeed={newsFeed}
      />
      <ShowLikes
        likesModalIsOpen={likesModalIsOpen}
        setLikesModalIsOpen={setLikesModalIsOpen}
        post={currentPost}
      />
      <PostDelete
        postDeleteModalIsOpen={postDeleteModalIsOpen}
        setPostDeleteModalIsOpen={setPostDeleteModalIsOpen}
        postToDelete={postToDelete}
        newsFeed={newsFeed}
      />
      <ReportPost
        reportPostModalIsOpen={reportPostModalIsOpen}
        setReportPostModalIsOpen={setReportPostModalIsOpen}
        post={currentPost}
      />
    </>
  );
};

export default PostList;
