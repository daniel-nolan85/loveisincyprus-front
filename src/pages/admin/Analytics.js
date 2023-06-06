import React, { useState, useEffect, useRef } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import axios from 'axios';
import { useSelector, useStore } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faFilter,
  faCalendarDays,
  faFilePdf,
  faRotateLeft,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons';
import { Bar, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Chart from '../../components/cards/Chart';
// import { useScreenshot } from 'use-react-screenshot';
import html2canvas from 'html2canvas';

const Analytics = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersLoaded, setAllUsersLoaded] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);
  const [filterByDate, setFilterByDate] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentNumNa, setCurrentNumNa] = useState(0);
  const [currentPerNa, setCurrentPerNa] = useState(0);
  const [currentAverage, setCurrentAverage] = useState(0);
  const [currentGraph, setCurrentGraph] = useState('');
  const [showRegistrationGraphs, setShowRegistrationGraphs] = useState(false);
  const [registrationNumGraph, setRegistrationNumGraph] = useState({});
  const [registrationPerGraph, setRegistrationPerGraph] = useState({});
  const [showVisitationGraphs, setShowVisitationGraphs] = useState(false);
  const [visitationNumGraph, setVisitationNumGraph] = useState({});
  const [visitationPerGraph, setVisitationPerGraph] = useState({});
  const [showGenderGraphs, setShowGenderGraphs] = useState(false);
  const [genderNumGraph, setGenderNumGraph] = useState({});
  const [genderPerGraph, setGenderPerGraph] = useState({});
  const [showHeightGraphs, setShowHeightGraphs] = useState(false);
  const [heightNumGraph, setHeightNumGraph] = useState({});
  const [heightPerGraph, setHeightPerGraph] = useState({});
  const [showBuildGraphs, setShowBuildGraphs] = useState(false);
  const [buildNumGraph, setBuildNumGraph] = useState({});
  const [buildPerGraph, setBuildPerGraph] = useState({});
  const [showHairColourGraphs, setShowHairColourGraphs] = useState(false);
  const [hairColourNumGraph, setHairColourNumGraph] = useState({});
  const [hairColourPerGraph, setHairColourPerGraph] = useState({});
  const [showHairStyleGraphs, setShowHairStyleGraphs] = useState(false);
  const [hairStyleNumGraph, setHairStyleNumGraph] = useState({});
  const [hairStylePerGraph, setHairStylePerGraph] = useState({});
  const [showHairLengthGraphs, setShowHairLengthGraphs] = useState(false);
  const [hairLengthNumGraph, setHairLengthNumGraph] = useState({});
  const [hairLengthPerGraph, setHairLengthPerGraph] = useState({});
  const [showEyeColourGraphs, setShowEyeColourGraphs] = useState(false);
  const [eyeColourNumGraph, setEyeColourNumGraph] = useState({});
  const [eyeColourPerGraph, setEyeColourPerGraph] = useState({});
  const [showFeetTypeGraphs, setShowFeetTypeGraphs] = useState(false);
  const [feetTypeNumGraph, setFeetTypeNumGraph] = useState({});
  const [feetTypePerGraph, setFeetTypePerGraph] = useState({});
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
  const [showNationalityGraphs, setShowNationalityGraphs] = useState(false);
  const [nationalityNumGraph, setNationalityNumGraph] = useState({});
  const [nationalityPerGraph, setNationalityPerGraph] = useState({});
  const [showLanguageGraphs, setShowLanguageGraphs] = useState(false);
  const [languageNumGraph, setLanguageNumGraph] = useState({});
  const [languagePerGraph, setLanguagePerGraph] = useState({});
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
  const [showRelWantedGraphs, setShowRelWantedGraphs] = useState(false);
  const [relWantedNumGraph, setRelWantedNumGraph] = useState({});
  const [relWantedPerGraph, setRelWantedPerGraph] = useState({});
  const [showPointsGraphs, setShowPointsGraphs] = useState(false);
  const [pointsGraph, setPointsGraph] = useState({});
  const [showProductsViewedGraphs, setShowProductsViewedGraphs] =
    useState(false);
  const [productsViewedNumGraph, setProductsViewedNumGraph] = useState({});
  const [productsViewedPerGraph, setProductsViewedPerGraph] = useState({});
  const [showTotalPaidGraphs, setShowTotalPaidGraphs] = useState(false);
  const [totalPaidGraph, setTotalPaidGraph] = useState({});
  const [showOrdersGraphs, setShowOrdersGraphs] = useState(false);
  const [ordersGraph, setOrdersGraph] = useState({});
  const [showKeyWordsGraphs, setShowKeyWordsGraphs] = useState(false);
  const [keyWordsGraph, setKeyWordsGraph] = useState({});
  const [chartImage, setChartImage] = useState(null);
  const [loadingChartImage, setLoadingChartImage] = useState(false);

  let { _id, token, role } = useSelector((state) => state.user);

  // const [takeScreenshot, { getScreenshot }] = useScreenshot();

  const isFirstRun = useRef(true);
  const registrationGraphRef = useRef(null);
  const visitationGraphRef = useRef(null);
  const genderGraphRef = useRef(null);
  const heightGraphRef = useRef(null);
  const buildGraphRef = useRef(null);
  const hairColourGraphRef = useRef(null);
  const hairStyleGraphRef = useRef(null);
  const hairLengthGraphRef = useRef(null);
  const eyeColourGraphRef = useRef(null);
  const feetTypeGraphRef = useRef(null);
  const maritalGraphRef = useRef(null);
  const locationGraphRef = useRef(null);
  const ageGraphRef = useRef(null);
  const childrenGraphRef = useRef(null);
  const livesWithGraphRef = useRef(null);
  const nationalityGraphRef = useRef(null);
  const languageGraphRef = useRef(null);
  const ethnicityGraphRef = useRef(null);
  const musicGraphRef = useRef(null);
  const moviesGraphRef = useRef(null);
  const religionGraphRef = useRef(null);
  const occupationGraphRef = useRef(null);
  const educationGraphRef = useRef(null);
  const hobbiesGraphRef = useRef(null);
  const booksGraphRef = useRef(null);
  const sportsGraphRef = useRef(null);
  const smokesGraphRef = useRef(null);
  const drinksGraphRef = useRef(null);
  const foodGraphRef = useRef(null);
  const treatsGraphRef = useRef(null);
  const relWantedGraphRef = useRef(null);
  const pointsGraphRef = useRef(null);
  const productsViewedGraphRef = useRef(null);
  const totalPaidGraphRef = useRef(null);
  const ordersGraphRef = useRef(null);
  const keyWordsGraphRef = useRef(null);

  useEffect(() => {
    if (role !== 'main-admin') {
      history.push('/admin/dashboard');
    }
  }, []);

  useEffect(() => {
    fetchUsersForAnalytics();
  }, []);

  useEffect(() => {
    if (allUsers && allUsers.length > 0 && allUsersLoaded) {
      registrationGraphs();
      setAllUsersLoaded(false);
    }
  }, [allUsers, allUsersLoaded]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      filterUsers();
    }
  }, [endDate]);

  useEffect(() => {
    if (allUsers && filterByDate) {
      reRenderCurrentGraph();
      setFilterByDate(false);
    }
  }, [allUsers, filterByDate]);

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

  const fetchUsersForAnalytics = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-users-for-analytics`, {
        headers: {
          authtoken: token,
        },
      })
      .then((res) => {
        setAllUsers(res.data);
        setAllUsersLoaded(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const filterUsers = async () => {
    if (startDate && !endDate) return;
    else {
      setChartImage(null);
      await axios
        .get(`${process.env.REACT_APP_API}/fetch-users-for-analytics`, {
          headers: {
            authtoken: token,
          },
        })
        .then((res) => {
          setDatePickerIsOpen(false);
          if (endDate !== null) {
            const filtered = res.data.filter((user) => {
              const createdAt = new Date(user.createdAt);
              return createdAt >= startDate && createdAt <= endDate;
            });
            setAllUsers(filtered);
          } else if (startDate === null) {
            setAllUsers(res.data);
          }
          setFilterByDate(true);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  const preparePdf = () => {
    if (showRegistrationGraphs) captureScreenshot(registrationGraphRef);
    if (showVisitationGraphs) captureScreenshot(visitationGraphRef);
    if (showGenderGraphs) captureScreenshot(genderGraphRef);
    if (showHeightGraphs) captureScreenshot(heightGraphRef);
    if (showBuildGraphs) captureScreenshot(buildGraphRef);
    if (showHairColourGraphs) captureScreenshot(hairColourGraphRef);
    if (showHairStyleGraphs) captureScreenshot(hairStyleGraphRef);
    if (showHairLengthGraphs) captureScreenshot(hairLengthGraphRef);
    if (showEyeColourGraphs) captureScreenshot(eyeColourGraphRef);
    if (showFeetTypeGraphs) captureScreenshot(feetTypeGraphRef);
    if (showMaritalGraphs) captureScreenshot(maritalGraphRef);
    if (showLocationGraphs) captureScreenshot(locationGraphRef);
    if (showAgeGraphs) captureScreenshot(ageGraphRef);
    if (showChildrenGraphs) captureScreenshot(childrenGraphRef);
    if (showLivesWithGraphs) captureScreenshot(livesWithGraphRef);
    if (showNationalityGraphs) captureScreenshot(nationalityGraphRef);
    if (showLanguageGraphs) captureScreenshot(languageGraphRef);
    if (showEthnicityGraphs) captureScreenshot(ethnicityGraphRef);
    if (showMusicGraphs) captureScreenshot(musicGraphRef);
    if (showMoviesGraphs) captureScreenshot(moviesGraphRef);
    if (showReligionGraphs) captureScreenshot(religionGraphRef);
    if (showOccupationGraphs) captureScreenshot(occupationGraphRef);
    if (showEducationGraphs) captureScreenshot(educationGraphRef);
    if (showHobbiesGraphs) captureScreenshot(hobbiesGraphRef);
    if (showBooksGraphs) captureScreenshot(booksGraphRef);
    if (showSportsGraphs) captureScreenshot(sportsGraphRef);
    if (showSmokesGraphs) captureScreenshot(smokesGraphRef);
    if (showDrinksGraphs) captureScreenshot(drinksGraphRef);
    if (showFoodGraphs) captureScreenshot(foodGraphRef);
    if (showTreatsGraphs) captureScreenshot(treatsGraphRef);
    if (showRelWantedGraphs) captureScreenshot(relWantedGraphRef);
    if (showPointsGraphs) captureScreenshot(pointsGraphRef);
    if (showProductsViewedGraphs) captureScreenshot(productsViewedGraphRef);
    if (showTotalPaidGraphs) captureScreenshot(totalPaidGraphRef);
    if (showOrdersGraphs) captureScreenshot(ordersGraphRef);
    if (showKeyWordsGraphs) captureScreenshot(keyWordsGraphRef);
  };

  const captureScreenshot = (graphRef) => {
    setLoadingChartImage(true);
    html2canvas(graphRef.current).then((canvas) => {
      const image = canvas.toDataURL('image/png');
      setChartImage(image);
      setLoadingChartImage(false);
    });
  };

  const reRenderCurrentGraph = () => {
    if (currentGraph === 'Date range') registrationGraphs();
    if (currentGraph === 'Visiting frequency') visitationGraphs();
    if (currentGraph === 'Gender') genderGraphs();
    if (currentGraph === 'Height') heightGraphs();
    if (currentGraph === 'Body shape') buildGraphs();
    if (currentGraph === 'Hair colour') hairColourGraphs();
    if (currentGraph === 'Hair Style') hairStyleGraphs();
    if (currentGraph === 'Hair length') hairLengthGraphs();
    if (currentGraph === 'Eye colour') eyeColourGraphs();
    if (currentGraph === 'Feet type') feetTypeGraphs();
    if (currentGraph === 'Marital status') maritalGraphs();
    if (currentGraph === 'Location') locationGraphs();
    if (currentGraph === 'Age range') ageGraphs();
    if (currentGraph === 'Has children') childrenGraphs();
    if (currentGraph === 'Lives with') livesWithGraphs();
    if (currentGraph === 'Nationality') nationalityGraphs();
    if (currentGraph === 'Languages') languageGraphs();
    if (currentGraph === 'Ethnicity') ethnicityGraphs();
    if (currentGraph === 'Music') musicGraphs();
    if (currentGraph === 'Movies') moviesGraphs();
    if (currentGraph === 'Religion') religionGraphs();
    if (currentGraph === 'Occupation') occupationGraphs();
    if (currentGraph === 'Education') educationGraphs();
    if (currentGraph === 'Hobbies') hobbiesGraphs();
    if (currentGraph === 'Books') booksGraphs();
    if (currentGraph === 'Sports') sportsGraphs();
    if (currentGraph === 'Smokes') smokesGraphs();
    if (currentGraph === 'Drinks') drinksGraphs();
    if (currentGraph === 'Food') foodGraphs();
    if (currentGraph === 'How they treat themselves') treatsGraphs();
    if (currentGraph === 'Dating purpose') relWantedGraphs();
    if (currentGraph === '# Points') pointsGraphs();
    if (currentGraph === '# Page visits of each item in the shop')
      productsViewedGraphs();
    if (currentGraph === 'Total amount paid in shop') totalPaidGraphs();
    if (currentGraph === '# Orders in shop') ordersGraphs();
    if (currentGraph === 'Free keywords') keyWordsGraphs();
  };

  const registrationGraphs = () => {
    setCurrentGraph('Date range');
    setChartImage(null);
    setOpenFilter(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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

  const visitationGraphs = () => {
    setCurrentGraph('Visiting frequency');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
    setShowVisitationGraphs(true);

    const visitationCount = allUsers.reduce((count, user) => {
      const createdAt = new Date(user.createdAt);
      const day = createdAt.toLocaleDateString();
      count[day] = (count[day] || 0) + 1;
      user.visits.forEach((visit) => {
        const visitDate = new Date(visit);
        const visitDay = visitDate.toLocaleDateString();
        count[visitDay] = (count[visitDay] || 0) + 1;
      });
      return count;
    }, {});

    const visitationSorted = Object.entries(visitationCount)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const labels = visitationSorted.map((item) => item.date);
    const num = visitationSorted.map((item) => item.count);
    const per = visitationSorted.map(
      (item) => (item.count / allUsers.length) * 100
    );

    setVisitationNumGraph({
      labels,
      datasets: [
        {
          label: 'Number of users by date of each visit',
          data: num,
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
        },
      ],
    });
    setVisitationPerGraph({
      labels,
      datasets: [
        {
          label: 'Percentage of users by date of each visit',
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
    setCurrentGraph('Gender');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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
    setCurrentGraph('Height');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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
    setCurrentGraph('Body shape');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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

  const hairColourGraphs = () => {
    setCurrentGraph('Hair colour');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
    setShowHairColourGraphs(true);

    const allHairColours = [
      'black',
      'blonde',
      'brown',
      'chestnut',
      'dyed',
      'golden',
      'red',
      'white',
    ];
    const hairColoursCount = {};
    allHairColours.forEach((hairColour) => (hairColoursCount[hairColour] = 0));
    hairColoursCount['na'] = 0;
    allUsers.forEach((user) => {
      const hairColour = user.hairColor || 'na';
      if (allHairColours.includes(hairColour)) {
        hairColoursCount[hairColour]++;
      } else {
        hairColoursCount['na']++;
      }
    });

    const numOfBlack = hairColoursCount['black'];
    const numOfBlonde = hairColoursCount['blonde'];
    const numOfBrown = hairColoursCount['brown'];
    const numOfChestnut = hairColoursCount['chestnut'];
    const numOfDyed = hairColoursCount['dyed'];
    const numOfGolden = hairColoursCount['golden'];
    const numOfRed = hairColoursCount['red'];
    const numOfWhite = hairColoursCount['white'];
    setCurrentNumNa(hairColoursCount['na']);

    const perOfBlack = (hairColoursCount['black'] / allUsers.length) * 100;
    const perOfBlonde = (hairColoursCount['blonde'] / allUsers.length) * 100;
    const perOfBrown = (hairColoursCount['brown'] / allUsers.length) * 100;
    const perOfChestnut =
      (hairColoursCount['chestnut'] / allUsers.length) * 100;
    const perOfDyed = (hairColoursCount['dyed'] / allUsers.length) * 100;
    const perOfGolden = (hairColoursCount['golden'] / allUsers.length) * 100;
    const perOfRed = (hairColoursCount['red'] / allUsers.length) * 100;
    const perOfWhite = (hairColoursCount['white'] / allUsers.length) * 100;
    setCurrentPerNa((hairColoursCount['na'] / allUsers.length) * 100);

    setHairColourNumGraph({
      labels: ['Number of users by hair colour'],
      datasets: [
        {
          label: 'Black',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 0, 1)',
          data: [numOfBlack],
        },
        {
          label: 'Blonde',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [numOfBlonde],
        },
        {
          label: 'Brown',
          backgroundColor: 'rgba(165, 42, 42, 0.2)',
          borderColor: 'rgba(165, 42, 42, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(165, 42, 42, 0.4)',
          hoverBorderColor: 'rgba(165, 42, 42, 1)',
          data: [numOfBrown],
        },
        {
          label: 'Chestnut',
          backgroundColor: 'rgba(139, 69, 19, 0.2)',
          borderColor: 'rgba(139, 69, 19, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(139, 69, 19, 0.4)',
          hoverBorderColor: 'rgba(139, 69, 19, 1)',
          data: [numOfChestnut],
        },
        {
          label: 'Dyed',
          backgroundColor: 'rgba(128, 128, 128, 0.2)',
          borderColor: 'rgba(128, 128, 128, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 128, 128, 0.4)',
          hoverBorderColor: 'rgba(128, 128, 128, 1)',
          data: [numOfDyed],
        },
        {
          label: 'Golden',
          backgroundColor: 'rgba(255, 215, 0, 0.2)',
          borderColor: 'rgba(255, 215, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 215, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 215, 0, 1)',
          data: [numOfGolden],
        },
        {
          label: 'Red',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [numOfRed],
        },
        {
          label: 'White',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 255, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 255, 1)',
          data: [numOfWhite],
        },
      ],
    });

    setHairColourPerGraph({
      labels: ['Percentage of users by hair colour'],
      datasets: [
        {
          label: 'Black',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 0, 1)',
          data: [perOfBlack],
        },
        {
          label: 'Blonde',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [perOfBlonde],
        },
        {
          label: 'Brown',
          backgroundColor: 'rgba(165, 42, 42, 0.2)',
          borderColor: 'rgba(165, 42, 42, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(165, 42, 42, 0.4)',
          hoverBorderColor: 'rgba(165, 42, 42, 1)',
          data: [perOfBrown],
        },
        {
          label: 'Chestnut',
          backgroundColor: 'rgba(139, 69, 19, 0.2)',
          borderColor: 'rgba(139, 69, 19, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(139, 69, 19, 0.4)',
          hoverBorderColor: 'rgba(139, 69, 19, 1)',
          data: [perOfChestnut],
        },
        {
          label: 'Dyed',
          backgroundColor: 'rgba(128, 128, 128, 0.2)',
          borderColor: 'rgba(128, 128, 128, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 128, 128, 0.4)',
          hoverBorderColor: 'rgba(128, 128, 128, 1)',
          data: [perOfDyed],
        },
        {
          label: 'Golden',
          backgroundColor: 'rgba(255, 215, 0, 0.2)',
          borderColor: 'rgba(255, 215, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 215, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 215, 0, 1)',
          data: [perOfGolden],
        },
        {
          label: 'Red',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [perOfRed],
        },
        {
          label: 'White',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 255, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 255, 1)',
          data: [perOfWhite],
        },
      ],
    });
  };

  const hairStyleGraphs = () => {
    setCurrentGraph('Hair style');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
    setShowHairStyleGraphs(true);

    const allHairStyles = ['curvy', 'straight', 'wavy'];
    const hairStylesCount = {};
    allHairStyles.forEach((hairStyle) => (hairStylesCount[hairStyle] = 0));
    hairStylesCount['na'] = 0;
    allUsers.forEach((user) => {
      const hairStyle = user.hairStyle || 'na';
      if (allHairStyles.includes(hairStyle)) {
        hairStylesCount[hairStyle]++;
      } else {
        hairStylesCount['na']++;
      }
    });

    const numOfCurvy = hairStylesCount['curvy'];
    const numOfStraight = hairStylesCount['straight'];
    const numOfWavy = hairStylesCount['wavy'];
    setCurrentNumNa(hairStylesCount['na']);

    const perOfCurvy = (hairStylesCount['curvy'] / allUsers.length) * 100;
    const perOfStraight = (hairStylesCount['straight'] / allUsers.length) * 100;
    const perOfWavy = (hairStylesCount['wavy'] / allUsers.length) * 100;
    setCurrentPerNa((hairStylesCount['na'] / allUsers.length) * 100);

    setHairStyleNumGraph({
      labels: ['Number of users by hair style'],
      datasets: [
        {
          label: 'Curvy',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [numOfCurvy],
        },
        {
          label: 'Straight',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [numOfStraight],
        },
        {
          label: 'Wavy',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [numOfWavy],
        },
      ],
    });

    setHairStylePerGraph({
      labels: ['Percentage of users by hair style'],
      datasets: [
        {
          label: 'Curvy',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [perOfCurvy],
        },
        {
          label: 'Straight',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [perOfStraight],
        },
        {
          label: 'Wavy',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [perOfWavy],
        },
      ],
    });
  };

  const hairLengthGraphs = () => {
    setCurrentGraph('Hair length');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
    setShowHairLengthGraphs(true);

    const allHairLengths = ['bald', 'short', 'medium', 'long'];
    const hairLengthsCount = {};
    allHairLengths.forEach((hairLength) => (hairLengthsCount[hairLength] = 0));
    hairLengthsCount['na'] = 0;
    allUsers.forEach((user) => {
      const hairLength = user.hairLength || 'na';
      if (allHairLengths.includes(hairLength)) {
        hairLengthsCount[hairLength]++;
      } else {
        hairLengthsCount['na']++;
      }
    });

    const numOfBald = hairLengthsCount['bald'];
    const numOfShort = hairLengthsCount['short'];
    const numOfMedium = hairLengthsCount['medium'];
    const numOfLong = hairLengthsCount['long'];
    setCurrentNumNa(hairLengthsCount['na']);

    const perOfBald = (hairLengthsCount['bald'] / allUsers.length) * 100;
    const perOfShort = (hairLengthsCount['short'] / allUsers.length) * 100;
    const perOfMedium = (hairLengthsCount['medium'] / allUsers.length) * 100;
    const perOfLong = (hairLengthsCount['long'] / allUsers.length) * 100;
    setCurrentPerNa((hairLengthsCount['na'] / allUsers.length) * 100);

    setHairLengthNumGraph({
      labels: ['Number of users by hair Length'],
      datasets: [
        {
          label: 'Bald',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [numOfBald],
        },
        {
          label: 'Short',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [numOfShort],
        },
        {
          label: 'Medium',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [numOfMedium],
        },
        {
          label: 'Long',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [numOfLong],
        },
      ],
    });

    setHairLengthPerGraph({
      labels: ['Percentage of users by hair Length'],
      datasets: [
        {
          label: 'Bald',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [perOfBald],
        },
        {
          label: 'Short',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [perOfShort],
        },
        {
          label: 'Medium',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [perOfMedium],
        },
        {
          label: 'Long',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [perOfLong],
        },
      ],
    });
  };

  const eyeColourGraphs = () => {
    setCurrentGraph('Eye colour');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
    setShowEyeColourGraphs(true);

    const allEyeColours = ['blue', 'brown', 'green', 'hazel'];
    const eyeColoursCount = {};
    allEyeColours.forEach((eyeColour) => (eyeColoursCount[eyeColour] = 0));
    eyeColoursCount['na'] = 0;
    allUsers.forEach((user) => {
      const eyeColour = user.eyeColor || 'na';
      if (allEyeColours.includes(eyeColour)) {
        eyeColoursCount[eyeColour]++;
      } else {
        eyeColoursCount['na']++;
      }
    });

    const numOfBlue = eyeColoursCount['blue'];
    const numOfBrown = eyeColoursCount['brown'];
    const numOfGreen = eyeColoursCount['green'];
    const numOfHazel = eyeColoursCount['hazel'];
    setCurrentNumNa(eyeColoursCount['na']);

    const perOfBlue = (eyeColoursCount['blue'] / allUsers.length) * 100;
    const perOfBrown = (eyeColoursCount['brown'] / allUsers.length) * 100;
    const perOfGreen = (eyeColoursCount['green'] / allUsers.length) * 100;
    const perOfHazel = (eyeColoursCount['hazel'] / allUsers.length) * 100;
    setCurrentPerNa((eyeColoursCount['na'] / allUsers.length) * 100);

    setEyeColourNumGraph({
      labels: ['Number of users by eye colour'],
      datasets: [
        {
          label: 'Blue',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [numOfBlue],
        },
        {
          label: 'Brown',
          backgroundColor: 'rgba(139, 69, 19, 0.2)',
          borderColor: 'rgba(139, 69, 19, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(139, 69, 19, 0.4)',
          hoverBorderColor: 'rgba(139, 69, 19, 1)',
          data: [numOfBrown],
        },
        {
          label: 'Green',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [numOfGreen],
        },
        {
          label: 'Hazel',
          backgroundColor: 'rgba(189, 183, 107, 0.2)',
          borderColor: 'rgba(189, 183, 107, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(189, 183, 107, 0.4)',
          hoverBorderColor: 'rgba(189, 183, 107, 1)',
          data: [numOfHazel],
        },
      ],
    });

    setEyeColourPerGraph({
      labels: ['Percentage of users by hair Length'],
      datasets: [
        {
          label: 'Blue',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [perOfBlue],
        },
        {
          label: 'Brown',
          backgroundColor: 'rgba(139, 69, 19, 0.2)',
          borderColor: 'rgba(139, 69, 19, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(139, 69, 19, 0.4)',
          hoverBorderColor: 'rgba(139, 69, 19, 1)',
          data: [perOfBrown],
        },
        {
          label: 'Green',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [perOfGreen],
        },
        {
          label: 'Hazel',
          backgroundColor: 'rgba(189, 183, 107, 0.2)',
          borderColor: 'rgba(189, 183, 107, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(189, 183, 107, 0.4)',
          hoverBorderColor: 'rgba(189, 183, 107, 1)',
          data: [perOfHazel],
        },
      ],
    });
  };

  const feetTypeGraphs = () => {
    setCurrentGraph('Feet type');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
    setShowFeetTypeGraphs(true);

    const allFeetTypes = ['egyptian', 'greek', 'roman'];
    const feetTypesCount = {};
    allFeetTypes.forEach((feetType) => (feetTypesCount[feetType] = 0));
    feetTypesCount['na'] = 0;
    allUsers.forEach((user) => {
      const feetType = user.feetType || 'na';
      if (allFeetTypes.includes(feetType)) {
        feetTypesCount[feetType]++;
      } else {
        feetTypesCount['na']++;
      }
    });

    const numOfEgyptian = feetTypesCount['egyptian'];
    const numOfGreek = feetTypesCount['greek'];
    const numOfRoman = feetTypesCount['roman'];
    setCurrentNumNa(feetTypesCount['na']);

    const perOfEgyptian = (feetTypesCount['egyptian'] / allUsers.length) * 100;
    const perOfGreek = (feetTypesCount['greek'] / allUsers.length) * 100;
    const perOfRoman = (feetTypesCount['roman'] / allUsers.length) * 100;
    setCurrentPerNa((feetTypesCount['na'] / allUsers.length) * 100);

    setFeetTypeNumGraph({
      labels: ['Number of users by feet type'],
      datasets: [
        {
          label: 'Egyptian',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [numOfEgyptian],
        },
        {
          label: 'Greek',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [numOfGreek],
        },
        {
          label: 'Roman',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [numOfRoman],
        },
      ],
    });

    setFeetTypePerGraph({
      labels: ['Percentage of users by hair style'],
      datasets: [
        {
          label: 'Egyptian',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [perOfEgyptian],
        },
        {
          label: 'Greek',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [perOfGreek],
        },
        {
          label: 'Roman',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [perOfRoman],
        },
      ],
    });
  };

  const maritalGraphs = () => {
    setCurrentGraph('Marital status');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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
    setCurrentGraph('Location');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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
    setCurrentGraph('Age range');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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
    setCurrentGraph('Has children');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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
    setCurrentGraph('Lives with');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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

  const nationalityGraphs = () => {
    setCurrentGraph('Nationality');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowLivesWithGraphs(false);
    setShowChildrenGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
    setShowNationalityGraphs(true);

    const nationalityCounts = {};
    let numNa = 0;

    allUsers.map((user) => {
      if (!user.nationality) {
        numNa++;
      } else {
        if (!nationalityCounts[user.nationality]) {
          nationalityCounts[user.nationality] = 1;
        } else {
          nationalityCounts[user.nationality]++;
        }
      }
    });

    setCurrentNumNa(numNa);
    setCurrentPerNa((numNa / allUsers.length) * 100);

    delete nationalityCounts.na;

    const labels = Object.keys(nationalityCounts);
    const num = Object.values(nationalityCounts);
    const per = {};
    Object.keys(nationalityCounts).forEach((genre) => {
      per[genre] = ((nationalityCounts[genre] / allUsers.length) * 100).toFixed(
        2
      );
    });

    setNationalityNumGraph({
      labels,
      datasets: [
        {
          label: 'Number of users by nationality',
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
          data: num,
        },
      ],
    });

    setNationalityPerGraph({
      labels,
      datasets: [
        {
          label: 'Percentage of users by nationality',
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

  const languageGraphs = () => {
    setCurrentGraph('Languages');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowNationalityGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
    setShowLanguageGraphs(true);

    const languageCounts = {};
    let numNa = 0;

    allUsers.map((user) => {
      if (!user.language) {
        numNa++;
      } else {
        if (!languageCounts[user.language]) {
          languageCounts[user.language] = 1;
        } else {
          languageCounts[user.language]++;
        }
      }
    });

    setCurrentNumNa(numNa);
    setCurrentPerNa((numNa / allUsers.length) * 100);

    delete languageCounts.na;

    const labels = Object.keys(languageCounts);
    const num = Object.values(languageCounts);
    const per = {};
    Object.keys(languageCounts).forEach((genre) => {
      per[genre] = ((languageCounts[genre] / allUsers.length) * 100).toFixed(2);
    });

    setLanguageNumGraph({
      labels,
      datasets: [
        {
          label: 'Number of users by native language',
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
          data: num,
        },
      ],
    });

    setLanguagePerGraph({
      labels,
      datasets: [
        {
          label: 'Percentage of users by native language',
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

  const ethnicityGraphs = () => {
    setCurrentGraph('Ethnicity');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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
    setCurrentGraph('Music');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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
    setCurrentGraph('Movies');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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
    setCurrentGraph('Religion');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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
    setCurrentGraph('Occupation');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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
    setCurrentGraph('Education');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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
    setCurrentGraph('Hobbies');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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
    setCurrentGraph('Books');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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
    setCurrentGraph('Sports');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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
    setCurrentGraph('Smokes');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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
    setCurrentGraph('Drinks');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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

    setDrinksNumGraph({
      labels: ['Number of users by how often they drink alcohol'],
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
      labels: ['Percentage of users by how often they drink alcohol'],
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
    setCurrentGraph('Food');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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
    setCurrentGraph('How they treat themselves');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
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

  const relWantedGraphs = () => {
    setCurrentGraph('Dating purpose');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
    setShowRelWantedGraphs(true);

    const allRelWanted = [
      'casual dating',
      'friendship',
      'long-term relationship',
      'marriage',
    ];
    const relWantedCount = {};
    allRelWanted.forEach((relWanted) => (relWantedCount[relWanted] = 0));
    relWantedCount['na'] = 0;
    allUsers.forEach((user) => {
      const relWanted = user.relWanted || 'na';
      if (allRelWanted.includes(relWanted)) {
        relWantedCount[relWanted]++;
      } else {
        relWantedCount['na']++;
      }
    });

    const numOfCasualDating = relWantedCount['casual dating'];
    const numOfFriendship = relWantedCount['friendship'];
    const numOfLongtermRelationship = relWantedCount['long-term relationship'];
    const numOfMarriage = relWantedCount['marriage'];
    setCurrentNumNa(relWantedCount['na']);

    const perOfCasualDating =
      (relWantedCount['casual dating'] / allUsers.length) * 100;
    const perOfFriendship =
      (relWantedCount['friendship'] / allUsers.length) * 100;
    const perOfLongtermRelationship =
      (relWantedCount['long-term relationship'] / allUsers.length) * 100;
    const perOfMarriage = (relWantedCount['marriage'] / allUsers.length) * 100;
    setCurrentPerNa((relWantedCount['na'] / allUsers.length) * 100);

    setRelWantedNumGraph({
      labels: ['Number of users by kind of relationship they want'],
      datasets: [
        {
          label: 'Casual dating',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [numOfCasualDating],
        },
        {
          label: 'Friendship',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [numOfFriendship],
        },
        {
          label: 'Long-term relationship',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [numOfLongtermRelationship],
        },
        {
          label: 'Marriage',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [numOfMarriage],
        },
      ],
    });

    setRelWantedPerGraph({
      labels: ['Percentage of users by kind of relationship they want'],
      datasets: [
        {
          label: 'Casual dating',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [perOfCasualDating],
        },
        {
          label: 'Friendship',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [perOfFriendship],
        },
        {
          label: 'Long-term relationship',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [perOfLongtermRelationship],
        },
        {
          label: 'Marriage',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [perOfMarriage],
        },
      ],
    });
  };

  const pointsGraphs = () => {
    setCurrentGraph('# Points');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowTreatsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
    setShowPointsGraphs(true);

    const totalPoints = allUsers.reduce(
      (sum, user) => sum + (user.pointsTotal || 0),
      0
    );
    setCurrentAverage(totalPoints / allUsers.length);

    setPointsGraph({
      labels: [],
      datasets: [
        {
          label: 'User points totals',
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
          data: allUsers.map((user, index) => ({
            x: index,
            y: user.pointsTotal,
          })),
        },
      ],
    });
  };

  const productsViewedGraphs = () => {
    setCurrentGraph('# Page visits of each item in the shop');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowPointsGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
    setShowProductsViewedGraphs(true);

    const allProductsViewed = [
      'Eau de Parfum Volupté(s) de Bach - 30ml',
      'Eau de Parfum Délice(s) de Bach - 30ml',
      'T-Shirt Love is in Cyprus (Medium Size)',
      'T-Shirt Love is in Cyprus (Short Size)',
      'Libido Enhancer - 20ml dropper (Organic)',
      'Slimness enhancer - 10ml oral spray (Organic)',
      'Energy booster - 10ml oral spray (Organic)',
      'Self-Confidence enhancer - 20ml dropper (Organic)',
    ];
    const productsViewedCount = {};
    allProductsViewed.forEach(
      (product) => (productsViewedCount[product] = { count: 0, amount: 0 })
    );
    productsViewedCount['na'] = { count: 0, amount: 0 };

    allUsers.forEach((user) => {
      const productsViewed = user.productsViewed || [];
      if (productsViewed.length > 0) {
        productsViewed.forEach((viewedProduct) => {
          const productTitle = viewedProduct.item.title;
          const productAmount = viewedProduct.amount;
          if (allProductsViewed.includes(productTitle)) {
            productsViewedCount[productTitle].count++;
            productsViewedCount[productTitle].amount += productAmount;
          } else {
            productsViewedCount['na'].count++;
            productsViewedCount['na'].amount += productAmount;
          }
        });
      } else {
        productsViewedCount['na'].count++;
      }
    });

    const numOfVoluptes =
      productsViewedCount['Eau de Parfum Volupté(s) de Bach - 30ml'].amount;
    const numOfDelices =
      productsViewedCount['Eau de Parfum Délice(s) de Bach - 30ml'].amount;
    const numOfMediumTee =
      productsViewedCount['T-Shirt Love is in Cyprus (Medium Size)'].amount;
    const numOfShortTee =
      productsViewedCount['T-Shirt Love is in Cyprus (Short Size)'].amount;
    const numOfLibido =
      productsViewedCount['Libido Enhancer - 20ml dropper (Organic)'].amount;
    const numOfSlimness =
      productsViewedCount['Slimness enhancer - 10ml oral spray (Organic)']
        .amount;
    const numOfEnergy =
      productsViewedCount['Energy booster - 10ml oral spray (Organic)'].amount;
    const numOfConfidence =
      productsViewedCount['Self-Confidence enhancer - 20ml dropper (Organic)']
        .amount;
    setCurrentNumNa(productsViewedCount['na'].count);

    const perOfVoluptes =
      (productsViewedCount['Eau de Parfum Volupté(s) de Bach - 30ml'].amount /
        allUsers.length) *
      100;
    const perOfDelices =
      (productsViewedCount['Eau de Parfum Délice(s) de Bach - 30ml'].amount /
        allUsers.length) *
      100;
    const perOfMediumTee =
      (productsViewedCount['T-Shirt Love is in Cyprus (Medium Size)'].amount /
        allUsers.length) *
      100;
    const perOfShortTee =
      (productsViewedCount['T-Shirt Love is in Cyprus (Short Size)'].amount /
        allUsers.length) *
      100;
    const perOfLibido =
      (productsViewedCount['Libido Enhancer - 20ml dropper (Organic)'].amount /
        allUsers.length) *
      100;
    const perOfSlimness =
      (productsViewedCount['Slimness enhancer - 10ml oral spray (Organic)']
        .amount /
        allUsers.length) *
      100;
    const perOfEnergy =
      (productsViewedCount['Energy booster - 10ml oral spray (Organic)']
        .amount /
        allUsers.length) *
      100;
    const perOfConfidence =
      (productsViewedCount['Self-Confidence enhancer - 20ml dropper (Organic)']
        .amount /
        allUsers.length) *
      100;
    setCurrentPerNa((productsViewedCount['na'].count / allUsers.length) * 100);

    setProductsViewedNumGraph({
      labels: ['Number of users by product view'],
      datasets: [
        {
          label: 'Eau de Parfum Volupté(s) de Bach - 30ml',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [numOfVoluptes],
        },
        {
          label: 'Eau de Parfum Délice(s) de Bach - 30ml',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [numOfDelices],
        },
        {
          label: 'T-Shirt Love is in Cyprus (Medium Size)',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [numOfMediumTee],
        },
        {
          label: 'T-Shirt Love is in Cyprus (Short Size)',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [numOfShortTee],
        },
        {
          label: 'Libido Enhancer - 20ml dropper (Organic)',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [numOfLibido],
        },
        {
          label: 'Slimness enhancer - 10ml oral spray (Organic)',
          backgroundColor: 'rgba(75, 0, 130, 0.2)',
          borderColor: 'rgba(75, 0, 130, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 0, 130, 0.4)',
          hoverBorderColor: 'rgba(75, 0, 130, 1)',
          data: [numOfSlimness],
        },
        {
          label: 'Energy booster - 10ml oral spray (Organic)',
          backgroundColor: 'rgba(238, 130, 238, 0.2)',
          borderColor: 'rgba(238, 130, 238, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(238, 130, 238, 0.4)',
          hoverBorderColor: 'rgba(238, 130, 238, 1)',
          data: [numOfEnergy],
        },
        {
          label: 'Self-Confidence enhancer - 20ml dropper (Organic)',
          backgroundColor: 'rgba(128, 0, 0, 0.2)',
          borderColor: 'rgba(128, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(128, 0, 0, 1)',
          data: [numOfConfidence],
        },
      ],
    });

    setProductsViewedPerGraph({
      labels: ['Number of users by product view'],
      datasets: [
        {
          label: 'Eau de Parfum Volupté(s) de Bach - 30ml',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 0, 0, 1)',
          data: [perOfVoluptes],
        },
        {
          label: 'Eau de Parfum Délice(s) de Bach - 30ml',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 165, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 165, 0, 1)',
          data: [perOfDelices],
        },
        {
          label: 'T-Shirt Love is in Cyprus (Medium Size)',
          backgroundColor: 'rgba(255, 255, 0, 0.2)',
          borderColor: 'rgba(255, 255, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 255, 0, 0.4)',
          hoverBorderColor: 'rgba(255, 255, 0, 1)',
          data: [perOfMediumTee],
        },
        {
          label: 'T-Shirt Love is in Cyprus (Short Size)',
          backgroundColor: 'rgba(0, 128, 0, 0.2)',
          borderColor: 'rgba(0, 128, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 128, 0, 0.4)',
          hoverBorderColor: 'rgba(0, 128, 0, 1)',
          data: [perOfShortTee],
        },
        {
          label: 'Libido Enhancer - 20ml dropper (Organic)',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(0, 0, 255, 0.4)',
          hoverBorderColor: 'rgba(0, 0, 255, 1)',
          data: [perOfLibido],
        },
        {
          label: 'Slimness enhancer - 10ml oral spray (Organic)',
          backgroundColor: 'rgba(75, 0, 130, 0.2)',
          borderColor: 'rgba(75, 0, 130, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 0, 130, 0.4)',
          hoverBorderColor: 'rgba(75, 0, 130, 1)',
          data: [perOfSlimness],
        },
        {
          label: 'Energy booster - 10ml oral spray (Organic)',
          backgroundColor: 'rgba(238, 130, 238, 0.2)',
          borderColor: 'rgba(238, 130, 238, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(238, 130, 238, 0.4)',
          hoverBorderColor: 'rgba(238, 130, 238, 1)',
          data: [perOfEnergy],
        },
        {
          label: 'Self-Confidence enhancer - 20ml dropper (Organic)',
          backgroundColor: 'rgba(128, 0, 0, 0.2)',
          borderColor: 'rgba(128, 0, 0, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(128, 0, 0, 0.4)',
          hoverBorderColor: 'rgba(128, 0, 0, 1)',
          data: [perOfConfidence],
        },
      ],
    });
  };

  const totalPaidGraphs = () => {
    setCurrentGraph('Total amount paid in the shop');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowTreatsGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(false);
    setShowTotalPaidGraphs(true);

    const usersWithoutPaidTotal = allUsers.filter(
      (user) => user.itemsOrderedValue === undefined
    );
    setCurrentNumNa(usersWithoutPaidTotal.length);

    const totalPaid = allUsers.reduce(
      (sum, user) => sum + (user.itemsOrderedValue || 0),
      0
    );
    setCurrentAverage(totalPaid / allUsers.length);

    setTotalPaidGraph({
      labels: [],
      datasets: [
        {
          label: 'User spending in shop totals',
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
          data: allUsers.map((user, index) => ({
            x: index,
            y: user.itemsOrderedValue,
          })),
        },
      ],
    });
  };

  const ordersGraphs = () => {
    setCurrentGraph('# Orders in shop');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowTreatsGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowKeyWordsGraphs(false);
    setShowOrdersGraphs(true);

    const usersWithoutOrders = allUsers.filter(
      (user) => user.orders === undefined
    );
    setCurrentNumNa(usersWithoutOrders.length);

    const totalOrders = allUsers.reduce(
      (sum, user) => sum + (user.orders || 0),
      0
    );
    setCurrentAverage(totalOrders / allUsers.length);

    setOrdersGraph({
      labels: [],
      datasets: [
        {
          label: 'User orders placed',
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
          data: allUsers.map((user, index) => ({
            x: index,
            y: user.orders,
          })),
        },
      ],
    });
  };

  const keyWordsGraphs = () => {
    setCurrentGraph('Free keywords');
    setChartImage(null);
    setOpenFilter(false);
    setShowRegistrationGraphs(false);
    setShowVisitationGraphs(false);
    setShowGenderGraphs(false);
    setShowHeightGraphs(false);
    setShowBuildGraphs(false);
    setShowHairColourGraphs(false);
    setShowHairStyleGraphs(false);
    setShowHairLengthGraphs(false);
    setShowEyeColourGraphs(false);
    setShowFeetTypeGraphs(false);
    setShowMaritalGraphs(false);
    setShowLocationGraphs(false);
    setShowAgeGraphs(false);
    setShowChildrenGraphs(false);
    setShowLivesWithGraphs(false);
    setShowNationalityGraphs(false);
    setShowLanguageGraphs(false);
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
    setShowRelWantedGraphs(false);
    setShowTreatsGraphs(false);
    setShowPointsGraphs(false);
    setShowProductsViewedGraphs(false);
    setShowTotalPaidGraphs(false);
    setShowOrdersGraphs(false);
    setShowKeyWordsGraphs(true);

    const stopwords = [
      'a',
      'an',
      'the',
      'and',
      'or',
      'but',
      'in',
      'on',
      'at',
      'i',
      'to',
      'for',
      'am',
      'of',
      'my',
      'with',
      'me',
      'have',
      'you',
      'is',
      'who',
      'just',
      "i'm",
      'that',
      'very',
      ',',
    ];
    setCurrentNumNa(allUsers.filter((user) => !user.about).length);

    const aboutWordsCount = {};
    allUsers.forEach((user) => {
      if (user.about) {
        const words = user.about.toLowerCase().split(' ');
        words.forEach((word) => {
          if (!stopwords.includes(word)) {
            if (aboutWordsCount[word]) {
              aboutWordsCount[word]++;
            } else {
              aboutWordsCount[word] = 1;
            }
          }
        });
      }
    });

    const top15Words = Object.entries(aboutWordsCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([word, count]) => ({ word, count }));

    const labels = top15Words.map((wordData) => wordData.word);
    const counts = top15Words.map((wordData) => wordData.count);

    setKeyWordsGraph({
      labels,
      datasets: [
        {
          label: 'Most common key words in users about sections',
          backgroundColor: 'rgba(239, 91, 133, 0.2)',
          borderColor: 'rgba(239, 91, 133, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(239, 91, 133, 0.4)',
          hoverBorderColor: 'rgba(239, 91, 133, 1)',
          data: counts,
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
              <div className='analytics-btns'>
                <FontAwesomeIcon
                  icon={faFilter}
                  className='fa'
                  onClick={() => setOpenFilter(!openFilter)}
                />
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
                {!chartImage && !loadingChartImage ? (
                  <FontAwesomeIcon
                    icon={faFloppyDisk}
                    className='fa'
                    onClick={preparePdf}
                  />
                ) : (
                  !chartImage &&
                  loadingChartImage && (
                    <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                  )
                )}
                {chartImage && (
                  <PDFDownloadLink
                    document={<Chart chartImage={chartImage} />}
                    fileName='chart.pdf'
                  >
                    <FontAwesomeIcon icon={faFilePdf} className='fa' />
                  </PDFDownloadLink>
                )}
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
                    <span>{allUsers.length}</span>{' '}
                    {allUsers.length === 1 ? 'member' : 'members'} registered
                    between{' '}
                    <span>{moment(startDate).format('dddd, D MMMM YYYY')}</span>{' '}
                    and{' '}
                    <span>{moment(endDate).format('dddd, D MMMM YYYY')}</span>
                  </p>
                </div>
              ) : (
                <div className='selected-dates'>
                  <p className='center'>
                    There are currently <span>{allUsers.length}</span>{' '}
                    registered members
                  </p>
                </div>
              )}
              {openFilter && (
                <ul className='filter-options'>
                  <li onClick={registrationGraphs}>Date range</li>
                  <li onClick={visitationGraphs}>Visiting frequency</li>
                  <li onClick={genderGraphs}>Gender</li>
                  <li onClick={heightGraphs}>Height</li>
                  <li onClick={buildGraphs}>Body shape</li>
                  <li onClick={hairColourGraphs}>Hair colour</li>
                  <li onClick={hairStyleGraphs}>Hair style</li>
                  <li onClick={hairLengthGraphs}>Hair length</li>
                  <li onClick={eyeColourGraphs}>Eye colour</li>
                  <li onClick={feetTypeGraphs}>Feet type</li>
                  <li onClick={maritalGraphs}>Marital status</li>
                  <li onClick={locationGraphs}>Location</li>
                  <li onClick={ageGraphs}>Age range</li>
                  <li onClick={childrenGraphs}>Has children</li>
                  <li onClick={livesWithGraphs}>Lives with</li>
                  <li onClick={nationalityGraphs}>Nationality</li>
                  <li onClick={languageGraphs}>Languages</li>
                  <li onClick={ethnicityGraphs}>Ethnicity</li>
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
                  <li onClick={relWantedGraphs}>Dating purpose</li>
                  <li onClick={pointsGraphs}># Points</li>
                  <li onClick={productsViewedGraphs}>
                    # Page visits of each item in shop
                  </li>
                  <li onClick={totalPaidGraphs}>
                    Total amount paid in the shop
                  </li>
                  <li onClick={ordersGraphs}># Orders in shop</li>
                  <li onClick={keyWordsGraphs}>Free keywords</li>
                </ul>
              )}
              {showRegistrationGraphs && (
                <div ref={registrationGraphRef}>
                  <h1 className='center'>Date range</h1>
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
                </div>
              )}
              {showVisitationGraphs && (
                <div ref={visitationGraphRef}>
                  <h1 className='center'>Visiting frequency</h1>
                  <Bar
                    data={visitationNumGraph}
                    style={{
                      marginBottom: '20px',
                    }}
                  />
                  <Bar
                    data={visitationPerGraph}
                    style={{
                      marginBottom: '20px',
                    }}
                  />
                </div>
              )}
              {showGenderGraphs && (
                <div ref={genderGraphRef}>
                  <h1 className='center'>Gender</h1>
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
                </div>
              )}
              {showHeightGraphs && (
                <div ref={heightGraphRef}>
                  <h1 className='center'>Height</h1>
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
                </div>
              )}
              {showBuildGraphs && (
                <div ref={buildGraphRef}>
                  <h1 className='center'>Body shape</h1>
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
                </div>
              )}
              {showHairColourGraphs && (
                <div ref={hairColourGraphRef}>
                  <h1 className='center'>Hair colour</h1>
                  <Bar
                    data={hairColourNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    hair colour
                  </h2>
                  <Bar
                    data={hairColourPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their hair colour
                  </h2>
                </div>
              )}
              {showHairStyleGraphs && (
                <div ref={hairStyleGraphRef}>
                  <h1 className='center'>Hair style</h1>
                  <Bar
                    data={hairStyleNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    hair style
                  </h2>
                  <Bar
                    data={hairStylePerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their hair style
                  </h2>
                </div>
              )}
              {showHairLengthGraphs && (
                <div ref={hairLengthGraphRef}>
                  <h1 className='center'>Hair length</h1>
                  <Bar
                    data={hairLengthNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    hair length
                  </h2>
                  <Bar
                    data={hairLengthPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their hair length
                  </h2>
                </div>
              )}
              {showEyeColourGraphs && (
                <div ref={eyeColourGraphRef}>
                  <h1 className='center'>Eye colour</h1>
                  <Bar
                    data={eyeColourNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    eye colour
                  </h2>
                  <Bar
                    data={eyeColourPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their eye colour
                  </h2>
                </div>
              )}
              {showFeetTypeGraphs && (
                <div ref={feetTypeGraphRef}>
                  <h1 className='center'>Feet type</h1>
                  <Bar
                    data={feetTypeNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    feet type
                  </h2>
                  <Bar
                    data={feetTypePerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their feet type
                  </h2>
                </div>
              )}
              {showMaritalGraphs && (
                <div ref={maritalGraphRef}>
                  <h1 className='center'>Marital status</h1>
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
                </div>
              )}
              {showLocationGraphs && (
                <div ref={locationGraphRef}>
                  <h1 className='center'>Location</h1>
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
                </div>
              )}
              {showAgeGraphs && (
                <div ref={ageGraphRef}>
                  <h1 className='center'>Age range</h1>
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
                </div>
              )}
              {showChildrenGraphs && (
                <div ref={childrenGraphRef}>
                  <h1 className='center'>Has children</h1>
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
                </div>
              )}
              {showLivesWithGraphs && (
                <div ref={livesWithGraphRef}>
                  <h1 className='center'>Lives with</h1>
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
                </div>
              )}
              {showNationalityGraphs && (
                <div ref={nationalityGraphRef}>
                  <h1 className='center'>Nationality</h1>
                  <Bar
                    data={nationalityNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    nationality
                  </h2>
                  <Bar
                    data={nationalityPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their nationality
                  </h2>
                </div>
              )}
              {showLanguageGraphs && (
                <div ref={languageGraphRef}>
                  <h1 className='center'>Languages</h1>
                  <Bar
                    data={languageNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    native language
                  </h2>
                  <Bar
                    data={languagePerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated their native language
                  </h2>
                </div>
              )}
              {showEthnicityGraphs && (
                <div ref={ethnicityGraphRef}>
                  <h1 className='center'>Ethnicity</h1>
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
                </div>
              )}
              {showMusicGraphs && (
                <div ref={musicGraphRef}>
                  <h1 className='center'>Music</h1>
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
                </div>
              )}
              {showMoviesGraphs && (
                <div ref={moviesGraphRef}>
                  <h1 className='center'>Movies</h1>
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
                </div>
              )}
              {showReligionGraphs && (
                <div ref={religionGraphRef}>
                  <h1 className='center'>Religion</h1>
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
                </div>
              )}
              {showOccupationGraphs && (
                <div ref={occupationGraphRef}>
                  <h1 className='center'>Occupation</h1>
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
                </div>
              )}
              {showEducationGraphs && (
                <div ref={educationGraphRef}>
                  <h1 className='center'>Education</h1>
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
                </div>
              )}
              {showHobbiesGraphs && (
                <div ref={hobbiesGraphRef}>
                  <h1 className='center'>Hobbies</h1>
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
                </div>
              )}
              {showBooksGraphs && (
                <div ref={booksGraphRef}>
                  <h1 className='center'>Books</h1>
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
                </div>
              )}
              {showSportsGraphs && (
                <div ref={sportsGraphRef}>
                  <h1 className='center'>Sports</h1>
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
                </div>
              )}
              {showSmokesGraphs && (
                <div ref={smokesGraphRef}>
                  <h1 className='center'>Smokes</h1>
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
                </div>
              )}
              {showDrinksGraphs && (
                <div ref={drinksGraphRef}>
                  <h1 className='center'>Drinks</h1>
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
                </div>
              )}
              {showFoodGraphs && (
                <div ref={foodGraphRef}>
                  <h1 className='center'>Food</h1>
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
                </div>
              )}
              {showTreatsGraphs && (
                <div ref={treatsGraphRef}>
                  <h1 className='center'>How they treat themselves</h1>
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
                </div>
              )}
              {showRelWantedGraphs && (
                <div ref={relWantedGraphRef}>
                  <h1 className='center'>Dating purpose</h1>
                  <Bar
                    data={relWantedNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated what
                    type of relationship they are looking for
                  </h2>
                  <Bar
                    data={relWantedPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet updated what type of relationship they are looking for
                  </h2>
                </div>
              )}
              {showPointsGraphs && (
                <div ref={pointsGraphRef}>
                  <h1 className='center'># Points</h1>
                  <Scatter
                    data={pointsGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                    options={{
                      plugins: {
                        tooltip: {
                          enabled: true,
                          mode: 'nearest',
                          callbacks: {
                            title: function () {
                              return '';
                            },
                            label: function (context) {
                              const dataPoint = context.parsed;
                              const userIndex = dataPoint.x;
                              const user = allUsers[userIndex];
                              return `${user.username} - Points: ${dataPoint.y}`;
                            },
                          },
                        },
                      },
                    }}
                  />
                  <h2 className='center'>
                    The average amount of points per user is currently
                    <span>{currentAverage.toFixed(2)}</span>
                  </h2>
                </div>
              )}
              {showProductsViewedGraphs && (
                <div ref={productsViewedGraphRef}>
                  <h1 className='center'># Page visits of each item in shop</h1>
                  <Bar
                    data={productsViewedNumGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet viewed any
                    products
                  </h2>
                  <Bar
                    data={productsViewedPerGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentPerNa.toFixed(2)}%</span> of users have not
                    yet viewed any products
                  </h2>
                </div>
              )}
              {showTotalPaidGraphs && (
                <div ref={totalPaidGraphRef}>
                  <h1 className='center'>Total amount paid in the shop</h1>
                  <Scatter
                    data={totalPaidGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                    options={{
                      scales: {
                        x: {
                          beginAtZero: true,
                        },
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: function (value) {
                              return '€' + value;
                            },
                          },
                        },
                      },
                      plugins: {
                        tooltip: {
                          enabled: true,
                          mode: 'nearest',
                          callbacks: {
                            title: function () {
                              return '';
                            },
                            label: function (context) {
                              const dataPoint = context.parsed;
                              const userIndex = dataPoint.x;
                              const user = allUsers[userIndex];
                              return `${user.username} - Spent: €${dataPoint.y}`;
                            },
                          },
                        },
                      },
                    }}
                  />
                  <h2 className='center'>
                    The average amount paid in the shop per user is currently
                    <span>€{currentAverage.toFixed(2)}</span>
                  </h2>
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet made a store
                    purchase
                  </h2>
                </div>
              )}
              {showOrdersGraphs && (
                <div ref={ordersGraphRef}>
                  <h1 className='center'># Orders in shop</h1>
                  <Scatter
                    data={ordersGraph}
                    style={{
                      marginBottom: '30px',
                    }}
                    options={{
                      scales: {
                        x: {
                          beginAtZero: true,
                        },
                        y: {
                          beginAtZero: true,
                        },
                      },
                      plugins: {
                        tooltip: {
                          enabled: true,
                          mode: 'nearest',
                          callbacks: {
                            title: function () {
                              return '';
                            },
                            label: function (context) {
                              const dataPoint = context.parsed;
                              const userIndex = dataPoint.x;
                              const user = allUsers[userIndex];
                              return `${user.username} - Orders: ${dataPoint.y}`;
                            },
                          },
                        },
                      },
                    }}
                  />
                  <h2 className='center'>
                    The average amount of orders placed per user is currently
                    <span>{currentAverage.toFixed(2)}</span>
                  </h2>
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet placed an
                    order
                  </h2>
                </div>
              )}
              {showKeyWordsGraphs && (
                <div ref={keyWordsGraphRef}>
                  <h1 className='center'>Free keywords</h1>
                  <Bar
                    data={keyWordsGraph}
                    style={{
                      marginBottom: '20px',
                    }}
                  />
                  <h2 className='center'>
                    <span>{currentNumNa}</span> users have not yet updated their
                    about section
                  </h2>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
