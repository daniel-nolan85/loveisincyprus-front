import React, { useState, useEffect, useRef } from 'react';
import { getUsersByPage, fetchUsersByFilter } from '../../functions/user';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faMagnifyingGlass,
  faFloppyDisk,
  faFilter,
  faClock,
  faTimeline,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { Menu, Slider, Radio, Dropdown, Input } from 'antd';
import UserInfo from '../../components/cards/UserInfo';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserSearchMobile from '../../components/modals/UserSearchMobile';
import { Pagination } from 'antd';

const { SubMenu } = Menu;

const initialInputValues = {
  numOfChildren: '',
  occupation: '',
  pets: '',
  loves: '',
  hates: '',
  interests: '',
  music: '',
  books: '',
  films: '',
  hobbies: '',
  sports: '',
  traits: '',
  treatself: '',
};

const UserSearch = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ageRange, setAgeRange] = useState([0, 0]);
  const [incomeRange, setIncomeRange] = useState([0, 0]);
  const [ageOfPartner, setAgeOfPartner] = useState('');
  const [relWanted, setRelWanted] = useState('');
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('');
  const [nationality, setNationality] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [height, setHeight] = useState('');
  const [build, setBuild] = useState('');
  const [eyeColor, setEyeColor] = useState('');
  const [hairColor, setHairColor] = useState('');
  const [hairLength, setHairLength] = useState('');
  const [hairStyle, setHairStyle] = useState('');
  const [feetType, setFeetType] = useState('');
  const [drinks, setDrinks] = useState('');
  const [smokes, setSmokes] = useState('');
  const [education, setEducation] = useState('');
  const [politics, setPolitics] = useState('');
  const [religion, setReligion] = useState('');
  const [foods, setFoods] = useState('');
  const [livesWith, setLivesWith] = useState('');
  const [relocate, setRelocate] = useState('');
  const [sexLikes, setSexLikes] = useState('');
  const [sexFrequency, setSexFrequency] = useState('');
  const [searchName, setSearchName] = useState('');
  const [params, setParams] = useState([]);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [userSearchModalIsOpen, setUserSearchModalIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [inputValues, setInputValues] = useState(initialInputValues);

  // console.log('users => ', users);

  const map = {
    ageOfPartner: setAgeOfPartner,
    relWanted: setRelWanted,
    location: setLocation,
    language: setLanguage,
    nationality: setNationality,
    ethnicity: setEthnicity,
    maritalStatus: setMaritalStatus,
    height: setHeight,
    build: setBuild,
    eyeColor: setEyeColor,
    hairColor: setHairColor,
    hairLength: setHairLength,
    hairStyle: setHairStyle,
    feetType: setFeetType,
    drinks: setDrinks,
    smokes: setSmokes,
    education: setEducation,
    politics: setPolitics,
    religion: setReligion,
    foods: setFoods,
    livesWith: setLivesWith,
    relocate: setRelocate,
    sexLikes: setSexLikes,
    sexFrequency: setSexFrequency,
  };

  const { user } = useSelector((state) => ({ ...state }));
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const dispatch = useDispatch();
  const history = useHistory();

  const isFirstRun = useRef(true);

  useEffect(() => {
    loadAllUsers();
  }, [page]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      const delayed = setTimeout(() => {
        fetchUsers({ query: text });
        if (!text) {
          loadAllUsers();
        }
      }, 300);
      return () => clearTimeout(delayed);
    }
  }, [text]);

  const loadAllUsers = () => {
    setLoading(true);
    getUsersByPage(page, user.token).then((res) => {
      setUsers(res.data);
      setLoading(false);
    });
  };

  const fetchUsers = (arg) => {
    fetchUsersByFilter(arg, user.token).then((res) => {
      setUsers(res.data);
    });
  };

  const handleChange = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: e.target.value },
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search-users?${text}`);
  };

  const handleRadio = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setParams((prevParams) => [
      ...prevParams,
      { type: 'radio', field: e.target.name, lookUp: e.target.value },
    ]);
  };

  const handleAgeSlider = (value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setAgeRange(value);
    setTimeout(() => {
      setParams((prevParams) => [...prevParams, { field: 'age', ageRange }]);
    }, 300);
  };

  const handleIncomeSlider = (value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setIncomeRange(value);
    setTimeout(() => {
      setParams((prevParams) => [
        ...prevParams,
        { field: 'income', incomeRange },
      ]);
    }, 300);
  };

  const handleInputChange = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    if (e.target.name === 'numOfChildren') {
      setParams((prevParams) => [
        ...prevParams,
        { type: 'number', field: e.target.name, entry: e.target.value },
      ]);
    } else if (e.target.name === 'occupation') {
      setTimeout(() => {
        setParams((prevParams) => [
          ...prevParams,
          { type: 'string', field: e.target.name, entry: e.target.value },
        ]);
      }, 300);
    } else {
      const arr = e.target.value.split(',');
      setTimeout(() => {
        setParams((prevParams) => [
          ...prevParams,
          { type: 'array', field: e.target.name, entry: arr },
        ]);
      }, 300);
    }
  };

  const handleDropdown = ({ key, item }) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });

    setTimeout(() => {
      setParams((prevParams) => [
        ...prevParams,
        { field: item.props.title, key },
      ]);
    }, 300);

    const string = key[0].toUpperCase() + key.substring(1);

    map[item.props.title](string);
  };

  const sortLastLoggedIn = () => {
    const lastLogged = users.sort(
      (a, b) => new Date(b.lastLogin) - new Date(a.lastLogin)
    );
    setUsers([...lastLogged]);
  };

  const sortLastSignedUp = () => {
    const lastSigned = users.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setUsers([...lastSigned]);
  };

  const sortPopularity = () => {
    const popular = users.sort(
      (a, b) => b.followers.length - a.followers.length
    );
    setUsers([...popular]);
  };

  const ageTheyWant = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: '18-21',
          key: '18-21',
          title: 'ageOfPartner',
        },
        {
          label: '21-30',
          key: '21-30',
          title: 'ageOfPartner',
        },
        {
          label: '31-40',
          key: '31-40',
          title: 'ageOfPartner',
        },
        {
          label: '41-50',
          key: '41-50',
          title: 'ageOfPartner',
        },
        {
          label: '51-60',
          key: '51-60',
          title: 'ageOfPartner',
        },
        {
          label: '61-70',
          key: '61-70',
          title: 'ageOfPartner',
        },
        {
          label: '71-80',
          key: '71-80',
          title: 'ageOfPartner',
        },
        {
          label: 'Over 80',
          key: 'Over 80',
          title: 'ageOfPartner',
        },
      ]}
    />
  );

  const relTheyWant = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'Casual dating',
          key: 'casual dating',
          title: 'relWanted',
        },
        {
          label: 'Friendship',
          key: 'friendship',
          title: 'relWanted',
        },
        {
          label: 'Long-term relationship',
          key: 'long-term relationship',
          title: 'relWanted',
        },
        {
          label: 'Marriage',
          key: 'marriage',
          title: 'relWanted',
        },
      ]}
    />
  );

  const whereTheyLive = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'Ayia Napa',
          key: 'ayia napa',
          title: 'location',
        },
        {
          label: 'Larnaca',
          key: 'larnaca',
          title: 'location',
        },
        {
          label: 'Limassol',
          key: 'limassol',
          title: 'location',
        },
        {
          label: 'Nicosia',
          key: 'nicosia',
          title: 'location',
        },
        {
          label: 'Paphos',
          key: 'paphos',
          title: 'location',
        },
      ]}
    />
  );

  const nativeLang = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'Arabic',
          key: 'arabic',
          title: 'language',
        },
        {
          label: 'Armenian',
          key: 'armenian',
          title: 'language',
        },
        {
          label: 'Bulgarian',
          key: 'bulgarian',
          title: 'language',
        },
        {
          label: 'Catalan',
          key: 'catalan',
          title: 'language',
        },
        {
          label: 'Chinese',
          key: 'chinese',
          title: 'language',
        },
        {
          label: 'Croatian',
          key: 'croatian',
          title: 'language',
        },
        {
          label: 'Czech',
          key: 'czech',
          title: 'language',
        },
        {
          label: 'Danish',
          key: 'danish',
          title: 'language',
        },
        {
          label: 'Dutch',
          key: 'dutch',
          title: 'language',
        },
        {
          label: 'English',
          key: 'english',
          title: 'language',
        },
        {
          label: 'Estonian',
          key: 'estonian',
          title: 'language',
        },
        {
          label: 'Finnish',
          key: 'finnish',
          title: 'language',
        },
        {
          label: 'French',
          key: 'french',
          title: 'language',
        },
        {
          label: 'German',
          key: 'german',
          title: 'language',
        },
        {
          label: 'Greek',
          key: 'greek',
          title: 'language',
        },
        {
          label: 'Hebrew',
          key: 'hebrew',
          title: 'language',
        },
        {
          label: 'Hindi',
          key: 'hindi',
          title: 'language',
        },
        {
          label: 'Hungarian',
          key: 'hungarian',
          title: 'language',
        },
        {
          label: 'Icelandic',
          key: 'icelandic',
          title: 'language',
        },
        {
          label: 'Italian',
          key: 'italian',
          title: 'language',
        },
        {
          label: 'Japanese',
          key: 'japanese',
          title: 'language',
        },
        {
          label: 'Korean',
          key: 'korean',
          title: 'language',
        },
        {
          label: 'Letton',
          key: 'letton',
          title: 'language',
        },
        {
          label: 'Latvian',
          key: 'latvian',
          title: 'language',
        },
        {
          label: 'Lithuanian',
          key: 'lithuanian',
          title: 'language',
        },
        {
          label: 'Luxembourgian',
          key: 'luxembourgian',
          title: 'language',
        },
        {
          label: 'Moldovan',
          key: 'moldovan',
          title: 'language',
        },
        {
          label: 'Norwegian',
          key: 'norwegian',
          title: 'language',
        },
        {
          label: 'Polish',
          key: 'polish',
          title: 'language',
        },
        {
          label: 'Portuguese',
          key: 'portuguese',
          title: 'language',
        },
        {
          label: 'Romanian',
          key: 'romanian',
          title: 'language',
        },
        {
          label: 'Russian',
          key: 'russian',
          title: 'language',
        },
        {
          label: 'Serbian',
          key: 'serbian',
          title: 'language',
        },
        {
          label: 'Slovak',
          key: 'slovak',
          title: 'language',
        },
        {
          label: 'Slovenian',
          key: 'slovenian',
          title: 'language',
        },
        {
          label: 'Spanish',
          key: 'spanish',
          title: 'language',
        },
        {
          label: 'Swedish',
          key: 'swedish',
          title: 'language',
        },
        {
          label: 'Ukrainian',
          key: 'ukrainian',
          title: 'language',
        },
        {
          label: 'Welsh',
          key: 'welsh',
          title: 'language',
        },
        {
          label: 'Yiddish',
          key: 'yiddish',
          title: 'language',
        },
        {
          label: 'Other',
          key: 'other',
          title: 'language',
        },
      ]}
    />
  );

  const whereTheyAreFrom = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'American',
          key: 'american',
          title: 'nationality',
        },
        {
          label: 'Argentinian',
          key: 'argentinian',
          title: 'nationality',
        },
        {
          label: 'Armenian',
          key: 'armenian',
          title: 'nationality',
        },
        {
          label: 'Australian',
          key: 'australian',
          title: 'nationality',
        },
        {
          label: 'Austrian',
          key: 'austrian',
          title: 'nationality',
        },
        {
          label: 'Belgian',
          key: 'belgian',
          title: 'nationality',
        },
        {
          label: 'Brazilian',
          key: 'brazilian',
          title: 'nationality',
        },
        {
          label: 'Bulgarian',
          key: 'bulgarian',
          title: 'nationality',
        },
        {
          label: 'Canadian',
          key: 'canadian',
          title: 'nationality',
        },
        {
          label: 'Colombian',
          key: 'colombian',
          title: 'nationality',
        },
        {
          label: 'Croatian',
          key: 'croatian',
          title: 'nationality',
        },
        {
          label: 'Cuban',
          key: 'cuban',
          title: 'nationality',
        },
        {
          label: 'Cypriot',
          key: 'cypriot',
          title: 'nationality',
        },
        {
          label: 'Czech',
          key: 'czech',
          title: 'nationality',
        },
        {
          label: 'Danish',
          key: 'danish',
          title: 'nationality',
        },
        {
          label: 'Dutch',
          key: 'dutch',
          title: 'nationality',
        },
        {
          label: 'East Asian',
          key: 'east asian',
          title: 'nationality',
        },
        {
          label: 'English',
          key: 'english',
          title: 'nationality',
        },
        {
          label: 'Estonian',
          key: 'estonian',
          title: 'nationality',
        },
        {
          label: 'Finnish',
          key: 'finnish',
          title: 'nationality',
        },
        {
          label: 'French',
          key: 'french',
          title: 'nationality',
        },
        {
          label: 'Georgian',
          key: 'georgian',
          title: 'nationality',
        },
        {
          label: 'German',
          key: 'german',
          title: 'nationality',
        },
        {
          label: 'Greek',
          key: 'greek',
          title: 'nationality',
        },
        {
          label: 'Hungarian',
          key: 'hungarian',
          title: 'nationality',
        },
        {
          label: 'Icelandic',
          key: 'icelandic',
          title: 'nationality',
        },
        {
          label: 'Irish',
          key: 'irish',
          title: 'nationality',
        },
        {
          label: 'Israeli',
          key: 'israeli',
          title: 'nationality',
        },
        {
          label: 'Italian',
          key: 'italian',
          title: 'nationality',
        },
        {
          label: 'Japanese',
          key: 'japanese',
          title: 'nationality',
        },
        {
          label: 'Kazakh',
          key: 'kazakh',
          title: 'nationality',
        },
        {
          label: 'Kirghizian',
          key: 'kirghizian',
          title: 'nationality',
        },
        {
          label: 'Latvian',
          key: 'latvian',
          title: 'nationality',
        },
        {
          label: 'Lebanese',
          key: 'lebanese',
          title: 'nationality',
        },
        {
          label: 'Liechtensteiner',
          key: 'liechtensteiner',
          title: 'nationality',
        },
        {
          label: 'Lithuanian',
          key: 'lithuanian',
          title: 'nationality',
        },
        {
          label: 'Luxembourger',
          key: 'luxembourger',
          title: 'nationality',
        },
        {
          label: 'Maltese',
          key: 'maltese',
          title: 'nationality',
        },
        {
          label: 'Mauritian',
          key: 'mauritian',
          title: 'nationality',
        },
        {
          label: 'Moldovan',
          key: 'moldovan',
          title: 'nationality',
        },
        {
          label: 'Monegasque',
          key: 'monegasque',
          title: 'nationality',
        },
        {
          label: 'New Zealander',
          key: 'new zealander',
          title: 'nationality',
        },
        {
          label: 'Norwegian',
          key: 'norwegian',
          title: 'nationality',
        },
        {
          label: 'Polish',
          key: 'polish',
          title: 'nationality',
        },
        {
          label: 'Portuguese',
          key: 'portuguese',
          title: 'nationality',
        },
        {
          label: 'Romanian',
          key: 'romanian',
          title: 'nationality',
        },
        {
          label: 'Russian',
          key: 'russian',
          title: 'nationality',
        },
        {
          label: 'Scottish',
          key: 'scottish',
          title: 'nationality',
        },
        {
          label: 'Serbian',
          key: 'serbian',
          title: 'nationality',
        },
        {
          label: 'Slovak',
          key: 'slovak',
          title: 'nationality',
        },
        {
          label: 'Slovenian',
          key: 'slovenian',
          title: 'nationality',
        },
        {
          label: 'South African',
          key: 'south african',
          title: 'nationality',
        },
        {
          label: 'South East Asian',
          key: 'south east asian',
          title: 'nationality',
        },
        {
          label: 'Spanish',
          key: 'spanish',
          title: 'nationality',
        },
        {
          label: 'Swedish',
          key: 'swedish',
          title: 'nationality',
        },
        {
          label: 'Tadzhik',
          key: 'tadzhik',
          title: 'nationality',
        },
        {
          label: 'Ukrainian',
          key: 'ukrainian',
          title: 'nationality',
        },
        {
          label: 'Welsh',
          key: 'welsh',
          title: 'nationality',
        },
        {
          label: 'Other',
          key: 'other',
          title: 'nationality',
        },
      ]}
    />
  );

  const theirEthnicity = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'Asian',
          key: 'asian',
          title: 'ethnicity',
        },
        {
          label: 'Black',
          key: 'black',
          title: 'ethnicity',
        },
        {
          label: 'Hispanic / Latin',
          key: 'hispanic',
          title: 'ethnicity',
        },
        {
          label: 'Indian',
          key: 'indian',
          title: 'ethnicity',
        },
        {
          label: 'Mediterranean',
          key: 'mediterranean',
          title: 'ethnicity',
        },
        {
          label: 'Middle Eastern',
          key: 'middle eastern',
          title: 'ethnicity',
        },
        {
          label: 'White',
          key: 'white',
          title: 'ethnicity',
        },
        {
          label: 'Other',
          key: 'Other',
          title: 'ethnicity',
        },
      ]}
    />
  );

  const theirMaritalStatus = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'Divorced',
          key: 'divorced',
          title: 'maritalStatus',
        },
        {
          label: 'Married',
          key: 'married',
          title: 'maritalStatus',
        },
        {
          label: 'Never married',
          key: 'never married',
          title: 'maritalStatus',
        },
        {
          label: 'Separated',
          key: 'separated',
          title: 'maritalStatus',
        },
        {
          label: 'Widowed',
          key: 'widowed',
          title: 'maritalStatus',
        },
      ]}
    />
  );

  const theirHeight = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: '4\'11" / 150 cm',
          key: '4-11',
          title: 'height',
        },
        {
          label: '5\'0" / 153 cm',
          key: '5-0',
          title: 'height',
        },
        {
          label: '5\'1" / 154 cm',
          key: '5-1',
          title: 'height',
        },
        {
          label: '5\'2" / 157 cm',
          key: '5-2',
          title: 'height',
        },
        {
          label: '5\'3" / 159 cm',
          key: '5-3',
          title: 'height',
        },
        {
          label: '5\'4" / 162 cm',
          key: '5-4',
          title: 'height',
        },
        {
          label: '5\'5" / 164 cm',
          key: '5-5',
          title: 'height',
        },
        {
          label: '5\'6" / 167 cm',
          key: '5-6',
          title: 'height',
        },
        {
          label: '5\'7" / 169 cm',
          key: '5-7',
          title: 'height',
        },
        {
          label: '5\'8" / 172 cm',
          key: '5-8',
          title: 'height',
        },
        {
          label: '5\'9" / 175 cm',
          key: '5-9',
          title: 'height',
        },
        {
          label: '5\'10" / 177 cm',
          key: '5-10',
          title: 'height',
        },
        {
          label: '5\'11" / 180 cm',
          key: '5-11',
          title: 'height',
        },
        {
          label: '6\'0" / 183 cm',
          key: '6-0',
          title: 'height',
        },
        {
          label: '6\'1" / 185 cm',
          key: '6-1',
          title: 'height',
        },
        {
          label: '6\'2" / 187 cm',
          key: '6-2',
          title: 'height',
        },
        {
          label: '6\'3" / 190 cm',
          key: '6-3',
          title: 'height',
        },
        {
          label: '6\'4" / 192 cm',
          key: '6-4',
          title: 'height',
        },
        {
          label: '6\'5" / 195 cm',
          key: '6-5',
          title: 'height',
        },
        {
          label: '6\'6" / 197 cm',
          key: '6-6',
          title: 'height',
        },
        {
          label: '6\'7" / 200 cm',
          key: '6-7',
          title: 'height',
        },
      ]}
    />
  );

  const theirBuild = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'Athletic',
          key: 'athletic',
          title: 'build',
        },
        {
          label: 'Average',
          key: 'average',
          title: 'build',
        },
        {
          label: 'Extra Large',
          key: 'extra large',
          title: 'build',
        },
        {
          label: 'Large',
          key: 'large',
          title: 'build',
        },
        {
          label: 'Skinny',
          key: 'skinny',
          title: 'build',
        },
        {
          label: 'Slim',
          key: 'slim',
          title: 'build',
        },
      ]}
    />
  );

  const theirEyeColor = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'Blue',
          key: 'blue',
          title: 'eyeColor',
        },
        {
          label: 'Brown',
          key: 'brown',
          title: 'eyeColor',
        },
        {
          label: 'Green',
          key: 'green',
          title: 'eyeColor',
        },
        {
          label: 'Hazel',
          key: 'hazel',
          title: 'eyeColor',
        },
      ]}
    />
  );

  const theirHairColor = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'Black',
          key: 'black',
          title: 'hairColor',
        },
        {
          label: 'Blonde',
          key: 'blonde',
          title: 'hairColor',
        },
        {
          label: 'Brown',
          key: 'brown',
          title: 'hairColor',
        },
        {
          label: 'Chestnut',
          key: 'chestnut',
          title: 'hairColor',
        },
        {
          label: 'Dyed',
          key: 'dyed',
          title: 'hairColor',
        },
        {
          label: 'Golden',
          key: 'golden',
          title: 'hairColor',
        },
        {
          label: 'Red',
          key: 'red',
          title: 'hairColor',
        },
        {
          label: 'White',
          key: 'white',
          title: 'hairColor',
        },
      ]}
    />
  );

  const theirHairLength = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'Bald',
          key: 'bald',
          title: 'hairLength',
        },
        {
          label: 'Short',
          key: 'short',
          title: 'hairLength',
        },
        {
          label: 'Medium',
          key: 'medium',
          title: 'hairLength',
        },
        {
          label: 'Long',
          key: 'long',
          title: 'hairLength',
        },
      ]}
    />
  );

  const theirHairStyle = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'Curvy',
          key: 'curvy',
          title: 'hairStyle',
        },
        {
          label: 'Straight',
          key: 'straight',
          title: 'hairStyle',
        },
        {
          label: 'Wavy',
          key: 'wavy',
          title: 'hairStyle',
        },
      ]}
    />
  );

  const theirFeetType = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'Egyptian',
          key: 'egyptian',
          title: 'feetType',
        },
        {
          label: 'Greek',
          key: 'greek',
          title: 'feetType',
        },
        {
          label: 'Roman',
          key: 'roman',
          title: 'feetType',
        },
      ]}
    />
  );

  const doTheyDrink = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'Never',
          key: 'never',
          title: 'drinks',
        },
        {
          label: 'Often',
          key: 'often',
          title: 'drinks',
        },
        {
          label: 'Sometimes',
          key: 'sometimes',
          title: 'drinks',
        },
      ]}
    />
  );

  const doTheySmoke = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'Never',
          key: 'never',
          title: 'smokes',
        },
        {
          label: 'Often',
          key: 'often',
          title: 'smokes',
        },
        {
          label: 'Sometimes',
          key: 'sometimes',
          title: 'smokes',
        },
      ]}
    />
  );

  const theirEducation = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'High school',
          key: 'high school',
          title: 'education',
        },
        {
          label: 'Vocational school',
          key: 'vocational',
          title: 'education',
        },
        {
          label: 'Foundation degree',
          key: 'foundation',
          title: 'education',
        },
        {
          label: "Bachelor's degree",
          key: 'bachelors',
          title: 'education',
        },
        {
          label: 'Masters degree',
          key: 'masters',
          title: 'education',
        },
        {
          label: 'Doctoral degree',
          key: 'doctoral',
          title: 'education',
        },
      ]}
    />
  );

  const theirPolitics = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'Anarchism',
          key: 'anarchism',
          title: 'politics',
        },
        {
          label: 'Panarchism',
          key: 'panarchism',
          title: 'politics',
        },
        {
          label: 'Far left',
          key: 'far left',
          title: 'politics',
        },
        {
          label: 'Left wing',
          key: 'left wing',
          title: 'politics',
        },
        {
          label: 'Center',
          key: 'center',
          title: 'politics',
        },
        {
          label: 'Right wing',
          key: 'right wing',
          title: 'politics',
        },
        {
          label: 'Far right',
          key: 'far right',
          title: 'politics',
        },
      ]}
    />
  );

  const theirReligion = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'Agnostic',
          key: 'agnostic',
          title: 'religion',
        },
        {
          label: 'Atheist',
          key: 'atheist',
          title: 'religion',
        },
        {
          label: 'Buddhist',
          key: 'buddhist',
          title: 'religion',
        },
        {
          label: 'Catholic',
          key: 'catholic',
          title: 'religion',
        },
        {
          label: 'Christian',
          key: 'christian',
          title: 'religion',
        },
        {
          label: 'Deist',
          key: 'deist',
          title: 'religion',
        },
        {
          label: 'Jewish',
          key: 'jewish',
          title: 'religion',
        },
        {
          label: 'Orthodox',
          key: 'orthodox',
          title: 'religion',
        },
        {
          label: 'Pagan',
          key: 'pagan',
          title: 'religion',
        },
        {
          label: 'Protestant',
          key: 'protestant',
          title: 'religion',
        },
        {
          label: 'Spiritual (not religious)',
          key: 'spiritual',
          title: 'religion',
        },
        {
          label: 'Other',
          key: 'other',
          title: 'religion',
        },
      ]}
    />
  );

  const theirFoods = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'Everything',
          key: 'everything',
          title: 'foods',
        },
        {
          label: 'Kosher',
          key: 'kosher',
          title: 'foods',
        },
        {
          label: 'Macrobiotic',
          key: 'macrobiotic',
          title: 'foods',
        },
        {
          label: 'Organic',
          key: 'organic',
          title: 'foods',
        },
        {
          label: 'Vegan',
          key: 'vegan',
          title: 'foods',
        },
        {
          label: 'Vegetarian',
          key: 'vegetarian',
          title: 'foods',
        },
      ]}
    />
  );

  const whoTheyLiveWith = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'Alone',
          key: 'alone',
          title: 'livesWith',
        },
        {
          label: 'Children',
          key: 'children',
          title: 'livesWith',
        },
        {
          label: 'Flatmates',
          key: 'flatmates',
          title: 'livesWith',
        },
        {
          label: 'Parents',
          key: 'parents',
          title: 'livesWith',
        },
        {
          label: 'Partner',
          key: 'partner',
          title: 'livesWith',
        },
      ]}
    />
  );

  const willRelocate = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'No',
          key: 'no',
          title: 'relocate',
        },
        {
          label: 'Yes, even abroad',
          key: 'abroad',
          title: 'relocate',
        },
        {
          label: 'Yes, in the same country',
          key: 'country',
          title: 'relocate',
        },
        {
          label: 'Yes, in the same region',
          key: 'region',
          title: 'relocate',
        },
        {
          label: 'Yes, in the same town',
          key: 'town',
          title: 'relocate',
        },
      ]}
    />
  );

  const likesInSex = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'Everything',
          key: 'everything',
          title: 'sexLikes',
        },
        {
          label: 'Nothing',
          key: 'nothing',
          title: 'sexLikes',
        },
        {
          label: 'Unusual things',
          key: 'unusual',
          title: 'sexLikes',
        },
        {
          label: 'Usual things',
          key: 'usual',
          title: 'sexLikes',
        },
      ]}
    />
  );

  const freqOfSex = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          label: 'Daily',
          key: 'daily',
          title: 'sexFrequency',
        },
        {
          label: 'Never',
          key: 'never',
          title: 'sexFrequency',
        },
        {
          label: 'Often',
          key: 'often',
          title: 'sexFrequency',
        },
        {
          label: 'Rarely',
          key: 'rarely',
          title: 'sexFrequency',
        },
        {
          label: 'Sometimes',
          key: 'sometimes',
          title: 'sexFrequency',
        },
      ]}
    />
  );

  const resetSearch = () => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setParams([]);
    setAgeRange([0, 0]);
    setIncomeRange([0, 0]);
    setAgeOfPartner('');
    setRelWanted('');
    setLocation('');
    setLanguage('');
    setNationality('');
    setEthnicity('');
    setMaritalStatus('');
    setHeight('');
    setBuild('');
    setEyeColor('');
    setHairColor('');
    setHairLength('');
    setHairStyle('');
    setFeetType('');
    setDrinks('');
    setSmokes('');
    setEducation('');
    setPolitics('');
    setReligion('');
    setFoods('');
    setLivesWith('');
    setRelocate('');
    setSexLikes('');
    setSexFrequency('');
    setInputValues({
      numOfChildren: '',
      occupation: '',
      pets: '',
      loves: '',
      hates: '',
      interests: '',
      music: '',
      books: '',
      films: '',
      hobbies: '',
      sports: '',
      traits: '',
      treatself: '',
    });
    document
      .querySelectorAll('label.ant-radio-wrapper-checked')
      .forEach((label) => {
        label.classList.remove('ant-radio-wrapper-checked');
      });
    document.querySelectorAll('span.ant-radio-checked').forEach((span) => {
      span.classList.remove('ant-radio-checked');
    });
    loadAllUsers();
  };

  const searchMembers = () => {
    setLoadingSearch(true);
    const unique = Object.values(
      params.reduce((a, item) => {
        a[item.field] = item;
        return a;
      }, {})
    );
    fetchUsers(unique);
    setLoadingSearch(false);
  };

  const saveSearch = async () => {
    setLoadingSave(true);
    const unique = Object.values(
      params.reduce((a, item) => {
        a[item.field] = item;
        return a;
      }, {})
    );
    await axios
      .post(
        `${process.env.REACT_APP_API}/save-search`,
        { searchName, unique },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setLoadingSave(false);
        toast.success(`${searchName} saved successfully.`, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        setLoadingSave(false);
        console.log(err);
      });
  };

  const {
    numOfChildren,
    occupation,
    pets,
    loves,
    hates,
    interests,
    music,
    books,
    films,
    hobbies,
    sports,
    traits,
    treatself,
  } = inputValues;

  return (
    <div className='container search-container'>
      <div className='left-sidebar search'>
        <div className='shortcut-links'>
          <div className='advanced-filter-btns'>
            <div className='tooltip'>
              <FontAwesomeIcon
                icon={faClock}
                className='fa'
                onClick={sortLastLoggedIn}
              />
              <span className='tooltip-text'>Last logged in</span>
            </div>
            <div className='tooltip'>
              <FontAwesomeIcon
                icon={faTimeline}
                className='fa'
                onClick={sortLastSignedUp}
              />
              <span className='tooltip-text'>Last signed up</span>
            </div>
            <div className='tooltip'>
              <FontAwesomeIcon
                icon={faStar}
                className='fa'
                onClick={sortPopularity}
              />
              <span className='tooltip-text'>Most popular</span>
            </div>
          </div>
          <form onSubmit={handleSearch}>
            <div className='search-box'>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                onClick={handleSearch}
              />
              <input
                type='search'
                placeholder='Search Members'
                onChange={handleChange}
                value={text}
              />
            </div>
            <input type='submit' hidden />
          </form>
          <Menu mode='inline' defaultOpenKeys={['1', '2', '3']}>
            <SubMenu key='1' title={<span>I am looking for a</span>}>
              <Radio.Group onChange={handleRadio} name='gender'>
                <Radio value='male'>Male</Radio>
                <Radio value='female'>Female</Radio>
              </Radio.Group>
              <p className='slider-p'>Aged between</p>
              <Slider
                tipFormatter={(v) => v}
                range
                value={ageRange}
                onChange={handleAgeSlider}
                min={18}
                max={100}
              />
            </SubMenu>
            <SubMenu key='2' title={<span>Who is looking for a</span>}>
              <Radio.Group onChange={handleRadio} name='genderWanted'>
                <Radio value='male'>Male</Radio>
                <Radio value='female'>Female</Radio>
              </Radio.Group>
            </SubMenu>
            <SubMenu
              key='3'
              title={<span>With the following characteristics</span>}
            >
              <Dropdown overlay={ageTheyWant}>
                <a className='ageTheyWant' onClick={(e) => e.preventDefault()}>
                  {ageOfPartner || 'Age they want'}
                </a>
              </Dropdown>
              <Dropdown overlay={relTheyWant}>
                <a onClick={(e) => e.preventDefault()}>
                  {relWanted || 'Type of relationship they want'}
                </a>
              </Dropdown>
              <Dropdown overlay={whereTheyLive}>
                <a onClick={(e) => e.preventDefault()}>
                  {location || 'Where they live'}
                </a>
              </Dropdown>
              <Dropdown overlay={nativeLang}>
                <a onClick={(e) => e.preventDefault()}>
                  {language || 'Their native language'}
                </a>
              </Dropdown>
              <Dropdown overlay={whereTheyAreFrom}>
                <a onClick={(e) => e.preventDefault()}>
                  {nationality || 'Their nationality'}
                </a>
              </Dropdown>
              <Dropdown overlay={theirEthnicity}>
                <a onClick={(e) => e.preventDefault()}>
                  {ethnicity || 'Their ethnicity'}
                </a>
              </Dropdown>
              <Dropdown overlay={theirMaritalStatus}>
                <a onClick={(e) => e.preventDefault()}>
                  {maritalStatus || 'Their marital status'}
                </a>
              </Dropdown>
              <Dropdown overlay={theirHeight}>
                <a onClick={(e) => e.preventDefault()}>
                  {height || 'Their height'}
                </a>
              </Dropdown>
              <Dropdown overlay={theirBuild}>
                <a onClick={(e) => e.preventDefault()}>
                  {build || 'Their build'}
                </a>
              </Dropdown>
              <Dropdown overlay={theirEyeColor}>
                <a onClick={(e) => e.preventDefault()}>
                  {eyeColor || 'Their eye colour'}
                </a>
              </Dropdown>
              <Dropdown overlay={theirHairColor}>
                <a onClick={(e) => e.preventDefault()}>
                  {hairColor || 'Their hair colour'}
                </a>
              </Dropdown>
              <Dropdown overlay={theirHairLength}>
                <a onClick={(e) => e.preventDefault()}>
                  {hairLength || 'Their hair length'}
                </a>
              </Dropdown>
              <Dropdown overlay={theirHairStyle}>
                <a onClick={(e) => e.preventDefault()}>
                  {hairStyle || 'Their hair style'}
                </a>
              </Dropdown>
              <Dropdown overlay={theirFeetType}>
                <a onClick={(e) => e.preventDefault()}>
                  {feetType || 'Their feet type'}
                </a>
              </Dropdown>
              <Dropdown overlay={doTheyDrink}>
                <a onClick={(e) => e.preventDefault()}>
                  {drinks || 'Do they drink'}
                </a>
              </Dropdown>
              <Dropdown overlay={doTheySmoke}>
                <a onClick={(e) => e.preventDefault()}>
                  {smokes || 'Do they smoke'}
                </a>
              </Dropdown>
              <Dropdown overlay={theirEducation}>
                <a onClick={(e) => e.preventDefault()}>
                  {education || 'Their level of education'}
                </a>
              </Dropdown>
              <Dropdown overlay={theirPolitics}>
                <a onClick={(e) => e.preventDefault()}>
                  {politics || 'Their view on politics'}
                </a>
              </Dropdown>
              <Dropdown overlay={theirReligion}>
                <a onClick={(e) => e.preventDefault()}>
                  {religion || 'Their religion'}
                </a>
              </Dropdown>
              <Dropdown overlay={theirFoods}>
                <a onClick={(e) => e.preventDefault()}>
                  {foods || 'Their taste in food'}
                </a>
              </Dropdown>
              <Dropdown overlay={whoTheyLiveWith}>
                <a onClick={(e) => e.preventDefault()}>
                  {livesWith || 'Who they live with'}
                </a>
              </Dropdown>
              <Dropdown overlay={willRelocate}>
                <a onClick={(e) => e.preventDefault()}>
                  {relocate || 'Willing to relocate?'}
                </a>
              </Dropdown>
              <Dropdown overlay={likesInSex}>
                <a onClick={(e) => e.preventDefault()}>
                  {sexLikes || 'What they like in sex'}
                </a>
              </Dropdown>
              <Dropdown overlay={freqOfSex}>
                <a onClick={(e) => e.preventDefault()}>
                  {sexFrequency || 'How often they like sex'}
                </a>
              </Dropdown>
              <Input
                onChange={handleInputChange}
                placeholder='Number of children'
                maxLength={25}
                name='numOfChildren'
                value={numOfChildren}
              />
              <Input
                onChange={handleInputChange}
                placeholder='Their occupation'
                maxLength={25}
                name='occupation'
                value={occupation}
              />
              <Input
                onChange={handleInputChange}
                placeholder='Their pets'
                maxLength={50}
                name='pets'
                value={pets}
              />
              <p className='csv'>Please separate each pet with a comma</p>
              <Input
                onChange={handleInputChange}
                placeholder='Things they love'
                maxLength={50}
                name='loves'
                value={loves}
              />
              <p className='csv'>Please separate each item with a comma</p>
              <Input
                onChange={handleInputChange}
                placeholder='Things they hate'
                maxLength={50}
                name='hates'
                value={hates}
              />
              <p className='csv'>Please separate each item with a comma</p>
              <Input
                onChange={handleInputChange}
                placeholder='Their interests'
                maxLength={50}
                name='interests'
                value={interests}
              />
              <p className='csv'>Please separate each interest with a comma</p>
              <Input
                onChange={handleInputChange}
                placeholder='Their favourite musical genres'
                maxLength={50}
                name='music'
                value={music}
              />
              <p className='csv'>Please separate each genre with a comma</p>
              <Input
                onChange={handleInputChange}
                placeholder='Their favourite books'
                maxLength={50}
                name='books'
                value={books}
              />
              <p className='csv'>Please separate each book with a comma</p>
              <Input
                onChange={handleInputChange}
                placeholder='Their favourite films'
                maxLength={50}
                name='films'
                value={films}
              />
              <p className='csv'>Please separate each film with a comma</p>
              <Input
                onChange={handleInputChange}
                placeholder='Their hobbies'
                maxLength={50}
                name='hobbies'
                value={hobbies}
              />
              <p className='csv'>Please separate each hobby with a comma</p>
              <Input
                onChange={handleInputChange}
                placeholder='Their favourite sports'
                maxLength={50}
                name='sports'
                value={sports}
              />
              <p className='csv'>Please separate each sport with a comma</p>
              <Input
                onChange={handleInputChange}
                placeholder='Their best character traits'
                maxLength={50}
                name='traits'
                value={traits}
              />
              <p className='csv'>Please separate each trait with a comma</p>
              <Input
                onChange={handleInputChange}
                placeholder='Ways they treat themself'
                maxLength={50}
                name='treatself'
                value={treatself}
              />
              <p className='csv'>Please separate each way with a comma</p>
              <p className='slider-p'>Their annual income</p>
              <Slider
                tipFormatter={(v) => v}
                range
                value={incomeRange}
                onChange={handleIncomeSlider}
                min={500}
                max={1000000}
              />
              <p>Their role in life</p>
              <Radio.Group onChange={handleRadio} name='roleInLife'>
                <Radio value='career'>Focusing on career</Radio>
                <Radio value='children'>Taking care of children</Radio>
                <Radio value='partner'>Taking care of partner</Radio>
                <Radio value='parents'>Taking care of parents</Radio>
              </Radio.Group>
              <p>Responsible for children's education</p>
              <Radio.Group onChange={handleRadio} name='managesEdu'>
                <Radio value='nanny'>A nanny</Radio>
                <Radio value='tutor'>A private tutor</Radio>
                <Radio value='father'>The father</Radio>
                <Radio value='mother'>The mother</Radio>
                <Radio value='parents'>Both parents</Radio>
                <Radio value='school'>The school</Radio>
              </Radio.Group>
            </SubMenu>
          </Menu>
          {user.role === 'main-admin' ? (
            <div className='form-box search'>
              <div className='button-box'>
                <p className='form-header'>Save Search</p>
              </div>
              <form>
                <input
                  type='text'
                  className='input-field search-name'
                  placeholder='Give this search a name'
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
                <button
                  onClick={saveSearch}
                  type='submit'
                  className='submit-btn'
                  disabled={loadingSave || !searchName || !params}
                >
                  {loadingSave ? (
                    <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                  ) : (
                    <FontAwesomeIcon icon={faFloppyDisk} className='fa' />
                  )}
                  Save
                </button>
              </form>
            </div>
          ) : (
            user.role === 'secondary-admin' && (
              <div className='form-box search'>
                <div className='button-box'>
                  <p className='form-header'>Save Search</p>
                </div>
                <form>
                  <input
                    type='text'
                    className='input-field'
                    placeholder='Give this search a name'
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                  <button
                    onClick={saveSearch}
                    type='submit'
                    className='submit-btn'
                    disabled={loadingSave || !searchName || !params}
                  >
                    {loadingSave ? (
                      <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                    ) : (
                      <FontAwesomeIcon icon={faFloppyDisk} className='fa' />
                    )}
                    Save
                  </button>
                </form>
              </div>
            )
          )}
          <button
            onClick={resetSearch}
            type='submit'
            className='submit-btn reset'
            disabled={loadingSearch}
          >
            Reset
          </button>
          <button
            onClick={searchMembers}
            type='submit'
            className='submit-btn'
            disabled={loadingSearch}
          >
            {loadingSearch ? (
              <FontAwesomeIcon icon={faSpinner} className='fa' spin />
            ) : (
              <FontAwesomeIcon icon={faMagnifyingGlass} className='fa' />
            )}
            Search
          </button>
        </div>
      </div>
      <div className='admin-main-content'>
        <div className='mobile-search'>
          <form onSubmit={handleSearch}>
            <div className='search-box'>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                onClick={handleSearch}
              />
              <input
                type='search'
                placeholder='Search Members'
                onChange={handleChange}
                value={text}
              />
            </div>
            <input type='submit' hidden />
          </form>
          <button
            onClick={() => setUserSearchModalIsOpen(!userSearchModalIsOpen)}
            type='button'
            className='submit-btn mobile-search-btn'
            disabled={loadingSearch}
          >
            {loadingSearch ? (
              <FontAwesomeIcon icon={faSpinner} className='fa' spin />
            ) : (
              <FontAwesomeIcon icon={faFilter} className='fa' />
            )}
            Filter
          </button>
        </div>
        <div className='advanced-filter-btns-mobile'>
          <div className='tooltip'>
            <FontAwesomeIcon
              icon={faClock}
              className='fa'
              onClick={sortLastLoggedIn}
            />
            <span className='tooltip-text'>Last logged in</span>
          </div>
          <div className='tooltip'>
            <FontAwesomeIcon
              icon={faTimeline}
              className='fa'
              onClick={sortLastSignedUp}
            />
            <span className='tooltip-text'>Last signed up</span>
          </div>
          <div className='tooltip'>
            <FontAwesomeIcon
              icon={faStar}
              className='fa'
              onClick={sortPopularity}
            />
            <span className='tooltip-text'>Most popular</span>
          </div>
        </div>
        {users && users.length > 0 && (
          <Pagination
            current={page}
            total={Math.round((users.length / 48) * 10)}
            onChange={(value) => setPage(value)}
            className='antd-pagination'
            showSizeChanger={false}
            style={{ marginBottom: '20px' }}
          />
        )}
        <div className='product-cards'>
          {loading ? (
            <div className='spinner'>
              <FontAwesomeIcon icon={faSpinner} className='fa' spin />
            </div>
          ) : (
            <>
              {users.length < 1 && (
                <h1 className='center'>No members match your current search</h1>
              )}
              {users &&
                users.map((u) => (
                  <div className='product-card' key={u._id}>
                    <UserInfo u={u} />
                  </div>
                ))}
            </>
          )}
        </div>
        {!loading && (
          <Pagination
            current={page}
            total={Math.round((users.length / 48) * 10)}
            onChange={(value) => setPage(value)}
            className='antd-pagination'
            showSizeChanger={false}
            style={{ marginTop: '20px' }}
          />
        )}

        <UserSearchMobile
          userSearchModalIsOpen={userSearchModalIsOpen}
          setUserSearchModalIsOpen={setUserSearchModalIsOpen}
          users={users}
          setUsers={setUsers}
        />
      </div>
    </div>
  );
};

export default UserSearch;
