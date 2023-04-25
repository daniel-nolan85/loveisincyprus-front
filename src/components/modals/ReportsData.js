import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ReportsData = ({
  reports,
  reportsDataModalIsOpen,
  setReportsDataModalIsOpen,
  username,
}) => {
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
    console.log('posts => ', posts);
  };

  const viewReportedComments = (comments) => {
    console.log('comments => ', comments);
  };

  const viewReportedMessages = (messages) => {
    console.log('messages => ', messages);
  };

  console.log('reports => ', reports);

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
            ) : reports.post.length > 1 ? (
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
            ) : (
              reports.post.length == 0 && <>0 posts</>
            )}
          </h3>
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
            ) : reports.comment.length > 1 ? (
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
            ) : (
              reports.comment.length == 0 && <>0 comments</>
            )}
          </h3>
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
            ) : reports.message.length > 1 ? (
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
            ) : (
              reports.message.length == 0 && <>0 messages</>
            )}
          </h3>
        </div>
      )}
    </Modal>
  );
};

export default ReportsData;
