import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import defaultProfile from '../../assets/defaultProfile.png';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CommentDelete from '../../components/modals/CommentDelete';
import CommentEdit from '../../components/modals/CommentEdit';
import EventCommentDelete from '../../components/modals/EventCommentDelete';
import EventCommentEdit from '../../components/modals/EventCommentEdit';

const Comments = ({
  post,
  removeComment,
  commentDeleteModalIsOpen,
  setCommentDeleteModalIsOpen,
  commentToDelete,
  postOfCommentToDelete,
  fetchUserPosts,
  newsFeed,
  fetchThisUsersPosts,
  editComment,
  commentEditModalIsOpen,
  setCommentEditModalIsOpen,
  commentToEdit,
  postOfCommentToEdit,
  notifModalIsOpen,
  setNotifModalIsOpen,
  eventCommentDeleteModalIsOpen,
  setEventCommentDeleteModalIsOpen,
  eventCommentEditModalIsOpen,
  setEventCommentEditModalIsOpen,
  fetchEvent,
}) => {
  const { token, _id } = useSelector((state) => state.user);

  return (
    <>
      {post.comments.map((c) => (
        <div className='comments-container-inner' key={c._id}>
          {/* {console.log(c)} */}
          <div className='comment-row'>
            <div className='user-profile'>
              <Link
                to={
                  _id === c.postedBy._id
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
                />
              </Link>
              <div>
                <Link
                  to={
                    _id === c.postedBy._id
                      ? `/user/profile/${_id}`
                      : `/user/${c.postedBy._id}`
                  }
                >
                  <p>{c.postedBy.username || c.postedBy.name}</p>
                </Link>
                <span>{moment(c.created).fromNow()}</span>
              </div>
            </div>
            {(token && _id === c.postedBy._id && (
              <div className='post-icons'>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className='fa trash'
                  onClick={() => {
                    removeComment(post._id, c);
                    notifModalIsOpen && setNotifModalIsOpen(false);
                  }}
                />
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className='fa edit'
                  onClick={() => {
                    editComment(post._id, c);
                    notifModalIsOpen && setNotifModalIsOpen(false);
                  }}
                />
              </div>
            )) ||
              (token && _id === post.postedBy._id && (
                <div className='post-icons'>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className='fa trash'
                    onClick={() => removeComment(post._id, c)}
                  />
                </div>
              ))}
          </div>
          {c.text}
          {c.image && (
            <img
              src={c.image.url}
              alt={`${c.postedBy.username || c.postedBy.name}'s comment`}
              className='post-img'
            />
          )}
        </div>
      ))}
      <CommentDelete
        commentDeleteModalIsOpen={commentDeleteModalIsOpen}
        setCommentDeleteModalIsOpen={setCommentDeleteModalIsOpen}
        commentToDelete={commentToDelete}
        postOfCommentToDelete={postOfCommentToDelete}
        fetchUserPosts={fetchUserPosts}
        newsFeed={newsFeed}
        fetchThisUsersPosts={fetchThisUsersPosts}
      />
      <CommentEdit
        commentEditModalIsOpen={commentEditModalIsOpen}
        setCommentEditModalIsOpen={setCommentEditModalIsOpen}
        commentToEdit={commentToEdit}
        fetchUserPosts={fetchUserPosts}
        newsFeed={newsFeed}
        fetchThisUsersPosts={fetchThisUsersPosts}
        postOfCommentToEdit={postOfCommentToEdit}
      />
      <EventCommentDelete
        eventCommentDeleteModalIsOpen={eventCommentDeleteModalIsOpen}
        setEventCommentDeleteModalIsOpen={setEventCommentDeleteModalIsOpen}
        commentToDelete={commentToDelete}
        postOfCommentToDelete={postOfCommentToDelete}
        fetchEvent={fetchEvent}
      />
      <EventCommentEdit
        eventCommentEditModalIsOpen={eventCommentEditModalIsOpen}
        setEventCommentEditModalIsOpen={setEventCommentEditModalIsOpen}
        commentToEdit={commentToEdit}
        postOfCommentToEdit={postOfCommentToEdit}
        fetchEvent={fetchEvent}
      />
    </>
  );
};

export default Comments;
