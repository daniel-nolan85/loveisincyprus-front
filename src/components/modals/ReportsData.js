import React, { useState } from 'react';
import Modal from 'react-modal';
import ReportedContent from './ReportedContent';

Modal.setAppElement('#root');

const ReportsData = ({
  reports,
  reportsDataModalIsOpen,
  setReportsDataModalIsOpen,
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
      isOpen={reportsDataModalIsOpen}
      onRequestClose={() => setReportsDataModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {Object.keys(reports).length !== 0 && (
        <div className='match'>
          <h2>
            {username} has currently reported{' '}
            <span
              style={{ color: '#ef5b85', fontWeight: 'bold', fontSize: '24px' }}
            >
              {reports.post.length +
                reports.comment.length +
                reports.message.length}
            </span>{' '}
            {reports.post.length +
              reports.comment.length +
              reports.message.length ==
            1
              ? 'item'
              : 'items'}
          </h2>
          {reports.post.length > 0 && (
            <h3>
              They have reported{' '}
              {reports.post.length == 1 ? (
                <>
                  <span
                    style={{
                      color: '#ef5b85',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      cursor: 'pointer',
                    }}
                    onClick={() => viewReportedPosts(reports.post)}
                  >
                    {reports.post.length}
                  </span>{' '}
                  post
                </>
              ) : (
                reports.post.length > 1 && (
                  <>
                    <span
                      style={{
                        color: '#ef5b85',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        cursor: 'pointer',
                      }}
                      onClick={() => viewReportedPosts(reports.post)}
                    >
                      {reports.post.length}
                    </span>{' '}
                    posts
                  </>
                )
              )}
            </h3>
          )}
          {reports.comment.length > 0 && (
            <h3>
              They have reported{' '}
              {reports.comment.length == 1 ? (
                <>
                  <span
                    style={{
                      color: '#ef5b85',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      cursor: 'pointer',
                    }}
                    onClick={() => viewReportedComments(reports.comment)}
                  >
                    {reports.comment.length}
                  </span>{' '}
                  comment
                </>
              ) : (
                reports.comment.length > 1 && (
                  <>
                    <span
                      style={{
                        color: '#ef5b85',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        cursor: 'pointer',
                      }}
                      onClick={() => viewReportedComments(reports.comment)}
                    >
                      {reports.comment.length}
                    </span>{' '}
                    comments
                  </>
                )
              )}
            </h3>
          )}
          {reports.message.length > 0 && (
            <h3>
              They have reported{' '}
              {reports.message.length == 1 ? (
                <>
                  <span
                    style={{
                      color: '#ef5b85',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      cursor: 'pointer',
                    }}
                    onClick={() => viewReportedMessages(reports.message)}
                  >
                    {reports.message.length}
                  </span>{' '}
                  message
                </>
              ) : (
                reports.message.length > 1 && (
                  <>
                    <span
                      style={{
                        color: '#ef5b85',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        cursor: 'pointer',
                      }}
                      onClick={() => viewReportedMessages(reports.message)}
                    >
                      {reports.message.length}
                    </span>{' '}
                    messages
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

export default ReportsData;
