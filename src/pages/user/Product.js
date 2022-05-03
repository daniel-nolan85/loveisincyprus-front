import React, { useState, useEffect } from 'react';
import RelatedProducts from '../../components/cards/RelatedProducts';
import SingleProduct from '../../components/cards/SingleProduct';
import ProductInfo from '../../components/cards/ProductInfo';
import { getProduct, productStar, getRelated } from '../../functions/product';
import { useSelector } from 'react-redux';

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
      console.log('rating clicked => ', res.data);
      loadSingleProduct();
    });
  };

  return (
    <>
      <SingleProduct product={product} onStarClick={onStarClick} star={star} />
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
                  </div>
                ))
              : 'No related products found'}
          </div>
        </div>
      </div>
      {/* <RelatedProducts related={related} product={product} /> */}
      {/* {JSON.stringify(related, null, 4)} */}
    </>
  );
};

export default Product;
