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
import { ChatState } from '../../context/ChatProvider';
// import NotifPost from '../../components/modals/NotifPost';

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
  const [totalPosts, setTotalPosts] = useState(0);
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

  const { user } = useSelector((state) => ({ ...state }));

  const {
    socketConnected,
    setSocketConnected,
    // thisPost,
    // setThisPost,
    // notifModalIsOpen,
    // setNotifModalIsOpen,
  } = ChatState();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   axios.get(`${process.env.REACT_APP_API}/total-posts`).then((res) => {
  //     setTotalPosts(res.data);
  //   });
  // }, [page]);

  useEffect(() => {
    followersPostsNum();
  }, [page]);

  useEffect(() => {
    socket = io(
      process.env.REACT_APP_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true }
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
        // console.log(res.data);
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
      .then((res) => {
        if (res.data.matches.includes(u._id)) {
          setMatchModalIsOpen(true);
          setMatch(u);
          addPoints(15, 'match', user.token);
          toast.success(
            `You matched with ${
              u.name || u.email.split('@')[0]
            }. You have been awarded 15 points!`,
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        }
        toast.success(`You like ${u.name ? u.name : u.email.split('@')[0]}.`, {
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
        let filtered = users.filter((f) => f._id !== u._id);
        setUsers(filtered);
        findUsers();
        newsFeed();
      })
      .catch((err) => {
        console.log(err);
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
          // console.log('post submit => ', res.data);
          setContent('');
          setImage({});
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
        console.log(res.data);
        if (res.data.postedBy !== user._id) {
          socket.emit('like post', res.data);
        }
        newsFeed();
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
      .then((res) => {
        toast.success(`Comment added.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setComment('');
        setImage({});
        setCommentModalIsOpen(false);
        newsFeed();
        if (res.data.postedBy._id !== user._id) {
          socket.emit('new comment', res.data);
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

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Users users={users} handleFollow={handleFollow} />
        <PostForm
          content={content}
          setContent={setContent}
          postSubmit={postSubmit}
          uploading={uploading}
          handleImage={handleImage}
          image={image}
        />
        {}
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
        />
        <Match
          matchModalIsOpen={matchModalIsOpen}
          setMatchModalIsOpen={setMatchModalIsOpen}
          match={match}
        />
        {/* <NotifPost
          notifModalIsOpen={notifModalIsOpen}
          setNotifModalIsOpen={setNotifModalIsOpen}
          post={thisPost}
          handleDelete={handleDelete}
          handleLike={handleLike}
          handleUnlike={handleUnlike}
          handleComment={handleComment}
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
        /> */}
      </div>
      <RightSidebar />
    </div>
  );
};

export default UserDashboard;
