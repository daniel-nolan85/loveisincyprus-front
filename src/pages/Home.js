import React, { useEffect } from 'react';
import AdLink from '../components/cards/AdLink';
import Carousel from '../components/cards/Carousel';
import FeaturedMembers from '../components/cards/FeaturedMembers';
import Footer from '../components/cards/Footer';
import Header from '../components/cards/Header';
import ShopLink from '../components/cards/ShopLink';
import { ChatState } from '../context/ChatProvider';

const Home = () => {
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      installApp();
    }
  }, []);

  const { setDeferredPrompt } = ChatState();

  const installApp = () => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  };

  return (
    <div>
      <Header />
      <Carousel />
      <FeaturedMembers />
      <ShopLink />
      <AdLink />
      <Footer />
    </div>
  );
};

export default Home;
