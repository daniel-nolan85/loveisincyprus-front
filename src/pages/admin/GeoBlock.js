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

const GeoBlock = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [locations, setLocations] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/admin/fetch-locations`,
        { user },
        {
          headers: {
            authtoken: user.token,
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
        { user, query },
        {
          headers: {
            authtoken: user.token,
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

  //   const getData = async (e) => {
  //     e = e || window.event;
  //     var data = [];
  //     var target = e.srcElement || e.target;
  //     while (target && target.nodeName !== 'TR') {
  //       target = target.parentNode;
  //     }
  //     if (target) {
  //       var cells = target.getElementsByTagName('td');
  //       for (var i = 0; i < cells.length; i++) {
  //         data.push(cells[i].innerHTML);
  //         // cells[2].classList.toggle('check');
  //       }
  //     }
  //     // const whitelistEntry = data.slice(0, 2);

  //     await axios
  //       .post(
  //         `${process.env.REACT_APP_API}/admin/handle-whitelist`,
  //         { user, data },
  //         {
  //           headers: {
  //             authtoken: user.token,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         console.log(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  const handleWhitelist = async (l) => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/admin/handle-whitelist`,
        { user, l },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        fetchLocations();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='container'>
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
