import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faSpinner,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AddComment = ({
  commentModalIsOpen,
  setCommentModalIsOpen,
  comment,
  setComment,
  uploading,
  addComment,
  image,
  handleImage,
  loadingImg,
}) => {
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
      isOpen={commentModalIsOpen}
      onRequestClose={() => setCommentModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='write-comment-container'>
        <div className='comment-input-container'>
          <form>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Write a comment...'
              rows={3}
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
                    <FontAwesomeIcon
                      icon={faCamera}
                      className='fa'
                    ></FontAwesomeIcon>
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
              onClick={addComment}
              type='submit'
              className='submit-btn'
              disabled={!comment || uploading}
            >
              {uploading ? (
                <FontAwesomeIcon icon={faSpinner} className='fa' spin />
              ) : (
                <FontAwesomeIcon icon={faPaperPlane} className='fa' />
              )}
              Comment
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddComment;
