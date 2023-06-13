import React, { useState, useEffect, useRef } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import Mobile from '../../components/user/Mobile';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const FinalizingGCPayment = () => {
  const [status, setStatus] = useState('');
  const [response, setResponse] = useState({});
  const [ok, setOk] = useState(false);

  const isFirstRun = useRef(true);

  let history = useHistory();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const getStatus = searchParams.get('status');
    const getResponse = searchParams.get('response');
    setStatus(getStatus);
    setResponse(JSON.parse(decodeURIComponent(getResponse)));
  }, []);

  const pendingGCDataString = localStorage.getItem('pendingGCData');
  const pendingGCData = JSON.parse(pendingGCDataString);

  useEffect(() => {
    if (status && status === 'approved') {
      pendingGCData.succeeded = true;
      localStorage.setItem('pendingGCData', JSON.stringify(pendingGCData));
      setOk(true);
    }
  }, [status, response, pendingGCData]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      if (ok) {
        toast.success(`Payment successful! Your card is ready to send.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        history.push(`/create-gift-card/${pendingGCData._id}`);
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

export default FinalizingGCPayment;
