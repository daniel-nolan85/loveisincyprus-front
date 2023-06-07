import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faSpinner,
  faBan,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import NumberToRemove from '../../components/modals/NumberToRemove';
import axios from 'axios';

const MobileBlock = ({ history }) => {
  const [blockedNumbers, setBlockedNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [numberToBlock, setNumberToBlock] = useState('');
  const [numberToRemoveModalIsOpen, setNumberToRemoveModalIsOpen] =
    useState(false);
  const [numberToRemove, setNumberToRemove] = useState({});

  const { token, role } = useSelector((state) => state.user);

  console.log('blockedNumbers => ', blockedNumbers);

  useEffect(() => {
    if (role !== 'main-admin') {
      history.push('/admin/dashboard');
    }
  }, []);

  useEffect(() => {
    fetchBlockedNumbers();
  }, []);

  const fetchBlockedNumbers = async () =>
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-blocked-numbers`)
      .then((res) => setBlockedNumbers(res.data));

  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_API}/block-number`,
        { numberToBlock },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setNumberToBlock('');
        toast.success(`${res.data.mobile} has been blocked`, {
          position: toast.POSITION.TOP_CENTER,
        });
        fetchBlockedNumbers();
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
  };

  const removeThisNumber = (num) => {
    setNumberToRemoveModalIsOpen(true);
    setNumberToRemove(num);
  };

  const deleteNumber = async () => {
    await axios
      .delete(
        `${process.env.REACT_APP_API}/remove-blocked-num/${numberToRemove._id}`,
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(
          `${res.data.mobile} has been removed from the blacklist`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        fetchBlockedNumbers();
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const searched = (query) => (num) => num.mobile.includes(query);

  const numberForm = () => (
    <div className='form-box category'>
      <div className='button-box'>
        <p className='form-header'>Add Mobile Number</p>
      </div>
      <form>
        <input
          type='text'
          className='input-field'
          placeholder='Mobile number'
          value={numberToBlock}
          onChange={(e) => setNumberToBlock(e.target.value)}
          autoFocus
          required
          disabled={loading}
        />
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
          Block
        </button>
      </form>
    </div>
  );

  return (
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        {numberForm()}
        <div className='search-box'>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            onClick={handleSearch}
            className='fa'
          />
          <input
            type='search'
            placeholder='Search Numbers'
            onChange={handleSearch}
            value={query}
          />
        </div>
        <div className='admin-cards'>
          {blockedNumbers.filter(searched(query)).map((num) => (
            <div className='admin-card' key={num._id}>
              <h3>{num.mobile}</h3>
              <FontAwesomeIcon
                icon={faTrashCan}
                className='fa trash'
                onClick={() => removeThisNumber(num)}
              />
            </div>
          ))}
        </div>
      </div>
      <NumberToRemove
        numberToRemoveModalIsOpen={numberToRemoveModalIsOpen}
        setNumberToRemoveModalIsOpen={setNumberToRemoveModalIsOpen}
        numberToRemove={numberToRemove}
        deleteNumber={deleteNumber}
      />
    </div>
  );
};

export default MobileBlock;
