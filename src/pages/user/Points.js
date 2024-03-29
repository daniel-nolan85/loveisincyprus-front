import React, { useState, useEffect, useRef } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import {
  getUserPointsTotal,
  getUserPointsGainedData,
  getUserPointsLostData,
  getUserPointsSpentData,
} from '../../functions/user';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCashRegister,
  faChartLine,
  faCircleInfo,
  faCircleQuestion,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import PointsInfo from '../../components/modals/PointsInfo';
import PointsQuestions from '../../components/modals/PointsQuestions';
import SpendPoints from '../../components/modals/SpendPoints';
import { useLocation } from 'react-router-dom';
import { ChatState } from '../../context/ChatProvider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Mobile from '../../components/user/Mobile';

const Points = () => {
  const [points, setPoints] = useState(0);
  const [pointsInfoModalIsOpen, setPointsInfoModalIsOpen] = useState(false);
  const [spendPointsModalIsOpen, setSpendPointsModalIsOpen] = useState(false);
  const [pointsFeaturedModalIsOpen, setPointsFeaturedModalIsOpen] =
    useState(false);
  const [pointsFiveModalIsOpen, setPointsFiveModalIsOpen] = useState(false);
  const [pointsTenModalIsOpen, setPointsTenModalIsOpen] = useState(false);
  const [pointsEventsModalIsOpen, setPointsEventsModalIsOpen] = useState(false);
  const [pointsGainedData, setPointsGainedData] = useState([]);
  const [pointsGainedDisplay, setPointsGainedDisplay] = useState([]);
  const [pointsLostData, setPointsLostData] = useState([]);
  const [pointsLostDisplay, setPointsLostDisplay] = useState([]);
  const [pointsSpentData, setPointsSpentData] = useState([]);
  const [pointsSpentDisplay, setPointsSpentDisplay] = useState([]);
  const [pointsGainedGraph, setPointsGainedGraph] = useState({
    labels: '',
    datasets: [
      {
        label: 'Points Accumulated',
        data: '',
        backgroundColor: '#7cfc00',
      },
    ],
  });
  const [pointsLostGraph, setPointsLostGraph] = useState({
    labels: '',
    datasets: [
      {
        label: 'Points Lost',
        data: '',
        backgroundColor: '#c70000',
      },
    ],
  });
  const [pointsSpentGraph, setPointsSpentGraph] = useState({
    labels: '',
    datasets: [
      {
        label: 'Points Spent',
        data: '',
        backgroundColor: '#c70000',
      },
    ],
  });
  const [showGainedChart, setShowGainedChart] = useState(false);
  const [showLostChart, setShowLostChart] = useState(false);
  const [showSpentChart, setShowSpentChart] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterBy, setFilterBy] = useState('today');

  const { pointsQuestionsModalIsOpen, setPointsQuestionsModalIsOpen } =
    ChatState();

  const { user } = useSelector((state) => ({ ...state }));

  const isFirstRun = useRef(true);

  const locate = useLocation();

  useEffect(() => {
    if (locate.state?.clickedfromPopup) {
      setPointsQuestionsModalIsOpen(true);
    }
  }, [locate.state?.clickedfromPopup]);

  useEffect(() => {
    fetchUserPointsTotal();
    fetchUserPointsGainedData();
    fetchUserPointsLostData();
    fetchUserPointsSpentData();
  }, []);

  useEffect(() => {
    today();
  }, [pointsGainedData, pointsLostData, pointsSpentData]);

  useEffect(() => {
    updateGainedChart();
    updateLostChart();
    updateSpentChart();
  }, [pointsGainedDisplay]);

  const handleInfo = () => {
    setPointsInfoModalIsOpen(true);
  };

  const handleQuestions = () => {
    setPointsQuestionsModalIsOpen(true);
  };

  const handleSpendPoints = () => {
    setSpendPointsModalIsOpen(true);
  };

  const fetchUserPointsTotal = () =>
    getUserPointsTotal(user.token).then((res) => {
      setPoints(res.data);
      setLoading(false);
    });

  const fetchUserPointsGainedData = () => {
    getUserPointsGainedData(user.token).then((res) => {
      setPointsGainedData(res.data.pointsGained);
      setPointsGainedDisplay(res.data.pointsGained);
    });
  };

  const fetchUserPointsLostData = () => {
    getUserPointsLostData(user.token).then((res) => {
      setPointsLostData(res.data.pointsLost);
      setPointsLostDisplay(res.data.pointsLost);
    });
  };

  const fetchUserPointsSpentData = () => {
    getUserPointsSpentData(user.token).then((res) => {
      setPointsSpentData(res.data.pointsSpent);
      setPointsSpentDisplay(res.data.pointsSpent);
    });
  };

  const today = () => {
    const now = new Date();
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const pGained = pointsGainedData.filter((d) => {
      var time = new Date(d.awarded).getTime();
      return yesterday < time && time < now;
    });
    const pLost = pointsLostData.filter((d) => {
      var time = new Date(d.removed).getTime();
      return yesterday < time && time < now;
    });
    const pSpent = pointsSpentData.filter((d) => {
      var time = new Date(d.spent).getTime();
      return yesterday < time && time < now;
    });
    setPointsGainedDisplay(pGained);
    setPointsLostDisplay(pLost);
    setPointsSpentDisplay(pSpent);
    setFilterBy('today');
  };

  const thisWeek = () => {
    const now = new Date();
    const lastWeek = new Date(new Date().setDate(new Date().getDate() - 7));
    const pg = pointsGainedData.filter((d) => {
      var time = new Date(d.awarded).getTime();
      return lastWeek < time && time < now;
    });
    const pl = pointsLostData.filter((d) => {
      var time = new Date(d.removed).getTime();
      return lastWeek < time && time < now;
    });
    const ps = pointsSpentData.filter((d) => {
      var time = new Date(d.spent).getTime();
      return lastWeek < time && time < now;
    });
    setPointsGainedDisplay(pg);
    setPointsLostDisplay(pl);
    setPointsSpentDisplay(ps);
    setFilterBy('thisWeek');
  };

  const thisMonth = () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const pg = pointsGainedData.filter((d) => {
      const [year, month] = d.awarded.split('-');
      return currentMonth === +month && currentYear == year;
    });
    const pl = pointsLostData.filter((d) => {
      const [year, month] = d.removed.split('-');
      return currentMonth === +month && currentYear == year;
    });
    const ps = pointsSpentData.filter((d) => {
      const [year, month] = d.spent.split('-');
      return currentMonth === +month && currentYear == year;
    });
    setPointsGainedDisplay(pg);
    setPointsLostDisplay(pl);
    setPointsSpentDisplay(ps);
    setFilterBy('thisMonth');
  };

  const select = () => {
    setDatePickerIsOpen(true);
    setFilterBy('select');
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      const selectedMonth = new Date(startDate).getMonth() + 1;
      const selectedYear = new Date(startDate).getFullYear();
      const pg = pointsGainedData.filter((d) => {
        const [year, month] = d.awarded.split('-');
        return selectedMonth === +month && selectedYear == year;
      });
      const pl = pointsLostData.filter((d) => {
        const [year, month] = d.removed.split('-');
        return selectedMonth === +month && selectedYear == year;
      });
      const ps = pointsSpentData.filter((d) => {
        const [year, month] = d.spent.split('-');
        return selectedMonth === +month && selectedYear == year;
      });
      setPointsGainedDisplay(pg);
      setPointsLostDisplay(pl);
      setPointsSpentDisplay(ps);
    }
  }, [startDate]);

  const updateGainedChart = () => {
    const pgLabels = pointsGainedDisplay.reduce(
      (c, n) =>
        c.find((el) => el.awarded.split('T')[0] == n.awarded.split('T')[0])
          ? c
          : [...c, n],
      []
    );
    const pgData = Array.from(
      pointsGainedDisplay.reduce(
        (pg, { awarded, amount }) =>
          pg.set(
            awarded.split('T')[0],
            (pg.get(awarded.split('T')[0]) || 0) + amount
          ),
        new Map()
      ),
      ([awarded, amount]) => ({ awarded, amount })
    );

    setPointsGainedGraph({
      labels: pgLabels.map((date) =>
        moment(date.awarded).format('MMMM Do YYYY')
      ),
      datasets: [
        {
          label: 'Points Accumulated',
          data: pgData.map((pg) => pg.amount),
          backgroundColor: '#7cfc00',
        },
      ],
    });
  };

  const updateLostChart = () => {
    const plLabels = pointsLostDisplay.reduce(
      (c, n) =>
        c.find((el) => el.removed.split('T')[0] == n.removed.split('T')[0])
          ? c
          : [...c, n],
      []
    );
    const plData = Array.from(
      pointsLostDisplay.reduce(
        (pl, { removed, amount }) =>
          pl.set(
            removed.split('T')[0],
            (pl.get(removed.split('T')[0]) || 0) + amount
          ),
        new Map()
      ),
      ([removed, amount]) => ({ removed, amount })
    );

    setPointsLostGraph({
      labels: plLabels.map((date) =>
        moment(date.removed).format('MMMM Do YYYY')
      ),
      datasets: [
        {
          label: 'Points Lost',
          data: plData.map((pl) => pl.amount),
          backgroundColor: '#7cfc00',
        },
      ],
    });
  };

  const updateSpentChart = () => {
    const psLabels = pointsSpentDisplay.reduce(
      (c, n) =>
        c.find((el) => el.spent.split('T')[0] == n.spent.split('T')[0])
          ? c
          : [...c, n],
      []
    );
    const psData = Array.from(
      pointsSpentDisplay.reduce(
        (ps, { spent, amount }) =>
          ps.set(
            spent.split('T')[0],
            (ps.get(spent.split('T')[0]) || 0) + amount
          ),
        new Map()
      ),
      ([spent, amount]) => ({ spent, amount })
    );

    setPointsSpentGraph({
      labels: psLabels.map((date) => moment(date.spent).format('MMMM Do YYYY')),
      datasets: [
        {
          label: 'Points Spent',
          data: psData.map((ps) => ps.amount),
          backgroundColor: '#7cfc00',
        },
      ],
    });
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        <Mobile />
        {loading ? (
          <div className='spinner'>
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          </div>
        ) : (
          <>
            <h1 className='center'>
              You currently have a total of{' '}
              {points === 1 ? `${points} point` : `${points} points`}
            </h1>
            <div className='points-icons'>
              <div className='tooltip'>
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  className='fa'
                  onClick={handleInfo}
                />
                <span className='tooltip-text'>Info about points</span>
              </div>
              <div className='tooltip'>
                <FontAwesomeIcon
                  icon={faCircleQuestion}
                  className='fa'
                  onClick={handleQuestions}
                />
                <span className='tooltip-text'>Questions about points</span>
              </div>
              {user.membership.paid && (
                <div className='tooltip'>
                  <FontAwesomeIcon
                    icon={faCashRegister}
                    className='fa'
                    onClick={handleSpendPoints}
                  />
                  <span className='tooltip-text'>Spend your points</span>
                </div>
              )}
            </div>
            <div className='points-filter-btns'>
              <button
                onClick={today}
                className={
                  filterBy === 'today' ? 'submit-btn-active' : 'submit-btn'
                }
              >
                Today
              </button>
              <button
                onClick={thisWeek}
                className={
                  filterBy === 'thisWeek' ? 'submit-btn-active' : 'submit-btn'
                }
              >
                This Week
              </button>
              <button
                onClick={thisMonth}
                className={
                  filterBy === 'thisMonth' ? 'submit-btn-active' : 'submit-btn'
                }
              >
                This Month
              </button>
              <button
                onClick={select}
                className={
                  filterBy === 'select' ? 'submit-btn-active' : 'submit-btn'
                }
              >
                Select
              </button>
            </div>
            <div className='filter-datepicker'>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setDatePickerIsOpen(false);
                }}
                dateFormat='MM/yyyy'
                showMonthYearPicker
                open={datePickerIsOpen}
                onClickOutside={() => setDatePickerIsOpen(false)}
              />
            </div>
            <div
              className='small-container cart-page'
              style={{ marginTop: '40px' }}
            >
              {pointsGainedDisplay.length === 0 ? (
                <h1 className='center'>
                  No points were accumulated at the selected time
                </h1>
              ) : (
                <>
                  <div className='chart-header'>
                    <h2>Points Accumulated</h2>
                    <FontAwesomeIcon
                      icon={faChartLine}
                      className='fa'
                      onClick={() => setShowGainedChart(!showGainedChart)}
                    />
                  </div>
                  <Line
                    data={pointsGainedGraph}
                    style={{
                      marginBottom: '30px',
                      display: showGainedChart ? 'flex' : 'none',
                    }}
                  />
                  <table>
                    <tbody>
                      <tr>
                        <th>Date</th>
                        <th>Points</th>
                        <th>Action</th>
                      </tr>
                      {pointsGainedDisplay.map((pg) => (
                        <tr key={pg._id}>
                          <td>
                            <p>{moment(pg.awarded).format('MMMM Do YYYY')}</p>
                          </td>
                          <td>
                            <p>{pg.amount}</p>
                          </td>
                          <td>
                            <p>
                              {pg.reason === 'post' && 'You created a new post'}
                              {pg.reason === 'login' &&
                                'You logged in to the site'}
                              {pg.reason === 'new visitor' &&
                                'A new user visited your profile'}
                              {pg.reason === 'new visit' &&
                                "You visited a new member's  profile"}
                              {pg.reason === 'profile complete' &&
                                'You completed 100% of your profile'}
                              {pg.reason === 'match' &&
                                'You matched with another user'}
                              {pg.reason === 'event post' &&
                                'You posted on an event'}
                              {pg.reason === 'store purchase' &&
                                'You made a store purchase'}
                              {pg.reason === 'verified' &&
                                'You became a verified member'}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
            <div
              className='small-container cart-page'
              style={{ marginTop: '40px' }}
            >
              {pointsLostDisplay.length === 0 ? (
                <h1 className='center'>
                  No points were lost at the selected time
                </h1>
              ) : (
                <>
                  <div className='chart-header'>
                    <h2>Points Lost</h2>
                    <FontAwesomeIcon
                      icon={faChartLine}
                      className='fa'
                      onClick={() => setShowLostChart(!showLostChart)}
                    />
                  </div>
                  <Line
                    data={pointsLostGraph}
                    style={{
                      marginBottom: '30px',
                      display: showLostChart ? 'flex' : 'none',
                    }}
                  />
                  <table>
                    <tbody>
                      <tr>
                        <th>Time & Date</th>
                        <th>Points</th>
                        <th>Action</th>
                      </tr>
                      {pointsLostDisplay.map((pl) => (
                        <tr key={pl._id}>
                          <td>
                            <p>{moment(pl.removed).format('MMMM Do YYYY')}</p>
                          </td>
                          <td>
                            <p>-{pl.amount}</p>
                          </td>
                          <td>
                            <p>
                              {pl.reason === 'post' && 'You deleted a post'}
                            </p>
                            <p>
                              {pl.reason === 'unmatch' &&
                                'You unmatched with another user'}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
            <div
              className='small-container cart-page'
              style={{ marginTop: '40px' }}
            >
              {pointsSpentDisplay.length === 0 ? (
                <h1 className='center'>
                  No points were spent at the selected time
                </h1>
              ) : (
                <>
                  <div className='chart-header'>
                    <h2>Points Spent</h2>
                    <FontAwesomeIcon
                      icon={faChartLine}
                      className='fa'
                      onClick={() => setShowSpentChart(!showSpentChart)}
                    />
                  </div>
                  <Line
                    data={pointsSpentGraph}
                    style={{
                      marginBottom: '30px',
                      display: showSpentChart ? 'flex' : 'none',
                    }}
                  />
                  <table>
                    <tbody>
                      <tr>
                        <th>Time & Date</th>
                        <th>Points</th>
                        <th>Action</th>
                      </tr>
                      {pointsSpentDisplay.map((ps) => (
                        <tr key={ps._id}>
                          <td>
                            <p>{moment(ps.removed).format('MMMM Do YYYY')}</p>
                          </td>
                          <td>
                            <p>-{ps.amount}</p>
                          </td>
                          <td>
                            <p>
                              {ps.reason === 'featured' &&
                                'You became a Featured Member'}
                              {ps.reason === 'expired' &&
                                'You became a Featured Member'}
                              {ps.reason === 'events' &&
                                'You became eligible for event invites'}
                              {ps.reason === 'five' &&
                                'You purchased a 5% coupon'}
                              {ps.reason === 'ten' &&
                                'You purchased a 10% coupon'}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
            <PointsInfo
              pointsInfoModalIsOpen={pointsInfoModalIsOpen}
              setPointsInfoModalIsOpen={setPointsInfoModalIsOpen}
            />
            <PointsQuestions
              pointsQuestionsModalIsOpen={pointsQuestionsModalIsOpen}
              setPointsQuestionsModalIsOpen={setPointsQuestionsModalIsOpen}
            />
            <SpendPoints
              spendPointsModalIsOpen={spendPointsModalIsOpen}
              setSpendPointsModalIsOpen={setSpendPointsModalIsOpen}
              points={points}
              setPoints={setPoints}
              fetchUserPointsTotal={fetchUserPointsTotal}
              pointsFeaturedModalIsOpen={pointsFeaturedModalIsOpen}
              setPointsFeaturedModalIsOpen={setPointsFeaturedModalIsOpen}
              pointsFiveModalIsOpen={pointsFiveModalIsOpen}
              setPointsFiveModalIsOpen={setPointsFiveModalIsOpen}
              pointsTenModalIsOpen={pointsTenModalIsOpen}
              setPointsTenModalIsOpen={setPointsTenModalIsOpen}
              pointsEventsModalIsOpen={pointsEventsModalIsOpen}
              setPointsEventsModalIsOpen={setPointsEventsModalIsOpen}
              fetchUserPointsSpentData={fetchUserPointsSpentData}
            />
          </>
        )}
      </div>
      <RightSidebar />
    </div>
  );
};

export default Points;
