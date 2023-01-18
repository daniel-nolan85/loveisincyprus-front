import React from 'react';
import NewArrivals from '../../components/cards/NewArrivals';
import BestSellers from '../../components/cards/BestSellers';
import CategoryList from '../../components/lists/CategoryList';
import SubList from '../../components/lists/SubList';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import Mobile from '../../components/user/Mobile';

const Shop = () => {
  return (
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        <Mobile />
        <NewArrivals />
        <BestSellers />
        <CategoryList />
        <SubList />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Shop;
