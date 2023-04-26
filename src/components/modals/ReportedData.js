import React, { useState } from 'react';
import Modal from 'react-modal';
import ReportedContent from './ReportedContent';

Modal.setAppElement('#root');

const ReportedData = ({
  reported,
  reportedDataModalIsOpen,
  setReportedDataModalIsOpen,
  username,
}) => {
  const [reportedContentModalIsOpen, setReportedContentModalIsOpen] =
    useState(false);
  const [currentContent, setCurrentContent] = useState([]);
  const [currentContentType, setCurrentContentType] = useState('');

  const modalStyles = {
    content: {
      position: 'fixed',
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

  const viewReportedPosts = (posts) => {
    setReportedContentModalIsOpen(true);
    setCurrentContent(posts);
    setCurrentContentType('posts');
  };

  const viewReportedComments = (comments) => {
    setReportedContentModalIsOpen(true);
    setCurrentContent(comments);
    setCurrentContentType('comments');
  };

  const viewReportedMessages = (messages) => {
    setReportedContentModalIsOpen(true);
    setCurrentContent(messages);
    setCurrentContentType('messages');
  };

  return (
    <Modal
      isOpen={reportedDataModalIsOpen}
      onRequestClose={() => setReportedDataModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {Object.keys(reported).length !== 0 && (
        <div className='match'>
          <h2>
            {username} has currently been reported{' '}
            <span
              style={{ color: '#ef5b85', fontWeight: 'bold', fontSize: '24px' }}
            >
              {reported.post.length +
                reported.comment.length +
                reported.message.length}
            </span>{' '}
            {reported.post.length +
              reported.comment.length +
              reported.message.length ==
            1
              ? 'time'
              : 'times'}
          </h2>
          {reported.post.length > 0 && (
            <h3>
              They have had{' '}
              {reported.post.length == 1 ? (
                <>
                  <span
                    style={{
                      color: '#ef5b85',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      cursor: 'pointer',
                    }}
                    onClick={() => viewReportedPosts(reported.post)}
                  >
                    {reported.post.length}
                  </span>{' '}
                  post reported
                </>
              ) : (
                reported.post.length > 1 && (
                  <>
                    <span
                      style={{
                        color: '#ef5b85',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        cursor: 'pointer',
                      }}
                      onClick={() => viewReportedPosts(reported.post)}
                    >
                      {reported.post.length}
                    </span>{' '}
                    posts reported
                  </>
                )
              )}
            </h3>
          )}
          {reported.comment.length > 0 && (
            <h3>
              They have had{' '}
              {reported.comment.length == 1 ? (
                <>
                  <span
                    style={{
                      color: '#ef5b85',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      cursor: 'pointer',
                    }}
                    onClick={() => viewReportedComments(reported.comment)}
                  >
                    {reported.comment.length}
                  </span>{' '}
                  comment reported
                </>
              ) : (
                reported.comment.length > 1 && (
                  <>
                    <span
                      style={{
                        color: '#ef5b85',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        cursor: 'pointer',
                      }}
                      onClick={() => viewReportedComments(reported.comment)}
                    >
                      {reported.comment.length}
                    </span>{' '}
                    comments reported
                  </>
                )
              )}
            </h3>
          )}
          {reported.message.length > 0 && (
            <h3>
              They have had{' '}
              {reported.message.length == 1 ? (
                <>
                  <span
                    style={{
                      color: '#ef5b85',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      cursor: 'pointer',
                    }}
                    onClick={() => viewReportedMessages(reported.message)}
                  >
                    {reported.message.length}
                  </span>{' '}
                  message reported
                </>
              ) : (
                reported.message.length > 1 && (
                  <>
                    <span
                      style={{
                        color: '#ef5b85',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        cursor: 'pointer',
                      }}
                      onClick={() => viewReportedMessages(reported.message)}
                    >
                      {reported.message.length}
                    </span>{' '}
                    messages reported
                  </>
                )
              )}
            </h3>
          )}
          <ReportedContent
            reportedContentModalIsOpen={reportedContentModalIsOpen}
            setReportedContentModalIsOpen={setReportedContentModalIsOpen}
            currentContent={currentContent}
            currentContentType={currentContentType}
          />
        </div>
      )}
    </Modal>
  );
};

export default ReportedData;
