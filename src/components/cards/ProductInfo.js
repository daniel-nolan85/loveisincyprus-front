import React from 'react';
import defaultItem from '../../assets/defaultItem.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faCartArrowDown,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { showAverage } from '../../functions/rating';

const { Meta } = Card;

const ProductInfo = ({ product }) => {
  const { title, description, images, slug } = product;

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
          <Link to={`/product/${slug}`}>
            <div className='tooltip'>
              <FontAwesomeIcon icon={faEye} className='fa view' />
              <span className='tooltip-text'>View Product</span>
            </div>
          </Link>,
          <div className='tooltip'>
            <FontAwesomeIcon icon={faCartShopping} className='fa add' />,
            <span className='tooltip-text'>Add to Cart</span>
          </div>,
        ]}
      >
        <Meta
          title={title}
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