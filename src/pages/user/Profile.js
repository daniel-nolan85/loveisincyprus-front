import React, { useState, useEffect } from 'react';
import defaultCover from '../../assets/defaultCover.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faCamera,
  faPenToSquare,
  faSpinner,
  faPaperPlane,
  faCropSimple,
  faComments,
  faTrashCan,
  faCaretDown,
  faCaretUp,
  faFaceGrinHearts,
  faFaceGrinStars,
  faSignsPost,
  faPeopleArrows,
  faCoins,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import ProfileUpdate from '../../components/modals/ProfileUpdate';
import { toast } from 'react-toastify';
import axios from 'axios';
import defaultProfile from '../../assets/defaultProfile.png';
import CropCover from '../../components/modals/CropCover';
import CropProfilePic from '../../components/modals/CropProfilePic';
import LargeImage from '../../components/modals/LargeImage';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Comments from '../../components/cards/Comments';
import InfiniteScroll from 'react-infinite-scroll-component';
import AddComment from '../../components/modals/AddComment';
import ShowLikes from '../../components/modals/ShowLikes';
import SinglePost from '../../components/modals/SinglePost';
import PostDelete from '../../components/modals/PostDelete';
import { getUserPointsTotal, addPoints } from '../../functions/user';

const Profile = ({ history }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [profileImage, setProfileImage] = useState({});
  const [coverImage, setCoverImage] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cropCoverModalIsOpen, setCropCoverModalIsOpen] = useState(false);
  const [cropModalIsOpen, setCropModalIsOpen] = useState(false);
  const [imageModalIsOpen, setImageModalIsOpen] = useState(false);
  const [crop, setCrop] = useState(null);
  const [croppedCover, setCroppedCover] = useState(null);
  const [croppedProfile, setCroppedProfile] = useState(null);
  const [coverImageCropped, setCoverImageCropped] = useState(false);
  const [profileImageCropped, setProfileImageCropped] = useState(false);
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [matches, setMatches] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [image, setImage] = useState({});
  const [content, setContent] = useState('');
  const [comment, setComment] = useState('');
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [showComments, setShowComments] = useState(-1);
  const [page, setPage] = useState(1);
  const [morePosts, setMorePosts] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [likesModalIsOpen, setLikesModalIsOpen] = useState(false);
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [location, setLocation] = useState('');
  const [genderWanted, setGenderWanted] = useState('');
  const [relWanted, setRelWanted] = useState('');
  const [postModalIsOpen, setPostModalIsOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState([]);
  const [postDeleteModalIsOpen, setPostDeleteModalIsOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState([]);
  const [commentDeleteModalIsOpen, setCommentDeleteModalIsOpen] =
    useState(false);
  const [postOfCommentToDelete, setPostOfCommentToDelete] = useState([]);
  const [commentEditModalIsOpen, setCommentEditModalIsOpen] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState({});
  const [postOfCommentToEdit, setPostOfCommentToEdit] = useState([]);
  const [points, setPoints] = useState(0);

  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) {
      fetchUserPosts();
      fetchUserTotalPosts();
    }
  }, [user && user.token, page]);

  useEffect(() => {
    if (user && user.token) {
      setUsername(user.username);
      setAbout(user.about);
      setName(user.name);
      setEmail(user.email);
      setProfileImage(user.profileImage);
      setCoverImage(user.coverImage);
      setGender(user.gender);
      // setBirthday(user.birthday.slice(1, 11).split('-').reverse().join('-'));
      // setBirthday(user.birthday);
      // onChange={(date) => {
      //   let formatDate = JSON.stringify(date).slice(1, 11);
      //   formatDate = formatDate.split('-').reverse().join('-');
      //   setBirthday(formatDate);
      // }}
      setLocation(user.location);
      setGenderWanted(user.genderWanted);
      setRelWanted(user.relWanted);
      fetchPhotos();
      fetchMatches();
      fetchVisitors();
      fetchUserPoints();
    }
  }, [user && user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('birthday => ', birthday);
    setLoading(true);

    await axios
      .put(
        `${process.env.REACT_APP_API}/profile-update`,
        {
          username,
          about,
          name,
          user,
          profileImage,
          coverImage,
          gender,
          birthday,
          location,
          genderWanted,
          relWanted,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        console.log('update response ==> ', res.data);

        if (res.data.error) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.success(`Profile updated.`, {
            position: toast.POSITION.TOP_CENTER,
          });
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
            },
          });
        }
        setModalIsOpen(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleProfileImage = async (e) => {
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
        setProfileImage({
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

  const handleCoverImage = async (e) => {
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
        setCoverImage({
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

  const fetchPhotos = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/nine-photos`,
        { user },
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

  const fetchMatches = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/nine-matches`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setMatches(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchVisitors = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/nine-visitors`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setVisitors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUserPoints = () =>
    getUserPointsTotal(user.token).then((res) => {
      console.log(res.data);
      setPoints(res.data);
    });

  const fetchUserPosts = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/user-posts/${page}`,
        {
          user,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        // let newPosts = posts;
        // newPosts = newPosts.concat(res.data);
        // setPosts(newPosts);
        // setPage(page + 1);
        // let newPostsLength = newPosts.length;
        // if (postsLength === newPostsLength) {
        //   setMorePosts(false);
        // }
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUserTotalPosts = () => {
    axios
      .post(
        `${process.env.REACT_APP_API}/total-posts-by-user`,
        {
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
        // if (totalPosts < 10) {
        //   setMorePosts(false);
        // }
      });
  };

  const infinity = () => {
    let postsLength = posts.length;
    if (postsLength === totalPosts) {
      setMorePosts(false);
    }
    setPage(page + 1);
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    await axios
      .post(
        `${process.env.REACT_APP_API}/create-post`,
        {
          content,
          image,
          user,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setUploading(false);
        addPoints(3, 'post', user.token);
        if (res.data.error) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.success(`Post added. You have been awarded 3 points!`, {
            position: toast.POSITION.TOP_CENTER,
          });
          setContent('');
          setImage({});
          fetchUserPosts();
          fetchUserTotalPosts();
          fetchUserPoints();
        }
      })
      .catch((err) => {
        setUploading(false);
        console.log(err);
      });
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

  const handleDelete = async (post) => {
    setPostDeleteModalIsOpen(true);
    setPostToDelete(post);
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
        fetchUserPosts();
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
        fetchUserPosts();
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
        fetchUserPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeComment = (postId, comment) => {
    setCommentDeleteModalIsOpen(true);
    setPostOfCommentToDelete(postId);
    setCommentToDelete(comment);
  };

  const editComment = async (postId, comment) => {
    setCommentEditModalIsOpen(true);
    setCommentToEdit(comment);
    setPostOfCommentToEdit(postId);
  };

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
    <div className='profile-container'>
      {user.coverImage && user.coverImage.url ? (
        <div className='cover-img-container'>
          <img
            src={user.coverImage.url}
            alt={`${user.name || user.email.split('@'[0])}'s cover photo`}
            className='cover-img'
          />
          <FontAwesomeIcon
            icon={faCropSimple}
            className='fa'
            onClick={() => setCropCoverModalIsOpen(true)}
          />
        </div>
      ) : (
        <img
          src={defaultCover}
          alt={`${user.name || user.email.split('@'[0])}'s cover photo`}
          className='cover-img'
        />
      )}
      {/* <img
        src={user.coverImage ? user.coverImage.url : defaultCover}
        alt={`${user.name || user.email.split('@'[0])}'s cover photo`}
        className='cover-img'
      /> */}
      <div className='profile-details'>
        <div className='pd-left'>
          <div className='pd-row'>
            {user.profileImage && user.profileImage.url ? (
              <>
                <img
                  src={user.profileImage.url}
                  alt={`${
                    user.name || user.email.split('@'[0])
                  }'s profile photo`}
                  className='pd-image'
                  style={{ cursor: 'zoom-in' }}
                  onClick={() => setImageModalIsOpen(true)}
                />
                <FontAwesomeIcon
                  icon={faCropSimple}
                  className='fa'
                  onClick={() => setCropModalIsOpen(true)}
                />
              </>
            ) : (
              <img
                src={defaultProfile}
                alt='Default profile picture'
                className='pd-image'
              />
            )}

            <div>
              <h3>{user.name || user.email.split('@')[0]}</h3>
              <p>Member since {user.createdAt.split('T')[0]}</p>
            </div>
          </div>
        </div>
        <div className='pd-right'>
          <button type='button'>
            <FontAwesomeIcon
              icon={faPenToSquare}
              className='fa'
              onClick={() => setModalIsOpen(true)}
            />
          </button>
        </div>
      </div>
      <div className='profile-info'>
        <div className='info-col'>
          <div className='profile-intro'>
            {user.about && (
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
              <li>
                <FontAwesomeIcon icon={faFaceGrinHearts} className='fa' />
                {user.followers.length}
                {user.followers.length === 1
                  ? ' Person I like'
                  : ' People I like'}
              </li>
              <li>
                <FontAwesomeIcon icon={faFaceGrinStars} className='fa' />
                {user.following.length}
                {user.following.length === 1
                  ? ' Person likes me'
                  : ' People like me'}
              </li>
              <li>
                <FontAwesomeIcon icon={faPeopleArrows} className='fa' />
                {user.matches.length}
                {user.matches.length === 1 ? ' Match' : ' Matches'}
              </li>
              <li>
                <FontAwesomeIcon icon={faCoins} className='fa' />
                {points}
                {points === 1 ? ' Point' : ' Points'}
              </li>
            </ul>
          </div>
          {photos.length > 0 && (
            <div className='profile-intro'>
              <div className='title-box'>
                <h3>Photos</h3>
                <Link to={`/photos/${user._id}`}>All Photos</Link>
              </div>
              <div className='photo-box'>
                {photos.map((p, i) => (
                  <div key={i}>
                    <img src={p} alt='' />
                  </div>
                ))}
              </div>
            </div>
          )}
          {matches.length > 0 && (
            <div className='profile-intro'>
              <div className='title-box'>
                <h3>Matches</h3>
                <Link to='/my-matches'>All Matches</Link>
              </div>
              <small>People I matched with</small>
              <div className='friends-box'>
                {matches.map((m) => (
                  <div key={m._id}>
                    <Link to={`/user/${m._id}`}>
                      <img
                        src={
                          (m.profileImage && m.profileImage.url) ||
                          defaultProfile
                        }
                        alt={`${
                          m.name || m.email.split('@')[0]
                        }'s profile picture`}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          {visitors.length > 0 && (
            <div className='profile-intro'>
              <div className='title-box'>
                <h3>Visitors</h3>
                <Link to='/users-who-visited-me'>All Visitors</Link>
              </div>
              <small>People who checked out my profile</small>
              <div className='friends-box'>
                {visitors.map((v) => (
                  <div key={v._id}>
                    <Link to={`/user/${v._id}`}>
                      <img
                        src={
                          (v.profileImage && v.profileImage.url) ||
                          defaultProfile
                        }
                        alt={`${
                          v.name || v.email.split('@')[0]
                        }'s profile picture`}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className='post-col'>
          <div className='write-post-container'>
            <div className='user-profile'>
              <img
                src={user.profileImage ? user.profileImage.url : defaultProfile}
                alt={`${
                  user.name || user.email.split('@')[0]
                }'s profile picture`}
              />
              <p>{user.name || (user.email && user.email.split('@')[0])}</p>
            </div>
            <div className='post-input-container'>
              <form>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={`What's on your mind, ${
                    user.name
                      ? user.name.split(' ')[0]
                      : user.email && user.email.split('@')[0]
                  }?`}
                />
              </form>
              <div className='write-post-footer'>
                <div className='add-post-links'>
                  <label>
                    {image && image.url ? (
                      <img src={image.url} />
                    ) : (
                      <FontAwesomeIcon icon={faCamera} className='fa' />
                    )}
                    <input
                      onChange={handleImage}
                      type='file'
                      accept='images/*'
                      hidden
                    />
                  </label>
                </div>
                <button
                  onClick={postSubmit}
                  type='submit'
                  className='submit-btn'
                  disabled={!content || uploading}
                >
                  {uploading ? (
                    <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                  ) : (
                    <FontAwesomeIcon icon={faPaperPlane} className='fa' />
                  )}
                  Post
                </button>
              </div>
            </div>
          </div>

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
                            post.postedBy.name ||
                            post.postedBy.email.split('@'[0])
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
                            {post.postedBy.name
                              ? post.postedBy.name
                              : post.postedBy.email.split('@')[0]}
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
                          fetchUserPosts={fetchUserPosts}
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
      <ProfileUpdate
        profileImage={profileImage}
        handleProfileImage={handleProfileImage}
        coverImage={coverImage}
        handleCoverImage={handleCoverImage}
        username={username}
        setUsername={setUsername}
        about={about}
        setAbout={setAbout}
        name={name}
        setName={setName}
        // email={email}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        handleSubmit={handleSubmit}
        loading={loading}
        gender={gender}
        setGender={setGender}
        birthday={birthday}
        setBirthday={setBirthday}
        location={location}
        setLocation={setLocation}
        genderWanted={genderWanted}
        setGenderWanted={setGenderWanted}
        relWanted={relWanted}
        setRelWanted={setRelWanted}
      />
      {user.coverImage && user.coverImage.url && (
        <CropCover
          cropCoverModalIsOpen={cropCoverModalIsOpen}
          setCropCoverModalIsOpen={setCropCoverModalIsOpen}
          coverImage={coverImage}
          setCoverImage={setCoverImage}
          imageUrl={user.coverImage.url}
          crop={crop}
          setCrop={setCrop}
          croppedCover={croppedCover}
          setCroppedCover={setCroppedCover}
          handleSubmit={handleSubmit}
          coverImageCropped={coverImageCropped}
          setCoverImageCropped={setCoverImageCropped}
        />
      )}
      {user.profileImage && user.profileImage.url && (
        <>
          <CropProfilePic
            cropModalIsOpen={cropModalIsOpen}
            setCropModalIsOpen={setCropModalIsOpen}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            imageUrl={user.profileImage.url}
            crop={crop}
            setCrop={setCrop}
            croppedProfile={croppedProfile}
            setCroppedProfile={setCroppedProfile}
            handleSubmit={handleSubmit}
            profileImageCropped={profileImageCropped}
            setProfileImageCropped={setProfileImageCropped}
          />
          <LargeImage
            imageModalIsOpen={imageModalIsOpen}
            setImageModalIsOpen={setImageModalIsOpen}
            imageUrl={user.profileImage.url}
          />
        </>
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
      <SinglePost
        postModalIsOpen={postModalIsOpen}
        setPostModalIsOpen={setPostModalIsOpen}
        post={currentPost}
        fetchUserPosts={fetchUserPosts}
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
        fetchUserPosts={fetchUserPosts}
        fetchUserTotalPosts={fetchUserTotalPosts}
        fetchUserPoints={fetchUserPoints}
      />
    </div>
  );
};

export default Profile;
