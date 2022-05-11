import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  createCoupon,
  getCoupons,
  removeCoupon,
  updateCoupon,
} from '../../functions/coupon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faPaperPlane,
  faEdit,
  faTrashCan,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import LeftSidebar from '../../components/admin/LeftSidebar';
import CouponDelete from '../../components/modals/CouponDelete';
import CouponEdit from '../../components/modals/CouponEdit';

const Coupon = () => {
  const [name, setName] = useState('');
  const [discount, setDiscount] = useState('');
  const [expiry, setExpiry] = useState('');
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [query, setQuery] = useState('');
  const [couponDeleteModalIsOpen, setCouponDeleteModalIsOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState({});
  const [couponEditModalIsOpen, setCouponEditModalIsOpen] = useState(false);
  const [couponToEdit, setCouponToEdit] = useState({});

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = () => getCoupons().then((c) => setCoupons(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        setDiscount('');
        setExpiry('');
        toast.success(`${res.data.name} has been created`, {
          position: toast.POSITION.TOP_CENTER,
        });
        loadCoupons();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleDelete = async (coupon) => {
    setCouponDeleteModalIsOpen(true);
    setCouponToDelete(coupon);
  };

  const handleEdit = async (coupon) => {
    setCouponEditModalIsOpen(true);
    setCouponToEdit(coupon);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value.toLowerCase());
  };

  const searched = (query) => (c) => c.name.toLowerCase().includes(query);

  const couponForm = () => (
    <div className='form-box coupon'>
      <div className='button-box'>
        <p className='form-header'>Create Coupon</p>
      </div>
      <form>
        <input
          type='text'
          className='input-field'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
          // disabled={loading}
        />
        <input
          type='text'
          className='input-field'
          placeholder='Discount'
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          required
          // disabled={loading}
        />
        <DatePicker
          selected={new Date()}
          value={expiry}
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
        <button onClick={handleSubmit} type='submit' className='submit-btn'>
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} className='fa' />
          )}
          Create
        </button>
      </form>
    </div>
  );

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        {couponForm()}
        <div className='search-box'>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='fa' />
          <input
            type='search'
            placeholder='Search Coupons'
            onChange={handleSearch}
            value={query}
          />
        </div>
        <div className='admin-cards'>
          {coupons.filter(searched(query)).map((c) => (
            <div className='admin-card' key={c._id}>
              <div>
                <br />
                <br />
                <h3>{c.name}</h3>
                <p>Discount: {c.discount}%</p>
                <p>Expiry: {new Date(c.expiry).toLocaleDateString()}</p>
              </div>
              <FontAwesomeIcon
                icon={faTrashCan}
                className='fa trash'
                onClick={() => handleDelete(c)}
              />
              <FontAwesomeIcon
                icon={faEdit}
                className='fa update'
                onClick={() => handleEdit(c)}
              />
            </div>
          ))}
        </div>
        <CouponDelete
          couponDeleteModalIsOpen={couponDeleteModalIsOpen}
          setCouponDeleteModalIsOpen={setCouponDeleteModalIsOpen}
          couponToDelete={couponToDelete}
          removeCoupon={removeCoupon}
          loading={loading}
          setLoading={setLoading}
          loadCoupons={loadCoupons}
        />
        <CouponEdit
          couponEditModalIsOpen={couponEditModalIsOpen}
          setCouponEditModalIsOpen={setCouponEditModalIsOpen}
          couponToEdit={couponToEdit}
          updateCoupon={updateCoupon}
          loading={loading}
          setLoading={setLoading}
          loadCoupons={loadCoupons}
        />
      </div>
    </div>
  );
};

export default Coupon;
