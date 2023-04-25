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
  };

  const viewReportedComments = (comments) => {
    setReportedContentModalIsOpen(true);
    setCurrentContent(comments);
  };

  const viewReportedMessages = (messages) => {
    setReportedContentModalIsOpen(true);
    setCurrentContent(messages);
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
            ) : reported.post.length > 1 ? (
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
            ) : (
              reported.post.length == 0 && <>0 posts reported</>
            )}
          </h3>
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
            ) : reported.comment.length > 1 ? (
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
            ) : (
              reported.post.length == 0 && <>0 posts reported</>
            )}
          </h3>
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
            ) : reported.message.length > 1 ? (
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
            ) : (
              reported.message.length == 0 && <>0 messages reported</>
            )}
          </h3>
          <ReportedContent
            reportedContentModalIsOpen={reportedContentModalIsOpen}
            setReportedContentModalIsOpen={setReportedContentModalIsOpen}
            currentContent={currentContent}
          />
        </div>
      )}
    </Modal>
  );
};

export default ReportedData;
