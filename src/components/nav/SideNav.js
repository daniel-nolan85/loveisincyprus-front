import React, { useState } from 'react';
import menuBtn from '../../assets/menu.png';
import closeBtn from '../../assets/close.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChatState } from '../../context/ChatProvider';

const SideNav = () => {
  const [openNav, setOpenNav] = useState(false);
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);

  const { newAds, newVerifs, reportedContent, productsForReview, newOrders } =
    ChatState();

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
                <div className='dropdown sidenav-dropdown'>
                  {deviceSize > 450 ? (
                    <li onClick={() => setOpenNav(false)}>
                      <Link to='/admin/dashboard'>ADMIN DASHBOARD</Link>
                    </li>
                  ) : (
                    <li>
                      <span className='sidenav-link'>ADMIN DASHBOARD</span>
                    </li>
                  )}
                  <div className='dropdown-content sidenav'>
                    <Link
                      to='/admin/dashboard'
                      onClick={() => setOpenNav(false)}
                    >
                      Dashboard
                    </Link>
                    <br />
                    {user.role === 'main-admin' && (
                      <>
                        <Link
                          to='/admin/ad-submissions'
                          onClick={() => setOpenNav(false)}
                        >
                          Ad Submissions
                          <span className='sidenav-count'>
                            {newAds && newAds.length > 0 && newAds.length}
                          </span>
                        </Link>
                        <br />
                      </>
                    )}
                    {user.canVerify && (
                      <>
                        <Link
                          to='/admin/verif-submissions'
                          onClick={() => setOpenNav(false)}
                        >
                          Verified User Submissions
                          <span className='sidenav-count'>
                            {newVerifs &&
                              newVerifs.length > 0 &&
                              newVerifs.length}
                          </span>
                        </Link>
                        <br />
                      </>
                    )}
                    {user.canReported && (
                      <>
                        <Link
                          to='/admin/reported-content'
                          onClick={() => setOpenNav(false)}
                        >
                          Reported Content
                          <span className='sidenav-count'>
                            {reportedContent &&
                              reportedContent.content.length > 0 &&
                              reportedContent.content.length}
                          </span>
                        </Link>
                        <br />
                      </>
                    )}
                    {user.role === 'main-admin' && (
                      <>
                        <Link
                          to='/admin/product-review'
                          onClick={() => setOpenNav(false)}
                        >
                          Products to Review
                          <span className='sidenav-count'>
                            {productsForReview &&
                              productsForReview.length > 0 &&
                              productsForReview.length}
                          </span>
                        </Link>
                        <br />
                      </>
                    )}
                    {user.canOrders && (
                      <>
                        <Link
                          to='/admin/orders'
                          onClick={() => setOpenNav(false)}
                        >
                          Orders
                          <span className='sidenav-count'>
                            {newOrders &&
                              newOrders.length > 0 &&
                              newOrders.length}
                          </span>
                        </Link>
                        <br />
                      </>
                    )}
                    <>
                      <Link
                        to={{
                          pathname:
                            'https://statcounter.com/p12198487/summary/',
                        }}
                        target='_blank'
                        onClick={() => setOpenNav(false)}
                      >
                        Analytics
                      </Link>
                      <br />
                    </>
                    {user.canPosts && (
                      <>
                        <Link
                          to='/admin/posts'
                          onClick={() => setOpenNav(false)}
                        >
                          Posts
                        </Link>
                        <br />
                      </>
                    )}
                    {user.canUsers && (
                      <>
                        <Link
                          to='/admin/users'
                          onClick={() => setOpenNav(false)}
                        >
                          Users
                        </Link>
                        <br />
                      </>
                    )}
                    {user.canMassMail && (
                      <>
                        <Link
                          to='/admin/mass-mail'
                          onClick={() => setOpenNav(false)}
                        >
                          Mass Mail
                        </Link>
                        <br />
                      </>
                    )}
                    {user.canEvents && (
                      <>
                        <Link
                          to='/admin/event'
                          onClick={() => setOpenNav(false)}
                        >
                          Events
                        </Link>
                        <br />
                      </>
                    )}
                    {user.role === 'main-admin' && (
                      <>
                        <Link
                          to='/admin/geo-block'
                          onClick={() => setOpenNav(false)}
                        >
                          Geo-Block
                        </Link>
                        <br />
                        <Link
                          to='/admin/ip-block'
                          onClick={() => setOpenNav(false)}
                        >
                          IP-Block
                        </Link>
                        <br />
                        <Link
                          to='/admin/calling-code-block'
                          onClick={() => setOpenNav(false)}
                        >
                          Calling Code-Block
                        </Link>
                        <br />
                      </>
                    )}
                    {user.canProducts && (
                      <>
                        <Link
                          to='/admin/product'
                          onClick={() => setOpenNav(false)}
                        >
                          Products
                        </Link>
                        <br />
                      </>
                    )}
                    {user.canCategories && (
                      <>
                        <Link
                          to='/admin/category'
                          onClick={() => setOpenNav(false)}
                        >
                          Categories
                        </Link>
                        <br />
                      </>
                    )}
                    {user.canSubs && (
                      <>
                        <Link to='/admin/sub' onClick={() => setOpenNav(false)}>
                          Sub-Categories
                        </Link>
                        <br />
                      </>
                    )}
                    {user.canCoupon && (
                      <>
                        <Link
                          to='/admin/coupon'
                          onClick={() => setOpenNav(false)}
                        >
                          Coupon
                        </Link>
                        <br />
                      </>
                    )}
                  </div>
                </div>
              ) : (
                user.role === 'secondary-admin' && (
                  <div className='dropdown sidenav-dropdown'>
                    {deviceSize > 450 ? (
                      <li onClick={() => setOpenNav(false)}>
                        <Link to='/admin/dashboard'>ADMIN DASHBOARD</Link>
                      </li>
                    ) : (
                      <li>
                        <span className='sidenav-link'>ADMIN DASHBOARD</span>
                      </li>
                    )}
                    <div className='dropdown-content sidenav'>
                      <Link
                        to='/admin/dashboard'
                        onClick={() => setOpenNav(false)}
                      >
                        Dashboard
                      </Link>
                      <br />
                      {user.role === 'main-admin' && (
                        <>
                          <Link
                            to='/admin/ad-submissions'
                            onClick={() => setOpenNav(false)}
                          >
                            Ad Submissions
                            <span className='sidenav-count'>
                              {newAds && newAds.length > 0 && newAds.length}
                            </span>
                          </Link>
                          <br />
                        </>
                      )}
                      {user.canVerify && (
                        <>
                          <Link
                            to='/admin/verif-submissions'
                            onClick={() => setOpenNav(false)}
                          >
                            Verified User Submissions
                            <span className='sidenav-count'>
                              {newVerifs &&
                                newVerifs.length > 0 &&
                                newVerifs.length}
                            </span>
                          </Link>
                          <br />
                        </>
                      )}
                      {user.canReported && (
                        <>
                          <Link
                            to='/admin/reported-content'
                            onClick={() => setOpenNav(false)}
                          >
                            Reported Content
                            <span className='sidenav-count'>
                              {reportedContent &&
                                reportedContent.content.length > 0 &&
                                reportedContent.content.length}
                            </span>
                          </Link>
                          <br />
                        </>
                      )}
                      {user.role === 'main-admin' && (
                        <>
                          <Link
                            to='/admin/product-review'
                            onClick={() => setOpenNav(false)}
                          >
                            Products to Review
                            <span className='sidenav-count'>
                              {productsForReview &&
                                productsForReview.length > 0 &&
                                productsForReview.length}
                            </span>
                          </Link>
                          <br />
                        </>
                      )}
                      {user.canOrders && (
                        <>
                          <Link
                            to='/admin/orders'
                            onClick={() => setOpenNav(false)}
                          >
                            Orders
                            <span className='sidenav-count'>
                              {newOrders &&
                                newOrders.length > 0 &&
                                newOrders.length}
                            </span>
                          </Link>
                          <br />
                        </>
                      )}
                      <>
                        <Link
                          to={{
                            pathname:
                              'https://statcounter.com/p12198487/summary/',
                          }}
                          target='_blank'
                          onClick={() => setOpenNav(false)}
                        >
                          Analytics
                        </Link>
                        <br />
                      </>
                      {user.canPosts && (
                        <>
                          <Link
                            to='/admin/posts'
                            onClick={() => setOpenNav(false)}
                          >
                            Posts
                          </Link>
                          <br />
                        </>
                      )}
                      {user.canUsers && (
                        <>
                          <Link
                            to='/admin/users'
                            onClick={() => setOpenNav(false)}
                          >
                            Users
                          </Link>
                          <br />
                        </>
                      )}
                      {user.canMassMail && (
                        <>
                          <Link
                            to='/admin/mass-mail'
                            onClick={() => setOpenNav(false)}
                          >
                            Mass Mail
                          </Link>
                          <br />
                        </>
                      )}
                      {user.canEvents && (
                        <>
                          <Link
                            to='/admin/event'
                            onClick={() => setOpenNav(false)}
                          >
                            Events
                          </Link>
                          <br />
                        </>
                      )}
                      {user.role === 'main-admin' && (
                        <>
                          <Link
                            to='/admin/geo-block'
                            onClick={() => setOpenNav(false)}
                          >
                            Geo-Block
                          </Link>
                          <br />
                          <Link
                            to='/admin/ip-block'
                            onClick={() => setOpenNav(false)}
                          >
                            IP-Block
                          </Link>
                          <br />
                          <Link
                            to='/admin/calling-code-block'
                            onClick={() => setOpenNav(false)}
                          >
                            Calling Code-Block
                          </Link>
                          <br />
                        </>
                      )}
                      {user.canProducts && (
                        <>
                          <Link
                            to='/admin/product'
                            onClick={() => setOpenNav(false)}
                          >
                            Products
                          </Link>
                          <br />
                        </>
                      )}
                      {user.canCategories && (
                        <>
                          <Link
                            to='/admin/category'
                            onClick={() => setOpenNav(false)}
                          >
                            Categories
                          </Link>
                          <br />
                        </>
                      )}
                      {user.canSubs && (
                        <>
                          <Link
                            to='/admin/sub'
                            onClick={() => setOpenNav(false)}
                          >
                            Sub-Categories
                          </Link>
                          <br />
                        </>
                      )}
                      {user.canCoupon && (
                        <>
                          <Link
                            to='/admin/coupon'
                            onClick={() => setOpenNav(false)}
                          >
                            Coupon
                          </Link>
                          <br />
                        </>
                      )}
                    </div>
                  </div>
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
