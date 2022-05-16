import React, { useState, useEffect } from 'react';
import { getWishlist, removeFromWishlist } from '../../functions/user';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    <div>
      <h1 className='center'>Wishlist</h1>
      {wishlist.map((p) => (
        <div key={p._id}>
          <Link to={`/product/${p.slug}`}>{p.title}</Link>
          <span onClick={() => handleRemove(p)}>X</span>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
