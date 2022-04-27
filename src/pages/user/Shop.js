import React, { useState, useEffect } from 'react';
import { getProductsByCount } from '../../functions/product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faPaperPlane,
  faEdit,
  faTrashCan,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import Product from '../../components/cards/Product';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(3)
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
    <div className='container'>
      {/* <div className='main-content'> */}
      <div className='product-cards'>
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} className='fa' spin />
        ) : (
          <>
            {products &&
              products.map((product) => (
                <div className='product-card' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
          </>
        )}
      </div>
      {/* </div> */}
    </div>
  );
};

export default Shop;
