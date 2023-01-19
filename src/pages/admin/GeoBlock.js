import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faXmarkCircle,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

const GeoBlock = ({ history }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [locations, setLocations] = useState([]);

  const { token, _id, role } = useSelector((state) => state.user);

  useEffect(() => {
    if (role !== 'main-admin') {
      history.push('/admin/dashboard');
    }
  }, []);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/admin/fetch-locations`,
        { _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setLocations(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchCountries = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_API}/admin/search-locations`,
        { _id, query },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setLocations(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleWhitelist = async (l) => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/admin/handle-whitelist`,
        { _id, l },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        fetchLocations();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        <form onSubmit={searchCountries}>
          <div className='search-box'>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              onClick={searchCountries}
              className='fa'
            />
            <input
              type='search'
              placeholder='Search Countries'
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
              <td className='iso-code'>ISO Code</td>
              <td>Whitelist</td>
            </tr>
          </thead>
          <tbody>
            {locations &&
              locations.map((l) => (
                <tr key={l._id}>
                  <td>{l.country}</td>
                  <td className='iso-code'>{l.countryCode}</td>
                  <td>
                    {l.whitelist === 'false' ? (
                      <FontAwesomeIcon
                        icon={faXmarkCircle}
                        onClick={() => handleWhitelist(l)}
                        className='cross'
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        onClick={() => handleWhitelist(l)}
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

export default GeoBlock;
