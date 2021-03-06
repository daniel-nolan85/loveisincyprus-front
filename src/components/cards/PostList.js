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
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultProfile from '../../assets/defaultProfile.png';
import Comments from '../cards/Comments';
import ShowLikes from '../../components/modals/ShowLikes';
import SinglePost from '../../components/modals/SinglePost';
import PostDelete from '../../components/modals/PostDelete';

const PostList = ({
  posts,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  removeComment,
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
}) => {
  const [currentPost, setCurrentPost] = useState({});
  const [likesModalIsOpen, setLikesModalIsOpen] = useState(false);
  const [postModalIsOpen, setPostModalIsOpen] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const showLikes = (post) => {
    setCurrentPost(post);
    setLikesModalIsOpen(true);
    // console.log(post.likes);
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
                    user._id === post.postedBy._id
                      ? `/user/profile/${user._id}`
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
                      post.postedBy.name || post.postedBy.email.split('@')[0]
                    }'s profile picture`}
                  />
                </Link>
                <div>
                  <Link
                    to={
                      user._id === post.postedBy._id
                        ? `/user/profile/${user._id}`
                        : `/user/${post.postedBy._id}`
                    }
                  >
                    <p>
                      {post.postedBy.name || post.postedBy.email.split('@')[0]}
                    </p>
                  </Link>
                  <span>{moment(post.createdAt).fromNow()}</span>
                </div>
              </div>
              {user && user._id === post.postedBy._id && (
                <div className='post-icons'>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className='fa trash'
                    onClick={() => handleDelete(post)}
                  />
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className='fa edit'
                    onClick={() => editPost(post)}
                  />
                </div>
              )}
            </div>
            <p className='post-text'>{post.content}</p>
            {post.image && (
              <img
                src={post.image.url}
                alt={`${
                  post.postedBy.name || post.postedBy.email.split('@')[0]
                }'s post`}
                className='post-img'
              />
            )}
            <div className='post-row'>
              <div className='activity-icons'>
                <div>
                  {/* {post.likes.includes(user._id) ? ( */}
                  {post.likes.some((e) => e._id === user._id) ? (
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
                  className='fa center'
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
    </>
  );
};

export default PostList;
