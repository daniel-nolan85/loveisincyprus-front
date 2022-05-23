import React, { useState, useEffect } from 'react';
import { getWishlist, removeFromWishlist } from '../../functions/user';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductInfo from '../../components/cards/ProductInfo';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

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
    <>
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
                      {/* <span onClick={() => handleRemove(product)}>X</span> */}
                    </div>
                  ))}
              </>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Wishlist;
