import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import { Select } from 'antd';
import { getProductsByCount } from '../../functions/product';

const { Option } = Select;

const Coupon = ({ history }) => {
  const [name, setName] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [discount, setDiscount] = useState('');
  const [expiry, setExpiry] = useState('');
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [query, setQuery] = useState('');
  const [couponDeleteModalIsOpen, setCouponDeleteModalIsOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState({});
  const [couponEditModalIsOpen, setCouponEditModalIsOpen] = useState(false);
  const [couponToEdit, setCouponToEdit] = useState({});

  const { token, canCoupon } = useSelector((state) => state.user);

  console.log('selectedProducts => ', selectedProducts);

  useEffect(() => {
    if (!canCoupon) {
      history.push('/admin/dashboard');
    }
  }, []);

  useEffect(() => {
    loadCoupons();
    loadAllProducts();
  }, []);

  useEffect(() => {}, [expiry]);

  const loadCoupons = () => getCoupons().then((c) => setCoupons(c.data));

  const loadAllProducts = () => {
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon({ name, selectedProducts, expiry, discount }, token)
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          toast.error(`${res.data.message}`, {
            position: toast.POSITION.TOP_CENTER,
          });
          setLoading(false);
          return;
        } else {
          setLoading(false);
          setName('');
          setSelectedProducts([]);
          setDiscount('');
          setExpiry('');
          toast.success(`${res.data.name} has been created`, {
            position: toast.POSITION.TOP_CENTER,
          });
          loadCoupons();
        }
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
        />
        <Select
          mode='multiple'
          className='input-field'
          style={{ width: '100%' }}
          placeholder='Products'
          value={selectedProducts}
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
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          required
        />
        <DatePicker
          selected={expiry || new Date()}
          value={expiry}
          onChange={(date) => {
            setExpiry(date);
          }}
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
    <div className='container search-container'>
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
                <p>
                  Discount:{' '}
                  {c.name.slice(0, 5) === 'GIFT-'
                    ? `€${c.discount}`
                    : `${c.discount}%`}
                </p>
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
          products={products}
        />
      </div>
    </div>
  );
};

export default Coupon;
