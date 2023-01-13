import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SingleEvent from '../../components/cards/SingleEvent';
import PostForm from '../../components/forms/PostForm';
import { addPoints } from '../../functions/user';
import { toast } from 'react-toastify';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import EventPostList from '../../components/cards/EventPostList';
import AddComment from '../../components/modals/AddComment';
import io from 'socket.io-client';
import { ChatState } from '../../context/ChatProvider';
import Mobile from '../../components/user/Mobile';

let socket;

const EventInfo = () => {
  const [event, setEvent] = useState({});
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState({});
  const [comment, setComment] = useState('');
  const [currentPost, setCurrentPost] = useState({});
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
  const [showComments, setShowComments] = useState(-1);
  const [postToDelete, setPostToDelete] = useState([]);
  const [postDeleteModalIsOpen, setPostDeleteModalIsOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState([]);
  const [eventCommentDeleteModalIsOpen, setEventCommentDeleteModalIsOpen] =
    useState(false);
  const [postOfCommentToDelete, setPostOfCommentToDelete] = useState([]);
  const [eventCommentEditModalIsOpen, setEventCommentEditModalIsOpen] =
    useState(false);
  const [commentToEdit, setCommentToEdit] = useState({});
  const [postOfCommentToEdit, setPostOfCommentToEdit] = useState([]);
  const [loadingImg, setLoadingImg] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  let params = useParams();

  const { socketConnected, setSocketConnected } = ChatState();

  useEffect(() => {
    socket = io(
      process.env.REACT_APP_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true }
    );
  }, []);

  useEffect(() => {
    if (user && user.token) {
      fetchEvent();
    }
  }, [user && user.token, params]);

  const fetchEvent = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-event`,
        { params, user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log('event ==> ', res.data);
        setEvent(res.data);
      });
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    await axios
      .post(
        `${process.env.REACT_APP_API}/create-event-post`,
        {
          content,
          image,
          user,
          event,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setUploading(false);
        addPoints(3, 'event post', user.token);
        if (res.data.error) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.success(`Event post added. You have been awarded 3 points!`, {
            position: toast.POSITION.TOP_CENTER,
          });
          console.log('post submit => ', res.data);
          setContent('');
          setImage({});
          fetchEvent();
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

  const handleLike = async (_id) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/like-event-post`,
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
        fetchEvent();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnlike = async (_id) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/unlike-event-post`,
        { _id, user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        fetchEvent();
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
        `${process.env.REACT_APP_API}/add-event-comment`,
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
        fetchEvent();
        if (res.data.postedBy._id !== user._id) {
          socket.emit('new comment', res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeComment = async (postId, comment) => {
    setEventCommentDeleteModalIsOpen(true);
    setPostOfCommentToDelete(postId);
    setCommentToDelete(comment);
  };

  const editComment = async (postId, comment) => {
    setEventCommentEditModalIsOpen(true);
    setCommentToEdit(comment);
    setPostOfCommentToEdit(postId);
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        <SingleEvent event={event} fetchEvent={fetchEvent} />
        <PostForm
          content={content}
          setContent={setContent}
          postSubmit={postSubmit}
          uploading={uploading}
          handleImage={handleImage}
          image={image}
          loadingImg={loadingImg}
        />
        <EventPostList
          posts={event.post}
          handleDelete={handleDelete}
          handleLike={handleLike}
          handleUnlike={handleUnlike}
          handleComment={handleComment}
          showComments={showComments}
          setShowComments={setShowComments}
          removeComment={removeComment}
          fetchEvent={fetchEvent}
          postDeleteModalIsOpen={postDeleteModalIsOpen}
          setPostDeleteModalIsOpen={setPostDeleteModalIsOpen}
          postToDelete={postToDelete}
          eventCommentDeleteModalIsOpen={eventCommentDeleteModalIsOpen}
          setEventCommentDeleteModalIsOpen={setEventCommentDeleteModalIsOpen}
          commentToDelete={commentToDelete}
          postOfCommentToDelete={postOfCommentToDelete}
          editComment={editComment}
          eventCommentEditModalIsOpen={eventCommentEditModalIsOpen}
          setEventCommentEditModalIsOpen={setEventCommentEditModalIsOpen}
          commentToEdit={commentToEdit}
          postOfCommentToEdit={postOfCommentToEdit}
        />
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
      </div>
      <RightSidebar />
    </div>
  );
};

export default EventInfo;
