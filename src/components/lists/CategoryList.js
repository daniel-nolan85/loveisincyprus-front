import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../functions/category';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () => (
    <div className='cat-list'>
      {categories &&
        categories.map((c) => (
          <button key={c._id} type='button' className='submit-btn cat-list'>
            <Link to={`/category/${c.slug}`} className='form-header'>
              {c.name}
            </Link>
          </button>
        ))}
    </div>
  );

  return (
    <div>
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
      ) : (
        <>
          <h1 className='center'>Categories</h1>
          {showCategories()}
        </>
      )}
    </div>
  );
};

export default CategoryList;
