import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import renderHtml from 'react-render-html';
import { Link } from 'react-router-dom';
import defaultProfile from '../../assets/defaultProfile.png';
import moment from 'moment';
import LargePostImage from './LargePostImage';

Modal.setAppElement('#root');

const ReportedContent = ({
  reportedContentModalIsOpen,
  setReportedContentModalIsOpen,
  currentContent,
}) => {
  const [currentPost, setCurrentPost] = useState({});
  const [postImageModalIsOpen, setPostImageModalIsOpen] = useState(false);

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

  const viewImages = (post) => {
    setCurrentPost(post);
    setPostImageModalIsOpen(true);
  };

  console.log('currentContent => ', currentContent);

  return (
    <Modal
      isOpen={reportedContentModalIsOpen}
      onRequestClose={() => setReportedContentModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {currentContent &&
      currentContent.length > 0 &&
      currentContent.some((obj) => obj.hasOwnProperty('sender'))
        ? currentContent.map((m) => (
            <div className='post-container' key={m._id}>
              <div className='post-row'>
                <div className='user-profile'>
                  <Link to={`/user/${m.sender._id}`}>
                    <img
                      src={
                        m.sender.profileImage
                          ? m.sender.profileImage.url
                          : defaultProfile
                      }
                      alt={`${
                        m.sender.username || m.sender.name
                      }'s profile picture`}
                    />
                  </Link>
                  <div>
                    <Link to={`/user/${m.sender._id}`}>
                      <p>{m.sender.username || m.sender.name}</p>
                    </Link>
                    <span>{moment(m.createdAt).fromNow()}</span>
                  </div>
                </div>
              </div>
              <p className='post-text'>{m.content && renderHtml(m.content)}</p>
              {m.image && (
                <img
                  src={m.image.url}
                  alt='message image'
                  className='post-img'
                />
              )}
            </div>
          ))
        : currentContent &&
          currentContent.length > 0 &&
          currentContent.some((obj) => !obj.hasOwnProperty('sender')) &&
          currentContent.some((obj) => obj.hasOwnProperty('content'))
        ? currentContent.map((p) => (
            <div className='post-container' key={p._id}>
              <div className='post-row'>
                <div className='user-profile'>
                  <Link to={`/user/${p.postedBy._id}`}>
                    <img
                      src={
                        p.postedBy.profileImage
                          ? p.postedBy.profileImage.url
                          : defaultProfile
                      }
                      alt={`${
                        p.postedBy.username || p.postedBy.name
                      }'s profile picture`}
                    />
                  </Link>
                  <div>
                    <Link to={`/user/${p.postedBy._id}`}>
                      <p>{p.postedBy.username || p.postedBy.name}</p>
                    </Link>
                    <span>{moment(p.createdAt).fromNow()}</span>
                  </div>
                </div>
              </div>
              <p className='post-text'>{p.content}</p>
              {p.postImages && p.postImages.length > 0 && (
                <img
                  src={p.postImages[0].url}
                  alt={`${p.postedBy.username || p.postedBy.name}'s post`}
                  className='post-img'
                  style={{ cursor: 'zoom-in' }}
                  onClick={() => viewImages(p)}
                />
              )}
            </div>
          ))
        : currentContent &&
          currentContent.length > 0 &&
          currentContent.some((obj) => obj.hasOwnProperty('text')) &&
          currentContent.map((comment) =>
            comment.comments.map((c) => (
              <div className='post-container' key={c._id}>
                <div className='post-row'>
                  <div className='user-profile'>
                    <Link to={`/user/${c.postedBy._id}`}>
                      <img
                        src={
                          c.postedBy.profileImage
                            ? c.postedBy.profileImage.url
                            : defaultProfile
                        }
                        alt={`${
                          c.postedBy.username || c.postedBy.name
                        }'s profile picture`}
                      />
                    </Link>
                    <div>
                      <Link to={`/user/${c.postedBy._id}`}>
                        <p>{c.postedBy.username || c.postedBy.name}</p>
                      </Link>
                      <span>{moment(c.created).fromNow()}</span>
                    </div>
                  </div>
                </div>
                <p className='post-text'>{c.text}</p>
                {c.image && (
                  <img
                    src={c.image.url}
                    alt={`${c.postedBy.username || c.postedBy.name}'s post`}
                    className='post-img'
                  />
                )}
              </div>
            ))
          )}
      <LargePostImage
        postImageModalIsOpen={postImageModalIsOpen}
        setPostImageModalIsOpen={setPostImageModalIsOpen}
        post={currentPost}
      />
    </Modal>
  );
};

export default ReportedContent;
