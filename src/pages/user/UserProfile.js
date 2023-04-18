import React, { useState, useEffect } from 'react';
import defaultCover from '../../assets/defaultCover.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faMessage,
  faSignsPost,
  faComments,
  faCaretDown,
  faCaretUp,
  faSpinner,
  faBrain,
  faUserShield,
  faGift,
  faFlag,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';
import { useParams } from 'react-router-dom';
import LargeCoverImage from '../../components/modals/LargeCoverImage';
import LargeProfileImage from '../../components/modals/LargeProfileImage';
import moment from 'moment';
import Comments from '../../components/cards/Comments';
import InfiniteScroll from 'react-infinite-scroll-component';
import AddComment from '../../components/modals/AddComment';
import { toast } from 'react-toastify';
import ShowLikes from '../../components/modals/ShowLikes';
import Match from '../../components/modals/Match';
import Unfollow from '../../components/modals/Unfollow';
import { addPoints } from '../../functions/user';
import io from 'socket.io-client';
import Analyse from '../../components/modals/Analyse';
import { HashLink as Link } from 'react-router-hash-link';
import LargePostImage from '../../components/modals/LargePostImage';
import ReportPost from '../../components/modals/ReportPost';

let socket;

const UserProfile = ({ history }) => {
  const [thisUser, setThisUser] = useState({});
  const [coverImageModalIsOpen, setCoverImageModalIsOpen] = useState(false);
  const [profileImageModalIsOpen, setProfileImageModalIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState({});
  const [comment, setComment] = useState('');
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [showComments, setShowComments] = useState(-1);
  const [uploading, setUploading] = useState(false);
  const [page, setPage] = useState(1);
  const [morePosts, setMorePosts] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [likesModalIsOpen, setLikesModalIsOpen] = useState(false);
  const [match, setMatch] = useState({});
  const [matchModalIsOpen, setMatchModalIsOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [visitorPhotos, setVisitorPhotos] = useState(0);
  const [userToUnfollow, setUserToUnfollow] = useState({});
  const [unfollowModalIsOpen, setUnfollowModalIsOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState([]);
  const [commentDeleteModalIsOpen, setCommentDeleteModalIsOpen] =
    useState(false);
  const [postOfCommentToDelete, setPostOfCommentToDelete] = useState([]);
  const [commentEditModalIsOpen, setCommentEditModalIsOpen] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState({});
  const [postOfCommentToEdit, setPostOfCommentToEdit] = useState([]);
  const [analyseModalIsOpen, setAnalyseModalIsOpen] = useState(false);
  const [userToAnalyse, setUserToAnalyse] = useState({});
  const [loadingImg, setLoadingImg] = useState(false);
  const [postImageModalIsOpen, setPostImageModalIsOpen] = useState(false);
  const [reportPostModalIsOpen, setReportPostModalIsOpen] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const { userId } = useParams();

  let dispatch = useDispatch();

  useEffect(() => {
    socket = io(
      process.env.REACT_APP_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true },
      { secure: true }
    );
  }, []);

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API}/total-posts-by-this-user`,
        {
          userId,
          user,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        if (res.data === 0) {
          setMorePosts(false);
        }
        setTotalPosts(res.data);
      });
  }, [page, userId]);

  useEffect(() => {
    fetchUser();
    fetchVisitor();
    fetchThisUsersPhotos();
    visitorPhotosCount();
  }, [userId]);

  useEffect(() => {
    fetchThisUsersPosts();
  }, [page]);

  useEffect(() => {
    if (thisUser) {
      console.log(clearPhoto);
      console.log(profilePhotos);
      if (clearPhoto === false) {
        toast.warning(
          `You cannot view ${
            username || name
          }'s photos clearly because they are not displaying a clear image of themselves.`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      } else if (profilePhotos && profilePhotos.length < 2) {
        toast.warning(
          `You cannot view ${
            username || name
          }'s photos clearly because they have uploaded less than two profile images.`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }
    }
  }, [thisUser]);

  const fetchUser = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/user/${userId}`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setThisUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchThisUsersPosts = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/this-users-posts/${page}`,
        { userId, user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const infinity = () => {
    let postsLength = posts.length;
    if (postsLength === totalPosts) {
      setMorePosts(false);
    }
    setPage(page + 1);
  };

  const fetchVisitor = async () => {
    if (user.role === 'main-admin' || user.role === 'secondary-admin') return;
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/fetch-visitor`,
          { userId, user },
          {
            headers: {
              authtoken: user.token,
            },
          }
        )
        .then((res) => {
          if (!res.data.visitors.includes(user._id)) {
            socket.emit('new visitor', res.data, user);
            addPoints(5, 'new visitor', user.token, res.data);
            addPoints(1, 'new visit', user.token);
            toast.success(`First visit. You have been awarded 1 point!`, {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const visitorPhotosCount = async () => {
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/visitor-photos`,
          { user },
          {
            headers: {
              authtoken: user.token,
            },
          }
        )
        .then((res) => {
          setVisitorPhotos(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchThisUsersPhotos = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/users-nine-photos`,
        { userId, user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setPhotos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLike = async (_id) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/like-post`,
        { _id, user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        socket.emit('like post', res.data);
        fetchThisUsersPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnlike = async (_id) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/unlike-post`,
        { _id, user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        fetchThisUsersPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleComment = (post) => {
    setCurrentPost(post);
    setCommentModalIsOpen(true);
  };

  const addComment = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${process.env.REACT_APP_API}/add-comment`,
        { postId: currentPost._id, comment, image, user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        toast.success(`Comment added.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setComment('');
        setImage({});
        setCommentModalIsOpen(false);
        fetchThisUsersPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeComment = async (postId, comment) => {
    setCommentDeleteModalIsOpen(true);
    setPostOfCommentToDelete(postId);
    setCommentToDelete(comment);
  };

  const editComment = async (postId, comment) => {
    setCommentEditModalIsOpen(true);
    setCommentToEdit(comment);
    setPostOfCommentToEdit(postId);
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('image', file);
    setLoadingImg(true);

    await axios
      .post(`${process.env.REACT_APP_API}/upload-image`, formData, {
        headers: {
          authtoken: user.token,
        },
      })
      .then((res) => {
        setImage({
          url: res.data.url,
          public_id: res.data.public_id,
        });
        setLoadingImg(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingImg(false);
      });
  };

  const handleFollow = async (u) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/user-follow`,
        {
          u,
          user,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        if (res.data.matches.includes(u._id)) {
          setMatchModalIsOpen(true);
          setMatch(u);
          addPoints(15, 'match', user.token);
          toast.success(
            `You matched with ${
              u.username || u.name
            }. You have been awarded 15 points!`,
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        }
        toast.success(`You like ${username || name}.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        socket.emit('new follower', res.data);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            following: res.data.following,
            followers: res.data.followers,
            matches: res.data.matches,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        toast.warning(
          `Please update your subscription in order to follow other members.`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      });
  };

  const handleUnfollow = async (u) => {
    setUnfollowModalIsOpen(true);
    setUserToUnfollow(u);
  };

  const handleAnalyse = async (u) => {
    setAnalyseModalIsOpen(true);
    setUserToAnalyse(u);
  };

  const showLikes = (post) => {
    setCurrentPost(post);
    setLikesModalIsOpen(true);
  };

  const viewImages = (post) => {
    setCurrentPost(post);
    setPostImageModalIsOpen(true);
  };

  const reportPost = (post) => {
    setCurrentPost(post);
    setReportPostModalIsOpen(true);
  };

  const {
    name,
    profileImage,
    about,
    coverImage,
    createdAt,
    _id,
    verified,
    clearPhoto,
    membership,
    lastLogin,
    username,
    coverPhotos,
    profilePhotos,
  } = thisUser ?? {};

  return (
    <>
      {!thisUser ? (
        <h1 className='center'>
          This user does not exist and may have been deleted...
        </h1>
      ) : _id === '63dc1d2a8eb01e4110743044' ? (
        <div className='profile-container'>
          <div className='post-col'>
            <InfiniteScroll
              dataLength={posts.length}
              next={infinity}
              hasMore={morePosts}
              loader={
                <div className='loader'>
                  <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                </div>
              }
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>You're up to date</b>
                </p>
              }
            >
              {posts &&
                posts.map((post, i) => (
                  <div className='post-container' key={post._id}>
                    <div className='post-row'>
                      <div className='user-profile'>
                        <img
                          src={profileImage ? profileImage.url : defaultProfile}
                          alt={`${username || name}'s profile picture`}
                        />
                        <div>
                          <p>{username || name}</p>
                          <span>{moment(post.createdAt).fromNow()}</span>
                        </div>
                      </div>
                      <div className='post-icons'>
                        <FontAwesomeIcon
                          icon={faFlag}
                          className='fa report'
                          onClick={() => reportPost(post)}
                        />
                      </div>
                    </div>
                    <p className='post-text'>{post.content}</p>
                    {post.postImages && post.postImages.length > 0 && (
                      <img
                        src={post.postImages[0].url}
                        alt={`${username || name}'s post`}
                        className='post-img'
                        style={{ cursor: 'zoom-in' }}
                        onClick={() => viewImages(post)}
                      />
                    )}
                    <div className='post-row'>
                      <div className='activity-icons'>
                        <div>
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
                          <span
                            className='show-likes'
                            onClick={() => showLikes(post)}
                          >
                            {post.likes.length === 1 &&
                              `${post.likes.length} like`}
                            {post.likes.length > 1 &&
                              `${post.likes.length} likes`}
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
                            fetchThisUsersPosts={fetchThisUsersPosts}
                            commentDeleteModalIsOpen={commentDeleteModalIsOpen}
                            setCommentDeleteModalIsOpen={
                              setCommentDeleteModalIsOpen
                            }
                            commentToDelete={commentToDelete}
                            postOfCommentToDelete={postOfCommentToDelete}
                            editComment={editComment}
                            commentEditModalIsOpen={commentEditModalIsOpen}
                            setCommentEditModalIsOpen={
                              setCommentEditModalIsOpen
                            }
                            commentToEdit={commentToEdit}
                            postOfCommentToEdit={postOfCommentToEdit}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </InfiniteScroll>
          </div>
        </div>
      ) : (
        _id !== '63dc1d2a8eb01e4110743044' && (
          <>
            <div className='profile-container'>
              <img
                src={coverImage ? coverImage.url : defaultCover}
                alt={`${username || name}'s profile photo`}
                className='cover-img'
                style={{ cursor: 'zoom-in' }}
                onClick={() => setCoverImageModalIsOpen(true)}
              />
              <div className='profile-details'>
                <div className='pd-left'>
                  <div className='pd-row'>
                    {profileImage && profileImage.url ? (
                      <img
                        src={profileImage.url}
                        alt={`${username || name}'s profile photo`}
                        className='pd-image'
                        style={{ cursor: 'zoom-in' }}
                        onClick={() => setProfileImageModalIsOpen(true)}
                      />
                    ) : (
                      <img
                        src={defaultProfile}
                        alt='Default profile picture'
                        className='pd-image'
                      />
                    )}

                    <div>
                      <h3>{username || name}</h3>
                      <p>
                        Member since {moment(createdAt).format('MMMM Do YYYY')}
                      </p>
                      <p>Last logged in {moment(lastLogin).fromNow()}</p>
                    </div>
                  </div>
                </div>
                <div className='pd-right'>
                  {user.following.some((e) => e._id === _id) ||
                  user.following.includes(_id) ? (
                    <button
                      type='button'
                      onClick={() => handleUnfollow(thisUser)}
                      className='tooltip'
                    >
                      <FontAwesomeIcon
                        icon={faHeart}
                        className='fa heart liked'
                      />
                      <span className='tooltip-text'>Unlike this user</span>
                    </button>
                  ) : (
                    <button
                      type='button'
                      onClick={() => handleFollow(thisUser)}
                      className='tooltip'
                    >
                      <FontAwesomeIcon icon={faHeart} className='fa heart' />
                      <span className='tooltip-text'>Like this user</span>
                    </button>
                  )}
                  {user.matches.includes(_id) && (
                    <>
                      <button
                        type='button'
                        className='tooltip'
                        onClick={() => history.push('/chats')}
                      >
                        <FontAwesomeIcon icon={faMessage} className='fa' />
                        <span className='tooltip-text'>Message this user</span>
                      </button>
                      {/* <button
                type='button'
                className='tooltip'
                onClick={() => history.push(`/create-gift-card/${_id}`)}
              >
                <FontAwesomeIcon icon={faGift} className='fa' />
                <span className='tooltip-text'>Buy this user a gift</span>
              </button> */}
                    </>
                  )}
                  <button
                    type='button'
                    onClick={() => handleAnalyse(thisUser)}
                    className='analyse tooltip'
                  >
                    <FontAwesomeIcon icon={faBrain} className='fa analyse' />
                    <span className='tooltip-text'>Analyse compatibility</span>
                  </button>
                  {verified === 'true' && (
                    <button className='tooltip'>
                      <FontAwesomeIcon
                        icon={faUserShield}
                        className='fa verified'
                      />
                      <span className='tooltip-text'>Verified member</span>
                    </button>
                  )}
                  <br />
                </div>
              </div>
              <div className='profile-info'>
                <div className='info-col'>
                  <div className='profile-intro'>
                    {about && (
                      <>
                        <h3>Intro</h3>
                        <p className='intro-text'>{about}</p>
                        <hr />
                      </>
                    )}
                    <ul>
                      <li>
                        <Link to='#their-posts'>
                          <FontAwesomeIcon icon={faSignsPost} className='fa' />
                          {totalPosts} {totalPosts === 1 ? 'Post' : 'Posts'}
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {photos.length > 0 && (
                    <div className='profile-intro'>
                      <div className='title-box'>
                        <h3>Photos</h3>
                        <Link to={`/photos/${userId}`}>All Photos</Link>
                      </div>
                      <div className='photo-box'>
                        {photos.map((p, i) => (
                          <div key={i}>
                            <img
                              src={p.url || p}
                              alt=''
                              className={
                                user.role === 'main-admin' ||
                                user.role === 'secondary-admin' ||
                                user._id === userId
                                  ? ''
                                  : visitorPhotos < 2 ||
                                    !clearPhoto ||
                                    !membership.paid ||
                                    user.profilePhotos.length < 2 ||
                                    !user.clearPhoto ||
                                    !user.membership.paid
                                  ? 'blur'
                                  : ''
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <span id='their-posts'></span>
                {user.following.some((e) => e._id === _id) ||
                user.following.includes(_id) ||
                user.matches.some((e) => e._id === _id) ||
                user.matches.includes(_id) ? (
                  <div className='post-col'>
                    <InfiniteScroll
                      dataLength={posts.length}
                      next={infinity}
                      hasMore={morePosts}
                      loader={
                        <div className='loader'>
                          <FontAwesomeIcon
                            icon={faSpinner}
                            className='fa'
                            spin
                          />
                        </div>
                      }
                      endMessage={
                        <p style={{ textAlign: 'center' }}>
                          <b>You're up to date</b>
                        </p>
                      }
                    >
                      {posts &&
                        posts.map((post, i) => (
                          <div className='post-container' key={post._id}>
                            <div className='post-row'>
                              <div className='user-profile'>
                                <img
                                  src={
                                    profileImage
                                      ? profileImage.url
                                      : defaultProfile
                                  }
                                  alt={`${username || name}'s profile picture`}
                                />
                                <div>
                                  <p>{username || name}</p>
                                  <span>
                                    {moment(post.createdAt).fromNow()}
                                  </span>
                                </div>
                              </div>
                              <div className='post-icons'>
                                <FontAwesomeIcon
                                  icon={faFlag}
                                  className='fa report'
                                  onClick={() => reportPost(post)}
                                />
                              </div>
                            </div>
                            <p className='post-text'>{post.content}</p>
                            {post.postImages && post.postImages.length > 0 && (
                              <img
                                src={post.postImages[0].url}
                                alt={`${username || name}'s post`}
                                className='post-img'
                                style={{ cursor: 'zoom-in' }}
                                onClick={() => viewImages(post)}
                              />
                            )}
                            <div className='post-row'>
                              <div className='activity-icons'>
                                <div>
                                  {post.likes.some(
                                    (e) => e._id === user._id
                                  ) ? (
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
                                  <span
                                    className='show-likes'
                                    onClick={() => showLikes(post)}
                                  >
                                    {post.likes.length === 1 &&
                                      `${post.likes.length} like`}
                                    {post.likes.length > 1 &&
                                      `${post.likes.length} likes`}
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
                                  icon={
                                    showComments !== i ? faCaretDown : faCaretUp
                                  }
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
                                    fetchThisUsersPosts={fetchThisUsersPosts}
                                    commentDeleteModalIsOpen={
                                      commentDeleteModalIsOpen
                                    }
                                    setCommentDeleteModalIsOpen={
                                      setCommentDeleteModalIsOpen
                                    }
                                    commentToDelete={commentToDelete}
                                    postOfCommentToDelete={
                                      postOfCommentToDelete
                                    }
                                    editComment={editComment}
                                    commentEditModalIsOpen={
                                      commentEditModalIsOpen
                                    }
                                    setCommentEditModalIsOpen={
                                      setCommentEditModalIsOpen
                                    }
                                    commentToEdit={commentToEdit}
                                    postOfCommentToEdit={postOfCommentToEdit}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                    </InfiniteScroll>
                  </div>
                ) : (
                  <div className='post-col'>
                    <div className='post-container'>
                      <h2 className='center'>
                        Can't see {username || name}'s posts? Give them a like!
                      </h2>
                      <div className='post-like-user'>
                        <button
                          type='button'
                          onClick={() => handleFollow(thisUser)}
                        >
                          <FontAwesomeIcon
                            icon={faHeart}
                            className='fa heart'
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {coverImage && coverImage.url && (
                <LargeCoverImage
                  coverImageModalIsOpen={coverImageModalIsOpen}
                  setCoverImageModalIsOpen={setCoverImageModalIsOpen}
                  images={coverPhotos}
                  clearPhoto={user.clearPhoto}
                  membership={user.membership}
                />
              )}
              {profileImage && profileImage.url && (
                <LargeProfileImage
                  profileImageModalIsOpen={profileImageModalIsOpen}
                  setProfileImageModalIsOpen={setProfileImageModalIsOpen}
                  images={profilePhotos}
                  clearPhoto={user.clearPhoto}
                  membership={user.membership}
                />
              )}
              <AddComment
                commentModalIsOpen={commentModalIsOpen}
                setCommentModalIsOpen={setCommentModalIsOpen}
                comment={comment}
                setComment={setComment}
                uploading={uploading}
                addComment={addComment}
                image={image}
                handleImage={handleImage}
                loadingImg={loadingImg}
              />
              <Match
                matchModalIsOpen={matchModalIsOpen}
                setMatchModalIsOpen={setMatchModalIsOpen}
                match={match}
              />
              <Unfollow
                unfollowModalIsOpen={unfollowModalIsOpen}
                setUnfollowModalIsOpen={setUnfollowModalIsOpen}
                userToUnfollow={userToUnfollow}
              />
              <Analyse
                analyseModalIsOpen={analyseModalIsOpen}
                setAnalyseModalIsOpen={setAnalyseModalIsOpen}
                userToAnalyse={userToAnalyse}
              />
              <ShowLikes
                likesModalIsOpen={likesModalIsOpen}
                setLikesModalIsOpen={setLikesModalIsOpen}
                post={currentPost}
              />
              <LargePostImage
                postImageModalIsOpen={postImageModalIsOpen}
                setPostImageModalIsOpen={setPostImageModalIsOpen}
                post={currentPost}
              />
              <ReportPost
                reportPostModalIsOpen={reportPostModalIsOpen}
                setReportPostModalIsOpen={setReportPostModalIsOpen}
                post={currentPost}
              />
            </div>
          </>
        )
      )}
    </>
  );
};

export default UserProfile;
