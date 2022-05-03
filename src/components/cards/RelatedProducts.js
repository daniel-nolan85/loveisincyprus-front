import React from 'react';
import ProductInfo from './ProductInfo';

const RelatedProducts = ({ related, product }) => {
  return (
    <div>
      <div className='small-container'>
        <div className='row row-2'>
          <h2>Related Products</h2>
          <p>View More</p>
        </div>
      </div>
      <div className='small-container'>
        <div className='row'>
          {related.length
            ? related.map((r) => (
                <div className='col-4' key={r._id}>
                  <ProductInfo product={r} />
                  <a href='product-details.html'>
                    <img src='images/product-9.jpg' />
                  </a>
                  <a href='product-details.html'>
                    <h4>Leather Strap Watch</h4>
                  </a>
                  <div className='rating'>
                    <i className='fa fa-star' />
                    <i className='fa fa-star' />
                    <i className='fa fa-star' />
                    <i className='fa fa-star-half-o' />
                    <i className='fa fa-star-o' />
                  </div>
                  <p>£80.00</p>
                </div>
              ))
            : 'No related products found'}

          <div className='col-4'>
            <a href='product-details.html'>
              <img src='images/product-10.jpg' />
            </a>
            <a href='product-details.html'>
              <h4>Black Running Shoes</h4>
            </a>
            <div className='rating'>
              <i className='fa fa-star' />
              <i className='fa fa-star' />
              <i className='fa fa-star' />
              <i className='fa fa-star-half-o' />
              <i className='fa fa-star-o' />
            </div>
            <p>£60.00</p>
          </div>
          <div className='col-4'>
            <a href='product-details.html'>
              <img src='images/product-11.jpg' />
            </a>
            <a href='product-details.html'>
              <h4>Grey Slip-ons</h4>
            </a>
            <div className='rating'>
              <i className='fa fa-star' />
              <i className='fa fa-star' />
              <i className='fa fa-star' />
              <i className='fa fa-star-o' />
              <i className='fa fa-star-o' />
            </div>
            <p>£45.00</p>
          </div>
          <div className='col-4'>
            <a href='product-details.html'>
              <img src='images/product-12.jpg' />
            </a>
            <a href='product-details.html'>
              <h4>Black Jogging Bottoms</h4>
            </a>
            <div className='rating'>
              <i className='fa fa-star' />
              <i className='fa fa-star' />
              <i className='fa fa-star' />
              <i className='fa fa-star' />
              <i className='fa fa-star' />
            </div>
            <p>£45.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
