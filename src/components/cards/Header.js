import React from 'react';
import headerVid from '../../assets/headerVid.mp4';
import CountUp from 'react-countup';

const Header = () => {
  return (
    <div className='header-container'>
      <div className='video-container'>
        <video src={headerVid} autoPlay loop muted></video>
      </div>
      <div className='header-content'>
        <h1>Love is in Cyprus</h1>
        <h2>Make Dating More Human</h2>
        <div className='stats-container'>
          <div className='stats'>
            <h2 className='stats-title'>
              <CountUp end={1837} duration={5} />
            </h2>
            <p className='stats-text'>Daily matches</p>
          </div>

          <div className='stats'>
            <h2 className='stats-title'>
              <CountUp end={156} duration={5} />
            </h2>
            <p className='stats-text'>Daily signups</p>
          </div>

          <div className='stats'>
            <h2 className='stats-title'>
              <CountUp end={705} duration={5} />
            </h2>
            <p className='stats-text'>Current members</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
