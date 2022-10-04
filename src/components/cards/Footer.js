import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  let { token } = useSelector((state) => state.user) || {};

  return (
    <div className='footer'>
      <div className='footer-overlay'>
        {!token ? (
          <>
            <h1>Sign up to LoveIsInCyprus now and find your partner</h1>
            <Link to='/authentication' className='submit-btn'>
              Join LoveIsInCyprus now
            </Link>
          </>
        ) : (
          <>
            <h1>Search for your perfect partner now</h1>
            <Link to='/search-users' className='submit-btn'>
              Find a partner
            </Link>
          </>
        )}
        <div className='footer-socials'>
          <Link
            to={{
              pathname: 'https://www.facebook.com/loveisincyprus/',
            }}
            target='_blank'
          >
            <FontAwesomeIcon icon={faFacebook} className='fa' />
          </Link>
          <Link
            to={{
              pathname: 'https://www.instagram.com',
            }}
            target='_blank'
          >
            <FontAwesomeIcon icon={faInstagram} className='fa' />
          </Link>
          <Link
            to={{
              pathname: 'https://www.twitter.com',
            }}
            target='_blank'
          >
            <FontAwesomeIcon icon={faTwitter} className='fa' />
          </Link>
        </div>
        <p className='credit'>
          LoveIsInCyprus &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;
