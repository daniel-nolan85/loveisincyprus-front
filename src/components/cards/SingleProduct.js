import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faCartArrowDown,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import defaultItem from '../../assets/defaultItem.png';
import StarRating from 'react-star-ratings';
import Rating from '../modals/Rating';
import { Card, Tabs } from 'antd';
import { showAverage } from '../../functions/rating';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
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

  const {
    title,
    description,
    images,
    slug,
    price,
    category,
    subs,
    _id,
    quantity,
  } = product;

  return (
    <div className='small-container single-product'>
      <div className='row'>
        <div className='col-2'>
          {images && images.length ? (
            <Carousel showArrows autoPlay infiniteLoop>
              {images.map((i) => (
                <img src={i.url} key={i.public_id} />
              ))}
            </Carousel>
          ) : (
            <Card
              cover={<img src={defaultItem} className='card-image' />}
            ></Card>
          )}
        </div>
        <div className='col-2'>
          <Card
            actions={[
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
              <Link to='/'>
                <div className='tooltip'>
                  <FontAwesomeIcon icon={faHeart} className='fa view' />,
                  <span className='tooltip-text'>Add to Wishlist</span>
                </div>
              </Link>,
              <Rating>
                <StarRating
                  name={_id}
                  numberOfStars={5}
                  rating={star}
                  changeRating={onStarClick}
                  isSelectable={false}
                  starRatedColor='gold'
                  starHoverColor='gold'
                />
              </Rating>,
            ]}
          >
            <h1>{title}</h1>
            {product && product.ratings && product.ratings.length > 0
              ? showAverage(product)
              : 'No rating yet'}
            <br />
            <h4>€{price}</h4>
            <br />
            {category && (
              <div className='cat-links'>
                <p>Category:</p>
                <Link to={`/category/${category.slug}`}>{category.name}</Link>
              </div>
            )}
            {subs && (
              <div className='cat-links'>
                <p>{subs.length > 1 ? 'Sub-Categories:' : 'Sub-Category:'}</p>
                {subs.map((s) => (
                  <Link to={`/sub/${s.slug}`} key={s._id}>
                    {s.name}
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
      <Tabs type='card'>
        <TabPane tab='Description' key='1'>
          {description && description}
        </TabPane>
        <TabPane tab='More' key='2'>
          Call us on xxx-xxxx-xxxx to learn more about this product
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SingleProduct;
