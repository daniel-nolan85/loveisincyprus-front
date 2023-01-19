import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

Modal.setAppElement('#root');

const CouponEdit = ({
  couponEditModalIsOpen,
  setCouponEditModalIsOpen,
  couponToEdit,
  updateCoupon,
  loading,
  setLoading,
  loadCoupons,
}) => {
  const [name, setName] = useState(couponToEdit.name);
  const [discount, setDiscount] = useState(couponToEdit.discount);
  const [expiry, setExpiry] = useState(couponToEdit.expiry);

  let { token } = useSelector((state) => state.user);

  const editCoupon = async (e, coupon) => {
    e.preventDefault();
    setLoading(true);
    updateCoupon(coupon._id, { name, discount, expiry }, token)
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
          defaultValue={couponToEdit.name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          autoFocus
          required
        />
        <input
          type='text'
          className='input-field'
          placeholder='Discount'
          defaultValue={couponToEdit.discount}
          onChange={(e) => setDiscount(e.target.value)}
          required
        />
        <DatePicker
          selected={new Date()}
          defaultValue={couponToEdit.expiry}
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
