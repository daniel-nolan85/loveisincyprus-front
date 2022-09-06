import React from 'react';
import advertise from '../../assets/advertise.jpg';
import { Link } from 'react-router-dom';

const AdLink = () => {
  return (
    <div className='ad-link-container'>
      <img src={advertise} alt='blank billboard' />
      <div className='ad-link-text'>
        <h1>Have a product or service?</h1>
        <p>
          You may be able to place an advertisement on our site.{' '}
          <span className='lg-screen'>
            Submissions are quick an easy. Click below to find out more.
          </span>
        </p>
        <Link to='/ad-submission' className='submit-btn'>
          Submit an ad
        </Link>
      </div>
    </div>
  );
};

export default AdLink;
