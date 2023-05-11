import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faFilter,
  faHeartPulse,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { Link } from 'react-router-dom';
import defaultProfile from '../../assets/defaultProfile.png';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Analytics = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [currentNumNa, setCurrentNumNa] = useState(0);
  const [currentPerNa, setCurrentPerNa] = useState(0);
  const [showRegistrationGraphs, setShowRegistrationGraphs] = useState(false);
  const [registrationNumGraph, setRegistrationNumGraph] = useState({});
  const [registrationPerGraph, setRegistrationPerGraph] = useState({});
  const [showGenderGraphs, setShowGenderGraphs] = useState(false);
  const [genderNumGraph, setGenderNumGraph] = useState({});
  const [genderPerGraph, setGenderPerGraph] = useState({});
  const [showHeightGraphs, setShowHeightGraphs] = useState(false);
  const [heightNumGraph, setHeightNumGraph] = useState({});
  const [heightPerGraph, setHeightPerGraph] = useState({});
  const [showBuildGraphs, setShowBuildGraphs] = useState(false);
  const [buildNumGraph, setBuildNumGraph] = useState({});
  const [buildPerGraph, setBuildPerGraph] = useState({});
  const [showMaritalGraphs, setShowMaritalGraphs] = useState(false);
  const [maritalNumGraph, setMaritalNumGraph] = useState({});
  const [maritalPerGraph, setMaritalPerGraph] = useState({});
  const [showLocationGraphs, setShowLocationGraphs] = useState(false);
  const [locationNumGraph, setLocationNumGraph] = useState({});
  const [locationPerGraph, setLocationPerGraph] = useState({});
  const [showAgeGraphs, setShowAgeGraphs] = useState(false);
  const [ageNumGraph, setAgeNumGraph] = useState({});
  const [agePerGraph, setAgePerGraph] = useState({});
  const [showChildrenGraphs, setShowChildrenGraphs] = useState(false);
  const [childrenNumGraph, setChildrenNumGraph] = useState({});
  const [childrenPerGraph, setChildrenPerGraph] = useState({});
  const [showLivesWithGraphs, setShowLivesWithGraphs] = useState(false);
  const [livesWithNumGraph, setLivesWithNumGraph] = useState({});
  const [livesWithPerGraph, setLivesWithPerGraph] = useState({});
  const [showEthnicityGraphs, setShowEthnicityGraphs] = useState(false);
  const [ethnicityNumGraph, setEthnicityNumGraph] = useState({});
  const [ethnicityPerGraph, setEthnicityPerGraph] = useState({});
  const [showMusicGraphs, setShowMusicGraphs] = useState(false);
  const [musicNumGraph, setMusicNumGraph] = useState({});
  const [musicPerGraph, setMusicPerGraph] = useState({});
  const [showMoviesGraphs, setShowMoviesGraphs] = useState(false);
  const [moviesNumGraph, setMoviesNumGraph] = useState({});
  const [moviesPerGraph, setMoviesPerGraph] = useState({});
  const [showReligionGraphs, setShowReligionGraphs] = useState(false);
  const [religionNumGraph, setReligionNumGraph] = useState({});
  const [religionPerGraph, setReligionPerGraph] = useState({});
  const [showOccupationGraphs, setShowOccupationGraphs] = useState(false);
  const [occupationNumGraph, setOccupationNumGraph] = useState({});
  const [occupationPerGraph, setOccupationPerGraph] = useState({});
  const [showEducationGraphs, setShowEducationGraphs] = useState(false);
  const [educationNumGraph, setEducationNumGraph] = useState({});
  const [educationPerGraph, setEducationPerGraph] = useState({});
  const [showHobbiesGraphs, setShowHobbiesGraphs] = useState(false);
  const [hobbiesNumGraph, setHobbiesNumGraph] = useState({});
  const [hobbiesPerGraph, setHobbiesPerGraph] = useState({});
  const [showBooksGraphs, setShowBooksGraphs] = useState(false);
  const [booksNumGraph, setBooksNumGraph] = useState({});
  const [booksPerGraph, setBooksPerGraph] = useState({});
  const [showSportsGraphs, setShowSportsGraphs] = useState(false);
  const [sportsNumGraph, setSportsNumGraph] = useState({});
  const [sportsPerGraph, setSportsPerGraph] = useState({});
  const [showSmokesGraphs, setShowSmokesGraphs] = useState(false);
  const [smokesNumGraph, setSmokesNumGraph] = useState({});
  const [smokesPerGraph, setSmokesPerGraph] = useState({});
  const [showDrinksGraphs, setShowDrinksGraphs] = useState(false);
  const [drinksNumGraph, setDrinksNumGraph] = useState({});
  const [drinksPerGraph, setDrinksPerGraph] = useState({});
  const [showFoodGraphs, setShowFoodGraphs] = useState(false);
  const [foodNumGraph, setFoodNumGraph] = useState({});
  const [foodPerGraph, setFoodPerGraph] = useState({});
  const [showTreatsGraphs, setShowTreatsGraphs] = useState(false);
  const [treatsNumGraph, setTreatsNumGraph] = useState({});
  const [treatsPerGraph, setTreatsPerGraph] = useState({});

  let { _id, token, role } = useSelector((state) => state.user);

  useEffect(() => {
    if (role !== 'main-admin') {
      history.push('/admin/dashboard');
    }
  }, []);

  useEffect(() => {
    fetchUsersForAnalytics();
  }, []);

  const fetchUsersForAnalytics = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-users-for-analytics`, {
        headers: {
          authtoken: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAllUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const registrationGraphs = () => {
    setOpenFilter(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMusicGraphs(false);
    setShowMoviesGraphs(false);
    setShowReligionGraphs(false);
    setShowOccupationGraphs(false);
    setShowEducationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowBooksGraphs(false);
    setShowSportsGraphs(false);
    setShowSmokesGraphs(false);
    setShowDrinksGraphs(false);
    setShowFoodGraphs(false);
    setShowTreatsGraphs(false);
    setShowRegistrationGraphs(true);

    const registrationCount = allUsers.reduce((count, user) => {
      const createdAt = new Date(user.createdAt);
      const day = createdAt.toLocaleDateString();
      count[day] = (count[day] || 0) + 1;
      return count;
    }, {});

    const registrationSorted = Object.entries(registrationCount)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    console.log('registrationSorted => ', registrationSorted);

    const labels = registrationSorted.map((item) => item.date);
    const num = registrationSorted.map((item) => item.count);
    const per = registrationSorted.map(
      (item) => (item.count / allUsers.length) * 100
    );

    setRegistrationNumGraph({
      labels,
      datasets: [
        {
          label: 'Number of users by date of registration',
          data: num,
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
        },
      ],
    });
    setRegistrationPerGraph({
      labels,
      datasets: [
        {
          label: 'Percentage of users by date of registration',
          data: per,
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
        },
      ],
    });
  };

  const genderGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMusicGraphs(false);
    setShowMoviesGraphs(false);
    setShowReligionGraphs(false);
    setShowOccupationGraphs(false);
    setShowEducationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowBooksGraphs(false);
    setShowSportsGraphs(false);
    setShowSmokesGraphs(false);
    setShowDrinksGraphs(false);
    setShowFoodGraphs(false);
    setShowTreatsGraphs(false);
    setShowGenderGraphs(true);

    const gendersCount = allUsers.reduce(
      (count, user) => {
        if (user.gender === 'male') {
          count.male++;
        } else if (user.gender === 'female') {
          count.female++;
        } else {
          count.na++;
        }
        return count;
      },
      { male: 0, female: 0, na: 0 }
    );
    const numOfMales = gendersCount.male;
    const numOfFemales = gendersCount.female;
    setCurrentNumNa(gendersCount.na);

    const perOfMales = (gendersCount.male / allUsers.length) * 100;
    const perOfFemales = (gendersCount.female / allUsers.length) * 100;
    setCurrentPerNa((gendersCount.na / allUsers.length) * 100);

    setGenderNumGraph({
      labels: ['Number of users by gender'],
      datasets: [
        {
          label: 'Male users',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
          hoverBorderColor: 'rgba(54, 162, 235, 1)',
          data: [numOfMales],
        },
        {
          label: 'Female users',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
          hoverBorderColor: 'rgba(255, 99, 132, 1)',
          data: [numOfFemales],
        },
      ],
    });
    setGenderPerGraph({
      labels: ['Percentage of users by gender'],
      datasets: [
        {
          label: 'Male users',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
          hoverBorderColor: 'rgba(54, 162, 235, 1)',
          data: [perOfMales],
        },
        {
          label: 'Female users',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
          hoverBorderColor: 'rgba(255, 99, 132, 1)',
          data: [perOfFemales],
        },
      ],
    });
  };

  const heightGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowBuildGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMusicGraphs(false);
    setShowMoviesGraphs(false);
    setShowReligionGraphs(false);
    setShowOccupationGraphs(false);
    setShowEducationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowBooksGraphs(false);
    setShowSportsGraphs(false);
    setShowSmokesGraphs(false);
    setShowDrinksGraphs(false);
    setShowFoodGraphs(false);
    setShowTreatsGraphs(false);
    setShowHeightGraphs(true);

    const allHeights = [
      '4-11',
      '5-0',
      '5-1',
      '5-2',
      '5-3',
      '5-4',
      '5-5',
      '5-6',
      '5-7',
      '5-8',
      '5-9',
      '5-10',
      '5-11',
      '6-0',
      '6-1',
      '6-2',
      '6-3',
      '6-4',
      '6-5',
      '6-6',
      '6-7',
    ];
    const heightsCount = {};
    allHeights.forEach((height) => (heightsCount[height] = 0));
    heightsCount['na'] = 0;
    allUsers.forEach((user) => {
      const height = user.height || 'na';
      if (allHeights.includes(height)) {
        heightsCount[height]++;
      } else {
        heightsCount['na']++;
      }
    });

    const numOf411 = heightsCount['4-11'];
    const numOf50 = heightsCount['5-0'];
    const numOf51 = heightsCount['5-1'];
    const numOf52 = heightsCount['5-2'];
    const numOf53 = heightsCount['5-3'];
    const numOf54 = heightsCount['5-4'];
    const numOf55 = heightsCount['5-5'];
    const numOf56 = heightsCount['5-6'];
    const numOf57 = heightsCount['5-7'];
    const numOf58 = heightsCount['5-8'];
    const numOf59 = heightsCount['5-9'];
    const numOf510 = heightsCount['5-10'];
    const numOf511 = heightsCount['5-11'];
    const numOf60 = heightsCount['6-0'];
    const numOf61 = heightsCount['6-1'];
    const numOf62 = heightsCount['6-2'];
    const numOf63 = heightsCount['6-3'];
    const numOf64 = heightsCount['6-4'];
    const numOf65 = heightsCount['6-5'];
    const numOf66 = heightsCount['6-6'];
    const numOf67 = heightsCount['6-7'];
    setCurrentNumNa(heightsCount['na']);

    const perOf411 = (heightsCount['4-11'] / allUsers.length) * 100;
    const perOf50 = (heightsCount['5-0'] / allUsers.length) * 100;
    const perOf51 = (heightsCount['5-1'] / allUsers.length) * 100;
    const perOf52 = (heightsCount['5-2'] / allUsers.length) * 100;
    const perOf53 = (heightsCount['5-3'] / allUsers.length) * 100;
    const perOf54 = (heightsCount['5-4'] / allUsers.length) * 100;
    const perOf55 = (heightsCount['5-5'] / allUsers.length) * 100;
    const perOf56 = (heightsCount['5-6'] / allUsers.length) * 100;
    const perOf57 = (heightsCount['5-7'] / allUsers.length) * 100;
    const perOf58 = (heightsCount['5-8'] / allUsers.length) * 100;
    const perOf59 = (heightsCount['5-9'] / allUsers.length) * 100;
    const perOf510 = (heightsCount['5-10'] / allUsers.length) * 100;
    const perOf511 = (heightsCount['5-11'] / allUsers.length) * 100;
    const perOf60 = (heightsCount['6-0'] / allUsers.length) * 100;
    const perOf61 = (heightsCount['6-1'] / allUsers.length) * 100;
    const perOf62 = (heightsCount['6-2'] / allUsers.length) * 100;
    const perOf63 = (heightsCount['6-3'] / allUsers.length) * 100;
    const perOf64 = (heightsCount['6-4'] / allUsers.length) * 100;
    const perOf65 = (heightsCount['6-5'] / allUsers.length) * 100;
    const perOf66 = (heightsCount['6-6'] / allUsers.length) * 100;
    const perOf67 = (heightsCount['6-7'] / allUsers.length) * 100;
    setCurrentPerNa((heightsCount['na'] / allUsers.length) * 100);

    console.log('heightsCount => ', heightsCount);

    setHeightNumGraph({
      labels: ['Number of users by height'],
      datasets: [
        {
          label: `4'11" / 150 cm`,
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [numOf411],
        },
        {
          label: `5'0" / 153 cm`,
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [numOf50],
        },
        {
          label: `5'1" / 154 cm`,
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [numOf51],
        },
        {
          label: `5'2" / 157 cm`,
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [numOf52],
        },
        {
          label: `5'3" / 159 cm`,
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [numOf53],
        },
        {
          label: `5'4" / 162 cm`,
          backgroundColor: 'rgba(75, 0, 130, 0.2)',
          borderColor: 'rgba(75, 0, 130, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 0, 130, 0.4)',
          hoverBorderColor: 'rgba(75, 0, 130, 1)',
          data: [numOf54],
        },
        {
          label: `5'5" / 164 cm`,
          backgroundColor: 'rgba(238, 130, 238, 0.2)',
          borderColor: 'rgba(238, 130, 238, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(238, 130, 238, 0.4)',
          hoverBorderColor: 'rgba(238, 130, 238, 1)',
          data: [numOf55],
        },
        {
          label: `5'6" / 167 cm`,
          backgroundColor: 'rgba(128, 0, 0, 0.2)',
          borderColor: 'rgba(128, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(128, 0, 0, 1)',
          data: [numOf56],
        },
        {
          label: `5'7" / 169 cm`,
          backgroundColor: 'rgba(128, 128, 0, 0.2)',
          borderColor: 'rgba(128, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(128, 128, 0, 1)',
          data: [numOf57],
        },
        {
          label: `5'8" / 172 cm`,
          backgroundColor: 'rgba(0, 128, 128, 0.2)',
          borderColor: 'rgba(0, 128, 128, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 128, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 128, 1)',
          data: [numOf58],
        },
        {
          label: `5'9" / 175 cm`,
          backgroundColor: 'rgba(210, 105, 30, 0.2)',
          borderColor: 'rgba(210, 105, 30, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(210, 105, 30, 0.4)',
          hoverBorderColor: 'rgba(210, 105, 30, 1)',
          data: [numOf59],
        },
        {
          label: `5'10" / 177 cm`,
          backgroundColor: 'rgba(128, 0, 128, 0.2)',
          borderColor: 'rgba(128, 0, 128, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 0, 128, 0.4)',
          hoverBorderColor: 'rgba(128, 0, 128, 1)',
          data: [numOf510],
        },
        {
          label: `5'11" / 180 cm`,
          backgroundColor: 'rgba(165, 42, 42, 0.2)',
          borderColor: 'rgba(165, 42, 42, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(165, 42, 42, 0.4)',
          hoverBorderColor: 'rgba(165, 42, 42, 1)',
          data: [numOf511],
        },
        {
          label: `6'0" / 183 cm`,
          backgroundColor: 'rgba(255, 192, 203, 0.2)',
          borderColor: 'rgba(255, 192, 203, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 192, 203, 0.4)',
          hoverBorderColor: 'rgba(255, 192, 203, 1)',
          data: [numOf60],
        },
        {
          label: `6'1" / 185 cm`,
          backgroundColor: 'rgba(0, 255, 255, 0.2)',
          borderColor: 'rgba(0, 255, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 255, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 255, 255, 1)',
          data: [numOf61],
        },
        {
          label: `6'2" / 187 cm`,
          backgroundColor: 'rgba(135, 206, 235, 0.2)',
          borderColor: 'rgba(135, 206, 235, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(135, 206, 235, 0.4)',
          hoverBorderColor: 'rgba(135, 206, 235, 1)',
          data: [numOf62],
        },
        {
          label: `6'3" / 190 cm`,
          backgroundColor: 'rgba(0, 255, 0, 0.2)',
          borderColor: 'rgba(0, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 255, 0, 1)',
          data: [numOf63],
        },
        {
          label: `6'4" / 192 cm`,
          backgroundColor: 'rgba(255, 0, 255, 0.2)',
          borderColor: 'rgba(255, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 255, 1)',
          data: [numOf64],
        },
        {
          label: `6'5" / 195 cm`,
          backgroundColor: 'rgba(128, 128, 128, 0.2)',
          borderColor: 'rgba(128, 128, 128, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 128, 128, 0.4)',
          hoverBorderColor: 'rgba(128, 128, 128, 1)',
          data: [numOf65],
        },
        {
          label: `6'6" / 197 cm`,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 0, 1)',
          data: [numOf66],
        },
        {
          label: `6'7" / 200 cm`,
          backgroundColor: 'rgba(255, 20, 147, 0.2)',
          borderColor: 'rgba(255, 20, 147, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 20, 147, 0.4)',
          hoverBorderColor: 'rgba(255, 20, 147, 1)',
          data: [numOf67],
        },
      ],
    });

    setHeightPerGraph({
      labels: ['Percentage of users by height'],
      datasets: [
        {
          label: `4'11" / 150 cm`,
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [perOf411],
        },
        {
          label: `5'0" / 153 cm`,
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [perOf50],
        },
        {
          label: `5'1" / 154 cm`,
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [perOf51],
        },
        {
          label: `5'2" / 157 cm`,
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [perOf52],
        },
        {
          label: `5'3" / 159 cm`,
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [perOf53],
        },
        {
          label: `5'4" / 162 cm`,
          backgroundColor: 'rgba(75, 0, 130, 0.2)',
          borderColor: 'rgba(75, 0, 130, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 0, 130, 0.4)',
          hoverBorderColor: 'rgba(75, 0, 130, 1)',
          data: [perOf54],
        },
        {
          label: `5'5" / 164 cm`,
          backgroundColor: 'rgba(238, 130, 238, 0.2)',
          borderColor: 'rgba(238, 130, 238, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(238, 130, 238, 0.4)',
          hoverBorderColor: 'rgba(238, 130, 238, 1)',
          data: [perOf55],
        },
        {
          label: `5'6" / 167 cm`,
          backgroundColor: 'rgba(128, 0, 0, 0.2)',
          borderColor: 'rgba(128, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(128, 0, 0, 1)',
          data: [perOf56],
        },
        {
          label: `5'7" / 169 cm`,
          backgroundColor: 'rgba(128, 128, 0, 0.2)',
          borderColor: 'rgba(128, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(128, 128, 0, 1)',
          data: [perOf57],
        },
        {
          label: `5'8" / 172 cm`,
          backgroundColor: 'rgba(0, 128, 128, 0.2)',
          borderColor: 'rgba(0, 128, 128, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 128, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 128, 1)',
          data: [perOf58],
        },
        {
          label: `5'9" / 175 cm`,
          backgroundColor: 'rgba(210, 105, 30, 0.2)',
          borderColor: 'rgba(210, 105, 30, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(210, 105, 30, 0.4)',
          hoverBorderColor: 'rgba(210, 105, 30, 1)',
          data: [perOf59],
        },
        {
          label: `5'10" / 177 cm`,
          backgroundColor: 'rgba(128, 0, 128, 0.2)',
          borderColor: 'rgba(128, 0, 128, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 0, 128, 0.4)',
          hoverBorderColor: 'rgba(128, 0, 128, 1)',
          data: [perOf510],
        },
        {
          label: `5'11" / 180 cm`,
          backgroundColor: 'rgba(165, 42, 42, 0.2)',
          borderColor: 'rgba(165, 42, 42, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(165, 42, 42, 0.4)',
          hoverBorderColor: 'rgba(165, 42, 42, 1)',
          data: [perOf511],
        },
        {
          label: `6'0" / 183 cm`,
          backgroundColor: 'rgba(255, 192, 203, 0.2)',
          borderColor: 'rgba(255, 192, 203, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 192, 203, 0.4)',
          hoverBorderColor: 'rgba(255, 192, 203, 1)',
          data: [perOf60],
        },
        {
          label: `6'1" / 185 cm`,
          backgroundColor: 'rgba(0, 255, 255, 0.2)',
          borderColor: 'rgba(0, 255, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 255, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 255, 255, 1)',
          data: [perOf61],
        },
        {
          label: `6'2" / 187 cm`,
          backgroundColor: 'rgba(135, 206, 235, 0.2)',
          borderColor: 'rgba(135, 206, 235, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(135, 206, 235, 0.4)',
          hoverBorderColor: 'rgba(135, 206, 235, 1)',
          data: [perOf62],
        },
        {
          label: `6'3" / 190 cm`,
          backgroundColor: 'rgba(0, 255, 0, 0.2)',
          borderColor: 'rgba(0, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 255, 0, 1)',
          data: [perOf63],
        },
        {
          label: `6'4" / 192 cm`,
          backgroundColor: 'rgba(255, 0, 255, 0.2)',
          borderColor: 'rgba(255, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 255, 1)',
          data: [perOf64],
        },
        {
          label: `6'5" / 195 cm`,
          backgroundColor: 'rgba(128, 128, 128, 0.2)',
          borderColor: 'rgba(128, 128, 128, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 128, 128, 0.4)',
          hoverBorderColor: 'rgba(128, 128, 128, 1)',
          data: [perOf65],
        },
        {
          label: `6'6" / 197 cm`,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 0, 1)',
          data: [perOf66],
        },
        {
          label: `6'7" / 200 cm`,
          backgroundColor: 'rgba(255, 20, 147, 0.2)',
          borderColor: 'rgba(255, 20, 147, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 20, 147, 0.4)',
          hoverBorderColor: 'rgba(255, 20, 147, 1)',
          data: [perOf67],
        },
      ],
    });
  };

  const buildGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMusicGraphs(false);
    setShowMoviesGraphs(false);
    setShowReligionGraphs(false);
    setShowOccupationGraphs(false);
    setShowEducationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowBooksGraphs(false);
    setShowSportsGraphs(false);
    setShowSmokesGraphs(false);
    setShowDrinksGraphs(false);
    setShowFoodGraphs(false);
    setShowTreatsGraphs(false);
    setShowBuildGraphs(true);

    const allBuilds = [
      'athletic',
      'average',
      'extra large',
      'large',
      'skinny',
      'slim',
    ];
    const buildsCount = {};
    allBuilds.forEach((build) => (buildsCount[build] = 0));
    buildsCount['na'] = 0;
    allUsers.forEach((user) => {
      const build = user.build || 'na';
      if (allBuilds.includes(build)) {
        buildsCount[build]++;
      } else {
        buildsCount['na']++;
      }
    });

    const numOfAthletic = buildsCount['athletic'];
    const numOfAverage = buildsCount['average'];
    const numOfExtraLarge = buildsCount['extra large'];
    const numOfLarge = buildsCount['large'];
    const numOfSkinny = buildsCount['skinny'];
    const numOfSlim = buildsCount['slim'];
    setCurrentNumNa(buildsCount['na']);

    const perOfAthletic = (buildsCount['athletic'] / allUsers.length) * 100;
    const perOfAverage = (buildsCount['average'] / allUsers.length) * 100;
    const perOfExtraLarge =
      (buildsCount['extra large'] / allUsers.length) * 100;
    const perOfLarge = (buildsCount['large'] / allUsers.length) * 100;
    const perOfSkinny = (buildsCount['skinny'] / allUsers.length) * 100;
    const perOfSlim = (buildsCount['slim'] / allUsers.length) * 100;
    setCurrentPerNa((buildsCount['na'] / allUsers.length) * 100);

    console.log('buildsCount => ', buildsCount);

    setBuildNumGraph({
      labels: ['Number of users by body shape'],
      datasets: [
        {
          label: 'Athletic',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [numOfAthletic],
        },
        {
          label: 'Average',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [numOfAverage],
        },
        {
          label: 'Extra large',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [numOfExtraLarge],
        },
        {
          label: 'Large',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [numOfLarge],
        },
        {
          label: 'Skinny',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [numOfSkinny],
        },
        {
          label: 'Slim',
          backgroundColor: 'rgba(75, 0, 130, 0.2)',
          borderColor: 'rgba(75, 0, 130, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 0, 130, 0.4)',
          hoverBorderColor: 'rgba(75, 0, 130, 1)',
          data: [numOfSlim],
        },
      ],
    });

    setBuildPerGraph({
      labels: ['Percentage of users by body shape'],
      datasets: [
        {
          label: 'Athletic',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [perOfAthletic],
        },
        {
          label: 'Average',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [perOfAverage],
        },
        {
          label: 'Extra large',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [perOfExtraLarge],
        },
        {
          label: 'Large',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [perOfLarge],
        },
        {
          label: 'Skinny',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [perOfSkinny],
        },
        {
          label: 'Slim',
          backgroundColor: 'rgba(75, 0, 130, 0.2)',
          borderColor: 'rgba(75, 0, 130, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 0, 130, 0.4)',
          hoverBorderColor: 'rgba(75, 0, 130, 1)',
          data: [perOfSlim],
        },
      ],
    });
  };

  const maritalGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMusicGraphs(false);
    setShowMoviesGraphs(false);
    setShowReligionGraphs(false);
    setShowOccupationGraphs(false);
    setShowEducationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowBooksGraphs(false);
    setShowSportsGraphs(false);
    setShowSmokesGraphs(false);
    setShowDrinksGraphs(false);
    setShowFoodGraphs(false);
    setShowTreatsGraphs(false);
    setShowMaritalGraphs(true);

    const allMaritals = [
      'divorced',
      'married',
      'never married',
      'separated',
      'widowed',
    ];
    const maritalsCount = {};
    allMaritals.forEach((maritalStatus) => (maritalsCount[maritalStatus] = 0));
    maritalsCount['na'] = 0;
    allUsers.forEach((user) => {
      const maritalStatus = user.maritalStatus || 'na';
      if (allMaritals.includes(maritalStatus)) {
        maritalsCount[maritalStatus]++;
      } else {
        maritalsCount['na']++;
      }
    });

    const numOfDivorced = maritalsCount['divorced'];
    const numOfMarried = maritalsCount['married'];
    const numOfNeverMarried = maritalsCount['never married'];
    const numOfSeparated = maritalsCount['separated'];
    const numOfWidowed = maritalsCount['widowed'];
    setCurrentNumNa(maritalsCount['na']);

    const perOfDivorced = (maritalsCount['divorced'] / allUsers.length) * 100;
    const perOfMarried = (maritalsCount['married'] / allUsers.length) * 100;
    const perOfNeverMarried =
      (maritalsCount['never married'] / allUsers.length) * 100;
    const perOfSeparated = (maritalsCount['separated'] / allUsers.length) * 100;
    const perOfWidowed = (maritalsCount['widowed'] / allUsers.length) * 100;
    setCurrentPerNa((maritalsCount['na'] / allUsers.length) * 100);

    console.log('maritalsCount => ', maritalsCount);

    setMaritalNumGraph({
      labels: ['Number of users by marital status'],
      datasets: [
        {
          label: 'Divorced',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [numOfDivorced],
        },
        {
          label: 'Married',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [numOfMarried],
        },
        {
          label: 'Never married',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [numOfNeverMarried],
        },
        {
          label: 'Separated',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [numOfSeparated],
        },
        {
          label: 'Widowed',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [numOfWidowed],
        },
      ],
    });

    setMaritalPerGraph({
      labels: ['Percentage of users by marital status'],
      datasets: [
        {
          label: 'Divorced',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [perOfDivorced],
        },
        {
          label: 'Married',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [perOfMarried],
        },
        {
          label: 'Never married',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [perOfNeverMarried],
        },
        {
          label: 'Separated',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [perOfSeparated],
        },
        {
          label: 'Widowed',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [perOfWidowed],
        },
      ],
    });
  };

  const locationGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowMaritalGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMusicGraphs(false);
    setShowMoviesGraphs(false);
    setShowReligionGraphs(false);
    setShowOccupationGraphs(false);
    setShowEducationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowBooksGraphs(false);
    setShowSportsGraphs(false);
    setShowSmokesGraphs(false);
    setShowDrinksGraphs(false);
    setShowFoodGraphs(false);
    setShowTreatsGraphs(false);
    setShowLocationGraphs(true);

    const allLocations = [
      'ayia napa',
      'larnaca',
      'limassol',
      'nicosia',
      'paphos',
    ];
    const locationsCount = {};
    allLocations.forEach((location) => (locationsCount[location] = 0));
    locationsCount['na'] = 0;
    allUsers.forEach((user) => {
      const location = user.location || 'na';
      if (allLocations.includes(location)) {
        locationsCount[location]++;
      } else {
        locationsCount['na']++;
      }
    });

    const numOfAiyaNapa = locationsCount['ayia napa'];
    const numOfLarnaca = locationsCount['larnaca'];
    const numOfLimassol = locationsCount['limassol'];
    const numOfNicosia = locationsCount['nicosia'];
    const numOfPaphos = locationsCount['paphos'];
    setCurrentNumNa(locationsCount['na']);

    const perOfAiyaNapa = (locationsCount['ayia napa'] / allUsers.length) * 100;
    const perOfLarnaca = (locationsCount['larnaca'] / allUsers.length) * 100;
    const perOfLimassol = (locationsCount['limassol'] / allUsers.length) * 100;
    const perOfNicosia = (locationsCount['nicosia'] / allUsers.length) * 100;
    const perOfPaphos = (locationsCount['paphos'] / allUsers.length) * 100;
    setCurrentPerNa((locationsCount['na'] / allUsers.length) * 100);

    console.log('locationsCount => ', locationsCount);

    setLocationNumGraph({
      labels: ['Number of users by location'],
      datasets: [
        {
          label: 'Aiya Napa',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [numOfAiyaNapa],
        },
        {
          label: 'Larnaca',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [numOfLarnaca],
        },
        {
          label: 'Limassol',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [numOfLimassol],
        },
        {
          label: 'Nicosia',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [numOfNicosia],
        },
        {
          label: 'Paphos',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [numOfPaphos],
        },
      ],
    });

    setLocationPerGraph({
      labels: ['Percentage of users by location'],
      datasets: [
        {
          label: 'Aiya Napa',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [perOfAiyaNapa],
        },
        {
          label: 'Larnaca',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [perOfLarnaca],
        },
        {
          label: 'Limassol',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [perOfLimassol],
        },
        {
          label: 'Nicosia',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [perOfNicosia],
        },
        {
          label: 'Paphos',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [perOfPaphos],
        },
      ],
    });
  };

  const ageGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMusicGraphs(false);
    setShowMoviesGraphs(false);
    setShowReligionGraphs(false);
    setShowOccupationGraphs(false);
    setShowEducationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowBooksGraphs(false);
    setShowSportsGraphs(false);
    setShowSmokesGraphs(false);
    setShowDrinksGraphs(false);
    setShowFoodGraphs(false);
    setShowTreatsGraphs(false);
    setShowAgeGraphs(true);

    const ageRanges = [
      { label: '18-21', minAge: 18, maxAge: 21 },
      { label: '21-30', minAge: 21, maxAge: 30 },
      { label: '31-40', minAge: 31, maxAge: 40 },
      { label: '41-50', minAge: 41, maxAge: 50 },
      { label: '51-60', minAge: 51, maxAge: 60 },
      { label: '61-70', minAge: 61, maxAge: 70 },
      { label: '71-80', minAge: 71, maxAge: 80 },
      { label: 'Over 80', minAge: 81 },
      { label: 'na' },
    ];

    const ageGroups = allUsers.reduce((groups, user) => {
      const age = user.age;
      const group = ageRanges.find(
        (range) => age >= range.minAge && (age <= range.maxAge || !range.maxAge)
      );

      if (!group) {
        groups['na'] = (groups['na'] || 0) + 1;
      } else {
        groups[group.label] = (groups[group.label] || 0) + 1;
      }

      return groups;
    }, {});

    const numOf1821 = ageGroups['18-21'];
    const numOf2130 = ageGroups['21-30'];
    const numOf3140 = ageGroups['31-40'];
    const numOf4150 = ageGroups['41-50'];
    const numOf5160 = ageGroups['51-60'];
    const numOf6170 = ageGroups['61-70'];
    const numOf7180 = ageGroups['71-80'];
    const numOfOver80 = ageGroups['Over 80'];
    setCurrentNumNa(ageGroups['na']);

    const perOf1821 = (ageGroups['18-21'] / allUsers.length) * 100;
    const perOf2130 = (ageGroups['21-30'] / allUsers.length) * 100;
    const perOf3140 = (ageGroups['31-40'] / allUsers.length) * 100;
    const perOf4150 = (ageGroups['41-50'] / allUsers.length) * 100;
    const perOf5160 = (ageGroups['51-60'] / allUsers.length) * 100;
    const perOf6170 = (ageGroups['61-70'] / allUsers.length) * 100;
    const perOf7180 = (ageGroups['71-80'] / allUsers.length) * 100;
    const perOfOver80 = (ageGroups['Over 80'] / allUsers.length) * 100;
    setCurrentPerNa((ageGroups['na'] / allUsers.length) * 100);

    console.log('ageGroups => ', ageGroups);

    setAgeNumGraph({
      labels: ['Number of users by age range'],
      datasets: [
        {
          label: '18-21',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [numOf1821],
        },
        {
          label: '21-30',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [numOf2130],
        },
        {
          label: '31-40',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [numOf3140],
        },
        {
          label: '41-50',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [numOf4150],
        },
        {
          label: '51-60',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [numOf5160],
        },
        {
          label: '61-70',
          backgroundColor: 'rgba(75, 0, 130, 0.2)',
          borderColor: 'rgba(75, 0, 130, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 0, 130, 0.4)',
          hoverBorderColor: 'rgba(75, 0, 130, 1)',
          data: [numOf6170],
        },
        {
          label: '71-80',
          backgroundColor: 'rgba(238, 130, 238, 0.2)',
          borderColor: 'rgba(238, 130, 238, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(238, 130, 238, 0.4)',
          hoverBorderColor: 'rgba(238, 130, 238, 1)',
          data: [numOf7180],
        },
        {
          label: 'Over 80',
          backgroundColor: 'rgba(128, 0, 0, 0.2)',
          borderColor: 'rgba(128, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(128, 0, 0, 1)',
          data: [numOfOver80],
        },
      ],
    });

    setAgePerGraph({
      labels: ['Percentage of users by age range'],
      datasets: [
        {
          label: '18-21',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [perOf1821],
        },
        {
          label: '21-30',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [perOf2130],
        },
        {
          label: '31-40',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [perOf3140],
        },
        {
          label: '41-50',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [perOf4150],
        },
        {
          label: '51-60',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [perOf5160],
        },
        {
          label: '61-70',
          backgroundColor: 'rgba(75, 0, 130, 0.2)',
          borderColor: 'rgba(75, 0, 130, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 0, 130, 0.4)',
          hoverBorderColor: 'rgba(75, 0, 130, 1)',
          data: [perOf6170],
        },
        {
          label: '71-80',
          backgroundColor: 'rgba(238, 130, 238, 0.2)',
          borderColor: 'rgba(238, 130, 238, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(238, 130, 238, 0.4)',
          hoverBorderColor: 'rgba(238, 130, 238, 1)',
          data: [perOf7180],
        },
        {
          label: 'Over 80',
          backgroundColor: 'rgba(128, 0, 0, 0.2)',
          borderColor: 'rgba(128, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(128, 0, 0, 1)',
          data: [perOfOver80],
        },
      ],
    });
  };

  const childrenGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowLivesWithGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMusicGraphs(false);
    setShowMoviesGraphs(false);
    setShowReligionGraphs(false);
    setShowOccupationGraphs(false);
    setShowEducationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowBooksGraphs(false);
    setShowSportsGraphs(false);
    setShowSmokesGraphs(false);
    setShowDrinksGraphs(false);
    setShowFoodGraphs(false);
    setShowTreatsGraphs(false);
    setShowChildrenGraphs(true);

    const numOfChildrenCount = [
      { label: '0', count: 0 },
      { label: '1', count: 0 },
      { label: '2', count: 0 },
      { label: '3', count: 0 },
      { label: '4', count: 0 },
      { label: '5', count: 0 },
      { label: '6+', count: 0 },
      { label: 'na', count: 0 },
    ];

    allUsers.map((user) => {
      const numOfChildren = user.numOfChildren;
      if (numOfChildren === undefined) {
        numOfChildrenCount[7].count++;
      } else if (numOfChildren >= 6) {
        numOfChildrenCount[6].count++;
      } else {
        numOfChildrenCount[numOfChildren].count++;
      }
    });
    const numOfChildrenSort = numOfChildrenCount.sort(
      (a, b) => parseInt(a.label) - parseInt(b.label)
    );

    const numOf0 = numOfChildrenSort[0].count;
    const numOf1 = numOfChildrenSort[1].count;
    const numOf2 = numOfChildrenSort[2].count;
    const numOf3 = numOfChildrenSort[3].count;
    const numOf4 = numOfChildrenSort[4].count;
    const numOf5 = numOfChildrenSort[5].count;
    const numOf6 = numOfChildrenSort[6].count;
    setCurrentNumNa(numOfChildrenSort[7].count);

    const perOf0 = (numOfChildrenSort[0].count / allUsers.length) * 100;
    const perOf1 = (numOfChildrenSort[1].count / allUsers.length) * 100;
    const perOf2 = (numOfChildrenSort[2].count / allUsers.length) * 100;
    const perOf3 = (numOfChildrenSort[3].count / allUsers.length) * 100;
    const perOf4 = (numOfChildrenSort[4].count / allUsers.length) * 100;
    const perOf5 = (numOfChildrenSort[5].count / allUsers.length) * 100;
    const perOf6 = (numOfChildrenSort[6].count / allUsers.length) * 100;
    setCurrentPerNa((numOfChildrenSort[7].count / allUsers.length) * 100);

    console.log('numOfChildrenSort => ', numOfChildrenSort);

    setChildrenNumGraph({
      labels: ['Number of users by number of children'],
      datasets: [
        {
          label: '0',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [numOf0],
        },
        {
          label: '1',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [numOf1],
        },
        {
          label: '2',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [numOf2],
        },
        {
          label: '3',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [numOf3],
        },
        {
          label: '4',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [numOf4],
        },
        {
          label: '5',
          backgroundColor: 'rgba(75, 0, 130, 0.2)',
          borderColor: 'rgba(75, 0, 130, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 0, 130, 0.4)',
          hoverBorderColor: 'rgba(75, 0, 130, 1)',
          data: [numOf5],
        },
        {
          label: '6+',
          backgroundColor: 'rgba(238, 130, 238, 0.2)',
          borderColor: 'rgba(238, 130, 238, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(238, 130, 238, 0.4)',
          hoverBorderColor: 'rgba(238, 130, 238, 1)',
          data: [numOf6],
        },
      ],
    });

    setChildrenPerGraph({
      labels: ['Percentage of users by number of children'],
      datasets: [
        {
          label: '0',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [perOf0],
        },
        {
          label: '1',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [perOf1],
        },
        {
          label: '2',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [perOf2],
        },
        {
          label: '3',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [perOf3],
        },
        {
          label: '4',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [perOf4],
        },
        {
          label: '5',
          backgroundColor: 'rgba(75, 0, 130, 0.2)',
          borderColor: 'rgba(75, 0, 130, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 0, 130, 0.4)',
          hoverBorderColor: 'rgba(75, 0, 130, 1)',
          data: [perOf5],
        },
        {
          label: '6+',
          backgroundColor: 'rgba(238, 130, 238, 0.2)',
          borderColor: 'rgba(238, 130, 238, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(238, 130, 238, 0.4)',
          hoverBorderColor: 'rgba(238, 130, 238, 1)',
          data: [perOf6],
        },
      ],
    });
  };

  const livesWithGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMusicGraphs(false);
    setShowMoviesGraphs(false);
    setShowReligionGraphs(false);
    setShowOccupationGraphs(false);
    setShowEducationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowBooksGraphs(false);
    setShowSportsGraphs(false);
    setShowSmokesGraphs(false);
    setShowDrinksGraphs(false);
    setShowFoodGraphs(false);
    setShowTreatsGraphs(false);
    setShowLivesWithGraphs(true);

    const allLivesWiths = [
      'alone',
      'children',
      'flatmates',
      'parents',
      'partner',
    ];
    const livesWithsCount = {};
    allLivesWiths.forEach((livesWith) => (livesWithsCount[livesWith] = 0));
    livesWithsCount['na'] = 0;
    allUsers.forEach((user) => {
      const livesWith = user.livesWith || 'na';
      if (allLivesWiths.includes(livesWith)) {
        livesWithsCount[livesWith]++;
      } else {
        livesWithsCount['na']++;
      }
    });

    const numOfAlone = livesWithsCount['alone'];
    const numOfChildren = livesWithsCount['children'];
    const numOfFlatmates = livesWithsCount['flatmates'];
    const numOfParents = livesWithsCount['parents'];
    const numOfPartner = livesWithsCount['partner'];
    setCurrentNumNa(livesWithsCount['na']);

    const perOfAlone = (livesWithsCount['alone'] / allUsers.length) * 100;
    const perOfChildren = (livesWithsCount['children'] / allUsers.length) * 100;
    const perOfFlatmates =
      (livesWithsCount['flatmates'] / allUsers.length) * 100;
    const perOfParents = (livesWithsCount['parents'] / allUsers.length) * 100;
    const perOfPartner = (livesWithsCount['partner'] / allUsers.length) * 100;
    setCurrentPerNa((livesWithsCount['na'] / allUsers.length) * 100);

    console.log('livesWithsCount => ', livesWithsCount);

    setLivesWithNumGraph({
      labels: ['Number of users by who they live with'],
      datasets: [
        {
          label: 'Alone',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [numOfAlone],
        },
        {
          label: 'Children',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [numOfChildren],
        },
        {
          label: 'Flatmates',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [numOfFlatmates],
        },
        {
          label: 'Parents',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [numOfParents],
        },
        {
          label: 'Partner',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [numOfPartner],
        },
      ],
    });

    setLivesWithPerGraph({
      labels: ['Percentage of users by who they live with'],
      datasets: [
        {
          label: 'Alone',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [perOfAlone],
        },
        {
          label: 'Children',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [perOfChildren],
        },
        {
          label: 'Flatmates',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [perOfFlatmates],
        },
        {
          label: 'Parents',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [perOfParents],
        },
        {
          label: 'Partner',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [perOfPartner],
        },
      ],
    });
  };

  const ethnicityGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowMusicGraphs(false);
    setShowMoviesGraphs(false);
    setShowReligionGraphs(false);
    setShowOccupationGraphs(false);
    setShowEducationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowBooksGraphs(false);
    setShowSportsGraphs(false);
    setShowSmokesGraphs(false);
    setShowDrinksGraphs(false);
    setShowFoodGraphs(false);
    setShowTreatsGraphs(false);
    setShowEthnicityGraphs(true);

    const allEthnicities = [
      'asian',
      'black',
      'hispanic',
      'indian',
      'mediterranean',
      'middle eastern',
      'white',
      'other',
    ];
    const ethnicitiesCount = {};
    allEthnicities.forEach((ethnicity) => (ethnicitiesCount[ethnicity] = 0));
    ethnicitiesCount['na'] = 0;
    allUsers.forEach((user) => {
      const ethnicity = user.ethnicity || 'na';
      if (allEthnicities.includes(ethnicity)) {
        ethnicitiesCount[ethnicity]++;
      } else {
        ethnicitiesCount['na']++;
      }
    });

    const numOfAsian = ethnicitiesCount['asian'];
    const numOfBlack = ethnicitiesCount['black'];
    const numOfHispanic = ethnicitiesCount['hispanic'];
    const numOfIndian = ethnicitiesCount['indian'];
    const numOfMediterranean = ethnicitiesCount['mediterranean'];
    const numOfMiddleEastern = ethnicitiesCount['middle eastern'];
    const numOfWhite = ethnicitiesCount['white'];
    const numOfOther = ethnicitiesCount['other'];
    setCurrentNumNa(ethnicitiesCount['na']);

    const perOfAsian = (ethnicitiesCount['asian'] / allUsers.length) * 100;
    const perOfBlack = (ethnicitiesCount['black'] / allUsers.length) * 100;
    const perOfHispanic =
      (ethnicitiesCount['hispanic'] / allUsers.length) * 100;
    const perOfIndian = (ethnicitiesCount['indian'] / allUsers.length) * 100;
    const perOfMediterranean =
      (ethnicitiesCount['mediterranean'] / allUsers.length) * 100;
    const perOfMiddleEastern =
      (ethnicitiesCount['middle eastern'] / allUsers.length) * 100;
    const perOfWhite = (ethnicitiesCount['white'] / allUsers.length) * 100;
    const perOfOther = (ethnicitiesCount['other'] / allUsers.length) * 100;
    setCurrentPerNa((ethnicitiesCount['na'] / allUsers.length) * 100);

    console.log('ethnicitiesCount => ', ethnicitiesCount);

    setEthnicityNumGraph({
      labels: ['Number of users by ethnicity'],
      datasets: [
        {
          label: 'Asian',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [numOfAsian],
        },
        {
          label: 'Black',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [numOfBlack],
        },
        {
          label: 'Hispanic',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [numOfHispanic],
        },
        {
          label: 'Indian',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [numOfIndian],
        },
        {
          label: 'Mediterranean',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [numOfMediterranean],
        },
        {
          label: 'Middle Eastern',
          backgroundColor: 'rgba(75, 0, 130, 0.2)',
          borderColor: 'rgba(75, 0, 130, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 0, 130, 0.4)',
          hoverBorderColor: 'rgba(75, 0, 130, 1)',
          data: [numOfMiddleEastern],
        },
        {
          label: 'White',
          backgroundColor: 'rgba(238, 130, 238, 0.2)',
          borderColor: 'rgba(238, 130, 238, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(238, 130, 238, 0.4)',
          hoverBorderColor: 'rgba(238, 130, 238, 1)',
          data: [numOfWhite],
        },
        {
          label: 'Other',
          backgroundColor: 'rgba(128, 0, 0, 0.2)',
          borderColor: 'rgba(128, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(128, 0, 0, 1)',
          data: [numOfOther],
        },
      ],
    });

    setEthnicityPerGraph({
      labels: ['Percentage of users by ethnicity'],
      datasets: [
        {
          label: 'Asian',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [perOfAsian],
        },
        {
          label: 'Black',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [perOfBlack],
        },
        {
          label: 'Hispanic',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [perOfHispanic],
        },
        {
          label: 'Indian',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [perOfIndian],
        },
        {
          label: 'Mediterranean',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [perOfMediterranean],
        },
        {
          label: 'Middle Eastern',
          backgroundColor: 'rgba(75, 0, 130, 0.2)',
          borderColor: 'rgba(75, 0, 130, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 0, 130, 0.4)',
          hoverBorderColor: 'rgba(75, 0, 130, 1)',
          data: [perOfMiddleEastern],
        },
        {
          label: 'White',
          backgroundColor: 'rgba(238, 130, 238, 0.2)',
          borderColor: 'rgba(238, 130, 238, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(238, 130, 238, 0.4)',
          hoverBorderColor: 'rgba(238, 130, 238, 1)',
          data: [perOfWhite],
        },
        {
          label: 'Other',
          backgroundColor: 'rgba(128, 0, 0, 0.2)',
          borderColor: 'rgba(128, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(128, 0, 0, 1)',
          data: [perOfOther],
        },
      ],
    });
  };

  const musicGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMoviesGraphs(false);
    setShowReligionGraphs(false);
    setShowOccupationGraphs(false);
    setShowEducationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowBooksGraphs(false);
    setShowSportsGraphs(false);
    setShowSmokesGraphs(false);
    setShowDrinksGraphs(false);
    setShowFoodGraphs(false);
    setShowTreatsGraphs(false);
    setShowMusicGraphs(true);

    const musicCounts = {};
    let numNa = 0;

    allUsers.map((user) => {
      if (!user.music || user.music.length === 0) {
        numNa++;
      } else {
        user.music.map((genre) => {
          if (!musicCounts[genre]) {
            musicCounts[genre] = 1;
          } else {
            musicCounts[genre]++;
          }
        });
      }
    });
    setCurrentNumNa(numNa);
    setCurrentPerNa((numNa / allUsers.length) * 100);

    delete musicCounts.na;

    const labels = Object.keys(musicCounts);
    const num = Object.values(musicCounts);
    const per = {};
    Object.keys(musicCounts).forEach((genre) => {
      per[genre] = ((musicCounts[genre] / allUsers.length) * 100).toFixed(2);
    });

    console.log('musicCounts => ', musicCounts);

    setMusicNumGraph({
      labels,
      datasets: [
        {
          label: 'Number of users by taste in music',
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
          data: num,
        },
      ],
    });

    setMusicPerGraph({
      labels,
      datasets: [
        {
          label: 'Percentage of users by taste in music',
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
          data: per,
        },
      ],
    });
  };

  const moviesGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMusicGraphs(false);
    setShowReligionGraphs(false);
    setShowOccupationGraphs(false);
    setShowEducationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowBooksGraphs(false);
    setShowSportsGraphs(false);
    setShowSmokesGraphs(false);
    setShowDrinksGraphs(false);
    setShowFoodGraphs(false);
    setShowTreatsGraphs(false);
    setShowMoviesGraphs(true);

    const movieCounts = {};
    let numNa = 0;

    allUsers.map((user) => {
      if (!user.films || user.films.length === 0) {
        numNa++;
      } else {
        user.films.map((genre) => {
          if (!movieCounts[genre]) {
            movieCounts[genre] = 1;
          } else {
            movieCounts[genre]++;
          }
        });
      }
    });
    setCurrentNumNa(numNa);
    setCurrentPerNa((numNa / allUsers.length) * 100);

    delete movieCounts.na;

    const labels = Object.keys(movieCounts);
    const num = Object.values(movieCounts);
    const per = {};
    Object.keys(movieCounts).forEach((genre) => {
      per[genre] = ((movieCounts[genre] / allUsers.length) * 100).toFixed(2);
    });

    console.log('movieCounts => ', movieCounts);

    setMoviesNumGraph({
      labels,
      datasets: [
        {
          label: 'Number of users by taste in movie',
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
          data: num,
        },
      ],
    });

    setMoviesPerGraph({
      labels,
      datasets: [
        {
          label: 'Percentage of users by taste in movie',
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
          data: per,
        },
      ],
    });
  };

  const religionGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMusicGraphs(false);
    setShowMoviesGraphs(false);
    setShowOccupationGraphs(false);
    setShowEducationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowBooksGraphs(false);
    setShowSportsGraphs(false);
    setShowSmokesGraphs(false);
    setShowDrinksGraphs(false);
    setShowFoodGraphs(false);
    setShowTreatsGraphs(false);
    setShowReligionGraphs(true);

    const allReligions = [
      'agnostic',
      'atheist',
      'buddhist',
      'catholic',
      'christian',
      'deist',
      'jewish',
      'orthodox',
      'pagan',
      'protestant',
      'spiritual',
      'other',
    ];
    const religionsCount = {};
    allReligions.forEach((religion) => (religionsCount[religion] = 0));
    religionsCount['na'] = 0;
    allUsers.forEach((user) => {
      const religion = user.religion || 'na';
      if (allReligions.includes(religion)) {
        religionsCount[religion]++;
      } else {
        religionsCount['na']++;
      }
    });

    const numOfAgnostic = religionsCount['agnostic'];
    const numOfAtheist = religionsCount['atheist'];
    const numOfBuddhist = religionsCount['buddhist'];
    const numOfCatholic = religionsCount['catholic'];
    const numOfChristian = religionsCount['christian'];
    const numOfDeist = religionsCount['deist'];
    const numOfJewish = religionsCount['jewish'];
    const numOfOrthodox = religionsCount['orthodox'];
    const numOfPagan = religionsCount['pagan'];
    const numOfProtestant = religionsCount['protestant'];
    const numOfSpiritual = religionsCount['spiritual'];
    const numOfOther = religionsCount['other'];
    setCurrentNumNa(religionsCount['na']);

    const perOfAgnostic = (religionsCount['agnostic'] / allUsers.length) * 100;
    const perOfAtheist = (religionsCount['atheist'] / allUsers.length) * 100;
    const perOfBuddhist = (religionsCount['buddhist'] / allUsers.length) * 100;
    const perOfCatholic = (religionsCount['catholic'] / allUsers.length) * 100;
    const perOfChristian =
      (religionsCount['christian'] / allUsers.length) * 100;
    const perOfDeist = (religionsCount['deist'] / allUsers.length) * 100;
    const perOfJewish = (religionsCount['jewish'] / allUsers.length) * 100;
    const perOfOrthodox = (religionsCount['orthodox'] / allUsers.length) * 100;
    const perOfPagan = (religionsCount['pagan'] / allUsers.length) * 100;
    const perOfProtestant =
      (religionsCount['protestant'] / allUsers.length) * 100;
    const perOfSpiritual =
      (religionsCount['spiritual'] / allUsers.length) * 100;
    const perOfOther = (religionsCount['other'] / allUsers.length) * 100;
    setCurrentPerNa((religionsCount['na'] / allUsers.length) * 100);

    console.log('religionsCount => ', religionsCount);

    setReligionNumGraph({
      labels: ['Number of users by religion'],
      datasets: [
        {
          label: 'Agnostic',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [numOfAgnostic],
        },
        {
          label: 'Atheist',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [numOfAtheist],
        },
        {
          label: 'Buddhist',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [numOfBuddhist],
        },
        {
          label: 'Catholic',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [numOfCatholic],
        },
        {
          label: 'Christian',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [numOfChristian],
        },
        {
          label: 'Deist',
          backgroundColor: 'rgba(75, 0, 130, 0.2)',
          borderColor: 'rgba(75, 0, 130, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 0, 130, 0.4)',
          hoverBorderColor: 'rgba(75, 0, 130, 1)',
          data: [numOfDeist],
        },
        {
          label: 'Jewish',
          backgroundColor: 'rgba(238, 130, 238, 0.2)',
          borderColor: 'rgba(238, 130, 238, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(238, 130, 238, 0.4)',
          hoverBorderColor: 'rgba(238, 130, 238, 1)',
          data: [numOfJewish],
        },
        {
          label: 'Orthodox',
          backgroundColor: 'rgba(128, 0, 0, 0.2)',
          borderColor: 'rgba(128, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(128, 0, 0, 1)',
          data: [numOfOrthodox],
        },
        {
          label: 'Pagan',
          backgroundColor: 'rgba(128, 128, 0, 0.2)',
          borderColor: 'rgba(128, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(128, 128, 0, 1)',
          data: [numOfPagan],
        },
        {
          label: 'Protestant',
          backgroundColor: 'rgba(0, 128, 128, 0.2)',
          borderColor: 'rgba(0, 128, 128, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 128, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 128, 1)',
          data: [numOfProtestant],
        },
        {
          label: 'Spiritual',
          backgroundColor: 'rgba(210, 105, 30, 0.2)',
          borderColor: 'rgba(210, 105, 30, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(210, 105, 30, 0.4)',
          hoverBorderColor: 'rgba(210, 105, 30, 1)',
          data: [numOfSpiritual],
        },
        {
          label: 'Other',
          backgroundColor: 'rgba(128, 0, 128, 0.2)',
          borderColor: 'rgba(128, 0, 128, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 0, 128, 0.4)',
          hoverBorderColor: 'rgba(128, 0, 128, 1)',
          data: [numOfOther],
        },
      ],
    });

    setReligionPerGraph({
      labels: ['Percentage of users by religion'],
      datasets: [
        {
          label: 'Agnostic',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [perOfAgnostic],
        },
        {
          label: 'Atheist',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [perOfAtheist],
        },
        {
          label: 'Buddhist',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [perOfBuddhist],
        },
        {
          label: 'Catholic',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [perOfCatholic],
        },
        {
          label: 'Christian',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [perOfChristian],
        },
        {
          label: 'Deist',
          backgroundColor: 'rgba(75, 0, 130, 0.2)',
          borderColor: 'rgba(75, 0, 130, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 0, 130, 0.4)',
          hoverBorderColor: 'rgba(75, 0, 130, 1)',
          data: [perOfDeist],
        },
        {
          label: 'Jewish',
          backgroundColor: 'rgba(238, 130, 238, 0.2)',
          borderColor: 'rgba(238, 130, 238, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(238, 130, 238, 0.4)',
          hoverBorderColor: 'rgba(238, 130, 238, 1)',
          data: [perOfJewish],
        },
        {
          label: 'Orthodox',
          backgroundColor: 'rgba(128, 0, 0, 0.2)',
          borderColor: 'rgba(128, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(128, 0, 0, 1)',
          data: [perOfOrthodox],
        },
        {
          label: 'Pagan',
          backgroundColor: 'rgba(128, 128, 0, 0.2)',
          borderColor: 'rgba(128, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(128, 128, 0, 1)',
          data: [perOfPagan],
        },
        {
          label: 'Protestant',
          backgroundColor: 'rgba(0, 128, 128, 0.2)',
          borderColor: 'rgba(0, 128, 128, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 128, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 128, 1)',
          data: [perOfProtestant],
        },
        {
          label: 'Spiritual',
          backgroundColor: 'rgba(210, 105, 30, 0.2)',
          borderColor: 'rgba(210, 105, 30, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(210, 105, 30, 0.4)',
          hoverBorderColor: 'rgba(210, 105, 30, 1)',
          data: [perOfSpiritual],
        },
        {
          label: 'Other',
          backgroundColor: 'rgba(128, 0, 128, 0.2)',
          borderColor: 'rgba(128, 0, 128, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 0, 128, 0.4)',
          hoverBorderColor: 'rgba(128, 0, 128, 1)',
          data: [perOfOther],
        },
      ],
    });
  };

  const occupationGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMusicGraphs(false);
    setShowMoviesGraphs(false);
    setShowReligionGraphs(false);
    setShowEducationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowBooksGraphs(false);
    setShowSportsGraphs(false);
    setShowSmokesGraphs(false);
    setShowDrinksGraphs(false);
    setShowFoodGraphs(false);
    setShowTreatsGraphs(false);
    setShowOccupationGraphs(true);

    const occupationCounts = {};
    let numNa = 0;

    allUsers.map((user) => {
      if (!user.occupation) {
        numNa++;
      } else {
        if (!occupationCounts[user.occupation]) {
          occupationCounts[user.occupation] = 1;
        } else {
          occupationCounts[user.occupation]++;
        }
      }
    });

    setCurrentNumNa(numNa);
    setCurrentPerNa((numNa / allUsers.length) * 100);

    delete occupationCounts.na;

    const labels = Object.keys(occupationCounts);
    const num = Object.values(occupationCounts);
    const per = {};
    Object.keys(occupationCounts).forEach((genre) => {
      per[genre] = ((occupationCounts[genre] / allUsers.length) * 100).toFixed(
        2
      );
    });

    console.log('occupationCounts => ', occupationCounts);

    setOccupationNumGraph({
      labels,
      datasets: [
        {
          label: 'Number of users by occupation',
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
          data: num,
        },
      ],
    });

    setOccupationPerGraph({
      labels,
      datasets: [
        {
          label: 'Percentage of users by occupation',
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
          data: per,
        },
      ],
    });
  };

  const educationGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMusicGraphs(false);
    setShowMoviesGraphs(false);
    setShowReligionGraphs(false);
    setShowOccupationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowBooksGraphs(false);
    setShowSportsGraphs(false);
    setShowSmokesGraphs(false);
    setShowDrinksGraphs(false);
    setShowFoodGraphs(false);
    setShowTreatsGraphs(false);
    setShowEducationGraphs(true);

    const allEducations = [
      'high school',
      'vocational',
      'foundation',
      'bachelors',
      'masters',
      'doctoral',
    ];
    const educationsCount = {};
    allEducations.forEach((education) => (educationsCount[education] = 0));
    educationsCount['na'] = 0;
    allUsers.forEach((user) => {
      const education = user.education || 'na';
      if (allEducations.includes(education)) {
        educationsCount[education]++;
      } else {
        educationsCount['na']++;
      }
    });

    const numOfHighSchool = educationsCount['high school'];
    const numOfVocational = educationsCount['vocational'];
    const numOfFoundation = educationsCount['foundation'];
    const numOfBachelors = educationsCount['bachelors'];
    const numOfMasters = educationsCount['masters'];
    const numOfDoctoral = educationsCount['doctoral'];
    setCurrentNumNa(educationsCount['na']);

    const perOfHighSchool =
      (educationsCount['high school'] / allUsers.length) * 100;
    const perOfVocational =
      (educationsCount['vocational'] / allUsers.length) * 100;
    const perOfFoundation =
      (educationsCount['foundation'] / allUsers.length) * 100;
    const perOfBachelors =
      (educationsCount['bachelors'] / allUsers.length) * 100;
    const perOfMasters = (educationsCount['masters'] / allUsers.length) * 100;
    const perOfDoctoral = (educationsCount['doctoral'] / allUsers.length) * 100;
    setCurrentPerNa((educationsCount['na'] / allUsers.length) * 100);

    console.log('educationsCount => ', educationsCount);

    setEducationNumGraph({
      labels: ['Number of users by education'],
      datasets: [
        {
          label: 'High School',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [numOfHighSchool],
        },
        {
          label: 'Vocational',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [numOfVocational],
        },
        {
          label: 'Foundation',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [numOfFoundation],
        },
        {
          label: 'Bachelors',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [numOfBachelors],
        },
        {
          label: 'Masters',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [numOfMasters],
        },
        {
          label: 'Doctoral',
          backgroundColor: 'rgba(75, 0, 130, 0.2)',
          borderColor: 'rgba(75, 0, 130, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 0, 130, 0.4)',
          hoverBorderColor: 'rgba(75, 0, 130, 1)',
          data: [numOfDoctoral],
        },
      ],
    });

    setEducationPerGraph({
      labels: ['Percentage of users by education'],
      datasets: [
        {
          label: 'High School',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [perOfHighSchool],
        },
        {
          label: 'Vocational',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [perOfVocational],
        },
        {
          label: 'Foundation',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [perOfFoundation],
        },
        {
          label: 'Bachelors',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [perOfBachelors],
        },
        {
          label: 'Masters',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [perOfMasters],
        },
        {
          label: 'Doctoral',
          backgroundColor: 'rgba(75, 0, 130, 0.2)',
          borderColor: 'rgba(75, 0, 130, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 0, 130, 0.4)',
          hoverBorderColor: 'rgba(75, 0, 130, 1)',
          data: [perOfDoctoral],
        },
      ],
    });
  };

  const hobbiesGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMusicGraphs(false);
    setShowMoviesGraphs(false);
    setShowReligionGraphs(false);
    setShowOccupationGraphs(false);
    setShowEducationGraphs(false);
    setShowBooksGraphs(false);
    setShowSportsGraphs(false);
    setShowSmokesGraphs(false);
    setShowDrinksGraphs(false);
    setShowFoodGraphs(false);
    setShowTreatsGraphs(false);
    setShowHobbiesGraphs(true);

    const hobbiesCounts = {};
    let numNa = 0;

    allUsers.map((user) => {
      if (!user.hobbies || user.hobbies.length === 0) {
        numNa++;
      } else {
        user.hobbies.map((genre) => {
          if (!hobbiesCounts[genre]) {
            hobbiesCounts[genre] = 1;
          } else {
            hobbiesCounts[genre]++;
          }
        });
      }
    });
    setCurrentNumNa(numNa);
    setCurrentPerNa((numNa / allUsers.length) * 100);

    delete hobbiesCounts.na;

    const labels = Object.keys(hobbiesCounts);
    const num = Object.values(hobbiesCounts);
    const per = {};
    Object.keys(hobbiesCounts).forEach((genre) => {
      per[genre] = ((hobbiesCounts[genre] / allUsers.length) * 100).toFixed(2);
    });

    console.log('hobbiesCounts => ', hobbiesCounts);

    setHobbiesNumGraph({
      labels,
      datasets: [
        {
          label: 'Number of users by taste in hobbies',
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
          data: num,
        },
      ],
    });

    setHobbiesPerGraph({
      labels,
      datasets: [
        {
          label: 'Percentage of users by taste in hobbies',
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
          data: per,
        },
      ],
    });
  };

  const booksGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMusicGraphs(false);
    setShowMoviesGraphs(false);
    setShowReligionGraphs(false);
    setShowOccupationGraphs(false);
    setShowEducationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowSportsGraphs(false);
    setShowSmokesGraphs(false);
    setShowDrinksGraphs(false);
    setShowFoodGraphs(false);
    setShowTreatsGraphs(false);
    setShowBooksGraphs(true);

    const booksCounts = {};
    let numNa = 0;

    allUsers.map((user) => {
      if (!user.books || user.books.length === 0) {
        numNa++;
      } else {
        user.books.map((genre) => {
          if (!booksCounts[genre]) {
            booksCounts[genre] = 1;
          } else {
            booksCounts[genre]++;
          }
        });
      }
    });
    setCurrentNumNa(numNa);
    setCurrentPerNa((numNa / allUsers.length) * 100);

    delete booksCounts.na;

    const labels = Object.keys(booksCounts);
    const num = Object.values(booksCounts);
    const per = {};
    Object.keys(booksCounts).forEach((genre) => {
      per[genre] = ((booksCounts[genre] / allUsers.length) * 100).toFixed(2);
    });

    console.log('booksCounts => ', booksCounts);

    setBooksNumGraph({
      labels,
      datasets: [
        {
          label: 'Number of users by taste in books',
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
          data: num,
        },
      ],
    });

    setBooksPerGraph({
      labels,
      datasets: [
        {
          label: 'Percentage of users by taste in books',
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
          data: per,
        },
      ],
    });
  };

  const sportsGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMusicGraphs(false);
    setShowMoviesGraphs(false);
    setShowReligionGraphs(false);
    setShowOccupationGraphs(false);
    setShowEducationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowBooksGraphs(false);
    setShowSmokesGraphs(false);
    setShowDrinksGraphs(false);
    setShowFoodGraphs(false);
    setShowTreatsGraphs(false);
    setShowSportsGraphs(true);

    const sportsCounts = {};
    let numNa = 0;

    allUsers.map((user) => {
      if (!user.sports || user.sports.length === 0) {
        numNa++;
      } else {
        user.sports.map((genre) => {
          if (!sportsCounts[genre]) {
            sportsCounts[genre] = 1;
          } else {
            sportsCounts[genre]++;
          }
        });
      }
    });
    setCurrentNumNa(numNa);
    setCurrentPerNa((numNa / allUsers.length) * 100);

    delete sportsCounts.na;

    const labels = Object.keys(sportsCounts);
    const num = Object.values(sportsCounts);
    const per = {};
    Object.keys(sportsCounts).forEach((genre) => {
      per[genre] = ((sportsCounts[genre] / allUsers.length) * 100).toFixed(2);
    });

    console.log('sportsCounts => ', sportsCounts);

    setSportsNumGraph({
      labels,
      datasets: [
        {
          label: 'Number of users by taste in sports',
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
          data: num,
        },
      ],
    });

    setSportsPerGraph({
      labels,
      datasets: [
        {
          label: 'Percentage of users by taste in sports',
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
          data: per,
        },
      ],
    });
  };

  const smokesGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMusicGraphs(false);
    setShowMoviesGraphs(false);
    setShowReligionGraphs(false);
    setShowOccupationGraphs(false);
    setShowEducationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowBooksGraphs(false);
    setShowSportsGraphs(false);
    setShowDrinksGraphs(false);
    setShowFoodGraphs(false);
    setShowTreatsGraphs(false);
    setShowSmokesGraphs(true);

    const allSmokes = ['never', 'often', 'sometimes'];
    const smokesCount = {};
    allSmokes.forEach((smokes) => (smokesCount[smokes] = 0));
    smokesCount['na'] = 0;
    allUsers.forEach((user) => {
      const smokes = user.smokes || 'na';
      if (allSmokes.includes(smokes)) {
        smokesCount[smokes]++;
      } else {
        smokesCount['na']++;
      }
    });

    const numOfNever = smokesCount['never'];
    const numOfOften = smokesCount['often'];
    const numOfSometimes = smokesCount['sometimes'];
    setCurrentNumNa(smokesCount['na']);

    const perOfNever = (smokesCount['never'] / allUsers.length) * 100;
    const perOfOften = (smokesCount['often'] / allUsers.length) * 100;
    const perOfSometimes = (smokesCount['sometimes'] / allUsers.length) * 100;
    setCurrentPerNa((smokesCount['na'] / allUsers.length) * 100);

    console.log('smokesCount => ', smokesCount);

    setSmokesNumGraph({
      labels: ['Number of users by whether or not they smoke'],
      datasets: [
        {
          label: 'Never',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [numOfNever],
        },
        {
          label: 'Often',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [numOfOften],
        },
        {
          label: 'Sometimes',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [numOfSometimes],
        },
      ],
    });

    setSmokesPerGraph({
      labels: ['Percentage of users by whether or not they smoke'],
      datasets: [
        {
          label: 'Never',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [perOfNever],
        },
        {
          label: 'Often',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [perOfOften],
        },
        {
          label: 'Sometimes',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [perOfSometimes],
        },
      ],
    });
  };

  const drinksGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMusicGraphs(false);
    setShowMoviesGraphs(false);
    setShowReligionGraphs(false);
    setShowOccupationGraphs(false);
    setShowEducationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowBooksGraphs(false);
    setShowSportsGraphs(false);
    setShowSmokesGraphs(false);
    setShowFoodGraphs(false);
    setShowTreatsGraphs(false);
    setShowDrinksGraphs(true);

    const allDrinks = ['never', 'often', 'sometimes'];
    const drinksCount = {};
    allDrinks.forEach((drinks) => (drinksCount[drinks] = 0));
    drinksCount['na'] = 0;
    allUsers.forEach((user) => {
      const drinks = user.drinks || 'na';
      if (allDrinks.includes(drinks)) {
        drinksCount[drinks]++;
      } else {
        drinksCount['na']++;
      }
    });

    const numOfNever = drinksCount['never'];
    const numOfOften = drinksCount['often'];
    const numOfSometimes = drinksCount['sometimes'];
    setCurrentNumNa(drinksCount['na']);

    const perOfNever = (drinksCount['never'] / allUsers.length) * 100;
    const perOfOften = (drinksCount['often'] / allUsers.length) * 100;
    const perOfSometimes = (drinksCount['sometimes'] / allUsers.length) * 100;
    setCurrentPerNa((drinksCount['na'] / allUsers.length) * 100);

    console.log('drinksCount => ', drinksCount);

    setDrinksNumGraph({
      labels: ['Number of users by whether or not they drink'],
      datasets: [
        {
          label: 'Never',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [numOfNever],
        },
        {
          label: 'Often',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [numOfOften],
        },
        {
          label: 'Sometimes',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [numOfSometimes],
        },
      ],
    });

    setDrinksPerGraph({
      labels: ['Percentage of users by whether or not they drink'],
      datasets: [
        {
          label: 'Never',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [perOfNever],
        },
        {
          label: 'Often',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [perOfOften],
        },
        {
          label: 'Sometimes',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [perOfSometimes],
        },
      ],
    });
  };

  const foodGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMusicGraphs(false);
    setShowMoviesGraphs(false);
    setShowReligionGraphs(false);
    setShowOccupationGraphs(false);
    setShowEducationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowBooksGraphs(false);
    setShowSportsGraphs(false);
    setShowSmokesGraphs(false);
    setShowDrinksGraphs(false);
    setShowTreatsGraphs(false);
    setShowFoodGraphs(true);

    const allFoods = [
      'everything',
      'kosher',
      'macrobiotic',
      'organic',
      'vegan',
      'vegetarian',
    ];
    const foodsCount = {};
    allFoods.forEach((foods) => (foodsCount[foods] = 0));
    foodsCount['na'] = 0;
    allUsers.forEach((user) => {
      const foods = user.foods || 'na';
      if (allFoods.includes(foods)) {
        foodsCount[foods]++;
      } else {
        foodsCount['na']++;
      }
    });

    const numOfEverything = foodsCount['everything'];
    const numOfKosher = foodsCount['kosher'];
    const numOfMacrobiotic = foodsCount['macrobiotic'];
    const numOfOrganic = foodsCount['organic'];
    const numOfVegan = foodsCount['vegan'];
    const numOfVegetarian = foodsCount['vegetarian'];
    setCurrentNumNa(foodsCount['na']);

    const perOfEverything = (foodsCount['everything'] / allUsers.length) * 100;
    const perOfKosher = (foodsCount['kosher'] / allUsers.length) * 100;
    const perOfMacrobiotic =
      (foodsCount['macrobiotic'] / allUsers.length) * 100;
    const perOfOrganic = (foodsCount['organic'] / allUsers.length) * 100;
    const perOfVegan = (foodsCount['vegan'] / allUsers.length) * 100;
    const perOfVegetarian = (foodsCount['vegetarian'] / allUsers.length) * 100;
    setCurrentPerNa((foodsCount['na'] / allUsers.length) * 100);

    console.log('foodsCount => ', foodsCount);

    setFoodNumGraph({
      labels: ['Number of users by taste in foods'],
      datasets: [
        {
          label: 'Everything',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [numOfEverything],
        },
        {
          label: 'Kosher',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [numOfKosher],
        },
        {
          label: 'Macrobiotic',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [numOfMacrobiotic],
        },
        {
          label: 'Organic',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [numOfOrganic],
        },
        {
          label: 'Vegan',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [numOfVegan],
        },
        {
          label: 'Vegetarian',
          backgroundColor: 'rgba(75, 0, 130, 0.2)',
          borderColor: 'rgba(75, 0, 130, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 0, 130, 0.4)',
          hoverBorderColor: 'rgba(75, 0, 130, 1)',
          data: [numOfVegetarian],
        },
      ],
    });

    setFoodPerGraph({
      labels: ['Percentage of users by taste in foods'],
      datasets: [
        {
          label: 'Everything',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [perOfEverything],
        },
        {
          label: 'Kosher',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [perOfKosher],
        },
        {
          label: 'Macrobiotic',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [perOfMacrobiotic],
        },
        {
          label: 'Organic',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [perOfOrganic],
        },
        {
          label: 'Vegan',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [perOfVegan],
        },
        {
          label: 'Vegetarian',
          backgroundColor: 'rgba(75, 0, 130, 0.2)',
          borderColor: 'rgba(75, 0, 130, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 0, 130, 0.4)',
          hoverBorderColor: 'rgba(75, 0, 130, 1)',
          data: [perOfVegetarian],
        },
      ],
    });
  };

  const treatsGraphs = () => {
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowEthnicityGraphs(false);
    setShowMusicGraphs(false);
    setShowMoviesGraphs(false);
    setShowReligionGraphs(false);
    setShowOccupationGraphs(false);
    setShowEducationGraphs(false);
    setShowHobbiesGraphs(false);
    setShowBooksGraphs(false);
    setShowSmokesGraphs(false);
    setShowDrinksGraphs(false);
    setShowFoodGraphs(false);
    setShowSportsGraphs(false);
    setShowTreatsGraphs(true);

    const treatsCounts = {};
    let numNa = 0;

    allUsers.map((user) => {
      if (!user.treatSelf || user.treatSelf.length === 0) {
        numNa++;
      } else {
        user.treatSelf.map((genre) => {
          if (!treatsCounts[genre]) {
            treatsCounts[genre] = 1;
          } else {
            treatsCounts[genre]++;
          }
        });
      }
    });
    setCurrentNumNa(numNa);
    setCurrentPerNa((numNa / allUsers.length) * 100);

    delete treatsCounts.na;

    const labels = Object.keys(treatsCounts);
    const num = Object.values(treatsCounts);
    const per = {};
    Object.keys(treatsCounts).forEach((genre) => {
      per[genre] = ((treatsCounts[genre] / allUsers.length) * 100).toFixed(2);
    });

    console.log('treatsCounts => ', treatsCounts);

    setTreatsNumGraph({
      labels,
      datasets: [
        {
          label: 'Number of users by how they theat themselves',
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
          data: num,
        },
      ],
    });

    setTreatsPerGraph({
      labels,
      datasets: [
        {
          label: 'Percentage of users by how they theat themselves',
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
          data: per,
        },
      ],
    });
  };

  return (
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content analytics'>
        <div>
          {loading ? (
            <div className='spinner center'>
              <FontAwesomeIcon icon={faSpinner} className='fa' spin />
            </div>
          ) : (
            <>
              <h1 className='center'>
                We currently have {allUsers.length} users
              </h1>
              <div className='filter-btn'>
                <FontAwesomeIcon
                  icon={faFilter}
                  className='fa'
                  onClick={() => setOpenFilter(!openFilter)}
                />
                {openFilter && (
                  <ul className='filter-options'>
                    <li onClick={registrationGraphs}>Date range</li>
                    <li>Visiting frequency</li>
                    <li onClick={genderGraphs}>Gender</li>
                    <li onClick={heightGraphs}>Height</li>
                    <li onClick={buildGraphs}>Body shape</li>
                    <li onClick={maritalGraphs}>Marital status</li>
                    <li onClick={locationGraphs}>Location</li>
                    <li onClick={ageGraphs}>Age range</li>
                    <li onClick={childrenGraphs}>Has children</li>
                    <li onClick={livesWithGraphs}>Lives with</li>
                    <li>Nationality</li>
                    <li>Languages</li>
                    <li onClick={ethnicityGraphs}>Ethnicity</li>
                    <li>Appearance</li>
                    <li>Style</li>
                    <li onClick={musicGraphs}>Music</li>
                    <li onClick={moviesGraphs}>Movies</li>
                    <li onClick={religionGraphs}>Religion</li>
                    <li onClick={occupationGraphs}>Occupation</li>
                    <li onClick={educationGraphs}>Education</li>
                    <li onClick={hobbiesGraphs}>Hobbies</li>
                    <li onClick={booksGraphs}>Books</li>
                    <li onClick={sportsGraphs}>Sports</li>
                    <li onClick={smokesGraphs}>Smokes</li>
                    <li onClick={drinksGraphs}>Drinks</li>
                    <li onClick={foodGraphs}>Food</li>
                    <li onClick={treatsGraphs}>How they treat themselves</li>
                    <li>Dating purpose</li>
                    <li># Points</li>
                    <li># Page visits of each item in shop</li>
                    <li>Total amount paid in the shop</li>
                    <li>Amount paid in shop since beginning</li>
                    <li>Average amount by order in shop</li>
                    <li># Orders in shop</li>
                    <li>Category of item ordered in shop</li>
                    <li>Sub-category of item ordered in shop</li>
                    <li>Free keywords</li>
                  </ul>
                )}
              </div>
              {showRegistrationGraphs && (
                <>
                  <Bar
                    data={registrationNumGraph}
                    style={{
                      marginBottom: '20px',
                    }}
                  />
                  <Bar
                    data={registrationPerGraph}
                    style={{
                      marginBottom: '20px',
                    }}
                  />
                </>
              )}
              {showGenderGraphs && (
                <>
                  <Bar
                    data={genderNumGraph}
                    style={{
                      marginBottom: '20px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    gender
                  </h2>
                  <Bar
                    data={genderPerGraph}
                    style={{
                      marginBottom: '20px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their gender
                  </h2>
                </>
              )}
              {showHeightGraphs && (
                <>
                  <Bar
                    data={heightNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    height
                  </h2>
                  <Bar
                    data={heightPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their height
                  </h2>
                </>
              )}
              {showBuildGraphs && (
                <>
                  <Bar
                    data={buildNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    body shape
                  </h2>
                  <Bar
                    data={buildPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their body shape
                  </h2>
                </>
              )}
              {showMaritalGraphs && (
                <>
                  <Bar
                    data={maritalNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    marital status
                  </h2>
                  <Bar
                    data={maritalPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their marital status
                  </h2>
                </>
              )}
              {showLocationGraphs && (
                <>
                  <Bar
                    data={locationNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    location
                  </h2>
                  <Bar
                    data={locationPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their location
                  </h2>
                </>
              )}
              {showAgeGraphs && (
                <>
                  <Bar
                    data={ageNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    age
                  </h2>
                  <Bar
                    data={agePerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their age
                  </h2>
                </>
              )}
              {showChildrenGraphs && (
                <>
                  <Bar
                    data={childrenNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    number of children
                  </h2>
                  <Bar
                    data={childrenPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their number of children
                  </h2>
                </>
              )}
              {showLivesWithGraphs && (
                <>
                  <Bar
                    data={livesWithNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated who
                    they live with
                  </h2>
                  <Bar
                    data={livesWithPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated who they live with
                  </h2>
                </>
              )}
              {showEthnicityGraphs && (
                <>
                  <Bar
                    data={ethnicityNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    ethnicity
                  </h2>
                  <Bar
                    data={ethnicityPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their ethnicity
                  </h2>
                </>
              )}
              {showMusicGraphs && (
                <>
                  <Bar
                    data={musicNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    favourite music
                  </h2>
                  <Bar
                    data={musicPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their favourite music
                  </h2>
                </>
              )}
              {showMoviesGraphs && (
                <>
                  <Bar
                    data={moviesNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    favourite movies
                  </h2>
                  <Bar
                    data={moviesPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their favourite movies
                  </h2>
                </>
              )}
              {showReligionGraphs && (
                <>
                  <Bar
                    data={religionNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    religion
                  </h2>
                  <Bar
                    data={religionPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their religion
                  </h2>
                </>
              )}
              {showOccupationGraphs && (
                <>
                  <Bar
                    data={occupationNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    occupation
                  </h2>
                  <Bar
                    data={occupationPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their occupation
                  </h2>
                </>
              )}
              {showEducationGraphs && (
                <>
                  <Bar
                    data={educationNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    education
                  </h2>
                  <Bar
                    data={educationPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their education
                  </h2>
                </>
              )}
              {showHobbiesGraphs && (
                <>
                  <Bar
                    data={hobbiesNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    hobbies
                  </h2>
                  <Bar
                    data={hobbiesPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their hobbies
                  </h2>
                </>
              )}
              {showBooksGraphs && (
                <>
                  <Bar
                    data={booksNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    favourite books
                  </h2>
                  <Bar
                    data={booksPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their favourite books
                  </h2>
                </>
              )}
              {showSportsGraphs && (
                <>
                  <Bar
                    data={sportsNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    favourite sports
                  </h2>
                  <Bar
                    data={sportsPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their favourite sports
                  </h2>
                </>
              )}
              {showSmokesGraphs && (
                <>
                  <Bar
                    data={smokesNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated
                    whether or not they smoke
                  </h2>
                  <Bar
                    data={smokesPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated whether or not they smoke
                  </h2>
                </>
              )}
              {showDrinksGraphs && (
                <>
                  <Bar
                    data={drinksNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated
                    whether or not they drink
                  </h2>
                  <Bar
                    data={drinksPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated whether or not they drink
                  </h2>
                </>
              )}
              {showFoodGraphs && (
                <>
                  <Bar
                    data={foodNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    taste in foods
                  </h2>
                  <Bar
                    data={foodPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their taste in foods
                  </h2>
                </>
              )}
              {showTreatsGraphs && (
                <>
                  <Bar
                    data={treatsNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated how
                    they treat themselves
                  </h2>
                  <Bar
                    data={treatsPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated how they treat themselves
                  </h2>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
