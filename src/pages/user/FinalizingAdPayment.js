import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import Mobile from '../../components/user/Mobile';
import { useHistory } from 'react-router-dom';

const AdFinalize = () => {
  const [status, setStatus] = useState('');
  const [approvedData, setApprovedData] = useState({});
  const [demographic, setDemographic] = useState([]);
  const [ok, setOk] = useState(false);

  const isFirstRun = useRef(true);

  let history = useHistory();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const getStatus = searchParams.get('status');
    const getResponse = searchParams.get('response');
    const getDemographic = searchParams.get('demographic');

    setStatus(getStatus);
    setApprovedData(JSON.parse(decodeURIComponent(getResponse)));
    setDemographic(JSON.parse(decodeURIComponent(getDemographic)));
  }, []);

  useEffect(() => {
    if (status && status === 'approved') {
      setOk(true);
    }
  }, [status, approvedData]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      if (ok) {
        toast.success(`Payment successful.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        history.push({
          pathname: '/ad-successful',
          state: { approvedData, demographic },
        });
      }
    }
  }, [ok]);

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        <div className='spinner'>
          <FontAwesomeIcon icon={faSpinner} className='fa' spin />
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default AdFinalize;
