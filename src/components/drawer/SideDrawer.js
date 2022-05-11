import React from 'react';
import { Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultItem from '../../assets/defaultItem.png';

const SideDrawer = () => {
  const dispatch = useDispatch();

  const { drawer, cart } = useSelector((state) => ({ ...state }));

  const imageStyle = { width: '100%', height: '200px', objectFit: 'cover' };

  return (
    <Drawer
      title={cart.length === 1 ? `${cart.length} item` : `${cart.length} items`}
      placement='right'
      onClose={() => {
        dispatch({ type: 'SET_VISIBLE', payload: false });
      }}
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id}>
          {p.images[0] ? (
            <img src={p.images[0].url} style={imageStyle} />
          ) : (
            <img src={defaultItem} style={imageStyle} />
          )}
          <p>
            {p.title} x {p.count}
          </p>
        </div>
      ))}
      <button
        type='submit'
        className='submit-btn'
        onClick={() => dispatch({ type: 'SET_VISIBLE', payload: false })}
      >
        <Link to='/cart'>Go to Cart</Link>
      </button>
    </Drawer>
  );
};

export default SideDrawer;
