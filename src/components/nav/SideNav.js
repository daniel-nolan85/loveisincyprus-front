import React, { useState } from 'react';
import menuBtn from '../../assets/menu.png';
import closeBtn from '../../assets/close.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SideNav = () => {
  const [openNav, setOpenNav] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  return (
    <>
      {user && (
        <div
          id='side-nav'
          style={openNav ? { right: '0' } : { right: '-250px' }}
        >
          <nav>
            <ul>
              {user.role === 'main-admin' ? (
                <li onClick={() => setOpenNav(false)}>
                  <Link to='/admin/dashboard'>ADMIN DASHBOARD</Link>
                </li>
              ) : (
                user.role === 'secondary-admin' && (
                  <li onClick={() => setOpenNav(false)}>
                    <Link to='/admin/dashboard'>ADMIN DASHBOARD</Link>
                  </li>
                )
              )}
              <li onClick={() => setOpenNav(false)}>
                <Link to='/user/dashboard'>DASHBOARD</Link>
              </li>
              <li onClick={() => setOpenNav(false)}>
                <Link to='/search-users'>SEARCH MEMBERS</Link>
              </li>
              {user.membership.paid && (
                <li onClick={() => setOpenNav(false)}>
                  <Link to='/swipe-to-match'>SWIPE</Link>
                </li>
              )}
              <li onClick={() => setOpenNav(false)}>
                <Link to='/points'>POINTS</Link>
              </li>
              <li onClick={() => setOpenNav(false)}>
                <Link to='/chats'>CHATS</Link>
              </li>
              <li onClick={() => setOpenNav(false)}>
                <Link to='/notifications'>NOTIFICATIONS</Link>
              </li>
              <li onClick={() => setOpenNav(false)}>
                <Link to='/shop'>SHOP</Link>
              </li>
              <li onClick={() => setOpenNav(false)}>
                <Link to='/cart'>CART</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <div id='menu-btn'>
        <img
          src={openNav ? closeBtn : menuBtn}
          alt='menu button'
          onClick={() => setOpenNav(!openNav)}
          id='menu'
        />
      </div>
    </>
  );
};

export default SideNav;
