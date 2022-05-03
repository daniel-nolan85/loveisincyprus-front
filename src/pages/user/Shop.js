import React from 'react';
import NewArrivals from '../../components/cards/NewArrivals';
import BestSellers from '../../components/cards/BestSellers';
import CategoryList from '../../components/lists/CategoryList';
import SubList from '../../components/lists/SubList';

const Shop = () => {
  return (
    <>
      <NewArrivals />
      <BestSellers />
      <CategoryList />
      <SubList />
    </>
  );
};

export default Shop;
