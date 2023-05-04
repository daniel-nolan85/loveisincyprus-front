import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

Modal.setAppElement('#root');

const CardinityPending = ({
  cardinityPendingModalIsOpen,
  setCardinityPendingModalIsOpen,
  pendingFormData,
}) => {
  const [url, setUrl] = useState('');
  const [creq, setCreq] = useState('');
  const [id, setId] = useState('');

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (url && creq && id) {
      const sendPendingData = async () => {
        const config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Authorization: `${process.env.REACT_APP_CARDINITY_KEY}`,
          },
        };
        await axios
          .post(url, { creq, id }, config)
          .then(console.log('data sent'));
      };
      sendPendingData();
    }
  }, [url, creq, id]);

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

  const setData = () => {
    setUrl(pendingFormData.threeds2_data.acs_url);
    setCreq(pendingFormData.threeds2_data.creq);
    setId(pendingFormData.id);
  };

  console.log('pendingFormData => ', pendingFormData);
  // const { threeds2_data, id } = pendingFormData;
  // const { acs_url, creq } = threeds2_data;

  return (
    <Modal
      isOpen={cardinityPendingModalIsOpen}
      onRequestClose={() => setCardinityPendingModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {/* <div dangerouslySetInnerHTML={{ __html: pendingFormData }}></div> */}
      {pendingFormData && (
        <>
          <h2 style={{ textAlign: 'center', margin: '10px auto' }}>
            You are about to be redirected to your bank in order to verify this
            transaction.
          </h2>
          {/* <form
            name='ThreeDForm'
            // method='POST'
            // action={pendingFormData.threeds2_data.acs_url}
          > */}
          <button type='button' className='submit-btn' onClick={setData}>
            Continue
          </button>
          {/* <input
              type='hidden'
              name='creq'
              value={pendingFormData.threeds2_data.creq}
              onLoad={() => setCreq(pendingFormData.threeds2_data.creq)}
            />
            <input
              type='hidden'
              name='threeDSSessionData'
              value={pendingFormData.id}
              onLoad={() => setId(pendingFormData.id)}
            />
          </form> */}
        </>
      )}
    </Modal>
  );
};

export default CardinityPending;
