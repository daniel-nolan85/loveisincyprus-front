import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ItemsValueData = ({
  items,
  itemsOrderedValue,
  itemsValueDataModalIsOpen,
  setItemsValueDataModalIsOpen,
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

  console.log('items => ', items);

  return (
    <Modal
      isOpen={itemsValueDataModalIsOpen}
      onRequestClose={() => setItemsValueDataModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {items && items.length > 0 && (
        <div className='match'>
          <h2>
            {username} has currently ordered items to an accumulated total of{' '}
            <span
              style={{ color: '#ef5b85', fontWeight: 'bold', fontSize: '24px' }}
            >
              €{itemsOrderedValue.toFixed(2)}
            </span>{' '}
          </h2>
          {items.map((item) => (
            <div key={item.title} className='items-data-list'>
              <img src={item.image.url} alt='main item image' />
              <p>
                {item.title} -{' '}
                <span
                  style={{
                    color: '#ef5b85',
                    fontWeight: 'bold',
                  }}
                >
                  €{item.price.toFixed(2)}
                </span>{' '}
                x {item.count} ={' '}
                <span
                  style={{
                    color: '#ef5b85',
                    fontWeight: 'bold',
                    fontSize: '18px',
                  }}
                >
                  €{(item.price * item.count).toFixed(2)}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default ItemsValueData;
