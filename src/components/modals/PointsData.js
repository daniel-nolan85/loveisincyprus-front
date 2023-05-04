import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const PointsData = ({
  pointsData,
  pointsDataModalIsOpen,
  setPointsDataModalIsOpen,
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

  const { sumPointsGained, sumPointsLost, sumPointsSpent } = pointsData;

  return (
    <Modal
      isOpen={pointsDataModalIsOpen}
      onRequestClose={() => setPointsDataModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h2>
          {username} currently has an accumulated total of{' '}
          <span
            style={{ color: '#ef5b85', fontWeight: 'bold', fontSize: '24px' }}
          >
            {sumPointsGained - sumPointsLost - sumPointsSpent}
          </span>{' '}
          {sumPointsGained - sumPointsLost - sumPointsSpent == 1
            ? 'point'
            : 'points'}
        </h2>
        <h3>
          They have gained{' '}
          <span
            style={{ color: 'green', fontWeight: 'bold', fontSize: '18px' }}
          >
            {sumPointsGained}
          </span>{' '}
          {sumPointsGained == 1 ? 'point' : 'points'}
        </h3>
        <h3>
          They have lost{' '}
          <span style={{ color: 'red', fontWeight: 'bold', fontSize: '18px' }}>
            {sumPointsLost}
          </span>{' '}
          {sumPointsLost == 1 ? 'point' : 'points'}
        </h3>
        <h3>
          They have spent{' '}
          <span style={{ color: 'blue', fontWeight: 'bold', fontSize: '18px' }}>
            {sumPointsSpent}
          </span>{' '}
          {sumPointsSpent == 1 ? 'point' : 'points'}
        </h3>
      </div>
    </Modal>
  );
};

export default PointsData;
