import React, { useState } from 'react';
import defaultItem from '../../assets/defaultItem.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faCartArrowDown,
  faEye,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

const { Meta } = Card;

const ProductInfo = ({ product, wishlist, handleRemove }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.push({ ...product, count: 1 });
      let unique = _.uniqWith(cart, _.isEqual);
      console.log('unique => ', unique);
      localStorage.setItem('cart', JSON.stringify(unique));
      dispatch({
        type: 'ADD_TO_CART',
        payload: unique,
      });
      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      });
    }
  };

  const handleRemoveFromCart = () => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      cart.map((p, i) => {
        if (p._id === product._id) {
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

  const { title, description, images, slug, price, quantity, _id } = product;

  return (
    <>
      <div className='home-rating'>
        {product && product.ratings && product.ratings.length > 0
          ? showAverage(product)
          : 'No rating yet'}
      </div>
      <Card
        cover={
          <img
            className='product-image'
            src={images.length ? images[0].url : defaultItem}
          />
        }
        actions={[
          ...(wishlist
            ? [
                <Link to={`/product/${slug}`}>
                  <div className='tooltip'>
                    <FontAwesomeIcon icon={faEye} className='fa view' />
                    <span className='tooltip-text'>View Product</span>
                  </div>
                </Link>,
                <div className='tooltip'>
                  {cart.some((ele) => ele._id === _id) ? (
                    <div onClick={handleRemoveFromCart}>
                      {/* <div> */}
                      <FontAwesomeIcon
                        icon={faCartArrowDown}
                        className='fa minus'
                      />
                      <span className='tooltip-text'>Remove from Cart</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      disabled={quantity < 1}
                      className={quantity < 1 ? 'out-of-stock' : 'add-to-cart'}
                    >
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        className={quantity < 1 ? 'fa out' : 'fa add'}
                      />
                      <span className='tooltip-text'>
                        {quantity < 1 ? 'Out of Stock' : 'Add to Cart'}
                      </span>
                    </button>
                  )}
                </div>,
                <div className='tooltip' onClick={() => handleRemove(product)}>
                  <FontAwesomeIcon icon={faTrash} className='fa trash' />
                  <span className='tooltip-text'>Remove from Wishlist</span>
                </div>,
              ]
            : []),
          ...(!wishlist
            ? [
                <Link to={`/product/${slug}`}>
                  <div className='tooltip'>
                    <FontAwesomeIcon icon={faEye} className='fa view' />
                    <span className='tooltip-text'>View Product</span>
                  </div>
                </Link>,
                <div className='tooltip'>
                  {cart.some((ele) => ele._id === _id) ? (
                    <div onClick={handleRemoveFromCart}>
                      {/* <div> */}
                      <FontAwesomeIcon
                        icon={faCartArrowDown}
                        className='fa minus'
                      />
                      <span className='tooltip-text'>Remove from Cart</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      disabled={quantity < 1}
                      className={quantity < 1 ? 'out-of-stock' : 'add-to-cart'}
                    >
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        className={quantity < 1 ? 'fa out' : 'fa add'}
                      />
                      <span className='tooltip-text'>
                        {quantity < 1 ? 'Out of Stock' : 'Add to Cart'}
                      </span>
                    </button>
                  )}
                </div>,
              ]
            : []),
        ]}
      >
        <Meta
          title={
            <>
              <span>{title}</span>
              <br />
              <span>€{price}</span>
            </>
          }
          description={
            description && description.length > 50
              ? `${description.substring(0, 50)}...`
              : description
          }
        />
      </Card>
    </>
  );
};

export default ProductInfo;
