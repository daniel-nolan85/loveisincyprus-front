import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyUserCoupon,
} from '../../functions/user';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faPaperPlane,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import AddressForm from '../../components/forms/AddressForm';

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState({
    firstLine: '',
    secondLine: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  const isFirstRun = useRef(true);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      // console.log('user cart res => ', JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      saveUserAddress(address, user.token).then((res) => {
        if (res.data.ok) {
          setAddressSaved(true);
          toast.success(`Your address has been saved.`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    }
  }, [address]);

  const saveAddressToDb = (values) => {
    setAddress((prevState) => {
      return { ...prevState, ...values };
    });
  };

  const showProductSummary = () => (
    <div className='small-container checkout-page'>
      <h1 className='center'>Order Summary</h1>
      <div className='total-price'>
        <table>
          <tbody>
            {products.map((p, i) => (
              <tr key={i}>
                <td>
                  {p.product.title} x {p.count} = {p.product.price * p.count}
                </td>
              </tr>
            ))}
            <tr>
              <td>Cart total: €{total}</td>
            </tr>
            {totalAfterDiscount > 0 && (
              <tr>
                <td>Discount applied! Total payable: €{totalAfterDiscount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='contact-form-btns'>
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} className='fa' spin />
        ) : (
          <button
            type='submit'
            className='submit-btn'
            onClick={() => history.push('/payment')}
            disabled={!addressSaved || !products.length || loading}
          >
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} className='fa' spin />
            ) : (
              <FontAwesomeIcon icon={faPaperPlane} className='fa' />
            )}
            Place Order
          </button>
        )}
        <button
          type='reset'
          className='submit-btn reset'
          onClick={emptyCart}
          disabled={!products.length || loading}
        >
          <FontAwesomeIcon icon={faUndo} className='fa' />
          Empty cart
        </button>
      </div>
    </div>
  );

  const showApplyCoupon = () => (
    <div className='form-box coupon'>
      <div className='button-box'>
        <p className='form-header'>Got Coupon?</p>
      </div>
      <form>
        <input
          type='text'
          className='input-field'
          placeholder='Enter coupon'
          value={coupon}
          onChange={(e) => {
            setCoupon(e.target.value);
            setDiscountError('');
          }}
          autoFocus
          required
          // disabled={loading}
        />
        {discountError && <p>{discountError}</p>}
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
        <div className='contact-container'>
          <br />
          <AddressForm
            address={address}
            setAddress={setAddress}
            saveAddressToDb={saveAddressToDb}
          />
          <div>
            <br />
            {showApplyCoupon()}
            {showProductSummary()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
