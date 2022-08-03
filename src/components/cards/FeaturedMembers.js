import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import defaultProfile from '../../assets/defaultProfile.png';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
// import { Swiper } from 'swiper/react/swiper';
// import { SwiperSlide } from 'swiper/react/swiper-slide';
import SwiperCore, { Autoplay, EffectCoverflow } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { useSelector } from 'react-redux';

const FeaturedMembers = () => {
  const [featuredMembers, setFeaturedMembers] = useState([]);
  SwiperCore.use([Autoplay, EffectCoverflow]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    fetchFeaturedMembers();
  }, []);

  const fetchFeaturedMembers = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-featured-members`)
      .then((res) => {
        console.log(res.data);
        setFeaturedMembers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='featured-members-container'>
      <h1>Our Featured Members</h1>
      <Swiper
        // spaceBetween={5}
        slidesPerView={window.innerWidth / 300}
        effect='coverflow'
        grabCursor='true'
        centeredSlides='true'
        modules={[Autoplay]}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        loop='true'
        autoplay={{ delay: 1000, disableOnInteraction: false }}
      >
        {featuredMembers &&
          featuredMembers.map((f) => (
            <SwiperSlide key={f._id}>
              {user ? (
                <Link
                  to={
                    user._id === f._id
                      ? `/user/profile/${user._id}`
                      : `/user/${f._id}`
                  }
                >
                  <img
                    src={f.profileImage ? f.profileImage.url : defaultProfile}
                    alt={`${f.name || f.email.split('@')[0]}'s profile picture`}
                  />
                </Link>
              ) : (
                <img
                  src={f.profileImage ? f.profileImage.url : defaultProfile}
                  alt={`${f.name || f.email.split('@')[0]}'s profile picture`}
                />
              )}
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default FeaturedMembers;
