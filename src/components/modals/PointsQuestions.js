import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const PointsQuestions = ({
  pointsQuestionsModalIsOpen,
  setPointsQuestionsModalIsOpen,
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
      isOpen={pointsQuestionsModalIsOpen}
      onRequestClose={() => setPointsQuestionsModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='points-info'>
        <h2>How can I spend my accumulated points?</h2>
        <table>
          <tbody>
            <tr>
              <th>Reward</th>
              <th>Number of Points</th>
            </tr>
            <tr>
              <td>Become a featured member on the home page for 2 weeks</td>
              <td>100 points</td>
            </tr>
            <tr>
              <td>Receive a 5% discount on items in the online store</td>
              <td>150 points</td>
            </tr>
            <tr>
              <td>Receive a 10% discount on items in the online store</td>
              <td>250 points</td>
            </tr>
            <tr>
              <td>Become eligible to be invited to an offline event</td>
              <td>300 points</td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <p>
          Once points have been spent they will be removed from your accumulated
          total.
        </p>
      </div>
    </Modal>
  );
};

export default PointsQuestions;
