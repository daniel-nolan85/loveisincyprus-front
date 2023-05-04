import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LeftSidebar from '../../components/admin/LeftSidebar';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowsRotate,
  faCheck,
  faMagnifyingGlass,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import LargeDataImage from '../../components/modals/LargeDataImage';
import ProfileProgress from '../../components/modals/ProfileProgress';
import PointsData from '../../components/modals/PointsData';
import FollowingData from '../../components/modals/FollowingData';
import FollowersData from '../../components/modals/FollowersData';
import VisitorsData from '../../components/modals/VisitorsData';
import ReportsData from '../../components/modals/ReportsData';
import ReportedData from '../../components/modals/ReportedData';
import MessagesData from '../../components/modals/MessagesData';
import ItemsData from '../../components/modals/ItemsData';
import ItemsValueData from '../../components/modals/ItemsValueData';
import GCSentData from '../../components/modals/GCSentData';
import GCSentValueData from '../../components/modals/GCSentValueData';
import GCReceivedData from '../../components/modals/GCReceivedData';
import GCReceivedValueData from '../../components/modals/GCReceivedValueData';
import { Link } from 'react-router-dom';

const Data = ({ history }) => {
  const [byPage, setByPage] = useState(50);
  const [filteredBy, setFilteredBy] = useState('');
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [loading50, setLoading50] = useState(false);
  const [loading100, setLoading100] = useState(false);
  const [loading500, setLoading500] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);
  const [loadingReverse, setLoadingReverse] = useState(false);
  const [loadingUsername, setLoadingUsername] = useState(false);
  const [loadingName, setLoadingName] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGender, setLoadingGender] = useState(false);
  const [loadingAge, setLoadingAge] = useState(false);
  const [loadingRegistered, setLoadingRegistered] = useState(false);
  const [loadingLastLogin, setLoadingLastLogin] = useState(false);
  const [loadingIPAddress, setLoadingIPAddress] = useState(false);
  const [loadingMobile, setLoadingMobile] = useState(false);
  const [loadingPaidOrUnpaid, setLoadingPaidOrUnpaid] = useState(false);
  const [loadingOneMonthMember, setLoadingOneMonthMember] = useState(false);
  const [loadingSixMonthMember, setLoadingSixMonthMember] = useState(false);
  const [loadingTwelveMonthMember, setLoadingTwelveMonthMember] =
    useState(false);
  const [loadingVerified, setLoadingVerified] = useState(false);
  const [loadingProfileImages, setLoadingProfileImages] = useState(false);
  const [loadingProfileCompletion, setLoadingProfileCompletion] =
    useState(false);
  const [loadingPoints, setLoadingPoints] = useState(false);
  const [loadingFeatured, setLoadingFeatured] = useState(false);
  const [loadingFollowing, setLoadingFollowing] = useState(false);
  const [loadingFollowers, setLoadingFollowers] = useState(false);
  const [loadingVisitors, setLoadingVisitors] = useState(false);
  const [loadingReports, setLoadingReports] = useState(false);
  const [loadingReported, setLoadingReported] = useState(false);
  const [loadingMessagesSent, setLoadingMessagesSent] = useState(false);
  const [loadingMessagesReceived, setLoadingMessagesReceived] = useState(false);
  const [loadingItemsOrdered, setLoadingItemsOrdered] = useState(false);
  const [loadingItemsOrderedValue, setLoadingItemsOrderedValue] =
    useState(false);
  const [loadingGCSent, setLoadingGCSent] = useState(false);
  const [loadingGCSentValue, setLoadingGCSentValue] = useState(false);
  const [loadingGCReceived, setLoadingGCReceived] = useState(false);
  const [loadingGCReceivedValue, setLoadingGCReceivedValue] = useState(false);
  const [loadingTshirts, setLoadingTshirts] = useState(false);
  const [loadingSprays, setLoadingSprays] = useState(false);
  const [loadingDroppers, setLoadingDroppers] = useState(false);
  const [loadingPerfumes, setLoadingPerfumes] = useState(false);
  const [currentUsername, setCurrentUsername] = useState('');
  const [profileImageModalIsOpen, setProfileImageModalIsOpen] = useState(false);
  const [progressModalIsOpen, setProgressModalIsOpen] = useState(false);
  const [pointsDataModalIsOpen, setPointsDataModalIsOpen] = useState(false);
  const [followingDataModalIsOpen, setFollowingDataModalIsOpen] =
    useState(false);
  const [followersDataModalIsOpen, setFollowersDataModalIsOpen] =
    useState(false);
  const [visitorsDataModalIsOpen, setVisitorsDataModalIsOpen] = useState(false);
  const [reportsDataModalIsOpen, setReportsDataModalIsOpen] = useState(false);
  const [reportedDataModalIsOpen, setReportedDataModalIsOpen] = useState(false);
  const [messagesDataModalIsOpen, setMessagesDataModalIsOpen] = useState(false);
  const [itemsDataModalIsOpen, setItemsDataModalIsOpen] = useState(false);
  const [itemsValueDataModalIsOpen, setItemsValueDataModalIsOpen] =
    useState(false);
  const [gCSentDataModalIsOpen, setGCSentDataModalIsOpen] = useState(false);
  const [gCSentValueDataModalIsOpen, setGCSentValueDataModalIsOpen] =
    useState(false);
  const [gCReceivedDataModalIsOpen, setGCReceivedDataModalIsOpen] =
    useState(false);
  const [gCReceivedValueDataModalIsOpen, setGCReceivedValueDataModalIsOpen] =
    useState(false);
  const [profileImages, setProfileImages] = useState([]);
  const [progress, setProgress] = useState({});
  const [pointsData, setPointsData] = useState({});
  const [followingData, setFollowingData] = useState({});
  const [followersData, setFollowersData] = useState({});
  const [visitorsData, setVisitorsData] = useState({});
  const [reportsData, setReportsData] = useState({});
  const [reportedData, setReportedData] = useState({});
  const [messagesData, setMessagesData] = useState({});
  const [messagesType, setMessagesType] = useState('');
  const [itemsData, setItemsData] = useState([]);
  const [itemsOrderedData, setItemsOrderedData] = useState(0);
  const [itemsValueData, setItemsValueData] = useState([]);
  const [itemsOrderedValueData, setItemsOrderedValueData] = useState(0);
  const [gCSentData, setGCSentData] = useState({});
  const [gCSentValueData, setGCSentValueData] = useState({});
  const [gCReceivedData, setGCReceivedData] = useState({});
  const [gCReceivedValueData, setGCReceivedValueData] = useState({});

  const { token, role } = useSelector((state) => state.user);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value.toLowerCase());
  };

  const searched = (query) => (c) =>
    c.username.toLowerCase().includes(query) ||
    c.name.toLowerCase().includes(query) ||
    c.email.toLowerCase().includes(query) ||
    c.ipAddresses.some((ip) => ip.includes(query));

  useEffect(() => {
    if (role !== 'main-admin') {
      history.push('/admin/dashboard');
    }
  }, []);

  useEffect(() => {
    fetchUsersData();
  }, [byPage]);

  useEffect(() => {
    if (loadingReverse) {
      const reverseUsers = [...users].reverse();
      setUsers(reverseUsers);
      setLoadingReverse(false);
    }
  }, [loadingReverse]);

  useEffect(() => {
    if (loadingUsername) {
      const sortedUsers = [...users].sort((a, b) =>
        a.username.localeCompare(b.username)
      );
      setUsers(sortedUsers);
      setFilteredBy('username');
      setLoadingUsername(false);
    }
  }, [loadingUsername]);

  useEffect(() => {
    if (loadingName) {
      const sortedUsers = [...users].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setUsers(sortedUsers);
      setFilteredBy('name');
      setLoadingName(false);
    }
  }, [loadingName]);

  useEffect(() => {
    if (loadingEmail) {
      const sortedUsers = [...users].sort((a, b) =>
        a.email.localeCompare(b.email)
      );
      setUsers(sortedUsers);
      setFilteredBy('email');
      setLoadingEmail(false);
    }
  }, [loadingEmail]);

  useEffect(() => {
    if (loadingGender) {
      const sortedUsers = [...users].sort((a, b) => {
        if (a.gender < b.gender) return -1;
        if (a.gender > b.gender) return 1;
        return 0;
      });
      setUsers(sortedUsers);
      setFilteredBy('gender');
      setLoadingGender(false);
    }
  }, [loadingGender]);

  useEffect(() => {
    if (loadingAge) {
      const sortedUsers = [...users].sort((a, b) => {
        const ageA = a.age || Number.MAX_VALUE;
        const ageB = b.age || Number.MAX_VALUE;
        if (ageA < ageB) return -1;
        if (ageA > ageB) return 1;
        return 0;
      });
      setUsers(sortedUsers);
      setFilteredBy('age');
      setLoadingAge(false);
    }
  }, [loadingAge]);

  useEffect(() => {
    if (loadingRegistered) {
      const sortedUsers = [...users].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return 0;
      });
      setUsers(sortedUsers);
      setFilteredBy('registered');
      setLoadingRegistered(false);
    }
  }, [loadingRegistered]);

  useEffect(() => {
    if (loadingLastLogin) {
      const sortedUsers = [...users].sort((a, b) => {
        if (!a.lastLogin) {
          if (!a.createdAt) {
            return 1;
          } else {
            return new Date(a.createdAt) - new Date(b.lastLogin);
          }
        }
        if (!b.lastLogin) {
          if (!b.createdAt) {
            return -1;
          } else {
            return new Date(a.lastLogin) - new Date(b.createdAt);
          }
        }

        return new Date(a.lastLogin) - new Date(b.lastLogin);
      });
      setUsers(sortedUsers);
      setFilteredBy('lastLogin');
      setLoadingLastLogin(false);
    }
  }, [loadingLastLogin]);

  useEffect(() => {
    if (loadingIPAddress) {
      const sortedUsers = [...users].sort((a, b) => {
        const ipA =
          a.ipAddresses && a.ipAddresses.length > 0
            ? a.ipAddresses[0]
            : '999.999.999.999';
        const ipB =
          b.ipAddresses && b.ipAddresses.length > 0
            ? b.ipAddresses[0]
            : '999.999.999.999';

        const numA = ipA
          .split('.')
          .map(Number)
          .reduce((acc, val) => acc * 256 + val);
        const numB = ipB
          .split('.')
          .map(Number)
          .reduce((acc, val) => acc * 256 + val);

        return numA - numB;
      });
      setUsers(sortedUsers);
      setFilteredBy('ipAddress');
      setLoadingIPAddress(false);
    }
  }, [loadingIPAddress]);

  useEffect(() => {
    if (loadingMobile) {
      const sortedUsers = [...users].sort((a, b) => {
        const numA = parseInt(a.mobile.replace(/[^\d]/g, ''));
        const numB = parseInt(b.mobile.replace(/[^\d]/g, ''));

        return numA - numB;
      });
      setUsers(sortedUsers);
      setFilteredBy('mobile');
      setLoadingMobile(false);
    }
  }, [loadingMobile]);

  useEffect(() => {
    if (loadingPaidOrUnpaid) {
      const sortedUsers = [...users].sort((a, b) => {
        const paidA = a.membership.paid;
        const paidB = b.membership.paid;

        if (paidA && !paidB) {
          return -1;
        } else if (!paidA && paidB) {
          return 1;
        } else {
          return 0;
        }
      });
      setUsers(sortedUsers);
      setFilteredBy('paidOrUnpaid');
      setLoadingPaidOrUnpaid(false);
    }
  }, [loadingPaidOrUnpaid]);

  useEffect(() => {
    if (loadingOneMonthMember) {
      const sortedUsers = [...users].sort((a, b) => {
        const costA = a.membership.cost || '';
        const costB = b.membership.cost || '';

        if (costA === '10.00' && costB !== '10.00') {
          return -1;
        } else if (costA !== '10.00' && costB === '10.00') {
          return 1;
        } else {
          return 0;
        }
      });
      setUsers(sortedUsers);
      setFilteredBy('oneMonthMember');
      setLoadingOneMonthMember(false);
    }
  }, [loadingOneMonthMember]);

  useEffect(() => {
    if (loadingSixMonthMember) {
      const sortedUsers = [...users].sort((a, b) => {
        const costA = a.membership.cost || '';
        const costB = b.membership.cost || '';

        if (costA === '50.00' && costB !== '50.00') {
          return -1;
        } else if (costA !== '50.00' && costB === '50.00') {
          return 1;
        } else {
          return 0;
        }
      });
      setUsers(sortedUsers);
      setFilteredBy('sixMonthMember');
      setLoadingSixMonthMember(false);
    }
  }, [loadingSixMonthMember]);

  useEffect(() => {
    if (loadingTwelveMonthMember) {
      const sortedUsers = [...users].sort((a, b) => {
        const costA = a.membership.cost || '';
        const costB = b.membership.cost || '';

        if (costA === '90.00' && costB !== '90.00') {
          return -1;
        } else if (costA !== '90.00' && costB === '90.00') {
          return 1;
        } else {
          return 0;
        }
      });
      setUsers(sortedUsers);
      setFilteredBy('twelveMonthMember');
      setLoadingTwelveMonthMember(false);
    }
  }, [loadingTwelveMonthMember]);

  useEffect(() => {
    if (loadingVerified) {
      const sortedUsers = [...users].sort((a, b) => {
        const verifiedA = a.verified;
        const verifiedB = b.verified;

        if (verifiedA && !verifiedB) {
          return -1;
        } else if (!verifiedA && verifiedB) {
          return 1;
        } else {
          return 0;
        }
      });
      setUsers(sortedUsers);
      setFilteredBy('verified');
      setLoadingVerified(false);
    }
  }, [loadingVerified]);

  useEffect(() => {
    if (loadingProfileImages) {
      const sortedUsers = [...users].sort((a, b) => {
        if (a.profilePhotos.length === 0) {
          return 1;
        }
        if (b.profilePhotos.length === 0) {
          return -1;
        }

        return b.profilePhotos.length - a.profilePhotos.length;
      });
      setUsers(sortedUsers);
      setFilteredBy('profileImages');
      setLoadingProfileImages(false);
    }
  }, [loadingProfileImages]);

  useEffect(() => {
    if (loadingProfileCompletion) {
      const sortedUsers = users.sort((a, b) => {
        return b.profilePercentage - a.profilePercentage;
      });
      setUsers(sortedUsers);
      setFilteredBy('profileCompletion');
      setLoadingProfileCompletion(false);
    }
  }, [loadingProfileCompletion]);

  useEffect(() => {
    if (loadingPoints) {
      const sortedUsers = users.sort((a, b) => {
        return b.pointsTotal - a.pointsTotal;
      });
      setUsers(sortedUsers);
      setFilteredBy('points');
      setLoadingPoints(false);
    }
  }, [loadingPoints]);

  useEffect(() => {
    if (loadingFeatured) {
      const sortedUsers = [...users].sort((a, b) => {
        const featuredA = a.featuredMember;
        const featuredB = b.featuredMember;

        if (featuredA && !featuredB) {
          return -1;
        } else if (!featuredA && featuredB) {
          return 1;
        } else {
          return 0;
        }
      });
      setUsers(sortedUsers);
      setFilteredBy('featured');
      setLoadingFeatured(false);
    }
  }, [loadingFeatured]);

  useEffect(() => {
    if (loadingFollowing) {
      const sortedUsers = [...users].sort((a, b) => {
        if (a.following.length === 0) {
          return 1;
        }
        if (b.following.length === 0) {
          return -1;
        }

        return b.following.length - a.following.length;
      });
      setUsers(sortedUsers);
      setFilteredBy('Following');
      setLoadingFollowing(false);
    }
  }, [loadingFollowing]);

  useEffect(() => {
    if (loadingFollowers) {
      const sortedUsers = [...users].sort((a, b) => {
        if (a.followers.length === 0) {
          return 1;
        }
        if (b.followers.length === 0) {
          return -1;
        }

        return b.followers.length - a.followers.length;
      });
      setUsers(sortedUsers);
      setFilteredBy('followers');
      setLoadingFollowers(false);
    }
  }, [loadingFollowers]);

  useEffect(() => {
    if (loadingVisitors) {
      const sortedUsers = [...users].sort((a, b) => {
        if (a.visitors.length === 0) {
          return 1;
        }
        if (b.visitors.length === 0) {
          return -1;
        }

        return b.visitors.length - a.visitors.length;
      });
      setUsers(sortedUsers);
      setFilteredBy('visitors');
      setLoadingVisitors(false);
    }
  }, [loadingVisitors]);

  useEffect(() => {
    if (loadingReports) {
      const sortedUsers = users.sort((a, b) => {
        const reportsA =
          a.reports.post.length +
          a.reports.comment.length +
          a.reports.message.length;
        const reportsB =
          b.reports.post.length +
          b.reports.comment.length +
          b.reports.message.length;

        return reportsB - reportsA;
      });
      setUsers(sortedUsers);
      setFilteredBy('reports');
      setLoadingReports(false);
    }
  }, [loadingReports]);

  useEffect(() => {
    if (loadingReported) {
      const sortedUsers = users.sort((a, b) => {
        const reportedA =
          a.reported.post.length +
          a.reported.comment.length +
          a.reported.message.length;
        const reportedB =
          b.reported.post.length +
          b.reported.comment.length +
          b.reported.message.length;

        return reportedB - reportedA;
      });
      setUsers(sortedUsers);
      setFilteredBy('reported');
      setLoadingReported(false);
    }
  }, [loadingReported]);

  useEffect(() => {
    if (loadingMessagesSent) {
      const sortedUsers = [...users].sort((a, b) => {
        if (a.messagesSent.length === 0) {
          return 1;
        }
        if (b.messagesSent.length === 0) {
          return -1;
        }

        return b.messagesSent.length - a.messagesSent.length;
      });
      setUsers(sortedUsers);
      setFilteredBy('messagesSent');
      setLoadingMessagesSent(false);
    }
  }, [loadingMessagesSent]);

  useEffect(() => {
    if (loadingMessagesReceived) {
      const sortedUsers = [...users].sort((a, b) => {
        if (a.messagesReceived.length === 0) {
          return 1;
        }
        if (b.messagesReceived.length === 0) {
          return -1;
        }

        return b.messagesReceived.length - a.messagesReceived.length;
      });
      setUsers(sortedUsers);
      setFilteredBy('messagesReceived');
      setLoadingMessagesReceived(false);
    }
  }, [loadingMessagesReceived]);

  useEffect(() => {
    if (loadingItemsOrdered) {
      const sortedUsers = users.sort((a, b) => {
        const itemsOrderedA = a.itemsOrdered || 0;
        const itemsOrderedB = b.itemsOrdered || 0;

        return itemsOrderedB - itemsOrderedA;
      });
      setUsers(sortedUsers);
      setFilteredBy('itemsOrdered');
      setLoadingItemsOrdered(false);
    }
  }, [loadingItemsOrdered]);

  useEffect(() => {
    if (loadingItemsOrderedValue) {
      const sortedUsers = users.sort((a, b) => {
        const itemsOrderedValueA = a.itemsOrderedValue || 0;
        const itemsOrderedValueB = b.itemsOrderedValue || 0;

        return itemsOrderedValueB - itemsOrderedValueA;
      });
      setUsers(sortedUsers);
      setFilteredBy('itemsOrderedValue');
      setLoadingItemsOrderedValue(false);
    }
  }, [loadingItemsOrderedValue]);

  useEffect(() => {
    if (loadingGCSent) {
      const sortedUsers = users.sort((a, b) => {
        const giftCardsSentA = a.giftCardsSent || 0;
        const giftCardsSentB = b.giftCardsSent || 0;
        return giftCardsSentB - giftCardsSentA;
      });
      setUsers(sortedUsers);
      setFilteredBy('giftCardsSent');
      setLoadingGCSent(false);
    }
  }, [loadingGCSent]);

  useEffect(() => {
    if (loadingGCSentValue) {
      const sortedUsers = users.sort((a, b) => {
        const giftCardsSentValueA = a.giftCardsSentValue || 0;
        const giftCardsSentValueB = b.giftCardsSentValue || 0;
        return giftCardsSentValueB - giftCardsSentValueA;
      });
      setUsers(sortedUsers);
      setFilteredBy('giftCardsSentValue');
      setLoadingGCSent(false);
    }
  }, [loadingGCSentValue]);

  useEffect(() => {
    if (loadingGCReceived) {
      const sortedUsers = users.sort((a, b) => {
        const giftCardsReceivedA = a.giftCardsReceived || 0;
        const giftCardsReceivedB = b.giftCardsReceived || 0;
        return giftCardsReceivedB - giftCardsReceivedA;
      });
      setUsers(sortedUsers);
      setFilteredBy('giftCardsReceived');
      setLoadingGCReceived(false);
    }
  }, [loadingGCReceived]);

  useEffect(() => {
    if (loadingGCReceivedValue) {
      const sortedUsers = users.sort((a, b) => {
        const giftCardsReceivedValueA = a.giftCardsReceivedValue || 0;
        const giftCardsReceivedValueB = b.giftCardsReceivedValue || 0;
        return giftCardsReceivedValueB - giftCardsReceivedValueA;
      });
      setUsers(sortedUsers);
      setFilteredBy('giftCardsReceivedValue');
      setLoadingGCReceived(false);
    }
  }, [loadingGCReceivedValue]);

  useEffect(() => {
    if (loadingTshirts) {
      const sortedUsers = users.sort((a, b) => {
        const tshirtsA = a.tShirts || 0;
        const tshirtsB = b.tShirts || 0;

        return tshirtsB - tshirtsA;
      });
      setUsers(sortedUsers);
      setFilteredBy('tshirts');
      setLoadingTshirts(false);
    }
  }, [loadingTshirts]);

  useEffect(() => {
    if (loadingSprays) {
      const sortedUsers = users.sort((a, b) => {
        const spraysA = a.sprays || 0;
        const spraysB = b.sprays || 0;

        return spraysB - spraysA;
      });
      setUsers(sortedUsers);
      setFilteredBy('sprays');
      setLoadingSprays(false);
    }
  }, [loadingSprays]);

  useEffect(() => {
    if (loadingDroppers) {
      const sortedUsers = users.sort((a, b) => {
        const droppersA = a.droppers || 0;
        const droppersB = b.droppers || 0;

        return droppersB - droppersA;
      });
      setUsers(sortedUsers);
      setFilteredBy('droppers');
      setLoadingDroppers(false);
    }
  }, [loadingDroppers]);

  useEffect(() => {
    if (loadingPerfumes) {
      const sortedUsers = users.sort((a, b) => {
        const perfumesA = a.perfumes || 0;
        const perfumesB = b.perfumes || 0;

        return perfumesB - perfumesA;
      });
      setUsers(sortedUsers);
      setFilteredBy('perfumes');
      setLoadingPerfumes(false);
    }
  }, [loadingPerfumes]);

  useEffect(() => {
    if (Object.keys(progress).length !== 0) {
      setProgressModalIsOpen(true);
    }
  }, [progress]);

  useEffect(() => {
    if (Object.keys(pointsData).length !== 0) {
      setPointsDataModalIsOpen(true);
    }
  }, [pointsData]);

  useEffect(() => {
    if (Object.keys(followingData).length !== 0) {
      setFollowingDataModalIsOpen(true);
    }
  }, [followingData]);

  useEffect(() => {
    if (Object.keys(followersData).length !== 0) {
      setFollowersDataModalIsOpen(true);
    }
  }, [followersData]);

  useEffect(() => {
    if (Object.keys(visitorsData).length !== 0) {
      setVisitorsDataModalIsOpen(true);
    }
  }, [visitorsData]);

  useEffect(() => {
    if (Object.keys(itemsData).length !== 0) {
      setItemsDataModalIsOpen(true);
    }
  }, [itemsData]);

  useEffect(() => {
    if (Object.keys(itemsValueData).length !== 0) {
      setItemsValueDataModalIsOpen(true);
    }
  }, [itemsValueData]);

  useEffect(() => {
    if (Object.keys(gCSentData).length !== 0) {
      setGCSentDataModalIsOpen(true);
    }
  }, [gCSentData]);

  useEffect(() => {
    if (Object.keys(gCSentValueData).length !== 0) {
      setGCSentValueDataModalIsOpen(true);
    }
  }, [gCSentValueData]);

  useEffect(() => {
    if (Object.keys(gCReceivedData).length !== 0) {
      setGCReceivedDataModalIsOpen(true);
    }
  }, [gCReceivedData]);

  useEffect(() => {
    if (Object.keys(gCReceivedValueData).length !== 0) {
      setGCReceivedValueDataModalIsOpen(true);
    }
  }, [gCReceivedValueData]);

  const fetch50 = async () => {
    setLoading50(true);
    setByPage(50);
  };

  const fetch100 = () => {
    setLoading100(true);
    setByPage(100);
  };

  const fetch500 = () => {
    setLoading500(true);
    setByPage(500);
  };

  const fetchAll = () => {
    setLoadingAll(true);
    setByPage('all');
  };

  const reverse = () => {
    setLoadingReverse(true);
  };

  const sortUsername = () => {
    setLoadingUsername(true);
  };

  const sortName = () => {
    setLoadingName(true);
  };

  const sortEmail = () => {
    setLoadingEmail(true);
  };

  const sortGender = () => {
    setLoadingGender(true);
  };

  const sortAge = () => {
    setLoadingAge(true);
  };

  const sortRegistered = () => {
    setLoadingRegistered(true);
  };

  const sortLastLogin = () => {
    setLoadingLastLogin(true);
  };

  const sortIPAddress = () => {
    setLoadingIPAddress(true);
  };

  const sortMobile = () => {
    setLoadingMobile(true);
  };

  const sortPaidOrUnpaid = () => {
    setLoadingPaidOrUnpaid(true);
  };

  const sortOneMonthMember = () => {
    setLoadingOneMonthMember(true);
  };

  const sortSixMonthMember = () => {
    setLoadingSixMonthMember(true);
  };

  const sortTwelveMonthMember = () => {
    setLoadingTwelveMonthMember(true);
  };

  const sortVerified = () => {
    setLoadingVerified(true);
  };

  const sortProfileImages = () => {
    setLoadingProfileImages(true);
  };

  const sortProfileCompletion = () => {
    setLoadingProfileCompletion(true);
  };

  const sortPoints = () => {
    setLoadingPoints(true);
  };

  const sortFeatured = () => {
    setLoadingFeatured(true);
  };

  const sortFollowing = () => {
    setLoadingFollowing(true);
  };

  const sortFollowers = () => {
    setLoadingFollowers(true);
  };

  const sortVisitors = () => {
    setLoadingVisitors(true);
  };

  const sortReports = () => {
    setLoadingReports(true);
  };

  const sortReported = () => {
    setLoadingReported(true);
  };

  const sortMessagesSent = () => {
    setLoadingMessagesSent(true);
  };

  const sortMessagesReceived = () => {
    setLoadingMessagesReceived(true);
  };

  const sortItemsOrdered = () => {
    setLoadingItemsOrdered(true);
  };

  const sortItemsOrderedValue = () => {
    setLoadingItemsOrderedValue(true);
  };

  const sortGCSent = () => {
    setLoadingGCSent(true);
  };

  const sortGCReceivedValue = () => {
    setLoadingGCReceivedValue(true);
  };

  const sortGCReceived = () => {
    setLoadingGCReceived(true);
  };

  const sortGCSentValue = () => {
    setLoadingGCSentValue(true);
  };

  const sortTshirts = () => {
    setLoadingTshirts(true);
  };

  const sortSprays = () => {
    setLoadingSprays(true);
  };

  const sortDroppers = () => {
    setLoadingDroppers(true);
  };

  const sortPerfumes = () => {
    setLoadingPerfumes(true);
  };

  const fetchUsersData = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/users-data`,
        { byPage },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
        setLoading50(false);
        setLoading100(false);
        setLoading500(false);
        setLoadingAll(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setLoading50(false);
        setLoading100(false);
        setLoading500(false);
        setLoadingAll(false);
      });
  };

  const fetchProgressCompletion = async (id) => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/progress-completion-data`,
        {
          id,
        },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setProgress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchPointsData = async (id, username) => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/points-data`,
        {
          id,
        },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setPointsData(res.data);
        setCurrentUsername(username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchFollowing = async (id, username) => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/following-data`,
        {
          id,
        },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setFollowingData(res.data.following);
        setCurrentUsername(username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchFollowers = async (id, username) => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/followers-data`,
        {
          id,
        },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setFollowersData(res.data.followers);
        setCurrentUsername(username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchVisitors = async (id, username) => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/visitors-data`,
        {
          id,
        },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setVisitorsData(res.data.visitors);
        setCurrentUsername(username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchItems = async (id, username, itemsOrdered) => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/orders-data`,
        {
          id,
        },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        const uniqueProducts = {};
        res.data.forEach((order) => {
          const products = order.products;
          products.forEach((product) => {
            const {
              count,
              product: { title, images },
            } = product;
            if (!uniqueProducts[title]) {
              uniqueProducts[title] = { count, image: images[0] };
            } else {
              uniqueProducts[title].count += count;
            }
          });
        });

        const combinedProducts = Object.entries(uniqueProducts).map(
          ([title, { count, image }]) => {
            return { title, count, image };
          }
        );
        setItemsData(combinedProducts);
        setCurrentUsername(username);
        setItemsOrderedData(itemsOrdered);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchItemsValue = async (id, username, itemsOrderedValue) => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/orders-data`,
        {
          id,
        },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        const uniqueProducts = {};
        res.data.forEach((order) => {
          const products = order.products;
          products.forEach((product) => {
            const {
              count,
              product: { title, price, images },
            } = product;
            if (!uniqueProducts[title]) {
              uniqueProducts[title] = { count, price, image: images[0] };
            } else {
              uniqueProducts[title].count += count;
            }
          });
        });

        const combinedProducts = Object.entries(uniqueProducts).map(
          ([title, { count, price, image }]) => {
            return { title, count, price, image };
          }
        );
        setItemsValueData(combinedProducts);
        setCurrentUsername(username);
        setItemsOrderedValueData(itemsOrderedValue);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchGiftCardsSent = async (id, username) => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/gc-sent-data`,
        {
          id,
        },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        const totalCardsSentData = Object.entries(
          res.data.reduce((acc, curr) => {
            const toId = curr.to._id;
            if (!acc[toId]) {
              acc[toId] = {
                count: 0,
                name: curr.to.name,
                username: curr.to.username,
                profileImage: curr.to.profileImage,
              };
            }
            acc[toId].count += 1;
            return acc;
          }, {})
        ).map(([id, { name, username, profileImage, count }]) => ({
          id,
          name,
          username,
          profileImage,
          count,
        }));
        setGCSentData(totalCardsSentData);
        setCurrentUsername(username);
      });
  };

  const fetchGiftCardsSentValue = async (id, username) => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/gc-sent-data`,
        {
          id,
        },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        const totalCardsSentValueData = Object.entries(
          res.data.reduce((acc, curr) => {
            const toId = curr.to._id;
            if (!acc[toId]) {
              acc[toId] = {
                count: 0,
                name: curr.to.name,
                username: curr.to.username,
                profileImage: curr.to.profileImage,
                totalAmount: 0,
              };
            }
            acc[toId].count += 1;
            acc[toId].totalAmount += curr.amount;
            return acc;
          }, {})
        ).map(([id, { name, username, profileImage, count, totalAmount }]) => ({
          id,
          name,
          username,
          profileImage,
          count,
          totalAmount,
        }));
        setGCSentValueData(totalCardsSentValueData);
        setCurrentUsername(username);
      });
  };

  const fetchGiftCardsReceived = async (id, username) => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/gc-received-data`,
        {
          id,
        },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        const totalCardsReceivedData = Object.entries(
          res.data.reduce((acc, curr) => {
            const fromId = curr.from._id;
            if (!acc[fromId]) {
              acc[fromId] = {
                count: 0,
                name: curr.from.name,
                username: curr.from.username,
                profileImage: curr.from.profileImage,
              };
            }
            acc[fromId].count += 1;
            return acc;
          }, {})
        ).map(([id, { name, username, profileImage, count }]) => ({
          id,
          name,
          username,
          profileImage,
          count,
        }));
        setGCReceivedData(totalCardsReceivedData);
        setCurrentUsername(username);
      });
  };

  const fetchGiftCardsReceivedValue = async (id, username) => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/gc-received-data`,
        {
          id,
        },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        const totalCardsReceivedValueData = Object.entries(
          res.data.reduce((acc, curr) => {
            const fromId = curr.from._id;
            if (!acc[fromId]) {
              acc[fromId] = {
                count: 0,
                name: curr.from.name,
                username: curr.from.username,
                profileImage: curr.from.profileImage,
                totalAmount: 0,
              };
            }
            acc[fromId].count += 1;
            acc[fromId].totalAmount += curr.amount;
            return acc;
          }, {})
        ).map(([id, { name, username, profileImage, count, totalAmount }]) => ({
          id,
          name,
          username,
          profileImage,
          count,
          totalAmount,
        }));
        setGCReceivedValueData(totalCardsReceivedValueData);
        setCurrentUsername(username);
      });
  };

  const viewProfilePics = (u, username) => {
    setProfileImageModalIsOpen(true);
    setProfileImages(u);
    setCurrentUsername(username);
  };

  const viewReports = (u, username) => {
    setReportsDataModalIsOpen(true);
    setReportsData(u);
    setCurrentUsername(username);
  };

  const viewReported = (u, username) => {
    setReportedDataModalIsOpen(true);
    setReportedData(u);
    setCurrentUsername(username);
  };

  const viewMessagesSent = (u, username) => {
    setMessagesDataModalIsOpen(true);
    setMessagesData(u);
    setMessagesType('sent');
    setCurrentUsername(username);
  };

  const viewMessagesReceived = (u, username) => {
    setMessagesDataModalIsOpen(true);
    setMessagesData(u);
    setMessagesType('received');
    setCurrentUsername(username);
  };

  return (
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        {loading ? (
          <div className='spinner'>
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          </div>
        ) : (
          <>
            <div className='search-box'>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                onClick={handleSearch}
                className='fa'
              />
              <input
                type='search'
                placeholder='Search Users by Username, Name, Email or IP'
                onChange={handleSearch}
                value={query}
              />
            </div>
            <div className='refund-filter-btns'>
              <button
                className={byPage === 50 ? 'submit-btn-active' : 'submit-btn'}
                onClick={fetch50}
              >
                {loading50 ? (
                  <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                ) : (
                  '50'
                )}
              </button>
              <button
                className={byPage === 100 ? 'submit-btn-active' : 'submit-btn'}
                onClick={fetch100}
              >
                {loading100 ? (
                  <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                ) : (
                  '100'
                )}
              </button>
              <button
                className={byPage === 500 ? 'submit-btn-active' : 'submit-btn'}
                onClick={fetch500}
              >
                {loading500 ? (
                  <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                ) : (
                  '500'
                )}
              </button>
              <button
                className={
                  byPage === 'all' ? 'submit-btn-active' : 'submit-btn'
                }
                onClick={fetchAll}
              >
                {loadingAll ? (
                  <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                ) : (
                  'All'
                )}
              </button>
            </div>
            {loadingReverse ? (
              <FontAwesomeIcon
                icon={faSpinner}
                className='fa reverse center'
                spin
              />
            ) : (
              <FontAwesomeIcon
                icon={faArrowsRotate}
                className='fa reverse center'
                onClick={reverse}
              />
            )}
            <div className='spreadsheet-wrapper'>
              <table>
                <thead>
                  <tr>
                    <th
                      onClick={sortUsername}
                      style={{
                        backgroundColor: filteredBy === 'username' && '#fff',
                        color: filteredBy === 'username' && '#ef5b85',
                      }}
                    >
                      {loadingUsername ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        'Username'
                      )}
                    </th>
                    <th
                      onClick={sortName}
                      style={{
                        backgroundColor: filteredBy === 'name' && '#fff',
                        color: filteredBy === 'name' && '#ef5b85',
                      }}
                    >
                      {loadingName ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        'Name'
                      )}
                    </th>
                    <th
                      onClick={sortEmail}
                      style={{
                        backgroundColor: filteredBy === 'email' && '#fff',
                        color: filteredBy === 'email' && '#ef5b85',
                      }}
                    >
                      {loadingEmail ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        'Email'
                      )}
                    </th>
                    <th
                      onClick={sortGender}
                      style={{
                        backgroundColor: filteredBy === 'gender' && '#fff',
                        color: filteredBy === 'gender' && '#ef5b85',
                      }}
                    >
                      {loadingGender ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        'Gender'
                      )}
                    </th>
                    <th
                      onClick={sortAge}
                      style={{
                        backgroundColor: filteredBy === 'age' && '#fff',
                        color: filteredBy === 'age' && '#ef5b85',
                      }}
                    >
                      {loadingAge ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        'Age'
                      )}
                    </th>
                    <th
                      onClick={sortRegistered}
                      style={{
                        backgroundColor: filteredBy === 'registered' && '#fff',
                        color: filteredBy === 'registered' && '#ef5b85',
                      }}
                    >
                      {loadingRegistered ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        'Registered'
                      )}
                    </th>
                    <th
                      onClick={sortLastLogin}
                      style={{
                        backgroundColor: filteredBy === 'lastLogin' && '#fff',
                        color: filteredBy === 'lastLogin' && '#ef5b85',
                      }}
                    >
                      {loadingLastLogin ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        'Last Login'
                      )}
                    </th>
                    <th
                      onClick={sortIPAddress}
                      style={{
                        backgroundColor: filteredBy === 'ipAddress' && '#fff',
                        color: filteredBy === 'ipAddress' && '#ef5b85',
                      }}
                    >
                      {loadingIPAddress ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        'IP Address(es)'
                      )}
                    </th>
                    <th
                      onClick={sortMobile}
                      style={{
                        backgroundColor: filteredBy === 'mobile' && '#fff',
                        color: filteredBy === 'mobile' && '#ef5b85',
                      }}
                    >
                      {loadingMobile ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        'Mobile'
                      )}
                    </th>
                    <th
                      onClick={sortPaidOrUnpaid}
                      style={{
                        backgroundColor:
                          filteredBy === 'paidOrUnpaid' && '#fff',
                        color: filteredBy === 'paidOrUnpaid' && '#ef5b85',
                      }}
                    >
                      {loadingPaidOrUnpaid ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        'Paid or Unpaid?'
                      )}
                    </th>
                    <th
                      onClick={sortOneMonthMember}
                      style={{
                        backgroundColor:
                          filteredBy === 'oneMonthMember' && '#fff',
                        color: filteredBy === 'oneMonthMember' && '#ef5b85',
                      }}
                    >
                      {loadingOneMonthMember ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '1 Month Member'
                      )}
                    </th>
                    <th
                      onClick={sortSixMonthMember}
                      style={{
                        backgroundColor:
                          filteredBy === 'sixMonthMember' && '#fff',
                        color: filteredBy === 'sixMonthMember' && '#ef5b85',
                      }}
                    >
                      {loadingSixMonthMember ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '6 Month Member'
                      )}
                    </th>
                    <th
                      onClick={sortTwelveMonthMember}
                      style={{
                        backgroundColor:
                          filteredBy === 'twelveMonthMember' && '#fff',
                        color: filteredBy === 'twelveMonthMember' && '#ef5b85',
                      }}
                    >
                      {loadingTwelveMonthMember ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '12 Month Member'
                      )}
                    </th>
                    <th
                      onClick={sortVerified}
                      style={{
                        backgroundColor: filteredBy === 'verified' && '#fff',
                        color: filteredBy === 'verified' && '#ef5b85',
                      }}
                    >
                      {loadingVerified ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        'Verified?'
                      )}
                    </th>
                    <th
                      onClick={sortProfileImages}
                      style={{
                        backgroundColor:
                          filteredBy === 'profileImages' && '#fff',
                        color: filteredBy === 'profileImages' && '#ef5b85',
                      }}
                    >
                      {loadingProfileImages ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '# Profile Images'
                      )}
                    </th>
                    <th
                      onClick={sortProfileCompletion}
                      style={{
                        backgroundColor:
                          filteredBy === 'profileCompletion' && '#fff',
                        color: filteredBy === 'profileCompletion' && '#ef5b85',
                      }}
                    >
                      {loadingProfileCompletion ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '% Profile Completion'
                      )}
                    </th>
                    <th
                      onClick={sortPoints}
                      style={{
                        backgroundColor: filteredBy === 'points' && '#fff',
                        color: filteredBy === 'points' && '#ef5b85',
                      }}
                    >
                      {loadingPoints ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '# Points'
                      )}
                    </th>
                    <th
                      onClick={sortFeatured}
                      style={{
                        backgroundColor: filteredBy === 'featured' && '#fff',
                        color: filteredBy === 'featured' && '#ef5b85',
                      }}
                    >
                      {loadingFeatured ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        'Featured?'
                      )}
                    </th>
                    <th
                      onClick={sortFollowing}
                      style={{
                        backgroundColor: filteredBy === 'following' && '#fff',
                        color: filteredBy === 'following' && '#ef5b85',
                      }}
                    >
                      {loadingFollowing ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '# Following'
                      )}
                    </th>
                    <th
                      onClick={sortFollowers}
                      style={{
                        backgroundColor: filteredBy === 'followers' && '#fff',
                        color: filteredBy === 'followers' && '#ef5b85',
                      }}
                    >
                      {loadingFollowers ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '# Followers'
                      )}
                    </th>
                    <th
                      onClick={sortVisitors}
                      style={{
                        backgroundColor: filteredBy === 'visitors' && '#fff',
                        color: filteredBy === 'visitors' && '#ef5b85',
                      }}
                    >
                      {loadingVisitors ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '# Visitors'
                      )}
                    </th>
                    <th
                      onClick={sortReports}
                      style={{
                        backgroundColor: filteredBy === 'reports' && '#fff',
                        color: filteredBy === 'reports' && '#ef5b85',
                      }}
                    >
                      {loadingReports ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '# Reports'
                      )}
                    </th>
                    <th
                      onClick={sortReported}
                      style={{
                        backgroundColor: filteredBy === 'reported' && '#fff',
                        color: filteredBy === 'reported' && '#ef5b85',
                      }}
                    >
                      {loadingReported ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '# Reported'
                      )}
                    </th>
                    <th
                      onClick={sortMessagesSent}
                      style={{
                        backgroundColor:
                          filteredBy === 'messagesSent' && '#fff',
                        color: filteredBy === 'messagesSent' && '#ef5b85',
                      }}
                    >
                      {loadingMessagesSent ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '# Messages Sent'
                      )}
                    </th>
                    <th
                      onClick={sortMessagesReceived}
                      style={{
                        backgroundColor:
                          filteredBy === 'messagesReceived' && '#fff',
                        color: filteredBy === 'messagesReceived' && '#ef5b85',
                      }}
                    >
                      {loadingMessagesReceived ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '# Messages Received'
                      )}
                    </th>
                    <th
                      onClick={sortItemsOrdered}
                      style={{
                        backgroundColor:
                          filteredBy === 'itemsOrdered' && '#fff',
                        color: filteredBy === 'itemsOrdered' && '#ef5b85',
                      }}
                    >
                      {loadingItemsOrdered ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '# Items Ordered'
                      )}
                    </th>
                    <th
                      onClick={sortItemsOrderedValue}
                      style={{
                        backgroundColor:
                          filteredBy === 'itemsOrderedValue' && '#fff',
                        color: filteredBy === 'itemsOrderedValue' && '#ef5b85',
                      }}
                    >
                      {loadingItemsOrderedValue ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '€ Items Ordered'
                      )}
                    </th>
                    <th
                      onClick={sortGCSent}
                      style={{
                        backgroundColor:
                          filteredBy === 'giftCardsSent' && '#fff',
                        color: filteredBy === 'giftCardsSent' && '#ef5b85',
                      }}
                    >
                      {loadingGCSent ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '# Gift Cards Sent'
                      )}
                    </th>
                    <th
                      onClick={sortGCSentValue}
                      style={{
                        backgroundColor:
                          filteredBy === 'giftCardsSentValue' && '#fff',
                        color: filteredBy === 'giftCardsSentValue' && '#ef5b85',
                      }}
                    >
                      {loadingGCSentValue ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '€ Gift Cards Sent'
                      )}
                    </th>
                    <th
                      onClick={sortGCReceived}
                      style={{
                        backgroundColor:
                          filteredBy === 'giftCardsReceived' && '#fff',
                        color: filteredBy === 'giftCardsReceived' && '#ef5b85',
                      }}
                    >
                      {loadingGCReceived ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '# Gift Cards Received'
                      )}
                    </th>
                    <th
                      onClick={sortGCReceivedValue}
                      style={{
                        backgroundColor:
                          filteredBy === 'giftCardsReceivedValue' && '#fff',
                        color:
                          filteredBy === 'giftCardsReceivedValue' && '#ef5b85',
                      }}
                    >
                      {loadingGCReceivedValue ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '€ Gift Cards Received'
                      )}
                    </th>
                    <th
                      onClick={sortTshirts}
                      style={{
                        backgroundColor: filteredBy === 'tshirts' && '#fff',
                        color: filteredBy === 'tshirts' && '#ef5b85',
                      }}
                    >
                      {loadingTshirts ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '# T-shirts'
                      )}
                    </th>
                    <th
                      onClick={sortSprays}
                      style={{
                        backgroundColor: filteredBy === 'sprays' && '#fff',
                        color: filteredBy === 'sprays' && '#ef5b85',
                      }}
                    >
                      {loadingSprays ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '# Sprays'
                      )}
                    </th>
                    <th
                      onClick={sortDroppers}
                      style={{
                        backgroundColor: filteredBy === 'droppers' && '#fff',
                        color: filteredBy === 'droppers' && '#ef5b85',
                      }}
                    >
                      {loadingDroppers ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '# Droppers'
                      )}
                    </th>
                    <th
                      onClick={sortPerfumes}
                      style={{
                        backgroundColor: filteredBy === 'perfumes' && '#fff',
                        color: filteredBy === 'perfumes' && '#ef5b85',
                      }}
                    >
                      {loadingPerfumes ? (
                        <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                      ) : (
                        '# Perfumes'
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(searched(query)).map((u) => (
                    <tr key={u._id}>
                      <td>
                        <Link
                          to={`/user/${u._id}`}
                          style={{ color: '#fff', fontSize: '14px' }}
                        >
                          {u.username}
                        </Link>
                      </td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td className='center-cell'>
                        {u.gender === 'male' ? 'Male' : 'Female'}
                      </td>
                      <td className='center-cell'>{u.age}</td>
                      <td>{moment(u.createdAt).format('MMMM Do YYYY')}</td>
                      <td>
                        {u.lastLogin
                          ? moment(u.lastLogin).format('MMMM Do YYYY')
                          : moment(u.createdAt).format('MMMM Do YYYY')}
                      </td>
                      <td>
                        {u.ipAddresses &&
                          u.ipAddresses.map((ip, idx) => <p key={idx}>{ip}</p>)}
                      </td>
                      <td>{u.mobile}</td>
                      <td className='center-cell'>
                        {u.membership.paid ? (
                          <p className='true'>Paid</p>
                        ) : (
                          <p className='false'>Unpaid</p>
                        )}
                      </td>
                      <td className='center-cell'>
                        {u.membership.cost === '10.00' && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className='fa check'
                          />
                        )}
                      </td>
                      <td className='center-cell'>
                        {u.membership.cost === '50.00' && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className='fa check'
                          />
                        )}
                      </td>
                      <td className='center-cell'>
                        {u.membership.cost === '90.00' && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className='fa check'
                          />
                        )}
                      </td>
                      <td className='center-cell'>
                        {u.verified === 'true' ? (
                          <p className='true'>True</p>
                        ) : (
                          <p className='false'>False</p>
                        )}
                      </td>
                      {u.profilePhotos.length > 0 ? (
                        <td
                          className='center-cell link'
                          onClick={() => {
                            viewProfilePics(u.profilePhotos, u.username);
                          }}
                        >
                          {u.profilePhotos.length}
                        </td>
                      ) : (
                        <td className='center-cell'>0</td>
                      )}
                      <td
                        className='center-cell link'
                        onClick={() => fetchProgressCompletion(u._id)}
                      >
                        {u.profilePercentage && `${u.profilePercentage} %`}
                      </td>
                      <td
                        className='center-cell link'
                        onClick={() => {
                          fetchPointsData(u._id, u.username);
                        }}
                      >
                        {u.pointsTotal}
                      </td>
                      <td className='center-cell'>
                        {u.featuredMember ? (
                          <p className='true'>True</p>
                        ) : (
                          <p className='false'>False</p>
                        )}
                      </td>
                      {u.following.length > 0 ? (
                        <td
                          className='center-cell link'
                          onClick={() => {
                            fetchFollowing(u._id, u.username);
                          }}
                        >
                          {u.following.length}
                        </td>
                      ) : (
                        <td className='center-cell'>0</td>
                      )}
                      {u.followers.length > 0 ? (
                        <td
                          className='center-cell link'
                          onClick={() => {
                            fetchFollowers(u._id, u.username);
                          }}
                        >
                          {u.followers.length}
                        </td>
                      ) : (
                        <td className='center-cell'>0</td>
                      )}
                      {u.visitors.length > 0 ? (
                        <td
                          className='center-cell link'
                          onClick={() => {
                            fetchVisitors(u._id, u.username);
                          }}
                        >
                          {u.visitors.length}
                        </td>
                      ) : (
                        <td className='center-cell'>0</td>
                      )}
                      {u.reports.post.length +
                        u.reports.comment.length +
                        u.reports.message.length >
                      0 ? (
                        <td
                          className='center-cell link'
                          onClick={() => {
                            viewReports(u.reports, u.username);
                          }}
                        >
                          {u.reports.post.length +
                            u.reports.comment.length +
                            u.reports.message.length}
                        </td>
                      ) : (
                        <td className='center-cell'>0</td>
                      )}
                      {u.reported.post.length +
                        u.reported.comment.length +
                        u.reported.message.length >
                      0 ? (
                        <td
                          className='center-cell link'
                          onClick={() => {
                            viewReported(u.reported, u.username);
                          }}
                        >
                          {u.reported.post.length +
                            u.reported.comment.length +
                            u.reported.message.length}
                        </td>
                      ) : (
                        <td className='center-cell'>0</td>
                      )}

                      {u.messagesSent.length > 0 ? (
                        <td
                          className='center-cell link'
                          onClick={() => {
                            viewMessagesSent(u.messagesSent, u.username);
                          }}
                        >
                          {u.messagesSent.length}
                        </td>
                      ) : (
                        <td className='center-cell'>0</td>
                      )}
                      {u.messagesReceived.length > 0 ? (
                        <td
                          className='center-cell link'
                          onClick={() => {
                            viewMessagesReceived(
                              u.messagesReceived,
                              u.username
                            );
                          }}
                        >
                          {u.messagesReceived.length}
                        </td>
                      ) : (
                        <td className='center-cell'>0</td>
                      )}
                      <td
                        className='center-cell link'
                        onClick={() =>
                          fetchItems(u._id, u.username, u.itemsOrdered)
                        }
                      >
                        {u.itemsOrdered}
                      </td>
                      <td
                        className='center-cell link'
                        onClick={() =>
                          fetchItemsValue(
                            u._id,
                            u.username,
                            u.itemsOrderedValue
                          )
                        }
                      >
                        {u.itemsOrderedValue &&
                          `€${u.itemsOrderedValue.toFixed(2)}`}
                      </td>
                      <td
                        className='center-cell link'
                        onClick={() => fetchGiftCardsSent(u._id, u.username)}
                      >
                        {u.giftCardsSent}
                      </td>
                      <td
                        className='center-cell link'
                        onClick={() =>
                          fetchGiftCardsSentValue(u._id, u.username)
                        }
                      >
                        {u.giftCardsSentValue &&
                          `€${u.giftCardsSentValue.toFixed(2)}`}
                      </td>
                      <td
                        className='center-cell link'
                        onClick={() =>
                          fetchGiftCardsReceived(u._id, u.username)
                        }
                      >
                        {u.giftCardsReceived}
                      </td>
                      <td
                        className='center-cell link'
                        onClick={() =>
                          fetchGiftCardsReceivedValue(u._id, u.username)
                        }
                      >
                        {u.giftCardsReceivedValue &&
                          `€${u.giftCardsReceivedValue.toFixed(2)}`}
                      </td>
                      <td className='center-cell'>{u.tShirts}</td>
                      <td className='center-cell'>{u.sprays}</td>
                      <td className='center-cell'>{u.droppers}</td>
                      <td className='center-cell'>{u.perfumes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <LargeDataImage
        profileImageModalIsOpen={profileImageModalIsOpen}
        setProfileImageModalIsOpen={setProfileImageModalIsOpen}
        images={profileImages}
        username={currentUsername}
      />
      <ProfileProgress
        progress={progress}
        progressModalIsOpen={progressModalIsOpen}
        setProgressModalIsOpen={setProgressModalIsOpen}
        page={'data'}
      />
      <PointsData
        pointsData={pointsData}
        pointsDataModalIsOpen={pointsDataModalIsOpen}
        setPointsDataModalIsOpen={setPointsDataModalIsOpen}
        username={currentUsername}
      />
      <FollowingData
        users={followingData}
        followingDataModalIsOpen={followingDataModalIsOpen}
        setFollowingDataModalIsOpen={setFollowingDataModalIsOpen}
        username={currentUsername}
      />
      <FollowersData
        users={followersData}
        followersDataModalIsOpen={followersDataModalIsOpen}
        setFollowersDataModalIsOpen={setFollowersDataModalIsOpen}
        username={currentUsername}
      />
      <VisitorsData
        users={visitorsData}
        visitorsDataModalIsOpen={visitorsDataModalIsOpen}
        setVisitorsDataModalIsOpen={setVisitorsDataModalIsOpen}
        username={currentUsername}
      />
      <ReportsData
        reports={reportsData}
        reportsDataModalIsOpen={reportsDataModalIsOpen}
        setReportsDataModalIsOpen={setReportsDataModalIsOpen}
        username={currentUsername}
      />
      <ReportedData
        reported={reportedData}
        reportedDataModalIsOpen={reportedDataModalIsOpen}
        setReportedDataModalIsOpen={setReportedDataModalIsOpen}
        username={currentUsername}
      />
      <MessagesData
        messages={messagesData}
        messagesDataModalIsOpen={messagesDataModalIsOpen}
        setMessagesDataModalIsOpen={setMessagesDataModalIsOpen}
        username={currentUsername}
        messagesType={messagesType}
      />
      <ItemsData
        items={itemsData}
        itemsOrdered={itemsOrderedData}
        itemsDataModalIsOpen={itemsDataModalIsOpen}
        setItemsDataModalIsOpen={setItemsDataModalIsOpen}
        username={currentUsername}
      />
      <ItemsValueData
        items={itemsValueData}
        itemsOrderedValue={itemsOrderedValueData}
        itemsValueDataModalIsOpen={itemsValueDataModalIsOpen}
        setItemsValueDataModalIsOpen={setItemsValueDataModalIsOpen}
        username={currentUsername}
      />
      <GCSentData
        cards={gCSentData}
        gCSentDataModalIsOpen={gCSentDataModalIsOpen}
        setGCSentDataModalIsOpen={setGCSentDataModalIsOpen}
        username={currentUsername}
      />
      <GCSentValueData
        cards={gCSentValueData}
        gCSentValueDataModalIsOpen={gCSentValueDataModalIsOpen}
        setGCSentValueDataModalIsOpen={setGCSentValueDataModalIsOpen}
        username={currentUsername}
      />
      <GCReceivedData
        cards={gCReceivedData}
        gCReceivedDataModalIsOpen={gCReceivedDataModalIsOpen}
        setGCReceivedDataModalIsOpen={setGCReceivedDataModalIsOpen}
        username={currentUsername}
      />
      <GCReceivedValueData
        cards={gCReceivedValueData}
        gCReceivedValueDataModalIsOpen={gCReceivedValueDataModalIsOpen}
        setGCReceivedValueDataModalIsOpen={setGCReceivedValueDataModalIsOpen}
        username={currentUsername}
      />
    </div>
  );
};

export default Data;
