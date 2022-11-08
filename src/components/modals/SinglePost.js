import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCamera,
  faSpinner,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const SinglePost = ({
  postModalIsOpen,
  setPostModalIsOpen,
  post,
  newsFeed,
  fetchUserPosts,
  setNotifModalIsOpen,
}) => {
  const [content, setContent] = useState(post.content);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState({});
  const [loadingImg, setLoadingImg] = useState(false);

  const { token, _id, name, profileImage, username } = useSelector(
    (state) => state.user
  );

  const postSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    await axios
      .put(
        `${process.env.REACT_APP_API}/update-post/${post._id}`,
        { post, content, image, _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setUploading(false);

        if (res.data.error) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.success(`Post updated.`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        newsFeed && newsFeed();
        fetchUserPosts && fetchUserPosts();
        setPostModalIsOpen(false);
        setImage({});
        setNotifModalIsOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('image', file);
    setLoadingImg(true);

    await axios
      .post(`${process.env.REACT_APP_API}/upload-image`, formData, {
        headers: {
          authtoken: token,
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

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
    },
  };

  return (
    <Modal
      isOpen={postModalIsOpen}
      onRequestClose={() => setPostModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='write-post-container'>
        <div className='user-profile'>
          <Link to={`/user/profile/${_id}`}>
            <img
              src={profileImage ? profileImage.url : defaultProfile}
              alt={`${username || name}'s profile pic`}
            />
          </Link>
          <Link to={`/user/profile/${_id}`}>
            <p>{username || name}</p>
          </Link>
        </div>
        <div className='post-input-container'>
          <form>
            <textarea
              defaultValue={post.content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`What's on your mind, ${username || name}?`}
            />
          </form>
          <div className='write-post-footer'>
            <div className='add-post-links'>
              {loadingImg ? (
                <FontAwesomeIcon icon={faSpinner} className='fa' spin />
              ) : (
                <label>
                  {image && image.url ? (
                    <img src={image.url} alt='uploaded' />
                  ) : post.image && post.image.url ? (
                    <img src={post.image.url} alt='uploaded' />
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
              )}
            </div>
            <button
              onClick={postSubmit}
              type='submit'
              className='submit-btn'
              disabled={uploading || !content}
            >
              {uploading ? (
                <FontAwesomeIcon icon={faSpinner} className='fa' spin />
              ) : (
                <FontAwesomeIcon icon={faPaperPlane} className='fa' />
              )}
              Update
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SinglePost;
