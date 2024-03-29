import React from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';

Modal.setAppElement('#root');

const PointsQuestions = ({
  pointsQuestionsModalIsOpen,
  setPointsQuestionsModalIsOpen,
}) => {
  const { membership } = useSelector((state) => state.user);

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
      isOpen={pointsQuestionsModalIsOpen}
      onRequestClose={() => setPointsQuestionsModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='points-info'>
        <h2>
          {membership.paid
            ? 'You can spend your '
            : 'Paid subscribers can spend their '}
          accumulated points in the following ways:
        </h2>
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
              <td>
                Receive a 5% discount on items in the online store{' '}
                <span>(expires in 3 days)</span>
              </td>
              <td>150 points</td>
            </tr>
            <tr>
              <td>
                Receive a 10% discount on items in the online store{' '}
                <span>(expires in 3 days)</span>
              </td>
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
