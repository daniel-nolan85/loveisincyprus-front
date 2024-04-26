import React, { useState, useEffect, useRef } from 'react';
import { getSubscriptions } from '../../functions/admin';
import { useSelector } from 'react-redux';
import LeftSidebar from '../../components/admin/LeftSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faFilePdf,
  faSpinner,
  faMagnifyingGlass,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import SubscriptionsList from '../../components/lists/SubscriptionsList';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { PDFDownloadLink } from '@react-pdf/renderer';
import SubsToView from '../../components/cards/SubsToView';
import { ChatState } from '../../context/ChatProvider';

const Subscriptions = ({ history }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);
  const [filterByDate, setFilterByDate] = useState(false);
  const [loading, setLoading] = useState(true);

  const isFirstRun = useRef(true);

  const { _id, role, token } = useSelector((state) => state.user);

  const { setNewSubscriptions } = ChatState();

  console.log('subscriptions => ', subscriptions);

  useEffect(() => {
    if (role !== 'main-admin') {
      history.push('/admin/dashboard');
    }
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      filterSubscriptions();
    }
  }, [endDate]);

  useEffect(() => {
    loadSubscriptions();
    setSubsToSeen();
  }, []);

  const loadSubscriptions = () =>
    getSubscriptions(token).then((res) => {
      setSubscriptions(res.data);
      setLoading(false);
    });

  const setSubsToSeen = async () => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/seen-subs`,
        { _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then(fetchNewSubscriptions())
      .catch((err) => console.log(err));
  };

  const fetchNewSubscriptions = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-new-subscriptions`)
      .then((res) => {
        setNewSubscriptions(res.data);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value.toLowerCase());
  };

  const searched = (query) => (q) =>
    (q.userInfo?.name && q.userInfo.name.toLowerCase().includes(query)) ||
    (q.userInfo?.username &&
      q.userInfo?.username.toLowerCase().includes(query)) ||
    (q.userInfo?.email && q.userInfo.email.toLowerCase().includes(query)) ||
    (q.paymentType && q.paymentType.includes(query)) ||
    (q.duration && q.duration.toString().includes(query)) ||
    (q.cost && q.cost.includes(query));

  const chooseDuration = () => {
    setDatePickerIsOpen(true);
  };

  const resetDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const setRange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const filterSubscriptions = async () => {
    if (startDate && !endDate) return;
    else {
      await axios
        .get(`${process.env.REACT_APP_API}/admin/subscriptions`, {
          headers: {
            authtoken: token,
          },
        })
        .then((res) => {
          setDatePickerIsOpen(false);
          if (endDate !== null) {
            const filtered = res.data.filter((sub) => {
              const createdAt = new Date(sub.startDate);
              return createdAt >= startDate && createdAt <= endDate;
            });
            setSubscriptions(filtered);
          } else if (startDate === null) {
            setSubscriptions(res.data);
          }
          setFilterByDate(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content analytics'>
        {loading ? (
          <div className='spinner'>
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          </div>
        ) : (
          <>
            <div className='search-box' style={{ marginBottom: '20px' }}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                onClick={handleSearch}
                className='fa'
              />
              <input
                type='search'
                placeholder='Search Subscriptions'
                onChange={handleSearch}
                value={query}
              />
              <input type='submit' hidden />
            </div>
            <div className='subs-list-btns'>
              {endDate ? (
                <div className='analytics-dates'>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className='fa'
                    onClick={chooseDuration}
                  />
                  <FontAwesomeIcon
                    icon={faRotateLeft}
                    className='fa reset'
                    onClick={resetDates}
                  />
                </div>
              ) : (
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className='fa'
                  onClick={chooseDuration}
                />
              )}
              <PDFDownloadLink
                document={<SubsToView subscriptions={subscriptions} />}
                fileName='subscriptions.pdf'
              >
                <FontAwesomeIcon icon={faFilePdf} className='fa' />
              </PDFDownloadLink>
            </div>
            <DatePicker
              selected={startDate}
              onChange={(dates) => {
                setRange(dates);
              }}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              open={datePickerIsOpen}
              onClickOutside={() => setDatePickerIsOpen(false)}
            />
            {startDate && endDate ? (
              <div className='selected-dates'>
                <p className='center'>
                  <span>{subscriptions.length}</span>{' '}
                  {subscriptions.length === 1
                    ? 'subscription was '
                    : 'subscriptions were '}
                  purchased between{' '}
                  <span>{moment(startDate).format('dddd, D MMMM YYYY')}</span>{' '}
                  and <span>{moment(endDate).format('dddd, D MMMM YYYY')}</span>
                </p>
              </div>
            ) : (
              <div className='selected-dates'>
                <p className='center'>
                  There {subscriptions.length === 1 ? 'has' : 'have'} currently
                  been <span>{subscriptions.length}</span> purchased{' '}
                  {subscriptions.length === 1
                    ? 'subscription'
                    : 'subscriptions'}
                </p>
              </div>
            )}
            <div>
              <SubscriptionsList
                subscriptions={subscriptions}
                searched={searched}
                query={query}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;
