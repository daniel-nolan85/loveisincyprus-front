import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Select } from 'antd';

const { Option } = Select;

Modal.setAppElement('#root');

const RefundApprove = ({
  processRefundModalIsOpen,
  setProcessRefundModalIsOpen,
  currentRefund,
  fetchRefunds,
}) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [refundAmount, setRefundAmount] = useState(0);
  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const priceArray = products.map((product) =>
      parseFloat(product.split(',')[1])
    );
    const priceSum = priceArray.reduce((acc, curr) => acc + curr, 0);
    const tenPercent = priceSum * 0.1;
    const calc = priceSum - tenPercent;
    setRefundAmount(calc.toFixed(2));
  }, [products]);

  useEffect(() => {
    if (items) {
      let itemsToRefund = [...items];
      for (let i = 0; i < refundedItems.length; i++) {
        const [id, index] = refundedItems[i].split(/[-,]/);
        const itemIndex = itemsToRefund.findIndex((item) => item._id === id);
        if (itemIndex !== -1) {
          itemsToRefund.splice(itemIndex, 1);
        }
      }
      setItemsToDisplay(itemsToRefund);
    }
  }, [currentRefund, products, refundAmount]);

  let { token } = useSelector((state) => state.user);

  const processRefund = async (refund) => {
    setLoading(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/process-refund`,
        { refund, message, refundAmount, products },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        // setLoading(false);
        // toast.success(
        //   `This refund is now being processed. A confirmation email has been sent to the user.`,
        //   {
        //     position: toast.POSITION.TOP_CENTER,
        //   }
        // );
        // setProducts([]);
        // fetchRefunds();
        // setProcessRefundModalIsOpen(false);
        payPalRefund(refund);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const payPalRefund = async (refund) => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/refund-paypal-shop-order`,
        { refund, refundAmount },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        toast.success(
          `This refund is now being processed. A confirmation email has been sent to the user.`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        setProducts([]);
        fetchRefunds();
        setProcessRefundModalIsOpen(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
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

  const { items, refundedItems } = currentRefund;

  return (
    <Modal
      isOpen={processRefundModalIsOpen}
      onRequestClose={() => setProcessRefundModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {items && items.length && (
        <>
          <div className='ref-req-section'>
            <div className='ref-req-header'>
              <span className='number'>1</span>
              <h2>Which items are you happy to refund?</h2>
            </div>
            <Select
              mode='multiple'
              style={{ width: '100%' }}
              placeholder='Select items...'
              value={products}
              onChange={(value) => setProducts(value)}
            >
              {itemsToDisplay.map((i, idx) => (
                <Option
                  value={`${i._id}-${idx}, ${i.price}, ${i.title}`}
                  key={`${i._id}-${idx}`}
                >
                  {i.title}
                </Option>
              ))}
            </Select>
          </div>

          {products.length > 0 && (
            <div className='ref-req-section'>
              <div className='ref-req-header'>
                <span className='number'>2</span>
                <h2>
                  Do you want to send the user a message related to their
                  request?
                </h2>
              </div>
              <input
                type='text'
                className='input-field'
                placeholder='Write a message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          )}
          {refundAmount > 0 && (
            <div className='ref-req-section'>
              <p className='center'>Amount to be refunded:</p>
              <div className='gift-card-amount'>
                €
                <span style={{ width: `${refundAmount.length}ch` }}>
                  {refundAmount}
                </span>
              </div>
              <small className='center'>
                This amount is subject to a 10% handling fee.
              </small>

              <button
                className='submit-btn'
                onClick={() => processRefund(currentRefund)}
                disabled={loading}
              >
                {loading ? (
                  <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                ) : (
                  <FontAwesomeIcon icon={faThumbsUp} className='fa' />
                )}
                Approve refund
              </button>
              <button
                className='submit-btn trash'
                onClick={() => setProcessRefundModalIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </>
      )}
    </Modal>
  );
};

export default RefundApprove;
