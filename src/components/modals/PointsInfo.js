import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const PointsInfo = ({ pointsInfoModalIsOpen, setPointsInfoModalIsOpen }) => {
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
      isOpen={pointsInfoModalIsOpen}
      onRequestClose={() => setPointsInfoModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='points-info'>
        <h2>Accumulated points can be used in a number of ways</h2>
        <table>
          <tbody>
            <tr>
              <th>Action</th>
              <th>Number of Points</th>
            </tr>
            <tr>
              <td>Logging into the site for the first time in 24 hours</td>
              <td>1 point</td>
            </tr>
            <tr>
              <td>Visit another member's profile for the first time</td>
              <td>1 point</td>
            </tr>
            <tr>
              <td>Send a message to another user for the first time</td>
              <td>2 points</td>
            </tr>
            <tr>
              <td>Submit a new post</td>
              <td>3 points</td>
            </tr>
            <tr>
              <td>Match with another member</td>
              <td>10 points</td>
            </tr>
            <tr>
              <td>Publish your first profile picture</td>
              <td>15 points</td>
            </tr>
            <tr>
              <td>Publish an additional profile picture</td>
              <td>5 points</td>
            </tr>
            <tr>
              <td>
                Get to know another user well (send each other 20 messages)
              </td>
              <td>20 points</td>
            </tr>
            <tr>
              <td>
                Meet up with another member offline (to be validated by them)
              </td>
              <td>30 points</td>
            </tr>
            <tr>
              <td>Complete 100% of your profile page</td>
              <td>35 points</td>
            </tr>
          </tbody>
        </table>
        <br />
        <h2>Accumulated points can also be lost in a number of ways</h2>
        <table>
          <tbody>
            <tr>
              <th>Action</th>
              <th>Number of Points</th>
            </tr>
            <tr>
              <td>Delete a post</td>
              <td>-3 points</td>
            </tr>
            <tr>
              <td>Unmatch with another member</td>
              <td>-10 points</td>
            </tr>
            <tr>
              <td>Delete your first profile picture</td>
              <td>-15 points</td>
            </tr>
            <tr>
              <td>Delete any additional profile pictures</td>
              <td>-5 points</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default PointsInfo;
