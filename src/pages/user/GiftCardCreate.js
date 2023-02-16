import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import Mobile from '../../components/user/Mobile';

const GiftCardCreate = () => {
  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        <h1 className='center'>Create Gift Card</h1>
      </div>
      <RightSidebar />
    </div>
  );
};

export default GiftCardCreate;
