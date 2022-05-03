import React, { useState, useEffect } from 'react';
import { getSub } from '../../functions/sub';
import ProductInfo from '../../components/cards/ProductInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const SubHome = ({ match }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setSub(res.data.sub);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
      ) : (
        <>
          <h1 className='center'>
            {products.length === 1
              ? `We have ${products.length} product in the "${sub.name}" sub-category`
              : `We have ${products.length} products in the "${sub.name}" sub-category`}
          </h1>
          <div className='container'>
            <>
              {products &&
                products.map((product) => (
                  <div className='product-card' key={product._id}>
                    <ProductInfo product={product} />
                  </div>
                ))}
            </>
          </div>
        </>
      )}
    </div>
  );
};

export default SubHome;
