import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import PostUpload from '../forms/PostUpload';
import { Select } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';

const { Option } = Select;

Modal.setAppElement('#root');

const RefundRequest = ({
  requestRefundModalIsOpen,
  setRequestRefundModalIsOpen,
  setResponseRefundModalIsOpen,
  currentOrder,
  loadUserOrders,
}) => {
  const [items, setItems] = useState([]);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [refundImages, setRefundImages] = useState([]);
  const [amountRequested, setAmountRequested] = useState(0);

  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    const priceArray = items.map((item) => parseFloat(item.split(',')[1]));
    const priceSum = priceArray.reduce((acc, curr) => acc + curr, 0);
    const tenPercent = priceSum * 0.1;
    const calc = priceSum - tenPercent;
    setAmountRequested(calc.toFixed(2));
  }, [items]);

  const requestSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post(
        `${process.env.REACT_APP_API}/request-refund`,
        {
          _id,
          items,
          reason,
          refundImages,
          amountRequested,
          orderedBy,
          paymentIntent,
        },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setLoading(false);

        if (res.data.error) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.success(`Request submitted.`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        setItems([]);
        setRequestRefundModalIsOpen(false);
        setReason('');
        setRefundImages([]);
        loadUserOrders();
        setResponseRefundModalIsOpen(true);
      })
      .catch((err) => console.log(err));
  };

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

  const { _id, createdAt, products, orderedBy, paymentIntent } = currentOrder;

  console.log('currentOrder => ', currentOrder);

  return (
    <Modal
      isOpen={requestRefundModalIsOpen}
      onRequestClose={() => setRequestRefundModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {products && products.length && (
        <>
          <h2 className='center'>
            You are entitled to claim a refund on this order until{' '}
            {moment(createdAt).add(2, 'weeks').format('MMMM Do YYYY')}
          </h2>
          <div className='ref-req-section'>
            <div className='ref-req-header'>
              <span className='number'>1</span>
              <h2>Which items would you like to return?</h2>
            </div>
            <Select
              mode='multiple'
              style={{ width: '100%' }}
              placeholder='Select your unwanted items...'
              value={items}
              onChange={(value) => setItems(value)}
              // onChange={(value) => {
              //   if (value.includes('all')) {
              //     setItems(
              //       products.flatMap((p) =>
              //         Array.from(
              //           { length: p.count - p.refunded },
              //           (_, i) =>
              //             `${p.product._id}-${i}, ${p.product.price}, ${p.product.title}`
              //         )
              //       )
              //     );
              //   } else {
              //     setItems(value);
              //   }
              // }}
            >
              {/* <Option value='all' key='all'>
                Select All
              </Option> */}
              {products.flatMap((p) =>
                Array.from({ length: p.count - p.refunded }, (_, i) => (
                  <Option
                    value={`${p.product._id}-${i}, ${p.product.price}, ${p.product.title}`}
                    key={`${p.product._id}-${i}`}
                  >
                    {p.product.title}
                  </Option>
                ))
              )}
            </Select>
          </div>
          <div className='ref-req-section'>
            <div className='ref-req-header'>
              <span className='number'>2</span>
              <h2>Tell us why you would like to return your products.</h2>
            </div>
            <textarea
              className='input-field'
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder='Write the reason for the return here...'
            />
          </div>
          <div className='ref-req-section'>
            <div className='ref-req-header'>
              <span className='number'>3</span>
              <h2>
                Faulty or damaged product? Send us some pictures of how your
                order was delivered.
              </h2>
            </div>
            <div className='ref-req-footer'>
              <PostUpload
                postImages={refundImages}
                setPostImages={setRefundImages}
              />
            </div>
            {amountRequested > 0 && (
              <>
                <p className='center'>
                  You are eligible to receive the following amount for the items
                  selected:
                </p>
                <div className='gift-card-amount'>
                  €
                  <span style={{ width: `${amountRequested.length}ch` }}>
                    {amountRequested}
                  </span>
                </div>
                <small className='center'>
                  Please note this amount is subject to a 10% handling fee, as
                  stipulated in our{' '}
                  <Link to='/terms-and-conditions'>terms and conditions</Link>.
                </small>
              </>
            )}
            <button
              onClick={requestSubmit}
              type='submit'
              className='submit-btn'
              disabled={!items.length || !reason || loading}
            >
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} className='fa' spin />
              ) : (
                <FontAwesomeIcon icon={faPaperPlane} className='fa' />
              )}
              Request
            </button>
            <button
              className='submit-btn trash'
              onClick={() => setRequestRefundModalIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default RefundRequest;
