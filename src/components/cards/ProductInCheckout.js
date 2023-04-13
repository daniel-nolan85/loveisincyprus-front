import React from 'react';
import ModalImage from 'react-modal-image';
import defaultItem from '../../assets/defaultItem.png';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ProductInCheckout = ({ p }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    if (count > p.quantity) {
      toast.error(`Currently we have ${p.quantity} of this item in stock`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      });
    }
  };

  return (
    <tr>
      <td>
        <div className='cart-info'>
          <div className='product-image'>
            {p.images.length ? (
              <ModalImage
                small={p.images[0].url}
                large={p.images[0].url}
                alt={`${p.title} image`}
              />
            ) : (
              <ModalImage
                small={defaultItem}
                large={defaultItem}
                alt='Default item image'
              />
            )}
          </div>
          <div>
            <p>{p.title}</p>
            <small>€{p.price}</small>
            <br />
            <FontAwesomeIcon
              icon={faTrashCan}
              className='fa trash'
              onClick={handleRemove}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </td>
      <td>
        <input type='number' value={p.count} onChange={handleQuantityChange} />
      </td>
      <td>€{(p.price * p.count).toFixed(2)}</td>
    </tr>
  );
};

export default ProductInCheckout;
