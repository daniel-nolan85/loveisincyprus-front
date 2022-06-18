import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import {
  getUserPointsTotal,
  getUserPointsGainedData,
  getUserPointsLostData,
} from '../../functions/user';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const Points = () => {
  const [points, setPoints] = useState(0);
  const [pointsGainedData, setPointsGainedData] = useState([]);
  const [pointsGainedDisplay, setPointsGainedDisplay] = useState([,]);
  const [pointsLostData, setPointsLostData] = useState([]);
  const [pointsLostDisplay, setPointsLostDisplay] = useState([]);
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
  const [showGainedChart, setShowGainedChart] = useState(false);
  const [showLostChart, setShowLostChart] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    fetchUserPointsTotal();
    fetchUserPointsGainedData();
    fetchUserPointsLostData();
  }, []);

  useEffect(() => {
    updateGainedChart();
    updateLostChart();
  }, [pointsGainedDisplay]);

  const fetchUserPointsTotal = () =>
    getUserPointsTotal(user.token).then((res) => {
      // console.log(res.data);
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
    setPointsGainedDisplay(pGained);
    setPointsLostDisplay(pLost);
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
    setPointsGainedDisplay(pGained);
    setPointsLostDisplay(pLost);
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
    setPointsGainedDisplay(pg);
    setPointsLostDisplay(pl);
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
    setPointsGainedDisplay(pg);
    setPointsLostDisplay(pl);
  };

  const updateGainedChart = () => {
    setPointsGainedGraph({
      labels: pointsGainedDisplay.map((date) => moment(date.awarded)),
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
      labels: pointsLostDisplay.map((date) => moment(date.removed)),
      datasets: [
        {
          label: 'Points Lost',
          data: pointsLostDisplay.map((pl) => pl.amount),
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
          You currently have a total of {points} points
        </h1>
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
                <th>Time & Date</th>
                <th>Points</th>
                <th>Action</th>
              </tr>
              {pointsGainedDisplay.map((pg) => (
                <tr key={pg._id}>
                  <td>
                    <p>{pg.awarded}</p>
                  </td>
                  <td>
                    <p>{pg.amount}</p>
                  </td>
                  <td>
                    <p>
                      {pg.reason === 'post' && 'You created a new post'}
                      {pg.reason === 'login' && 'You logged in to the site'}
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
                    <p>{pl.removed}</p>
                  </td>
                  <td>
                    <p>-{pl.amount}</p>
                  </td>
                  <td>
                    <p>{pl.reason === 'post' ? 'You deleted a post' : ''}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default Points;
