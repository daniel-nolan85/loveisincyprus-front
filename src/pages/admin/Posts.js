import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashCan,
  faComments,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import PostCommentsAdmin from '../../components/modals/PostCommentsAdmin';
import PostDeleteAdmin from '../../components/modals/PostDeleteAdmin';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [commentsModalIsOpen, setCommentsModalIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postToDelete, setPostToDelete] = useState([]);
  const [postDeleteModalIsOpen, setPostDeleteModalIsOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState([]);
  const [commentDeleteModalIsOpen, setCommentDeleteModalIsOpen] =
    useState(false);
  const [postOfCommentToDelete, setPostOfCommentToDelete] = useState([]);

  const { _id, token } = useSelector((state) => state.user);

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
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const searchPosts = async (e) => {
  //   e.preventDefault();

  //   await axios
  //     .post(
  //       `${process.env.REACT_APP_API}/admin/search-posts/${query}`,
  //       { _id },
  //       {
  //         headers: {
  //           authtoken: token,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       setPosts(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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
    console.log(post.comments);
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
    <div className='container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        {/* <form onSubmit={searchPosts}> */}
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
            // onChange={(e) => {
            //   setQuery(e.target.value);
            //   setSearchResults([]);
            // }}
            value={query}
          />
          <input type='submit' hidden />
        </div>
        {/* </form> */}
        <div className='admin-cards'>
          {posts &&
            posts.filter(searched(query)).map((post) => (
              <div className='admin-card' key={post._id}>
                <div>
                  <h3>
                    {post.postedBy.name || post.postedBy.email.split('@')[0]}
                  </h3>
                  <p>
                    {post.content.length > 100
                      ? `${post.content.substring(0, 100)}...`
                      : post.content}
                  </p>
                </div>
                {post.image && (
                  <img
                    src={post.image.url}
                    alt={`${
                      post.postedBy.name || post.postedBy.email.split('@')[0]
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
