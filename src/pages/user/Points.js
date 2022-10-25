import React, { useState, useEffect } from 'react';
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
} from '@fortawesome/free-solid-svg-icons';
import PointsInfo from '../../components/modals/PointsInfo';
import PointsQuestions from '../../components/modals/PointsQuestions';
import SpendPoints from '../../components/modals/SpendPoints';
import { useLocation } from 'react-router-dom';
import { ChatState } from '../../context/ChatProvider';

const Points = () => {
  const [points, setPoints] = useState(0);
  const [pointsInfoModalIsOpen, setPointsInfoModalIsOpen] = useState(false);
  // const [pointsQuestionsModalIsOpen, setPointsQuestionsModalIsOpen] =
  //   useState(false);
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

  const { pointsQuestionsModalIsOpen, setPointsQuestionsModalIsOpen } =
    ChatState();

  const { user } = useSelector((state) => ({ ...state }));

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
      console.log('fetchUserPointsTotal');
      setPoints(res.data);
    });

  const fetchUserPointsGainedData = () => {
    getUserPointsGainedData(user.token).then((res) => {
      console.log('getUserPointsGainedData => ', res.data.pointsGained);
      setPointsGainedData(res.data.pointsGained);
      setPointsGainedDisplay(res.data.pointsGained);
      setPointsGainedGraph({
        labels: res.data.pointsGained.map((date) => moment(date.awarded)),
        datasets: [
          {
            label: 'Points Accumulated',
            data: res.data.pointsGained.map((pg) => pg.amount),
            backgroundColor: '#7cfc00',
          },
        ],
      });
    });
  };

  const fetchUserPointsLostData = () => {
    getUserPointsLostData(user.token).then((res) => {
      console.log('getUserPointsLostData => ', res.data.pointsLost);
      setPointsLostData(res.data.pointsLost);
      setPointsLostDisplay(res.data.pointsLost);
      setPointsLostGraph({
        labels: res.data.pointsLost.map((date) => moment(date.removed)),
        datasets: [
          {
            label: 'Points Lost',
            data: res.data.pointsLost.map((pl) => pl.amount),
            backgroundColor: '#c70000',
          },
        ],
      });
    });
  };

  const fetchUserPointsSpentData = () => {
    getUserPointsSpentData(user.token).then((res) => {
      console.log('getUserPointsSpentData => ', res.data.pointsSpent);
      setPointsSpentData(res.data.pointsSpent);
      setPointsSpentDisplay(res.data.pointsSpent);
      setPointsSpentGraph({
        labels: res.data.pointsSpent.map((date) => moment(date.removed)),
        datasets: [
          {
            label: 'Points Spent',
            data: res.data.pointsSpent.map((pl) => pl.amount),
            backgroundColor: '#c70000',
          },
        ],
      });
    });
  };

  const allTime = () => {
    const now = new Date();
    const beginning = new Date(null);
    const pGained = pointsGainedData.filter((d) => {
      var time = new Date(d.awarded).getTime();
      return beginning < time && time < now;
    });
    const pLost = pointsLostData.filter((d) => {
      var time = new Date(d.removed).getTime();
      return beginning < time && time < now;
    });
    const pSpent = pointsSpentData.filter((d) => {
      var time = new Date(d.spent).getTime();
      return beginning < time && time < now;
    });
    setPointsGainedDisplay(pGained);
    setPointsLostDisplay(pLost);
    setPointsSpentDisplay(pSpent);
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
  };

  const thisMonth = () => {
    const now = new Date();
    const lastMonth = new Date(new Date().setDate(new Date().getDate() - 31));
    const pg = pointsGainedData.filter((d) => {
      var time = new Date(d.awarded).getTime();
      return lastMonth < time && time < now;
    });
    const pl = pointsLostData.filter((d) => {
      var time = new Date(d.removed).getTime();
      return lastMonth < time && time < now;
    });
    const ps = pointsSpentData.filter((d) => {
      var time = new Date(d.spent).getTime();
      return lastMonth < time && time < now;
    });
    setPointsGainedDisplay(pg);
    setPointsLostDisplay(pl);
    setPointsSpentDisplay(ps);
  };

  const updateGainedChart = () => {
    setPointsGainedGraph({
      labels: pointsGainedDisplay.map((date) =>
        moment(date.awarded).format('MMMM Do YYYY')
      ),
      datasets: [
        {
          label: 'Points Accumulated',
          data: pointsGainedDisplay.map((pg) => pg.amount),
          backgroundColor: '#7cfc00',
        },
      ],
    });
  };

  const updateLostChart = () => {
    setPointsLostGraph({
      labels: pointsLostDisplay.map((date) =>
        moment(date.removed).format('MMMM Do YYYY')
      ),
      datasets: [
        {
          label: 'Points Lost',
          data: pointsLostDisplay.map((pl) => pl.amount),
          backgroundColor: '#c70000',
        },
      ],
    });
  };

  const updateSpentChart = () => {
    setPointsSpentGraph({
      labels: pointsSpentDisplay.map((date) =>
        moment(date.spent).format('MMMM Do YYYY')
      ),
      datasets: [
        {
          label: 'Points Spent',
          data: pointsSpentDisplay.map((ps) => ps.amount),
          backgroundColor: '#c70000',
        },
      ],
    });
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
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
          <button className='submit-btn' onClick={allTime}>
            All
          </button>
          <button className='submit-btn' onClick={today}>
            Today
          </button>
          <button className='submit-btn' onClick={thisWeek}>
            This Week
          </button>
          <button className='submit-btn' onClick={thisMonth}>
            This Month
          </button>
        </div>
        <div
          className='small-container cart-page'
          style={{ marginTop: '40px' }}
        >
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
                      {pg.reason === 'login' && 'You logged in to the site'}
                      {pg.reason === 'new visitor' &&
                        'A new user visited your profile'}
                      {pg.reason === 'new visit' &&
                        "You visited a new member's  profile"}
                      {pg.reason === 'profile complete' &&
                        'You completed 100% of your profile'}
                      {pg.reason === 'match' && 'You matched with another user'}
                      {pg.reason === 'event post' && 'You posted on an event'}
                      {pg.reason === 'store purchase' &&
                        'You made a store purchase'}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className='small-container cart-page'
          style={{ marginTop: '40px' }}
        >
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
                    <p>{pl.reason === 'post' && 'You deleted a post'}</p>
                    <p>
                      {pl.reason === 'unmatch' &&
                        'You unmatched with another user'}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className='small-container cart-page'
          style={{ marginTop: '40px' }}
        >
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
                      {ps.reason === 'featured' ||
                        (ps.reason === 'expired' &&
                          'You became a Featured Member')}
                      {ps.reason === 'events' &&
                        'You became eligible for event invites'}
                      {ps.reason === 'five' && 'You purchased a 5% coupon'}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Points;
