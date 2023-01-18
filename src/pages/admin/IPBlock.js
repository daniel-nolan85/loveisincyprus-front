import React, { useState, useEffect, useRef } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faSpinner,
  faBan,
  faTrashCan,
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import { getIps, removeIp, banIp } from '../../functions/ip';
import IPinfoWrapper from 'node-ipinfo';
import IPInfo from '../../components/modals/IPInfo';
import IPToRemove from '../../components/modals/IPToRemove';

const IPBlock = ({ history }) => {
  const [ips, setIps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [address, setAddress] = useState('');
  const [ipInfoModalIsOpen, setIpInfoModalIsOpen] = useState(false);
  const [ipToRemoveModalIsOpen, setIpToRemoveModalIsOpen] = useState(false);
  const [ipToRemove, setIpToRemove] = useState({});
  const [ipToLookup, setIpToLookup] = useState({});
  const [ipToBan, setIpToBan] = useState({});

  const { token, role } = useSelector((state) => state.user);

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (role !== 'main-admin') {
      history.push('/admin/dashboard');
    }
  }, []);

  useEffect(() => {
    fetchIps();
    console.log(ips);
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      banIp(ipToBan, token)
        .then((res) => {
          setLoading(false);
          setAddress('');
          toast.success(`${res.data.address} has been added to the blacklist`, {
            position: toast.POSITION.TOP_CENTER,
          });
          fetchIps();
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          if (err.response.status === 400) {
            toast.error(err.response.data, {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
  }, [ipToBan]);

  const fetchIps = () => getIps().then((ip) => setIps(ip.data));

  const handleLookup = () => {
    const ipinfo = new IPinfoWrapper(`${process.env.REACT_APP_IP_INFO_TOKEN}`);
    ipinfo.lookupIp(address).then((res) => {
      console.log(res);
      setIpToLookup(res);
    });
    setIpInfoModalIsOpen(true);
  };

  const handleSubmit = () => {
    setLoading(true);
    const ipinfo = new IPinfoWrapper(`${process.env.REACT_APP_IP_INFO_TOKEN}`);
    ipinfo.lookupIp(address).then((res) => {
      console.log(res);
      setIpToBan(res);
    });
  };

  const removeThisIp = (ip) => {
    setIpToRemoveModalIsOpen(true);
    setIpToRemove(ip);
  };

  const deleteIp = () => {
    removeIp(ipToRemove._id, token)
      .then((res) => {
        console.log(res);
        toast.success(`${res.data.ip} has been removed from the blacklist`, {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchIps();
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const searched = (query) => (ip) =>
    ip.ip.includes(query) ||
    ip.city.toLowerCase().includes(query) ||
    ip.country.toLowerCase().includes(query) ||
    ip.region.toLowerCase().includes(query);

  const ipForm = () => (
    <div className='form-box category'>
      <div className='button-box'>
        <p className='form-header'>Add IP Address</p>
      </div>
      <form>
        <input
          type='text'
          className='input-field'
          placeholder='Address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          autoFocus
          required
          disabled={loading}
        />
        <button onClick={handleLookup} type='button' className='submit-btn'>
          <FontAwesomeIcon icon={faBook} className='fa' />
          Lookup
        </button>
        <button
          onClick={handleSubmit}
          type='button'
          className='submit-btn'
          disabled={loading}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faBan} className='fa' />
          )}
          Blacklist
        </button>
      </form>
    </div>
  );

  return (
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        {ipForm()}
        <div className='search-box'>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            onClick={handleSearch}
            className='fa'
          />
          <input
            type='search'
            placeholder='Search Ips'
            onChange={handleSearch}
            value={query}
          />
        </div>
        <div className='admin-cards'>
          {ips.filter(searched(query)).map((ip) => (
            <div className='admin-card' key={ip._id}>
              <h3>{ip.ip}</h3>
              <h4>{ip.city}</h4>
              <h4>{ip.country}</h4>
              <h4>{ip.region}</h4>
              <FontAwesomeIcon
                icon={faTrashCan}
                className='fa trash'
                onClick={() => removeThisIp(ip)}
              />
            </div>
          ))}
        </div>
      </div>
      <IPInfo
        ipInfoModalIsOpen={ipInfoModalIsOpen}
        setIpInfoModalIsOpen={setIpInfoModalIsOpen}
        ipToLookup={ipToLookup}
        handleSubmit={handleSubmit}
      />
      <IPToRemove
        ipToRemoveModalIsOpen={ipToRemoveModalIsOpen}
        setIpToRemoveModalIsOpen={setIpToRemoveModalIsOpen}
        ipToRemove={ipToRemove}
        deleteIp={deleteIp}
      />
    </div>
  );
};

export default IPBlock;
