import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashCan,
  faThumbsUp,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { Link } from 'react-router-dom';
import defaultProfile from '../../assets/defaultProfile.png';
import UserSuspend from '../../components/modals/UserSuspend';
import PostDeleteAdmin from '../../components/modals/PostDeleteAdmin';
import { ChatState } from '../../context/ChatProvider';
import UserDeleteAdmin from '../../components/modals/UserDeleteAdmin';
import PassPost from '../../components/modals/PassPost';
import PassComment from '../../components/modals/PassComment';
import CommentDelete from '../../components/modals/CommentDelete';
import PassMessage from '../../components/modals/PassMessage';
import MessageDelete from '../../components/modals/MessageDelete';
import renderHtml from 'react-render-html';
import LargePostImage from '../../components/modals/LargePostImage';

const ReportedContent = ({ history }) => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [comments, setComments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userSuspendModalIsOpen, setUserSuspendModalIsOpen] = useState(false);
  const [userToSuspend, setUserToSuspend] = useState({});
  const [postToDelete, setPostToDelete] = useState([]);
  const [postDeleteModalIsOpen, setPostDeleteModalIsOpen] = useState(false);
  const [userDeleteModalIsOpen, setUserDeleteModalIsOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState({});
  const [passPostModalIsOpen, setPassPostModalIsOpen] = useState(false);
  const [postToPass, setPostToPass] = useState([]);
  const [passCommentModalIsOpen, setPassCommentModalIsOpen] = useState(false);
  const [commentToPass, setCommentToPass] = useState([]);
  const [postOfCommentToPass, setPostOfCommentToPass] = useState([]);
  const [commentDeleteModalIsOpen, setCommentDeleteModalIsOpen] =
    useState(false);
  const [commentToDelete, setCommentToDelete] = useState([]);
  const [postOfCommentToDelete, setPostOfCommentToDelete] = useState([]);
  const [messageToDelete, setMessageToDelete] = useState([]);
  const [messageDeleteModalIsOpen, setMessageDeleteModalIsOpen] =
    useState(false);
  const [passMessageModalIsOpen, setPassMessageModalIsOpen] = useState(false);
  const [messageToPass, setMessageToPass] = useState([]);
  const [postImageModalIsOpen, setPostImageModalIsOpen] = useState(false);

  const { setReportedContent } = ChatState();

  let { _id, token, canReported } = useSelector((state) => state.user);

  useEffect(() => {
    if (!canReported) {
      history.push('/admin/dashboard');
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    fetchComments();
    fetchMessages();
  }, []);

  const fetchPosts = async () => {
    await axios
      .post(`${process.env.REACT_APP_API}/fetch-reported-posts`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchComments = async () => {
    await axios
      .post(`${process.env.REACT_APP_API}/fetch-reported-comments`)
      .then((res) => {
        res.data.forEach((o) => {
          o.comments = o.comments.filter((s) => s.reported === true);
        });
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchMessages = async () => {
    await axios
      .post(`${process.env.REACT_APP_API}/fetch-reported-messages`)
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchReportedContent = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-reported-content`)
      .then((res) => {
        setReportedContent(res.data);
      });
  };

  const handleSuspend = async (u) => {
    setUserSuspendModalIsOpen(true);
    setUserToSuspend(u);
  };

  const handleDeleteUser = async (u) => {
    setUserDeleteModalIsOpen(true);
    setUserToDelete(u);
  };

  const passPost = (post) => {
    setPassPostModalIsOpen(true);
    setPostToPass(post);
  };

  const passComment = (comment, c) => {
    setPassCommentModalIsOpen(true);
    setCommentToPass(c);
    setPostOfCommentToPass(comment._id);
  };

  const handleDeletePost = async (post) => {
    setPostDeleteModalIsOpen(true);
    setPostToDelete(post);
  };

  const handleDeleteComment = async (comment, c) => {
    setCommentDeleteModalIsOpen(true);
    setCommentToDelete(c);
    setPostOfCommentToDelete(comment._id);
  };

  const passMessage = (message) => {
    setPassMessageModalIsOpen(true);
    setMessageToPass(message);
  };

  const handleDeleteMessage = async (message) => {
    setMessageDeleteModalIsOpen(true);
    setMessageToDelete(message);
  };

  const viewImages = (post) => {
    setCurrentPost(post);
    setPostImageModalIsOpen(true);
  };

  return (
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        <div className='admin-cards'>
          {posts.length > 0 && <h1 className='center'>Posts</h1>}
          {posts.length > 0 &&
            posts.map((p) => (
              <div className='post-container' key={p._id}>
                <div className='post-row'>
                  <div className='user-profile'>
                    <Link to={`/user/${p.postedBy._id}`}>
                      <img
                        src={
                          p.postedBy.profileImage
                            ? p.postedBy.profileImage.url
                            : defaultProfile
                        }
                        alt={`${
                          p.postedBy.username || p.postedBy.name
                        }'s profile picture`}
                      />
                    </Link>
                    <div>
                      <Link to={`/user/${p.postedBy._id}`}>
                        <p>{p.postedBy.username || p.postedBy.name}</p>
                      </Link>
                      <span>{moment(p.createdAt).fromNow()}</span>
                    </div>
                  </div>
                  <div className='submissioner-info'>
                    <FontAwesomeIcon
                      icon={faClock}
                      className='fa edit'
                      onClick={() => handleSuspend(p.postedBy)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className='fa trash'
                      onClick={() => handleDeleteUser(p.postedBy)}
                    />
                  </div>
                  <div className='post-icons'>
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className='fa pass'
                      onClick={() => passPost(p)}
                    />

                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className='fa trash'
                      onClick={() => handleDeletePost(p)}
                    />
                  </div>
                </div>
                <p className='post-text'>{p.content}</p>
                {p.postImages && p.postImages.length > 0 && (
                  <img
                    src={p.postImages[0].url}
                    alt={`${p.postedBy.username || p.postedBy.name}'s post`}
                    className='post-img'
                    style={{ cursor: 'zoom-in' }}
                    onClick={() => viewImages(p)}
                  />
                )}
              </div>
            ))}
          {comments.length > 0 && <h1 className='center'>Comments</h1>}
          {comments.length > 0 &&
            comments.map((comment) =>
              comment.comments.map((c) => (
                <div className='post-container' key={c._id}>
                  <div className='post-row'>
                    <div className='user-profile'>
                      <Link to={`/user/${c.postedBy._id}`}>
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
                        <Link to={`/user/${c.postedBy._id}`}>
                          <p>{c.postedBy.username || c.postedBy.name}</p>
                        </Link>
                        <span>{moment(c.created).fromNow()}</span>
                      </div>
                    </div>
                    <div className='submissioner-info'>
                      <FontAwesomeIcon
                        icon={faClock}
                        className='fa edit'
                        onClick={() => handleSuspend(c.postedBy)}
                      />
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className='fa trash'
                        onClick={() => handleDeleteUser(c.postedBy)}
                      />
                    </div>
                    <div className='post-icons'>
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className='fa pass'
                        onClick={() => passComment(comment, c)}
                      />

                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className='fa trash'
                        onClick={() => handleDeleteComment(comment, c)}
                      />
                    </div>
                  </div>
                  <p className='post-text'>{c.text}</p>
                  {c.image && (
                    <img
                      src={c.image.url}
                      alt={`${c.postedBy.username || c.postedBy.name}'s post`}
                      className='post-img'
                    />
                  )}
                </div>
              ))
            )}
          {messages.length > 0 && <h1 className='center'>Messages</h1>}
          {messages.length > 0 &&
            messages.map((m) => (
              <div className='post-container' key={m._id}>
                <div className='post-row'>
                  <div className='user-profile'>
                    <Link to={`/user/${m.sender._id}`}>
                      <img
                        src={
                          m.sender.profileImage
                            ? m.sender.profileImage.url
                            : defaultProfile
                        }
                        alt={`${
                          m.sender.username || m.sender.name
                        }'s profile picture`}
                      />
                    </Link>
                    <div>
                      <Link to={`/user/${m.sender._id}`}>
                        <p>{m.sender.username || m.sender.name}</p>
                      </Link>
                      <span>{moment(m.createdAt).fromNow()}</span>
                    </div>
                  </div>
                  <div className='submissioner-info'>
                    <FontAwesomeIcon
                      icon={faClock}
                      className='fa edit'
                      onClick={() => handleSuspend(m.sender)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className='fa trash'
                      onClick={() => handleDeleteUser(m.sender)}
                    />
                  </div>
                  <div className='post-icons'>
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className='fa pass'
                      onClick={() => passMessage(m)}
                    />

                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className='fa trash'
                      onClick={() => handleDeleteMessage(m)}
                    />
                  </div>
                </div>
                <p className='post-text'>
                  {m.content && renderHtml(m.content)}
                </p>
                {m.image && (
                  <img
                    src={m.image.url}
                    alt='message image'
                    className='post-img'
                  />
                )}
              </div>
            ))}
          {posts.length < 1 && comments.length < 1 && messages.length < 1 && (
            <h1 className='center'>
              There is not currently any reported content.
            </h1>
          )}
        </div>
      </div>
      <UserSuspend
        userSuspendModalIsOpen={userSuspendModalIsOpen}
        setUserSuspendModalIsOpen={setUserSuspendModalIsOpen}
        userToSuspend={userToSuspend}
      />
      <PostDeleteAdmin
        postDeleteModalIsOpen={postDeleteModalIsOpen}
        setPostDeleteModalIsOpen={setPostDeleteModalIsOpen}
        postToDelete={postToDelete}
        fetchPosts={fetchPosts}
        fetchComments={fetchComments}
        fetchReportedContent={fetchReportedContent}
      />
      <UserDeleteAdmin
        userDeleteModalIsOpen={userDeleteModalIsOpen}
        setUserDeleteModalIsOpen={setUserDeleteModalIsOpen}
        userToDelete={userToDelete}
        fetchPosts={fetchPosts}
        fetchComments={fetchComments}
        fetchReportedContent={fetchReportedContent}
      />
      <PassPost
        passPostModalIsOpen={passPostModalIsOpen}
        setPassPostModalIsOpen={setPassPostModalIsOpen}
        postToPass={postToPass}
        fetchPosts={fetchPosts}
        fetchReportedContent={fetchReportedContent}
      />
      <PassComment
        passCommentModalIsOpen={passCommentModalIsOpen}
        setPassCommentModalIsOpen={setPassCommentModalIsOpen}
        commentToPass={commentToPass}
        postOfCommentToPass={postOfCommentToPass}
        fetchComments={fetchComments}
        fetchReportedContent={fetchReportedContent}
      />
      <CommentDelete
        commentDeleteModalIsOpen={commentDeleteModalIsOpen}
        setCommentDeleteModalIsOpen={setCommentDeleteModalIsOpen}
        commentToDelete={commentToDelete}
        postOfCommentToDelete={postOfCommentToDelete}
        fetchComments={fetchComments}
        fetchReportedContent={fetchReportedContent}
      />
      <PassMessage
        passMessageModalIsOpen={passMessageModalIsOpen}
        setPassMessageModalIsOpen={setPassMessageModalIsOpen}
        messageToPass={messageToPass}
        fetchMessages={fetchMessages}
        fetchReportedContent={fetchReportedContent}
      />
      <MessageDelete
        messageDeleteModalIsOpen={messageDeleteModalIsOpen}
        setMessageDeleteModalIsOpen={setMessageDeleteModalIsOpen}
        messageToDelete={messageToDelete}
        fetchMessages={fetchMessages}
        fetchReportedContent={fetchReportedContent}
      />
      <LargePostImage
        postImageModalIsOpen={postImageModalIsOpen}
        setPostImageModalIsOpen={setPostImageModalIsOpen}
        post={currentPost}
        fetchReportedContent={fetchReportedContent}
        fetchPosts={fetchPosts}
      />
    </div>
  );
};

export default ReportedContent;
