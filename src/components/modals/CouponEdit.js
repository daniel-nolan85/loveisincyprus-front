import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Select } from 'antd';

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
  const [discount, setDiscount] = useState(0);
  const [expiry, setExpiry] = useState('');

  useEffect(() => {
    if (couponToEdit) {
      setName(couponToEdit.name);
      setSelectedProducts(couponToEdit.products);
      setDiscount(couponToEdit.discount);
      setExpiry(couponToEdit.expiry);
    }
  }, [couponToEdit]);

  console.log('couponToEdit => ', couponToEdit);
  console.log('name => ', name);
  console.log('selectedProducts => ', selectedProducts);
  console.log('discount => ', discount);
  console.log('expiry => ', expiry);

  let { token } = useSelector((state) => state.user);

  const editCoupon = async (e, coupon) => {
    e.preventDefault();
    setLoading(true);
    updateCoupon(
      coupon._id,
      { name, selectedProducts, discount, expiry },
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
        <input
          type='text'
          className='input-field'
          placeholder='Discount'
          defaultValue={discount}
          onChange={(e) => setDiscount(e.target.value)}
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
