import React from 'react';
import NewArrivals from '../../components/cards/NewArrivals';
import BestSellers from '../../components/cards/BestSellers';
import CategoryList from '../../components/lists/CategoryList';
import SubList from '../../components/lists/SubList';
import LeftSidebar from '../../components/user/LeftSidebar';

const Shop = () => {
  return (
    <div className='container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        <NewArrivals />
        <BestSellers />
        <CategoryList />
        <SubList />
      </div>
    </div>
  );
};

export default Shop;
