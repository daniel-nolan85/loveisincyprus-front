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
import AddressList from '../../components/modals/AddressList';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import Mobile from '../../components/user/Mobile';
import LocationWarning from '../../components/modals/LocationWarning';
import axios from 'axios';

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [userAddress, setUserAddress] = useState({
    firstLine: '',
    secondLine: '',
    city: '',
    zip: '',
    country: 'REPUBLIC OF CYPRUS',
  });
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');
  const [addressListModalIsOpen, setAddressListModalIsOpen] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [deliverTo, setDeliverTo] = useState('');
  const [couponApplied, setCouponApplied] = useState({});
  const [locationWarningModalIsOpen, setLocationWarningModalIsOpen] =
    useState(false);
  const [userIp, setUserIp] = useState('');

  const { token, address } = useSelector((state) => state.user);

  const deliveryFee = history.location.state;

  const dispatch = useDispatch();

  const isFirstRun = useRef(true);

  useEffect(() => {
    fetchUserCart();
    fetchUserAddress();
    getThisIP();
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      saveUserAddress(userAddress, token).then((res) => {
        if (res.data.ok) {
          setLoadingAddress(false);
          toast.success(`Your order is ready to be placed.`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    }
  }, [addressSaved]);

  const getThisIP = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    setUserIp(res.data.IPv4);
  };

  useEffect(() => {
    if (userIp) {
      fetch(
        `https://api.ipregistry.co/${userIp}?key=${process.env.REACT_APP_IP_REGISTRY_API_KEY}&fields=location.country.code`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (payload) {
          const userCountryCode = payload['location']['country']['code'];
          if (userCountryCode !== 'CY') {
            setLocationWarningModalIsOpen(true);
          }
        });
    }
  }, [userIp]);

  const fetchUserAddress = () => {
    if (address && address.length > 0) {
      setUserAddress(address.slice(-1)[0]);
    }
  };

  const fetchUserCart = () => {
    getUserCart(token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  };

  const saveAddressToDb = async (values) => {
    setLoadingAddress(true);
    setUserAddress((prevState) => ({ ...prevState, ...values }));
    setAddressSaved(true);
  };

  const changeAddress = () => {
    setAddressListModalIsOpen(true);
  };

  const showDeliverTo = () => (
    <div className='form-box deliver-to'>
      <div className='button-box'>
        <p className='form-header'>Deliver To</p>
      </div>
      <input
        type='text'
        className='input-field'
        placeholder="Enter recipient's name"
        value={deliverTo}
        onChange={(e) => {
          setDeliverTo(e.target.value);
        }}
        autoFocus
        required
        disabled={loading}
      />
    </div>
  );

  const showProductSummary = () => (
    <div className='small-container checkout-page'>
      <h1 className='center'>Order Summary</h1>
      <div className='total-price checkout'>
        <table>
          <tbody>
            {products.map((p, i) => (
              <tr key={i}>
                <td>
                  {p.product.title} x {p.count} = €
                  {(p.product.price * p.count).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr>
              <td>Sub-total: €{total.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Delivery fee: €{deliveryFee.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Cart total: €{(total + deliveryFee).toFixed(2)}</td>
            </tr>
            {Object.keys(couponApplied).length !== 0 && (
              <tr>
                <td className='discount-applied'>
                  Discount applied! Total payable: €
                  {(totalAfterDiscount + deliveryFee).toFixed(2)}
                </td>
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
            onClick={() =>
              history.push({
                pathname: '/payment',
                state: { deliverTo, userAddress, couponApplied, deliveryFee },
              })
            }
            disabled={
              !addressSaved || !products.length || loading || loadingAddress
            }
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
    <div className='form-box apply-coupon'>
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
          required
          disabled={loadingCoupon}
        />
        {discountError && <p>{discountError}</p>}
        <button onClick={applyCoupon} type='submit' className='submit-btn'>
          {loadingCoupon ? (
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
    setLoadingCoupon(true);
    applyUserCoupon(coupon, token).then((res) => {
      console.log(res.data);
      if (res.data.err) {
        setLoadingCoupon(false);
        setDiscountError(res.data.err);
        toast.error(res.data.err, {
          position: toast.POSITION.TOP_CENTER,
        });
        dispatch({
          type: 'COUPON_APPLIED',
          payload: false,
        });
        return;
      }
      if (res.data) {
        setLoadingCoupon(false);
        setTotalAfterDiscount(parseFloat(res.data.totalAfterDiscount));
        setCouponApplied(res.data.validCoupon);
        toast.success('Discount applied!', {
          position: toast.POSITION.TOP_CENTER,
        });
        dispatch({
          type: 'COUPON_APPLIED',
          payload: true,
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
    emptyUserCart(token).then((res) => {
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
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        <div className='checkout-container'>
          <br />
          <h1 className='center'>
            Please confirm recipient's name and address
          </h1>
          <div className='contact-container'>
            <div>
              {showDeliverTo()}
              <AddressForm
                userAddress={userAddress}
                setUserAddress={setUserAddress}
                saveAddressToDb={saveAddressToDb}
                changeAddress={changeAddress}
                address={address}
                loadingAddress={loadingAddress}
                deliverTo={deliverTo}
                addressSaved={addressSaved}
              />
            </div>
            <div>
              {showApplyCoupon()}
              {showProductSummary()}
            </div>
          </div>
          <AddressList
            addressListModalIsOpen={addressListModalIsOpen}
            setAddressListModalIsOpen={setAddressListModalIsOpen}
            address={address}
            setUserAddress={setUserAddress}
          />
        </div>
      </div>
      <LocationWarning
        locationWarningModalIsOpen={locationWarningModalIsOpen}
        setLocationWarningModalIsOpen={setLocationWarningModalIsOpen}
      />
      <RightSidebar />
    </div>
  );
};

export default Checkout;
