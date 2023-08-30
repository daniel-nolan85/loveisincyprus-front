import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const SubQuestions = ({
  subQuestionsModalIsOpen,
  setSubQuestionsModalIsOpen,
}) => {
  const currentDate = new Date();
  const expiryDate = new Date('2024-01-01');

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
      isOpen={subQuestionsModalIsOpen}
      onRequestClose={() => setSubQuestionsModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='points-info'>
        <h2>
          Duration and cost of subscriptions come in the following options:
        </h2>
        <div className='sub-table'>
          <table>
            <tbody>
              <tr>
                <th>Duration</th>
                <th>Cost</th>
              </tr>
              <tr>
                <td>One month</td>
                <td>{currentDate < expiryDate ? '€5.00' : '€10.00'}</td>
              </tr>
              <tr>
                <td>Six months</td>
                <td>€50.00</td>
              </tr>
              <tr>
                <td>One year</td>
                <td>€90.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default SubQuestions;
