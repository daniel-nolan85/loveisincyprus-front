import React, { useState, useEffect, useRef } from 'react';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginAndRegister = ({ history }) => {
  const [whitelist, setWhitelist] = useState([]);
  const [blacklist, setBlacklist] = useState([]);
  const [ip, setIp] = useState('');

  // const { user } = useSelector((state) => ({ ...state }));

  const isFirstRun = useRef(true);

  useEffect(() => {
    getThisIP();
    getBlacklist();
  }, []);

  useEffect(() => {
    if (blacklist.some((b) => b.ip === ip)) {
      toast.error(
        'Access to LoveIsInCyprus from this IP address has been denied',
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      history.push('/');
    }
  }, [blacklist && ip]);

  const getThisIP = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    console.log(res.data);
    setIp(res.data.IPv4);
  };

  const getBlacklist = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-ips`)
      .then((res) => {
        console.log(res.data);
        setBlacklist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   let intended = history.location.state;
  //   if (intended) {
  //     return;
  //   } else {
  //     if (user && user.token) history.push('/');
  //   }
  // }, [user]);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API}/fetch-whitelist`)
  //     .then((res) => {
  //       // console.log(res.data);
  //       setWhitelist(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // useEffect(() => {
  //   if (isFirstRun.current) {
  //     isFirstRun.current = false;
  //     return;
  //   } else {
  //     checkPermission();
  //   }
  // }, [whitelist]);

  // const checkPermission = () => {
  //   fetch(
  //     'https://api.ipregistry.co/76.202.50.183?key=asf3qlfeefwmnv5w&fields=location.country.code'
  //   )
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (payload) {
  //       const userCountryCode = payload['location']['country']['code'];
  //       console.log('userCountryCode => ', userCountryCode);
  //       console.log('whitelist => ', whitelist);

  //       if (!whitelist.some((e) => e.countryCode === userCountryCode)) {
  //         history.push('/');
  //       }
  //     });
  // };

  // useEffect(() => {
  //   const whitelist = [
  //     'AD',
  //     'AG',
  //     'AR',
  //     'AM',
  //     'AU',
  //     'AT',
  //     'BS',
  //     'BB',
  //     'BY',
  //     'BE',
  //     'BR',
  //     'BG',
  //     'CA',
  //     'CR',
  //     'HR',
  //     'CY',
  //     'CZ',
  //     'DK',
  //     'EE',
  //     'FI',
  //     'FR',
  //     'GE',
  //     'DE',
  //     'GR',
  //     'GT',
  //     'VA',
  //     'HN',
  //     'HU',
  //     'IS',
  //     'IE',
  //     'IL',
  //     'IT',
  //     'KZ',
  //     'KG',
  //     'LV',
  //     'LI',
  //     'LT',
  //     'LU',
  //     'MV',
  //     'MT',
  //     'MH',
  //     'MU',
  //     'MX',
  //     'MD',
  //     'MC',
  //     'ME',
  //     'NL',
  //     'NZ',
  //     'NO',
  //     'PA',
  //     'PY',
  //     'PL',
  //     'PT',
  //     'RO',
  //     'RU',
  //     'KN',
  //     'LC',
  //     'VC',
  //     'SM',
  //     'RS',
  //     'SC',
  //     'SK',
  //     'SI',
  //     'ES',
  //     'SE',
  //     'CH',
  //     'UA',
  //     'GB',
  //     'US',
  //     'UY',
  //     'VE',
  //   ];

  //   // fetch('https://api.ipregistry.co/?key=tryout&fields=location.country.code')
  //   fetch(
  //     'https://api.ipregistry.co/76.202.50.183?key=asf3qlfeefwmnv5w&fields=location.country.code'
  //   )
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (payload) {
  //       const userCountryCode = payload['location']['country']['code'];
  //       if (!whitelist.includes(userCountryCode)) {
  //         history.push('/');
  //       }
  //     });
  // }, []);

  const showLogin = () => {
    document.getElementById('login').style.left = '50px';
    document.getElementById('register').style.left = '450px';
    document.getElementById('btn').style.left = '0px';
  };

  const showRegister = () => {
    document.getElementById('login').style.left = '-400px';
    document.getElementById('register').style.left = '50px';
    document.getElementById('btn').style.left = '95px';
  };

  return (
    <div className='form-box'>
      <div className='button-box'>
        <div id='btn' />
        <button type='button' className='toggle-btn' onClick={showLogin}>
          Login
        </button>
        <button type='button' className='toggle-btn' onClick={showRegister}>
          Register
        </button>
      </div>
      <Register />
      <Login />
    </div>
  );
};

export default LoginAndRegister;
