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
  loadingImg,
}) => {
  let { _id, profileImage, name, username } = useSelector(
    (state) => state.user
  );

  return (
    <div className='write-post-container'>
      <div className='user-profile'>
        <Link to={`/user/profile/${_id}`}>
          <img
            src={profileImage ? profileImage.url : defaultProfile}
            alt={`${username || name}'s profile picture`}
          />
        </Link>
        <Link to={`/user/profile/${_id}`}>
          <p>{username || name}</p>
        </Link>
      </div>
      <div className='post-input-container'>
        <form>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${
              username || name.split(' ')[0]
            }?`}
          />
        </form>
        <div className='write-post-footer'>
          <div className='add-post-links'>
            {loadingImg ? (
              <FontAwesomeIcon icon={faSpinner} className='fa' spin />
            ) : (
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
            )}
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
