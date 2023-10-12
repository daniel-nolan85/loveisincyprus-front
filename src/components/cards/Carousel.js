import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import sliderPic1 from '../../assets/sliderPic1.jpg';
import sliderPic2 from '../../assets/sliderPic2.jpg';
import sliderPic3 from '../../assets/sliderPic3.jpg';
import sliderPic4 from '../../assets/sliderPic4.jpg';
import sliderPic5 from '../../assets/sliderPic5.jpg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Carousel = () => {
  let { token } = useSelector((state) => state.user) || {};

  SwiperCore.use([Autoplay, Pagination]);

  return (
    <div className='carousel-container'>
      <div className='carousel-text'>
        <h1>Let's find a match for you</h1>
        <br />
        <h2>Love Is In Cyprus may have the ideal person for you right here</h2>
        <br />
        <h2>
          In a few minutes you could make your first encounter. So what are you
          waiting for?
        </h2>
        {!token ? (
          <Link to='/authentication' className='submit-btn'>
            Join LoveIsInCyprus now
          </Link>
        ) : (
          <Link to='/search-users' className='submit-btn'>
            Find a partner
          </Link>
        )}
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop='true'
        grabCursor='true'
        centeredSlides='true'
        className='carousel-slider'
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      >
        <SwiperSlide className='carousel-slide'>
          <img src={sliderPic1} alt='happy couple' />
        </SwiperSlide>
        <SwiperSlide className='carousel-slide'>
          <img src={sliderPic2} alt='happy couple 2' />
        </SwiperSlide>
        <SwiperSlide className='carousel-slide'>
          <img src={sliderPic3} alt='happy couple 3' />
        </SwiperSlide>
        <SwiperSlide className='carousel-slide'>
          <img src={sliderPic4} alt='happy couple 4' />
        </SwiperSlide>
        <SwiperSlide className='carousel-slide'>
          <img src={sliderPic5} alt='happy couple 5' />
        </SwiperSlide>
      </Swiper>

      <div className='swiper-pagination' />
    </div>
  );
};

export default Carousel;
