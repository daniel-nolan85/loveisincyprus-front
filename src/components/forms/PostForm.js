import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCamera,
  faSpinner,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import defaultProfile from '../../assets/defaultProfile.png';
import { Link } from 'react-router-dom';

const PostForm = ({
  content,
  setContent,
  postSubmit,
  uploading,
  handleImage,
  image,
  update,
}) => {
  let { user } = useSelector((state) => ({ ...state }));

  return (
    <div className='write-post-container'>
      <div className='user-profile'>
        <Link to={`/user/profile/${user._id}`}>
          <img
            src={user.profileImage ? user.profileImage.url : defaultProfile}
            alt={`${user.name || user.email.split('@')[0]}'s profile picture`}
          />
        </Link>
        <Link to={`/user/profile/${user._id}`}>
          <p>{user.name || (user.email && user.email.split('@')[0])}</p>
        </Link>
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
  );
};

export default PostForm;
