import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AddressList = ({
  addressListModalIsOpen,
  setAddressListModalIsOpen,
  address,
  setUserAddress,
}) => {
  const modalStyles = {
    content: {
      top: '100%',
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
      isOpen={addressListModalIsOpen}
      onRequestClose={() => setAddressListModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {address &&
        address.map((a, i) => (
          <div className='center address-list' key={i}>
            <div className='address'>
              <p>{a.firstLine}</p>
              <p>{a.secondLine}</p>
              <p>{a.city}</p>
              <p>{a.state}</p>
              <p>{a.zip}</p>
              <p>{a.country}</p>
            </div>
            <div className='select'>
              <label>Select address</label>
              <input
                type='radio'
                onChange={() => {
                  setAddressListModalIsOpen(false);
                  setUserAddress(a);
                }}
              />
            </div>
          </div>
        ))}
    </Modal>
  );
};

export default AddressList;
