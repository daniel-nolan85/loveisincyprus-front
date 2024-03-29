import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import PostForm from '../../components/forms/PostForm';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import PostList from '../../components/cards/PostList';
import Users from '../../components/cards/Users';
import AddComment from '../../components/modals/AddComment';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Match from '../../components/modals/Match';
import { addPoints } from '../../functions/user';
import io from 'socket.io-client';
import BecomePaid from '../../components/cards/BecomePaid';
import Mobile from '../../components/user/Mobile';
import FreeMembership from '../../components/cards/FreeMembership';
import logo64 from '../../assets/logo64.png';

let socket;

const UserDashboard = () => {
  const [content, setContent] = useState('');
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState({});
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comment, setComment] = useState('');
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [showComments, setShowComments] = useState(-1);
  const [page, setPage] = useState(1);
  const [morePosts, setMorePosts] = useState(true);
  const [match, setMatch] = useState({});
  const [matchModalIsOpen, setMatchModalIsOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState([]);
  const [postDeleteModalIsOpen, setPostDeleteModalIsOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState([]);
  const [commentDeleteModalIsOpen, setCommentDeleteModalIsOpen] =
    useState(false);
  const [postOfCommentToDelete, setPostOfCommentToDelete] = useState([]);
  const [commentEditModalIsOpen, setCommentEditModalIsOpen] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState({});
  const [postOfCommentToEdit, setPostOfCommentToEdit] = useState([]);
  const [followersPosts, setFollowersPosts] = useState(0);
  const [loadingImg, setLoadingImg] = useState(false);
  const [commentReportModalIsOpen, setCommentReportModalIsOpen] =
    useState(false);
  const [commentToReport, setCommentToReport] = useState({});
  const [postOfCommentToReport, setPostOfCommentToReport] = useState([]);
  const [postImages, setPostImages] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  useEffect(() => {
    followersPostsNum();
  }, [page]);

  useEffect(() => {
    socket = io(
      process.env.REACT_APP_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true },
      { secure: true }
    );
  }, []);

  const followersPostsNum = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/followers-posts`,
        { user },
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
        setFollowersPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user && user.token) {
      findUsers();
      newsFeed();
    }
  }, [user && user.token, page]);

  const findUsers = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/find-users`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
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
      .then(async (res) => {
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
        toast.success(`You like ${u.username || u.name}.`, {
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
        await axios.post(
          `${process.env.REACT_APP_API}/send-push-notification`,
          {
            _id: u._id,
            payload: {
              title: 'New Follower',
              body: `${user.username || user.name} is now following you`,
              icon: logo64,
            },
          },
          {
            headers: {
              authtoken: user.token,
            },
          }
        );
        let filtered = users.filter((f) => f._id !== u._id);
        setUsers(filtered);
        findUsers();
        newsFeed();
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

  const newsFeed = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/news-feed/${page}`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setPosts(res.data);
        followersPostsNum();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const infinity = () => {
    let postsLength = posts.length;
    if (postsLength === followersPosts) {
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
          postImages,
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
          setPostImages([]);
          newsFeed();
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

  const handleDelete = async (post) => {
    setPostDeleteModalIsOpen(true);
    setPostToDelete(post);
  };

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

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
      .then(async (res) => {
        newsFeed();
        if (res.data.postedBy !== user._id) {
          socket.emit('like post', res.data);
          await axios.post(
            `${process.env.REACT_APP_API}/send-push-notification`,
            {
              _id: res.data.postedBy,
              payload: {
                title: 'Post Liked',
                body: `${user.username || user.name} liked your post`,
                icon: logo64,
              },
            },
            {
              headers: {
                authtoken: user.token,
              },
            }
          );
        }
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
        newsFeed();
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
      .then(async (res) => {
        toast.success(`Comment added.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setComment('');
        setImage({});
        setCommentModalIsOpen(false);
        newsFeed();
        if (res.data.postedBy._id !== user._id) {
          socket.emit('new comment', res.data);
          await axios.post(
            `${process.env.REACT_APP_API}/send-push-notification`,
            {
              _id: res.data.postedBy._id,
              payload: {
                title: 'New Comment',
                body: `${user.username || user.name} commented on your post`,
                icon: logo64,
              },
            },
            {
              headers: {
                authtoken: user.token,
              },
            }
          );
        }
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

  const reportComment = async (postId, comment) => {
    setCommentReportModalIsOpen(true);
    setCommentToReport(comment);
    setPostOfCommentToReport(postId);
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        <FreeMembership />
        {user.membership.paid ? (
          <>
            <br />
            <h1 className='center'>Members you may be interested in...</h1>
            <Users users={users} handleFollow={handleFollow} />
          </>
        ) : (
          <BecomePaid />
        )}
        <PostForm
          content={content}
          setContent={setContent}
          postSubmit={postSubmit}
          uploading={uploading}
          handleImage={handleImage}
          image={image}
          loadingImg={loadingImg}
          postImages={postImages}
          setPostImages={setPostImages}
        />
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
          <PostList
            posts={posts}
            handleDelete={handleDelete}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            handleComment={handleComment}
            showComments={showComments}
            setShowComments={setShowComments}
            removeComment={removeComment}
            newsFeed={newsFeed}
            postDeleteModalIsOpen={postDeleteModalIsOpen}
            setPostDeleteModalIsOpen={setPostDeleteModalIsOpen}
            postToDelete={postToDelete}
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
        </InfiniteScroll>
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
      </div>
      <RightSidebar />
    </div>
  );
};

export default UserDashboard;
