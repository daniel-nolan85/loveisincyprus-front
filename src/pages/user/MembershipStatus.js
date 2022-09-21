import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import { useSelector } from 'react-redux';

const MembershipStatus = () => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'></div>
      <RightSidebar />
    </div>
  );
};

export default MembershipStatus;
