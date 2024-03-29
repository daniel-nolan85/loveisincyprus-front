import React, { useState, useEffect } from 'react';
import SingleProduct from '../../components/cards/SingleProduct';
import ProductInfo from '../../components/cards/ProductInfo';
import { getProduct, productStar, getRelated } from '../../functions/product';
import { useSelector } from 'react-redux';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import Mobile from '../../components/user/Mobile';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (el) => el.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star);
    }
  });

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    productStar(name, newRating, user.token).then((res) => {
      loadSingleProduct();
    });
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
        <div className='related-products'>
          <h1 className='center'>Related Products</h1>
          <div className='product-cards'>
            {related.length
              ? related.map((r) => (
                  <div
                    className='product-card'
                    key={r._id}
                    style={{ margin: '0 5px' }}
                  >
                    <ProductInfo product={r} />
                  </div>
                ))
              : 'No related products found'}
          </div>
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default Product;
