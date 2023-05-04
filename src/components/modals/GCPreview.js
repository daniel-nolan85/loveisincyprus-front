import React, { useState } from 'react';
import Modal from 'react-modal';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

Modal.setAppElement('#root');

const GCPreview = ({
  greeting,
  image,
  message,
  amount,
  previewGCModalIsOpen,
  setPreviewGCModalIsOpen,
}) => {
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);

  let { username, name, _id } = useSelector((state) => state.user);
  let date = new Date();
  date.setDate(date.getDate() + 7);

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
      padding: '0',
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
      isOpen={previewGCModalIsOpen}
      onRequestClose={() => setPreviewGCModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='gift-card gc-preview'>
        <h1 className='center'>
          {deviceSize > 1280 ? 'Hover' : 'Touch'} card to open
        </h1>
        <div className='card'>
          <div className='outside'>
            <div className='front'>
              <p>{greeting}</p>
              {image.url && <img src={image.url} alt='Your gift card image' />}
            </div>
            <div className='back'></div>
          </div>
          <div className='inside'>
            <p>{message}</p>
            <div className='coupon-card'>
              <img src={logo} className='logo' />
              <h3>
                Please enjoy €{amount} to spend in our online store, courtesy of{' '}
                <Link to={`/user/profile/${_id}`} className='link'>
                  {username || name}
                </Link>
              </h3>
              <div className='coupon-row'>
                <span id='cpnCode'>GIFTCODE</span>
                <span id='cpnBtn'>COPY CODE</span>
              </div>
              <br />
              <p>Valid until: {moment(date).format('MMMM Do YYYY')}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GCPreview;
