import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyUserCoupon,
} from '../../functions/user';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log('user cart res => ', JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const showAddress = () => (
    <>
      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      ></textarea>
      <button onClick={saveAddressToDb}>Save</button>
    </>
  );

  const saveAddressToDb = () => {
    saveUserAddress(address, user.token).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success(`Your address has been saved.`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });
  };

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} x {p.count} = {p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <div className='form-box category'>
      <div className='button-box'>
        <p className='form-header'>Enter Coupon</p>
      </div>
      <form>
        <input
          type='text'
          className='input-field'
          placeholder='Coupon'
          value={coupon}
          onChange={(e) => {
            setCoupon(e.target.value);
            setDiscountError('');
          }}
          autoFocus
          required
          // disabled={loading}
        />
        <button onClick={applyCoupon} type='submit' className='submit-btn'>
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} className='fa' />
          )}
          Apply
        </button>
      </form>
    </div>
  );

  const applyCoupon = (e) => {
    e.preventDefault();
    applyUserCoupon(coupon, user.token).then((res) => {
      console.log('response on coupon applied', res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // toast.success('Discount applied!', {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        dispatch({
          type: 'COUPON_APPLIED',
          payload: true,
        });
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        // toast.error(res.data.err, {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        dispatch({
          type: 'COUPON_APPLIED',
          payload: false,
        });
      }
    });
  };

  const emptyCart = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: [],
    });
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon('');
      toast.success(`Your cart has been emptied.`, {
        position: toast.POSITION.TOP_CENTER,
      });
    });
  };

  return (
    <>
      <div>
        <h4>Delivery address</h4>
        <br />
        {showAddress()}
        <hr />
        <h4>Got coupon?</h4>
        <br />
        {showApplyCoupon()}
        <br />
        {discountError && <p>{discountError}</p>}
      </div>
      <div>
        <h4>Order summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart total: €{total}</p>
        {totalAfterDiscount > 0 && (
          <p>Discount applied! Total payable: €{totalAfterDiscount}</p>
        )}
      </div>
      <div>
        <button
          onClick={() => history.push('/payment')}
          disabled={!addressSaved || !products.length}
        >
          place order
        </button>
      </div>
      <div>
        <button onClick={emptyCart} disabled={!products.length}>
          empty cart
        </button>
      </div>
    </>
  );
};

export default Checkout;
