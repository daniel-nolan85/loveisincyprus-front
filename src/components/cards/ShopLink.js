import React from 'react';
import tshirt from '../../assets/tshirt.jpg';
import { Link } from 'react-router-dom';

const ShopLink = () => {
  return (
    <div className='shop-link-container'>
      <img src={tshirt} alt='LIIC tshirt' />
      <div className='shop-link-text'>
        <h1>Visit our online store</h1>
        <p>
          To become even more part of our Community, visit the Community Store
          and adopt the LoveisinCyprus style!
        </p>
        <Link to='/shop' className='submit-btn'>
          Visit our community shop
        </Link>
      </div>
    </div>
  );
};

export default ShopLink;
