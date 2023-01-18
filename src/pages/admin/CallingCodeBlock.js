import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faXmarkCircle,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

const CallingCodeBlock = ({ history }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [codes, setCodes] = useState([]);

  const { token, _id, role } = useSelector((state) => state.user);

  useEffect(() => {
    if (role !== 'main-admin') {
      history.push('/admin/dashboard');
    }
  }, []);

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/admin/fetch-codes`,
        { _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setCodes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchCodes = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_API}/admin/search-codes`,
        { _id, query },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setCodes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePermitted = async (c) => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/admin/handle-permitted`,
        { _id, c },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        fetchCodes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        <form onSubmit={searchCodes}>
          <div className='search-box'>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              onClick={searchCodes}
              className='fa'
            />
            <input
              type='search'
              placeholder='Search Codes'
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchResults([]);
              }}
              value={query}
            />
            <input type='submit' hidden />
          </div>
        </form>

        <table className='geo-block'>
          <thead>
            <tr>
              <td>Country</td>
              <td>Code</td>
              <td>Permitted</td>
            </tr>
          </thead>
          <tbody>
            {codes &&
              codes.map((c) => (
                <tr key={c._id}>
                  <td>{c.country}</td>
                  <td>{c.callingCode}</td>
                  <td>
                    {c.permitted === 'false' ? (
                      <FontAwesomeIcon
                        icon={faXmarkCircle}
                        onClick={() => handlePermitted(c)}
                        className='cross'
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        onClick={() => handlePermitted(c)}
                        className='check'
                      />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CallingCodeBlock;
