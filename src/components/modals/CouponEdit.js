import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Select, Radio } from 'antd';

const { Option } = Select;

Modal.setAppElement('#root');

const CouponEdit = ({
  couponEditModalIsOpen,
  setCouponEditModalIsOpen,
  couponToEdit,
  updateCoupon,
  loading,
  setLoading,
  loadCoupons,
  products,
}) => {
  const [name, setName] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [subscription, setSubscription] = useState(false);
  const [partner, setPartner] = useState('');
  const [discount, setDiscount] = useState(0);
  const [expiry, setExpiry] = useState('');

  useEffect(() => {
    if (couponToEdit) {
      setName(couponToEdit.name);
      setSelectedProducts(couponToEdit.products);
      setSubscription(couponToEdit.subscription);
      setPartner(couponToEdit.partner);
      setDiscount(couponToEdit.discount);
      setExpiry(couponToEdit.expiry);
    }
  }, [couponToEdit]);

  let { token } = useSelector((state) => state.user);

  const handleRadio = (e) => {
    if (e.target.value === 'yes') {
      setSubscription(true);
      setDiscount(100);
    } else {
      setSubscription(false);
      setDiscount('');
    }
  };

  const editCoupon = async (e, coupon) => {
    if (subscription && partner === '') {
      toast.error('Please enter a partner', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    e.preventDefault();
    setLoading(true);
    updateCoupon(
      coupon._id,
      { name, selectedProducts, subscription, partner, discount, expiry },
      token
    )
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.name} has been updated`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setCouponEditModalIsOpen(false);
        loadCoupons();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error('Create coupon failed', {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const couponForm = () => (
    <div className='form-box coupon update'>
      <div className='button-box'>
        <p className='form-header'>Update Coupon</p>
      </div>
      <form>
        <input
          type='text'
          className='input-field'
          placeholder='Name'
          defaultValue={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          autoFocus
          required
        />
        <Select
          mode='multiple'
          className='input-field'
          style={{ width: '100%' }}
          placeholder='Products'
          defaultValue={selectedProducts}
          onChange={(value) => setSelectedProducts(value)}
        >
          {products.length &&
            products.map((p) => (
              <Option value={p._id} key={p._id}>
                {p.title}
              </Option>
            ))}
        </Select>
        <div className='sub-section'>
          <span>Subscription</span>
          <Radio.Group
            onChange={handleRadio}
            value={subscription ? 'yes' : 'no'}
            name='subscription'
          >
            <Radio value='no'>No</Radio>
            <Radio value='yes'>Yes</Radio>
          </Radio.Group>
        </div>
        <input
          type='text'
          className={`input-field partner ${subscription ? 'open' : ''}`}
          placeholder='Partner'
          value={partner}
          onChange={(e) => setPartner(e.target.value)}
          required={subscription}
        />
        <input
          type='text'
          className={`input-field discount ${subscription ? 'open' : ''}`}
          placeholder='Discount'
          value={subscription ? 100 : discount}
          onChange={(e) => {
            if (!subscription) {
              setDiscount(e.target.value);
            }
          }}
          readOnly={subscription}
          required
        />
        <DatePicker
          selected={new Date(expiry)}
          defaultValue={expiry}
          onChange={(date) => setExpiry(date)}
          dateFormat='dd/MM/yyyy'
          minDate={new Date('01-01-1900')}
          showMonthDropdown
          showYearDropdown
          scrollableMonthDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          placeholderText='Expiry date'
        />
        <button
          onClick={(e) => editCoupon(e, couponToEdit)}
          type='submit'
          className='submit-btn'
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} className='fa' />
          )}
          Update
        </button>
      </form>
    </div>
  );

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
      isOpen={couponEditModalIsOpen}
      onRequestClose={() => setCouponEditModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {couponForm()}
    </Modal>
  );
};

export default CouponEdit;
