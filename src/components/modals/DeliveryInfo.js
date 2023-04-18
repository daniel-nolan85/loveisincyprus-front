import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const DeliveryInfo = ({
  deliveryInfoModalIsOpen,
  setDeliveryInfoModalIsOpen,
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
      isOpen={deliveryInfoModalIsOpen}
      onRequestClose={() => setDeliveryInfoModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='why-do-we-need-this'>
        <h2 className='center'>
          Your delivery fee is calculated by the accumulated weight of the items
          you have selected to purchase.
        </h2>
        <p>
          Delivery fees are applicable to orders delivered within the Republic
          of Cyprus only.
        </p>
        <p>
          We are not currently able to deliver to locations outside of this
          region.
        </p>
      </div>
    </Modal>
  );
};

export default DeliveryInfo;
