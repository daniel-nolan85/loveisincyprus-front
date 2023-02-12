import React, { useState, useEffect, useRef } from 'react';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginAndRegister = ({ history }) => {
  const [whitelist, setWhitelist] = useState([]);
  const [blacklist, setBlacklist] = useState([]);
  const [ip, setIp] = useState('');

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
    setIp(res.data.IPv4);
  };

  const getBlacklist = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-ips`)
      .then((res) => {
        setBlacklist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .put(`${process.env.REACT_APP_API}/allow-usa`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/fetch-whitelist`)
      .then((res) => {
        setWhitelist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      checkPermission();
    }
  }, [whitelist]);

  const checkPermission = () => {
    fetch(
      'https://api.ipregistry.co/76.202.50.183?key=asf3qlfeefwmnv5w&fields=location.country.code'
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (payload) {
        const userCountryCode = payload['location']['country']['code'];

        if (!whitelist.some((e) => e.countryCode === userCountryCode)) {
          history.push('/');
          toast.error(
            'Access to LoveIsInCyprus is not permitted from your location',
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        }
      });
  };

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
    <div className='form-box authorisation'>
      <div className='button-box'>
        <div id='btn' />
        <button type='button' className='toggle-btn' onClick={showLogin}>
          Login
        </button>
        <button type='button' className='toggle-btn' onClick={showRegister}>
          Register
        </button>
      </div>
      <Register showLogin={showLogin} />
      <Login showRegister={showRegister} />
    </div>
  );
};

export default LoginAndRegister;
