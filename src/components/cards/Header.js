import React, { useState, useEffect } from 'react';
import headerVid from '../../assets/headerVid.mp4';
import CountUp from 'react-countup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const [numDailyMatches, setNumDailyMatches] = useState(0);
  const [numDailySignups, setNumDailySignups] = useState(0);
  const [numMembers, setNumMembers] = useState(0);

  let { token } = useSelector((state) => state.user) || {};

  useEffect(() => {
    fetchMatches();
    fetchSignups();
    fetchMembers();
  }, []);

  const fetchMatches = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/daily-matches`)
      .then((res) => setNumDailyMatches(res.data));
  };

  const fetchSignups = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/daily-signups`)
      .then((res) => setNumDailySignups(res.data));
  };

  const fetchMembers = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/total-users`)
      .then((res) => setNumMembers(res.data));
  };

  return (
    <div className='header-container'>
      <div className='video-container'>
        <video src={headerVid} autoPlay loop muted playsInline></video>
      </div>
      <div className='header-content'>
        <h1>Love is in Cyprus</h1>
        <h2>Make Dating More Human</h2>
        <div className='stats-container'>
          <div className='stats'>
            <h2 className='stats-title'>
              {!token ? (
                <Link to='/authentication' className='link'>
                  <CountUp end={numDailyMatches} duration={5} />
                </Link>
              ) : (
                <Link to='/search-users'>
                  <CountUp end={numDailyMatches} duration={5} />
                </Link>
              )}
            </h2>
            <p className='stats-text'>Daily matches</p>
          </div>

          <div className='stats'>
            <h2 className='stats-title'>
              {!token ? (
                <Link to='/authentication'>
                  <CountUp end={numDailySignups} duration={5} />
                </Link>
              ) : (
                <Link to='/search-users'>
                  <CountUp end={numDailySignups} duration={5} />
                </Link>
              )}
            </h2>
            <p className='stats-text'>Daily signups</p>
          </div>

          <div className='stats'>
            <h2 className='stats-title'>
              {!token ? (
                <Link to='/authentication'>
                  <CountUp end={numMembers} duration={5} />
                </Link>
              ) : (
                <Link to='/search-users'>
                  <CountUp end={numMembers} duration={5} />
                </Link>
              )}
            </h2>
            <p className='stats-text'>Current members</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
