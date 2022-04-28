import React, { useState, useEffect } from 'react';
import RelatedProducts from '../../components/cards/RelatedProducts';
import SingleProduct from '../../components/cards/SingleProduct';
import { getProduct } from '../../functions/product';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});

  const { slug } = match.params;

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () =>
    getProduct(slug).then((res) => setProduct(res.data));

  return (
    <>
      <SingleProduct product={product} />
      <RelatedProducts />
    </>
  );
};

export default Product;
