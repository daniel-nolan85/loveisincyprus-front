import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductInCheckout from '../../components/cards/ProductInCheckout';
import { userCart } from '../../functions/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faSpinner,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import Mobile from '../../components/user/Mobile';
import DeliveryInfo from '../../components/modals/DeliveryInfo';

const Cart = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [deliveryInfoModalIsOpen, setDeliveryInfoModalIsOpen] = useState(false);

  const { token } = useSelector((state) => state.user) || {};
  const { cart } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getDeliveryFee();
  }, [cart || deliveryFee]);

  const showCartItems = () => (
    <table>
      <tbody>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
        {cart.map((p) => (
          <ProductInCheckout key={p._id} p={p} />
        ))}
      </tbody>
    </table>
  );

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    setLoading(true);
    userCart(cart, token)
      .then((res) => {
        setLoading(false);
        if (res.data.ok)
          history.push({
            pathname: '/checkout',
            state: deliveryFee,
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log('cart save err', err);
      });
  };

  const totalItems = cart.reduce((accumulator, c) => {
    return accumulator + parseInt(c.count);
  }, 0);

  const getDeliveryFee = () => {
    const weight =
      1 +
      cart.reduce((accumulator, c) => {
        return accumulator + c.count * c.weight;
      }, 0);
    if (weight <= 2) {
      setDeliveryFee(3.4);
    } else if (weight <= 5) {
      setDeliveryFee(3.8);
    } else if (weight <= 10) {
      setDeliveryFee(4.2);
    } else {
      setDeliveryFee(4.2 + Math.ceil(weight / 10 - 1) * 3.5);
    }
  };

  const deliveryInfo = () => {
    setDeliveryInfoModalIsOpen(true);
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        {!cart.length ? (
          <h1 className='center'>
            Your cart is currently empty.{' '}
            <Link to='/shop/search'>Go shopping?</Link>
          </h1>
        ) : (
          <>
            <h1 className='center'>
              Your cart contains{' '}
              {totalItems > 1 ? `${totalItems} items` : `${totalItems} item`}
            </h1>
            <div className='small-container cart-page'>
              {showCartItems()}
              <div className='total-price'>
                <table>
                  <tbody>
                    <tr>
                      <td>Sub-total</td>
                      <td>€{getTotal().toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>
                        Delivery fee{' '}
                        <div className='tooltip'>
                          <FontAwesomeIcon
                            icon={faCircleQuestion}
                            className='fa'
                            onClick={deliveryInfo}
                          />
                          <span className='tooltip-text'>What is this?</span>
                        </div>
                      </td>
                      <td>€{deliveryFee.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td>€{(getTotal() + deliveryFee).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {token ? (
                <button
                  onClick={saveOrderToDb}
                  type='submit'
                  className='submit-btn cart'
                  disabled={!cart.length}
                >
                  {loading ? (
                    <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                  ) : (
                    <FontAwesomeIcon icon={faPaperPlane} className='fa' />
                  )}
                  Proceed to Checkout
                </button>
              ) : (
                <button type='submit' className='submit-btn cart'>
                  <Link
                    to={{
                      pathname: '/authentication',
                      state: { from: 'cart' },
                    }}
                    className='form-header'
                  >
                    Login to Checkout
                  </Link>
                </button>
              )}
            </div>
          </>
        )}
        <DeliveryInfo
          deliveryInfoModalIsOpen={deliveryInfoModalIsOpen}
          setDeliveryInfoModalIsOpen={setDeliveryInfoModalIsOpen}
        />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Cart;
