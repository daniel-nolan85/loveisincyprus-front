import React, { useState, useEffect } from 'react';
import { getWishlist, removeFromWishlist } from '../../functions/user';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductInfo from '../../components/cards/ProductInfo';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import Mobile from '../../components/user/Mobile';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () =>
    getWishlist(user.token).then((res) => {
      setWishlist(res.data.wishlist);
    });

  const handleRemove = (product) =>
    removeFromWishlist(product._id, user.token).then((res) => {
      loadWishlist();
      toast.error(`${product.title} has been removed from your wishlist`, {
        position: toast.POSITION.TOP_CENTER,
      });
    });

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        {!wishlist.length ? (
          <h1 className='center'>
            Your wishlist is currently empty.{' '}
            <Link to='/shop/search'>Go shopping?</Link>
          </h1>
        ) : (
          <>
            <h1 className='center'>Wishlist</h1>
            <div className='container'>
              <div className='product-cards'>
                <>
                  {wishlist &&
                    wishlist.map((product) => (
                      <div className='product-card' key={product._id}>
                        <ProductInfo
                          product={product}
                          wishlist={wishlist}
                          handleRemove={handleRemove}
                        />
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

export default Wishlist;
