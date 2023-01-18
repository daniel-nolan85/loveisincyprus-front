import React, { useState, useEffect } from 'react';
import { getCategory } from '../../functions/category';
import ProductInfo from '../../components/cards/ProductInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import Mobile from '../../components/user/Mobile';

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        <Mobile />
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} className='fa' spin />
        ) : (
          <>
            <h1 className='center'>
              {products.length === 1
                ? `We have ${products.length} product in the "${category.name}" category`
                : `We have ${products.length} products in the "${category.name}" category`}
            </h1>
            <div className='container'>
              <div className='product-cards'>
                <>
                  {products &&
                    products.map((product) => (
                      <div className='product-card' key={product._id}>
                        <ProductInfo product={product} />
                      </div>
                    ))}
                </>
              </div>
            </div>
          </>
        )}
      </div>
      <RightSidebar />
    </div>
  );
};

export default CategoryHome;
