import React, { useState, useEffect } from 'react';
import { getProducts, getProductsCount } from '../../functions/product';
import ProductInfo from './ProductInfo';
import LoadingCard from './LoadingCard';
import { Pagination } from 'antd';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    loadProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadProducts = () => {
    setLoading(true);
    getProducts('sold', 'desc', page)
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <>
      <h1 className='center'>Best Sellers</h1>
      <div className='container'>
        <div className='product-cards'>
          {loading ? (
            <LoadingCard count={3} />
          ) : (
            <>
              {products &&
                products.map((product) => (
                  <div className='product-card' key={product._id}>
                    <ProductInfo product={product} />
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
      <Pagination
        current={page}
        total={Math.round((productsCount / 3) * 10)}
        onChange={(value) => setPage(value)}
        className='antd-pagination'
      />
    </>
  );
};

export default BestSellers;
