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

const CommentEdit = ({
  commentEditModalIsOpen,
  setCommentEditModalIsOpen,
  commentToEdit,
  fetchUserPosts,
  newsFeed,
  fetchThisUsersPosts,
  postOfCommentToEdit,
}) => {
  const [text, setText] = useState(commentToEdit.text);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState({});

  const { user } = useSelector((state) => ({ ...state }));

  const updateComment = async (postId, comment) => {
    setUploading(true);

    await axios
      .put(
        `${process.env.REACT_APP_API}/update-comment`,
        { postId, comment, text, image, user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setUploading(false);
        console.log(res.data);

        if (res.data.error) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.success(`Comment updated.`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        newsFeed && newsFeed();
        fetchUserPosts && fetchUserPosts();
        fetchThisUsersPosts && fetchThisUsersPosts();
        setCommentEditModalIsOpen(false);
        setImage({});
      })
      .catch((err) => console.log(err));
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
      isOpen={commentEditModalIsOpen}
      onRequestClose={() => setCommentEditModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='write-comment-container'>
        <div className='comment-input-container'>
          <form>
            <textarea
              defaultValue={commentToEdit.text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Write a comment...'
              rows={3}
            />
          </form>
          <div className='write-post-footer'>
            <div className='add-post-links'>
              <label>
                {image && image.url ? (
                  <img src={image.url} />
                ) : commentToEdit.image && commentToEdit.image.url ? (
                  <img src={commentToEdit.image.url} />
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
              onClick={() => updateComment(postOfCommentToEdit, commentToEdit)}
              type='submit'
              className='submit-btn'
              //   disabled={!comment || uploading}
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

export default CommentEdit;
