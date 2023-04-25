import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ItemsData = ({
  items,
  itemsOrdered,
  itemsDataModalIsOpen,
  setItemsDataModalIsOpen,
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

  return (
    <Modal
      isOpen={itemsDataModalIsOpen}
      onRequestClose={() => setItemsDataModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {items && items.length > 0 && (
        <div className='match'>
          <h2>
            {username} has currently ordered{' '}
            <span
              style={{ color: '#ef5b85', fontWeight: 'bold', fontSize: '24px' }}
            >
              {itemsOrdered}
            </span>{' '}
            {itemsOrdered == 1 ? 'item' : 'items'}
          </h2>
          {items.map((item) => (
            <div key={item.title} className='items-data-list'>
              <img src={item.image.url} alt='main item image' />
              <p>
                {item.title} x {item.count}
              </p>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default ItemsData;
