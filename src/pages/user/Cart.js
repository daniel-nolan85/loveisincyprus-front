import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductInCheckout from '../../components/cards/ProductInCheckout';
import { userCart } from '../../functions/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';

const Cart = ({ history }) => {
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.user) || {};
  const { cart } = useSelector((state) => ({ ...state }));

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
        console.log('CART POST RES', res);
        if (res.data.ok) history.push('/checkout');
      })
      .catch((err) => {
        setLoading(false);
        console.log('cart save err', err);
      });
  };

  return (
    <>
      {!cart.length ? (
        <h1 className='center'>
          Your cart is currently empty.{' '}
          <Link to='/shop/search'>Go shopping?</Link>
        </h1>
      ) : (
        <div className='small-container cart-page'>
          {showCartItems()}
          <div className='total-price'>
            <table>
              <tbody>
                <tr>
                  <td>Sub-total</td>
                  <td>€{getTotal()}</td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td>€30.00</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>€180.00</td>
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
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
