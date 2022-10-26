import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const DurationInfo = ({
  durationInfoModalIsOpen,
  setDurationInfoModalIsOpen,
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
      isOpen={durationInfoModalIsOpen}
      onRequestClose={() => setDurationInfoModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='duration-info'>
        <h2 className='center'>
          The duration you choose will affect the incurred cost
        </h2>
        <table>
          <tbody>
            <tr>
              <th>Duration</th>
              <th>Cost</th>
            </tr>
            <tr>
              <td>One day</td>
              <td>€5.00</td>
            </tr>
            <tr>
              <td>One week</td>
              <td>€20.00</td>
            </tr>
            <tr>
              <td>Two weeks</td>
              <td>€30.00</td>
            </tr>
            <tr>
              <td>One month</td>
              <td>€50.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default DurationInfo;
