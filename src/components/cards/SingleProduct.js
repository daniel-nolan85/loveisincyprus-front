import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faCartArrowDown,
  faHeart,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import defaultItem from '../../assets/defaultItem.png';
import { Card, Tabs } from 'antd';

const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  const { title, description, images, slug, price, category, subs } = product;
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
                <FontAwesomeIcon icon={faCartShopping} className='fa add' />,
                <span className='tooltip-text'>Add to Cart</span>
              </div>,
              <Link to='/'>
                <div className='tooltip'>
                  <FontAwesomeIcon icon={faHeart} className='fa view' />,
                  <span className='tooltip-text'>Add to Wishlist</span>
                </div>
              </Link>,
            ]}
          >
            <h1>{title}</h1>
            <h4>&euro;{price}</h4>
            <br />
            <h5>Star rating</h5>
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
