import React, { useState, useEffect } from 'react';
import defaultCover from '../../assets/defaultCover.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faHeartBroken,
  faMessage,
  faSignsPost,
  faEllipsisV,
  faTrashCan,
  faComments,
  faCaretDown,
  faCaretUp,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';

import { useParams, Link } from 'react-router-dom';
import LargeImage from '../../components/modals/LargeImage';
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
import { ChatState } from '../../context/ChatProvider';

const ENDPOINT = 'http://localhost:8000';
let socket;

const UserProfile = () => {
  const [thisUser, setThisUser] = useState({});
  const [imageModalIsOpen, setImageModalIsOpen] = useState(false);
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

  let { user } = useSelector((state) => ({ ...state }));

  const { socketConnected, setSocketConnected } = ChatState();

  const { userId } = useParams();

  let dispatch = useDispatch();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
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
        // console.log('res.data => ', res.data);
        if (res.data === 0) {
          setMorePosts(false);
        }
        setTotalPosts(res.data);
      });
  }, [page, userId]);

  useEffect(() => {
    // newVisitor();
    fetchUser();
    fetchVisitor();
    fetchThisUsersPhotos();
    visitorPhotosCount();
    // addPoints(1, 'visit', user.token); need to ensure this is first visit to users page first
  }, [userId]);

  useEffect(() => {
    fetchThisUsersPosts();
  }, [page]);

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
        // console.log('fetch user response => ', res.data);
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
          console.log(res.data);
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
          console.log('visitorPhotos res => ', res.data);
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
    setUploading(true);

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
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
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
        }
        toast.success(`You like ${name ? name : email.split('@')[0]}.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        socket.emit('new follower', res.data);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            profileImage: res.data.profileImage,
            coverImage: res.data.coverImage,
            name: res.data.name,
            email: res.data.email,
            username: res.data.username,
            about: res.data.about,
            gender: res.data.gender,
            birthday: res.data.birthday,
            location: res.data.location,
            genderWanted: res.data.genderWanted,
            relWanted: res.data.relWanted,
            following: res.data.following,
            followers: res.data.followers,
            matches: res.data.matches,
            visitors: res.data.visitors,
            token: user.token,
            role: res.data.role,
            _id: res.data._id,
            createdAt: res.data.createdAt,
            address: res.data.address,
            wishlist: res.data.wishlist,
            points: res.data.points,
            notifications: res.data.notifications,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnfollow = async (u) => {
    setUnfollowModalIsOpen(true);
    setUserToUnfollow(u);
  };

  const showLikes = (post) => {
    setCurrentPost(post);
    setLikesModalIsOpen(true);
    console.log(post.likes);
  };

  const {
    name,
    email,
    profileImage,
    about,
    coverImage,
    createdAt,
    following,
    _id,
  } = thisUser;

  return (
    <div className='profile-container'>
      <img
        src={coverImage ? coverImage.url : defaultCover}
        // alt={`${name || email.split('@'[0])}'s profile photo`}
        className='cover-img'
      />
      <div className='profile-details'>
        <div className='pd-left'>
          <div className='pd-row'>
            {profileImage && profileImage.url ? (
              <img
                src={profileImage.url}
                alt={`${name || email.split('@'[0])}'s profile photo`}
                className='pd-image'
                style={{ cursor: 'zoom-in' }}
                onClick={() => setImageModalIsOpen(true)}
              />
            ) : (
              <img
                src={defaultProfile}
                alt='Default profile picture'
                className='pd-image'
              />
            )}

            <div>
              <h3>{name || (email && email.split('@')[0])}</h3>
              <p>Member since {createdAt}</p>
            </div>
          </div>
        </div>
        <div className='pd-right'>
          {user.following.includes(_id) ? (
            <button type='button' onClick={() => handleUnfollow(thisUser)}>
              <FontAwesomeIcon icon={faHeart} className='fa heart liked' />
            </button>
          ) : (
            <button type='button' onClick={() => handleFollow(thisUser)}>
              <FontAwesomeIcon icon={faHeart} className='fa heart' />
            </button>
          )}
          <button type='button'>
            <FontAwesomeIcon icon={faMessage} className='fa' />
          </button>
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
                <FontAwesomeIcon icon={faSignsPost} className='fa' />
                {totalPosts} {totalPosts.length === 1 ? 'Post' : 'Posts'}
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
                      src={p}
                      alt=''
                      className={visitorPhotos < 2 ? 'blur' : ''}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className='post-col'>
          <InfiniteScroll
            dataLength={posts.length}
            next={infinity}
            hasMore={morePosts}
            loader={<FontAwesomeIcon icon={faSpinner} className='fa' spin />}
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
                        alt={`${name || email.split('@'[0])}'s profile picture`}
                      />
                      <div>
                        <p>{name ? name : email.split('@')[0]}</p>
                        <span>{moment(post.createdAt).fromNow()}</span>
                      </div>
                    </div>
                  </div>
                  <p className='post-text'>{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image.url}
                      alt={`${name || email.split('@')[0]}'s post`}
                      className='post-img'
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
                          fetchThisUsersPosts={fetchThisUsersPosts}
                          commentDeleteModalIsOpen={commentDeleteModalIsOpen}
                          setCommentDeleteModalIsOpen={
                            setCommentDeleteModalIsOpen
                          }
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
          </InfiniteScroll>
        </div>
      </div>
      {profileImage && profileImage.url && (
        <LargeImage
          imageModalIsOpen={imageModalIsOpen}
          setImageModalIsOpen={setImageModalIsOpen}
          imageUrl={profileImage.url}
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
      <ShowLikes
        likesModalIsOpen={likesModalIsOpen}
        setLikesModalIsOpen={setLikesModalIsOpen}
        post={currentPost}
      />
    </div>
  );
};

export default UserProfile;
