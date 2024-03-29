import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashCan,
  faComments,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import PostCommentsAdmin from '../../components/modals/PostCommentsAdmin';
import PostDeleteAdmin from '../../components/modals/PostDeleteAdmin';

const Posts = ({ history }) => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [commentsModalIsOpen, setCommentsModalIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [postToDelete, setPostToDelete] = useState([]);
  const [postDeleteModalIsOpen, setPostDeleteModalIsOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState([]);
  const [commentDeleteModalIsOpen, setCommentDeleteModalIsOpen] =
    useState(false);
  const [postOfCommentToDelete, setPostOfCommentToDelete] = useState([]);

  const { _id, token, canPosts } = useSelector((state) => state.user);

  useEffect(() => {
    if (!canPosts) {
      history.push('/admin/dashboard');
    }
  }, []);

  useEffect(() => {
    if (token) {
      newsFeed();
    }
  }, [token]);

  const newsFeed = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/posts`,
        { _id },
        {
          headers: {
            authtoken: token,
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

  const handleDelete = async (post) => {
    setPostDeleteModalIsOpen(true);
    setPostToDelete(post);
  };

  const removeComment = (postId, comment) => {
    setCommentDeleteModalIsOpen(true);
    setPostOfCommentToDelete(postId);
    setCommentToDelete(comment);
  };

  const showComments = (post) => {
    setCurrentPost(post);
    setCommentsModalIsOpen(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value.toLowerCase());
  };

  const searched = (query) => (q) =>
    q.content.toLowerCase().includes(query) ||
    (q.postedBy.name && q.postedBy.name.toLowerCase().includes(query)) ||
    (q.postedBy.email && q.postedBy.email.toLowerCase().includes(query)) ||
    (q.postedBy.username && q.postedBy.username.toLowerCase().includes(query));

  return (
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        <div className='search-box'>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            onClick={handleSearch}
            className='fa'
          />
          <input
            type='search'
            placeholder='Search Posts'
            onChange={handleSearch}
            value={query}
          />
          <input type='submit' hidden />
        </div>
        <div className='admin-cards'>
          {posts &&
            posts.filter(searched(query)).map((post) => (
              <div className='admin-card' key={post._id}>
                <div>
                  <h3>{post.postedBy.username || post.postedBy.name}</h3>
                  <p>
                    {post.content.length > 100
                      ? `${post.content.substring(0, 100)}...`
                      : post.content}
                  </p>
                </div>
                {post.postImages && post.postImages.length > 0 && (
                  <img
                    src={post.postImages[0].url}
                    alt={`${
                      post.postedBy.username || post.postedBy.name
                    }'s post`}
                    className='admin-post-img'
                  />
                )}
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className='fa trash'
                  onClick={() => handleDelete(post)}
                />
                {post.comments.length > 0 && (
                  <FontAwesomeIcon
                    icon={faComments}
                    className='fa comments'
                    onClick={() => showComments(post)}
                  />
                )}
              </div>
            ))}
        </div>
        <PostCommentsAdmin
          commentsModalIsOpen={commentsModalIsOpen}
          setCommentsModalIsOpen={setCommentsModalIsOpen}
          post={currentPost}
          removeComment={removeComment}
          newsFeed={newsFeed}
          commentDeleteModalIsOpen={commentDeleteModalIsOpen}
          setCommentDeleteModalIsOpen={setCommentDeleteModalIsOpen}
          commentToDelete={commentToDelete}
          postOfCommentToDelete={postOfCommentToDelete}
        />
        <PostDeleteAdmin
          postDeleteModalIsOpen={postDeleteModalIsOpen}
          setPostDeleteModalIsOpen={setPostDeleteModalIsOpen}
          postToDelete={postToDelete}
          newsFeed={newsFeed}
        />
      </div>
    </div>
  );
};

export default Posts;
