import React from 'react';
import Carousel from '../components/cards/Carousel';
import Footer from '../components/cards/Footer';
import Header from '../components/cards/Header';
import ShopLink from '../components/cards/ShopLink';

const Home = () => {
  return (
    <div>
      <Header />
      <Carousel />
      <ShopLink />
      <Footer />
    </div>
  );
};

export default Home;
