import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import PostUpload from '../forms/PostUpload';

Modal.setAppElement('#root');

const EventPostEdit = ({
  postModalIsOpen,
  setPostModalIsOpen,
  post,
  fetchEvent,
}) => {
  const [content, setContent] = useState(post.content);
  const [uploading, setUploading] = useState(false);
  // const [image, setImage] = useState({});
  // const [loadingImg, setLoadingImg] = useState(false);
  const [postImages, setPostImages] = useState([]);

  const { _id, token, name, username, profileImage } = useSelector(
    (state) => state.user
  );

  console.log('postImages => ', postImages);

  const postSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    await axios
      .put(
        `${process.env.REACT_APP_API}/update-event-post/${post._id}`,
        { post, content, postImages, _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
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
        fetchEvent();
        setPostModalIsOpen(false);
        setPostImages([]);
      })
      .catch((err) => console.log(err));
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
    overlay: {
      position: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0, .8)',
      zIndex: '1000',
      overflowY: 'auto',
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
            <PostUpload postImages={postImages} setPostImages={setPostImages} />
            <button
              onClick={postSubmit}
              type='submit'
              className='submit-btn'
              disabled={uploading}
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

export default EventPostEdit;
