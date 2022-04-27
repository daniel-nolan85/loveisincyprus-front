import React from 'react';
import defaultItem from '../../assets/defaultItem.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faCartArrowDown,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { Card, Skeleton } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const Product = ({ product }) => {
  const { title, description, images, slug } = product;

  return (
    <Skeleton active></Skeleton>
    // <Card
    //   cover={
    //     <img
    //       className='product-image'
    //       src={images.length ? images[0].url : defaultItem}
    //     />
    //   }
    //   actions={[
    //     <Link to={`/product/${slug}`}>
    //       <FontAwesomeIcon icon={faEye} className='fa view' />
    //     </Link>,
    //     <FontAwesomeIcon icon={faCartShopping} className='fa add' />,
    //   ]}
    // >
    //   <Meta
    //     title={title}
    //     description={
    //       description && description.length > 50
    //         ? `${description.substring(0, 50)}...`
    //         : description
    //     }
    //   />
    // </Card>
  );
};

export default Product;
