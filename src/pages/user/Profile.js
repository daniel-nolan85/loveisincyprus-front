import React, { useState, useEffect, useRef } from 'react';
import defaultCover from '../../assets/defaultCover.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faCamera,
  faPenToSquare,
  faSpinner,
  faPaperPlane,
  faCropSimple,
  faComments,
  faTrashCan,
  faCaretDown,
  faCaretUp,
  faFaceGrinHearts,
  faFaceGrinStars,
  faSignsPost,
  faPeopleArrows,
  faCoins,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import ProfileUpdate from '../../components/modals/ProfileUpdate';
import { toast } from 'react-toastify';
import axios from 'axios';
import defaultProfile from '../../assets/defaultProfile.png';
import CropCover from '../../components/modals/CropCover';
import CropProfilePic from '../../components/modals/CropProfilePic';
import LargeCoverImage from '../../components/modals/LargeCoverImage';
import LargeProfileImage from '../../components/modals/LargeProfileImage';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import Comments from '../../components/cards/Comments';
import InfiniteScroll from 'react-infinite-scroll-component';
import AddComment from '../../components/modals/AddComment';
import ShowLikes from '../../components/modals/ShowLikes';
import SinglePost from '../../components/modals/SinglePost';
import PostDelete from '../../components/modals/PostDelete';
import { getUserPointsTotal, addPoints } from '../../functions/user';
import ProfileProgress from '../../components/modals/ProfileProgress';
import Verify from '../../components/modals/Verify';
import { ChatState } from '../../context/ChatProvider';
import * as faceapi from 'face-api.js';
import firebase from 'firebase/compat/app';
import { updateEmail, updatePassword, updatePhoneNumber } from 'firebase/auth';
import { auth } from '../../firebase';
import Reauthenticate from '../../components/modals/Reauthenticate';
import { HashLink as Link } from 'react-router-hash-link';
import PostUpload from '../../components/forms/PostUpload';
import LargePostImage from '../../components/modals/LargePostImage';

const Profile = ({ history }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [updatedMobile, setUpdatedMobile] = useState('');
  const [secondMobile, setSecondMobile] = useState('');
  const [statement, setStatement] = useState('');
  const [answer, setAnswer] = useState('');
  const [updatedAnswer, setUpdatedAnswer] = useState('');
  const [about, setAbout] = useState('');
  const [profileImage, setProfileImage] = useState({});
  const [coverImage, setCoverImage] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [verifyModalIsOpen, setVerifyModalIsOpen] = useState(false);
  const [cropCoverModalIsOpen, setCropCoverModalIsOpen] = useState(false);
  const [cropModalIsOpen, setCropModalIsOpen] = useState(false);
  const [profileImageModalIsOpen, setProfileImageModalIsOpen] = useState(false);
  const [coverImageModalIsOpen, setCoverImageModalIsOpen] = useState(false);
  const [crop, setCrop] = useState(null);
  const [croppedCover, setCroppedCover] = useState(null);
  const [croppedProfile, setCroppedProfile] = useState(null);
  const [coverImageCropped, setCoverImageCropped] = useState(false);
  const [profileImageCropped, setProfileImageCropped] = useState(false);
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [matches, setMatches] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [image, setImage] = useState({});
  const [content, setContent] = useState('');
  const [comment, setComment] = useState('');
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [showComments, setShowComments] = useState(-1);
  const [page, setPage] = useState(1);
  const [morePosts, setMorePosts] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [likesModalIsOpen, setLikesModalIsOpen] = useState(false);
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [location, setLocation] = useState('');
  const [genderWanted, setGenderWanted] = useState('');
  const [relWanted, setRelWanted] = useState('');
  const [postModalIsOpen, setPostModalIsOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState([]);
  const [postDeleteModalIsOpen, setPostDeleteModalIsOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState([]);
  const [commentDeleteModalIsOpen, setCommentDeleteModalIsOpen] =
    useState(false);
  const [postOfCommentToDelete, setPostOfCommentToDelete] = useState([]);
  const [commentEditModalIsOpen, setCommentEditModalIsOpen] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState({});
  const [postOfCommentToEdit, setPostOfCommentToEdit] = useState([]);
  const [points, setPoints] = useState(0);
  const [language, setLanguage] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [numOfChildren, setNumOfChildren] = useState(0);
  const [drinks, setDrinks] = useState('');
  const [smokes, setSmokes] = useState('');
  const [nationality, setNationality] = useState('');
  const [height, setHeight] = useState('');
  const [build, setBuild] = useState('');
  const [hairColor, setHairColor] = useState('');
  const [hairStyle, setHairStyle] = useState('');
  const [hairLength, setHairLength] = useState('');
  const [eyeColor, setEyeColor] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [feetType, setFeetType] = useState('');
  const [loves, setLoves] = useState([]);
  const [hates, setHates] = useState([]);
  const [education, setEducation] = useState('');
  const [occupation, setOccupation] = useState('');
  const [politics, setPolitics] = useState('');
  const [religion, setReligion] = useState('');
  const [pets, setPets] = useState([]);
  const [interests, setInterests] = useState([]);
  const [music, setMusic] = useState([]);
  const [foods, setFoods] = useState('');
  const [books, setBooks] = useState([]);
  const [films, setFilms] = useState([]);
  const [sports, setSports] = useState([]);
  const [livesWith, setLivesWith] = useState('');
  const [roleInLife, setRoleInLife] = useState('');
  const [managesEdu, setManagesEdu] = useState('');
  const [hobbies, setHobbies] = useState([]);
  const [marriage, setMarriage] = useState('');
  const [income, setIncome] = useState(0);
  const [ageOfPartner, setAgeOfPartner] = useState('');
  const [traits, setTraits] = useState([]);
  const [changes, setChanges] = useState('');
  const [relocate, setRelocate] = useState('');
  const [treatSelf, setTreatSelf] = useState([]);
  const [sexLikes, setSexLikes] = useState('');
  const [sexFrequency, setSexFrequency] = useState('');
  const [vaccinated, setVaccinated] = useState('');
  const [progress, setProgress] = useState({});
  const [progressModalIsOpen, setProgressModalIsOpen] = useState(false);
  const [verifImg, setVerifImg] = useState(null);
  const [faces, setFaces] = useState([]);
  const [loadingImg, setLoadingImg] = useState(false);
  const [loadingCoverImg, setLoadingCoverImg] = useState(false);
  const [loadingProfileImg, setLoadingProfileImg] = useState(false);
  const [profileImageUpdateModalIsOpen, setProfileImageUpdateModalIsOpen] =
    useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [reauthenticateModalIsOpen, setReauthenticateModalIsOpen] =
    useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [OTP, setOTP] = useState('');
  const [reauthMobile, setReauthMobile] = useState('');
  const [loadingReauth, setLoadingReauth] = useState(false);
  const [profilePhotos, setProfilePhotos] = useState([]);
  const [coverPhotos, setCoverPhotos] = useState([]);
  const [newCoverImages, setNewCoverImages] = useState([]);
  const [newProfileImages, setNewProfileImages] = useState([]);
  const [detecting, setDetecting] = useState(false);
  const [postImages, setPostImages] = useState([]);
  const [postImageModalIsOpen, setPostImageModalIsOpen] = useState(false);

  const { modalIsOpen, setModalIsOpen } = ChatState();

  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  const locate = useLocation();

  const isFirstRun = useRef(true);
  const profileImgRef = useRef();

  useEffect(() => {
    if (locate.state?.clickedfromPopup) {
      setModalIsOpen(true);
    }
  }, [locate.state?.clickedfromPopup]);

  useEffect(() => {
    if (user && user.token) {
      fetchUserPosts();
      fetchUserTotalPosts();
    }
  }, [user && user.token, page]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      hasClearProfileImage();
    }
  }, [faces]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      if (newCoverImages.length > 0) {
        setCoverImage(newCoverImages[0]);
      }
    }
  }, [newCoverImages]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      if (newProfileImages.length > 0) {
        setProfileImage(newProfileImages[0]);
      }
    }
  }, [newProfileImages]);

  useEffect(() => {
    if ((updatedEmail || updatedAnswer) && profileUpdated) {
      setReauthenticateModalIsOpen(true);
    }
  }, [(updatedEmail || updatedAnswer) && profileUpdated]);

  useEffect(() => {
    fetchProgressCompletion();
  }, [profileUpdated]);

  useEffect(() => {
    if (user && user.token) {
      setUsername(user.username);
      setAbout(user.about);
      setName(user.name);
      setEmail(user.email);
      setMobile(user.mobile);
      setSecondMobile(user.secondMobile);
      setStatement(user.statement);
      setAnswer(user.answer);
      setProfileImage(user.profileImage);
      setCoverImage(user.coverImage);
      setGender(user.gender);
      setLocation(user.location);
      setGenderWanted(user.genderWanted);
      setRelWanted(user.relWanted);
      setLanguage(user.language);
      setMaritalStatus(user.maritalStatus);
      setNumOfChildren(user.numOfChildren);
      setDrinks(user.drinks);
      setSmokes(user.smokes);
      setNationality(user.nationality);
      setHeight(user.height);
      setBuild(user.build);
      setHairColor(user.hairColor);
      setHairStyle(user.hairStyle);
      setHairLength(user.hairLength);
      setEyeColor(user.eyeColor);
      setEthnicity(user.ethnicity);
      setFeetType(user.feetType);
      setLoves(user.loves);
      setHates(user.hates);
      setEducation(user.education);
      setOccupation(user.occupation);
      setPolitics(user.politics);
      setReligion(user.religion);
      setPets(user.pets);
      setInterests(user.interests);
      setMusic(user.music);
      setFoods(user.foods);
      setBooks(user.books);
      setFilms(user.films);
      setSports(user.sports);
      setLivesWith(user.livesWith);
      setRoleInLife(user.roleInLife);
      setManagesEdu(user.managesEdu);
      setHobbies(user.hobbies);
      setMarriage(user.marriage);
      setIncome(user.income);
      setAgeOfPartner(user.ageOfPartner);
      setTraits(user.traits);
      setChanges(user.changes);
      setRelocate(user.relocate);
      setTreatSelf(user.treatSelf);
      setSexLikes(user.sexLikes);
      setSexFrequency(user.sexFrequency);
      setVaccinated(user.vaccinated);
      setProfilePhotos(user.profilePhotos);
      setCoverPhotos(user.coverPhotos);
      fetchPhotos();
      fetchMatches();
      fetchVisitors();
      fetchUserPoints();
      fetchProgressCompletion();
    }
  }, [user && user.token]);

  const checkInfoExists = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_API}/check-info-exists`,
        {
          _id: user._id,
          email,
          updatedEmail,
          mobile,
          updatedMobile,
          secondMobile,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        if (
          res.data.some((e) => e.mobile === updatedMobile) ||
          res.data.some((e) => e.secondMobile === updatedMobile)
        ) {
          toast.error('The mobile number you have entered is already in use.', {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        }
        if (
          res.data.some((e) => e.mobile === secondMobile) ||
          res.data.some((e) => e.secondMobile === secondMobile)
        ) {
          toast.error(
            'The secondary mobile number you have entered is already in use.',
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
          return;
        }
        if (res.data.some((e) => e.email === updatedEmail)) {
          toast.error('The email address you have entered is already in use.', {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        }
        if (res.data.length === 0) handleSubmit();
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/profile-update`,
        {
          username,
          about,
          name,
          email,
          updatedEmail,
          mobile,
          updatedMobile,
          secondMobile,
          statement,
          answer,
          updatedAnswer,
          user,
          profileImage,
          coverImage,
          gender,
          birthday,
          location,
          genderWanted,
          relWanted,
          language,
          maritalStatus,
          numOfChildren,
          drinks,
          smokes,
          nationality,
          height,
          build,
          hairColor,
          hairStyle,
          hairLength,
          eyeColor,
          ethnicity,
          feetType,
          loves,
          hates,
          education,
          occupation,
          politics,
          religion,
          pets,
          interests,
          music,
          foods,
          books,
          films,
          sports,
          livesWith,
          roleInLife,
          managesEdu,
          hobbies,
          marriage,
          income,
          ageOfPartner,
          traits,
          changes,
          relocate,
          treatSelf,
          sexLikes,
          sexFrequency,
          vaccinated,
          profilePhotos,
          coverPhotos,
          newProfileImages,
          newCoverImages,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        if (res.data.error) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        } else if (res.data.message) {
          toast.error(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        } else if (res.data.timeout === true) {
          setReauthenticateModalIsOpen(true);
        } else {
          toast.success(`Profile updated.`, {
            position: toast.POSITION.TOP_CENTER,
          });
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              ...user,
              profileImage: res.data.profileImage,
              coverImage: res.data.coverImage,
              name: res.data.name,
              email: res.data.email,
              mobile: res.data.mobile,
              secondMobile: res.data.secondMobile,
              statement: res.data.statement,
              answer: res.data.answer,
              username: res.data.username,
              about: res.data.about,
              gender: res.data.gender,
              birthday: res.data.birthday,
              age: res.data.age,
              location: res.data.location,
              genderWanted: res.data.genderWanted,
              relWanted: res.data.relWanted,
              language: res.data.language,
              maritalStatus: res.data.maritalStatus,
              numOfChildren: res.data.numOfChildren,
              drinks: res.data.drinks,
              smokes: res.data.smokes,
              nationality: res.data.nationality,
              height: res.data.height,
              build: res.data.build,
              hairColor: res.data.hairColor,
              hairStyle: res.data.hairStyle,
              hairLength: res.data.hairLength,
              eyeColor: res.data.eyeColor,
              ethnicity: res.data.ethnicity,
              feetType: res.data.feetType,
              loves: res.data.loves,
              hates: res.data.hates,
              education: res.data.education,
              occupation: res.data.occupation,
              politics: res.data.politics,
              religion: res.data.religion,
              pets: res.data.pets,
              interests: res.data.interests,
              music: res.data.music,
              foods: res.data.foods,
              books: res.data.books,
              films: res.data.films,
              sports: res.data.sports,
              livesWith: res.data.livesWith,
              roleInLife: res.data.roleInLife,
              managesEdu: res.data.managesEdu,
              hobbies: res.data.hobbies,
              marriage: res.data.marriage,
              income: res.data.income,
              ageOfPartner: res.data.ageOfPartner,
              traits: res.data.traits,
              changes: res.data.changes,
              relocate: res.data.relocate,
              treatSelf: res.data.treatSelf,
              sexLikes: res.data.sexLikes,
              sexFrequency: res.data.sexFrequency,
              vaccinated: res.data.vaccinated,
              profilePhotos: res.data.profilePhotos,
              coverPhotos: res.data.coverPhotos,
            },
          });
          updatedMobile && setMobile(updatedMobile);
          updatedEmail && setEmail(updatedEmail);
          updatedAnswer && setAnswer(updatedAnswer);
          fetchPhotos();
        }
        Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri('/models')])
          .then(detectfaces)
          .catch((err) => console.log(err));
        setModalIsOpen(false);
        if (newProfileImages.length > 0) setDetecting(true);
        newCoverImages && setNewCoverImages([]);
        newProfileImages && setNewProfileImages([]);
        setProfileUpdated(true);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error('Profile update failed.', {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const detectfaces = async () => {
    const detections = await faceapi.detectAllFaces(
      profileImgRef.current,
      new faceapi.TinyFaceDetectorOptions()
    );
    setFaces(detections);
  };

  const hasClearProfileImage = async () => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/clear-profile-image`,
        { user, faces },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            clearPhoto: res.data.clearPhoto,
          },
        });
        setDetecting(false);
        if (res.data.clearPhoto && res.data.profilePhotos.length > 1) {
          toast.success(
            'Face detected on profile picture. You may view other members pictures clearly.',
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        } else if (res.data.clearPhoto && res.data.profilePhotos.length < 2) {
          toast.warning(
            'Face detected on profile picture. Upload one more profile picture to be able to view other members pictures clearly.',
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        } else if (!res.data.clearPhoto) {
          toast.warning(
            'No face detected on profile picture. You will not be able to see other members pictures clearly.',
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        }
      });
  };

  const fetchPhotos = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/nine-photos`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setPhotos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchMatches = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/nine-matches`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setMatches(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchVisitors = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/nine-visitors`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setVisitors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUserPoints = () =>
    getUserPointsTotal(user.token).then((res) => {
      setPoints(res.data);
    });

  const fetchUserPosts = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/user-posts/${page}`,
        {
          user,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUserTotalPosts = () => {
    axios
      .post(
        `${process.env.REACT_APP_API}/total-posts-by-user`,
        {
          user,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        if (res.data === 0) {
          setMorePosts(false);
        }
        setTotalPosts(res.data);
      });
  };

  const fetchProgressCompletion = () => {
    axios
      .post(
        `${process.env.REACT_APP_API}/progress-completion`,
        {
          user,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setProgress(res.data);
        if (res.data.percentage == 100 && user.profileComplete == false) {
          addPoints(35, 'profile complete', user.token);
          toast.success(
            `You have completed 100% of your profile. You have been awarded 35 points!`,
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        }
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const infinity = () => {
    let postsLength = posts.length;
    if (postsLength === totalPosts) {
      setMorePosts(false);
    }
    setPage(page + 1);
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    await axios
      .post(
        `${process.env.REACT_APP_API}/create-post`,
        {
          content,
          postImages,
          user,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setUploading(false);
        addPoints(3, 'post', user.token);
        if (res.data.error) {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.success(`Post added. You have been awarded 3 points!`, {
            position: toast.POSITION.TOP_CENTER,
          });
          setContent('');
          setPostImages([]);
          fetchUserPosts();
          fetchUserTotalPosts();
          fetchUserPoints();
        }
      })
      .catch((err) => {
        setUploading(false);
        console.log(err);
      });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append('image', file);
    setLoadingImg(true);

    await axios
      .post(`${process.env.REACT_APP_API}/upload-image`, formData, {
        headers: {
          authtoken: user.token,
        },
      })
      .then((res) => {
        setImage({
          url: res.data.url,
          public_id: res.data.public_id,
        });
        setLoadingImg(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingImg(false);
      });
  };

  const handleDelete = async (post) => {
    setPostDeleteModalIsOpen(true);
    setPostToDelete(post);
  };

  const handleLike = async (_id) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/like-post`,
        { _id, user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        fetchUserPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnlike = async (_id) => {
    await axios
      .put(
        `${process.env.REACT_APP_API}/unlike-post`,
        { _id, user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        fetchUserPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleComment = (post) => {
    setCurrentPost(post);
    setCommentModalIsOpen(true);
  };

  const addComment = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${process.env.REACT_APP_API}/add-comment`,
        { postId: currentPost._id, comment, image, user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        toast.success(`Comment added.`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setComment('');
        setImage({});
        setCommentModalIsOpen(false);
        fetchUserPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeComment = (postId, comment) => {
    setCommentDeleteModalIsOpen(true);
    setPostOfCommentToDelete(postId);
    setCommentToDelete(comment);
  };

  const editComment = async (postId, comment) => {
    setCommentEditModalIsOpen(true);
    setCommentToEdit(comment);
    setPostOfCommentToEdit(postId);
  };

  const showLikes = (post) => {
    setCurrentPost(post);
    setLikesModalIsOpen(true);
  };

  const editPost = (post) => {
    setCurrentPost(post);
    setPostModalIsOpen(true);
  };

  const showProgress = () => {
    setProgressModalIsOpen(true);
  };

  const viewImages = (post) => {
    setCurrentPost(post);
    setPostImageModalIsOpen(true);
  };

  return (
    <div className='profile-container'>
      {user.coverImage && user.coverImage.url ? (
        <div className='cover-img-container'>
          <img
            src={user.coverImage.url}
            alt={`${user.username || user.name}'s cover photo`}
            className='cover-img'
            style={{ cursor: 'zoom-in' }}
            onClick={() => setCoverImageModalIsOpen(true)}
          />
          <FontAwesomeIcon
            icon={faCropSimple}
            className='fa'
            onClick={() => setCropCoverModalIsOpen(true)}
          />
        </div>
      ) : (
        <img
          src={defaultCover}
          alt={`${user.username || user.name}'s cover photo`}
          className='cover-img'
        />
      )}
      <div className='profile-details'>
        <div className='pd-left'>
          <div className='pd-row'>
            {user.profileImage && user.profileImage.url ? (
              <>
                {detecting && (
                  <div className='outer-circle'>
                    <div className='img-scanner'></div>
                  </div>
                )}
                <img
                  ref={profileImgRef}
                  crossOrigin='anonymous'
                  src={user.profileImage.url}
                  alt={`${user.username || user.name}'s profile photo`}
                  className='pd-image'
                  style={{ cursor: 'zoom-in' }}
                  onClick={() => setProfileImageModalIsOpen(true)}
                />
                <FontAwesomeIcon
                  icon={faCropSimple}
                  className='fa'
                  onClick={() => setCropModalIsOpen(true)}
                />
              </>
            ) : (
              <img
                ref={profileImgRef}
                src={defaultProfile}
                alt='Default profile picture'
                className='pd-image'
              />
            )}

            <div>
              <h3>{user.username || user.name}</h3>
              <p>
                Member since {moment(user.createdAt).format('MMMM Do YYYY')}
              </p>
              <div className='tooltip progress' onClick={showProgress}>
                <progress value={progress.percentage} max='100'></progress>
                <span>{progress.percentage}%</span>
                <span className='tooltip-text'>Profile completion</span>
              </div>
            </div>
          </div>
        </div>
        <div className='pd-right'>
          <button type='button'>
            <div className='tooltip'>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className='fa'
                onClick={() => {
                  setProfileUpdated(false);
                  setUpdatedMobile('');
                  setUpdatedEmail('');
                  setUpdatedAnswer('');
                  setReauthMobile('');
                  setShowOTP(false);
                  setOTP('');
                  setLoadingReauth(false);
                  setModalIsOpen(true);
                }}
              />
              <span className='tooltip-text'>Update profile</span>
            </div>
          </button>
          {user.verified === 'false' ? (
            <button
              onClick={() => setVerifyModalIsOpen(true)}
              className='verif-cta'
            >
              <span>Verify me</span>
              <svg width='13px' height='10px' viewBox='0 0 13 10'>
                <path d='M1,5 L11,5'></path>
                <polyline points='8 1 12 5 8 9'></polyline>
              </svg>
            </button>
          ) : user.verified === 'pending' ? (
            <button className='ribbon verifying'>Verifying...</button>
          ) : (
            user.verified === 'true' && (
              <button className='tooltip'>
                <FontAwesomeIcon icon={faUserShield} className='fa verified' />
                <span className='tooltip-text'>You are a verified member</span>
              </button>
            )
          )}
        </div>
      </div>
      <div className='profile-info'>
        <div className='info-col'>
          <div className='profile-intro'>
            {user.about && (
              <>
                <h3>Intro</h3>
                <p className='intro-text'>{about}</p>
                <hr />
              </>
            )}
            <ul>
              <li>
                <Link to='#my-posts'>
                  <FontAwesomeIcon icon={faSignsPost} className='fa' />
                  {totalPosts} {totalPosts === 1 ? 'Post' : 'Posts'}
                </Link>
              </li>
              <li>
                <Link to='/liked-users'>
                  <FontAwesomeIcon icon={faFaceGrinHearts} className='fa' />
                  {user.following.length}
                  {user.following.length === 1
                    ? ' Person I like'
                    : ' People I like'}
                </Link>
              </li>
              <li>
                <Link to='/users-who-like-me'>
                  <FontAwesomeIcon icon={faFaceGrinStars} className='fa' />
                  {user.followers.length}
                  {user.followers.length === 1
                    ? ' Person likes me'
                    : ' People like me'}
                </Link>
              </li>
              <li>
                <Link to='/my-matches'>
                  <FontAwesomeIcon icon={faPeopleArrows} className='fa' />
                  {user.matches.length - 1}
                  {user.matches.length - 1 === 1 ? ' Match' : ' Matches'}
                </Link>
              </li>
              <li>
                <Link to='/points'>
                  <FontAwesomeIcon icon={faCoins} className='fa' />
                  {points}
                  {points === 1 ? ' Point' : ' Points'}
                </Link>
              </li>
            </ul>
          </div>
          {photos.length > 0 && (
            <div className='profile-intro'>
              <div className='title-box'>
                <h3>Photos</h3>
                <Link to={`/photos/${user._id}`}>All Photos</Link>
              </div>
              <div className='photo-box'>
                {photos.map((p, i) => (
                  <div key={i}>
                    <img src={p.url || p} alt='' />
                  </div>
                ))}
              </div>
            </div>
          )}
          {matches.length > 0 && (
            <div className='profile-intro'>
              <div className='title-box'>
                <h3>Matches</h3>
                <Link to='/my-matches'>All Matches</Link>
              </div>
              <small>People I matched with</small>
              <div className='friends-box'>
                {matches.map((m) => (
                  <div key={m._id}>
                    <Link to={`/user/${m._id}`}>
                      <img
                        src={
                          (m.profileImage && m.profileImage.url) ||
                          defaultProfile
                        }
                        alt={`${m.username || m.name}'s profile picture`}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          {visitors.length > 0 && (
            <div className='profile-intro'>
              <div className='title-box'>
                <h3>Visitors</h3>
                <Link to='/users-who-visited-me'>All Visitors</Link>
              </div>
              <small>People who checked out my profile</small>
              <div className='friends-box'>
                {visitors.map((v) => (
                  <div key={v._id}>
                    <Link to={`/user/${v._id}`}>
                      <img
                        src={
                          (v.profileImage && v.profileImage.url) ||
                          defaultProfile
                        }
                        alt={`${v.username || v.name}'s profile picture`}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className='post-col'>
          <div className='write-post-container'>
            <div className='user-profile'>
              <img
                src={user.profileImage ? user.profileImage.url : defaultProfile}
                alt={`${user.username || user.name}'s profile picture`}
              />
              <p>{user.username || user.name}</p>
            </div>
            <div className='post-input-container'>
              <form>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={`What's on your mind, ${
                    user.username || user.name.split(' ')[0]
                  }?`}
                />
              </form>
              <div className='write-post-footer'>
                <PostUpload
                  postImages={postImages}
                  setPostImages={setPostImages}
                />
                <button
                  onClick={postSubmit}
                  type='submit'
                  className='submit-btn'
                  disabled={!content || uploading}
                >
                  {uploading ? (
                    <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                  ) : (
                    <FontAwesomeIcon icon={faPaperPlane} className='fa' />
                  )}
                  Post
                </button>
              </div>
            </div>
            <span id='my-posts'></span>
          </div>
          <InfiniteScroll
            dataLength={posts.length}
            next={infinity}
            hasMore={morePosts}
            loader={
              <div className='loader'>
                <FontAwesomeIcon icon={faSpinner} className='fa' spin />
              </div>
            }
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>You're up to date</b>
              </p>
            }
          >
            {posts &&
              posts.map((post, i) => (
                <div className='post-container' key={post._id}>
                  <div className='post-row'>
                    <div className='user-profile'>
                      <Link
                        to={
                          user._id === post.postedBy._id
                            ? `/user/profile/${user._id}`
                            : `/user/${post.postedBy._id}`
                        }
                      >
                        <img
                          src={
                            post.postedBy.profileImage
                              ? post.postedBy.profileImage.url
                              : defaultProfile
                          }
                          alt={`${
                            post.postedBy.username || post.postedBy.name
                          }'s profile picture`}
                        />
                      </Link>
                      <div>
                        <Link
                          to={
                            user._id === post.postedBy._id
                              ? `/user/profile/${user._id}`
                              : `/user/${post.postedBy._id}`
                          }
                        >
                          <p>
                            {post.postedBy.name
                              ? post.postedBy.username
                              : post.postedBy.name}
                          </p>
                        </Link>
                        <span>{moment(post.createdAt).fromNow()}</span>
                      </div>
                    </div>
                    {user && user._id === post.postedBy._id && (
                      <div className='post-icons'>
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className='fa trash'
                          onClick={() => handleDelete(post)}
                        />
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className='fa edit ml'
                          onClick={() => editPost(post)}
                        />
                      </div>
                    )}
                  </div>
                  <p className='post-text'>{post.content}</p>

                  {post.postImages && post.postImages.length > 0 && (
                    <img
                      src={post.postImages[0].url}
                      alt={`${
                        post.postedBy.username || post.postedBy.name
                      }'s post`}
                      className='post-img'
                      style={{ cursor: 'zoom-in' }}
                      onClick={() => viewImages(post)}
                    />
                  )}
                  <div className='post-row'>
                    <div className='activity-icons'>
                      <div>
                        {post.likes.some((e) => e._id === user._id) ? (
                          <FontAwesomeIcon
                            icon={faHeart}
                            className='fa liked'
                            onClick={() => handleUnlike(post._id)}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faHeart}
                            className='fa'
                            onClick={() => handleLike(post._id)}
                          />
                        )}
                        <span
                          className='show-likes'
                          onClick={() => showLikes(post)}
                        >
                          {post.likes.length === 1 &&
                            `${post.likes.length} like`}
                          {post.likes.length > 1 &&
                            `${post.likes.length} likes`}
                        </span>
                      </div>
                      <div>
                        <FontAwesomeIcon
                          icon={faComments}
                          className='fa'
                          onClick={() => handleComment(post)}
                        />
                        {post.comments.length === 1 &&
                          `${post.comments.length} comment`}
                        {post.comments.length > 1 &&
                          `${post.comments.length} comments`}
                      </div>
                    </div>
                  </div>
                  {post.comments.length > 0 && (
                    <div>
                      <FontAwesomeIcon
                        icon={showComments !== i ? faCaretDown : faCaretUp}
                        className='fa center caret'
                        onClick={() => {
                          showComments === i
                            ? setShowComments(-1)
                            : setShowComments(i);
                        }}
                      />
                      <div
                        className={
                          i === showComments
                            ? 'comments-container comments-container-show'
                            : 'comments-container'
                        }
                      >
                        <Comments
                          post={post}
                          removeComment={removeComment}
                          fetchUserPosts={fetchUserPosts}
                          commentDeleteModalIsOpen={commentDeleteModalIsOpen}
                          setCommentDeleteModalIsOpen={
                            setCommentDeleteModalIsOpen
                          }
                          commentToDelete={commentToDelete}
                          postOfCommentToDelete={postOfCommentToDelete}
                          editComment={editComment}
                          commentEditModalIsOpen={commentEditModalIsOpen}
                          setCommentEditModalIsOpen={setCommentEditModalIsOpen}
                          commentToEdit={commentToEdit}
                          postOfCommentToEdit={postOfCommentToEdit}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </InfiniteScroll>
        </div>
      </div>
      <ProfileUpdate
        profileImage={profileImage}
        setProfileImage={setProfileImage}
        coverImage={coverImage}
        setCoverImage={setCoverImage}
        username={username}
        setUsername={setUsername}
        about={about}
        setAbout={setAbout}
        name={name}
        setName={setName}
        email={email}
        updatedEmail={updatedEmail}
        setUpdatedEmail={setUpdatedEmail}
        mobile={mobile}
        updatedMobile={updatedMobile}
        setUpdatedMobile={setUpdatedMobile}
        secondMobile={secondMobile}
        setSecondMobile={setSecondMobile}
        statement={statement}
        setStatement={setStatement}
        answer={answer}
        updatedAnswer={updatedAnswer}
        setUpdatedAnswer={setUpdatedAnswer}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        handleSubmit={handleSubmit}
        loading={loading}
        gender={gender}
        setGender={setGender}
        birthday={birthday}
        setBirthday={setBirthday}
        location={location}
        setLocation={setLocation}
        genderWanted={genderWanted}
        setGenderWanted={setGenderWanted}
        relWanted={relWanted}
        setRelWanted={setRelWanted}
        language={language}
        setLanguage={setLanguage}
        maritalStatus={maritalStatus}
        setMaritalStatus={setMaritalStatus}
        numOfChildren={numOfChildren}
        setNumOfChildren={setNumOfChildren}
        drinks={drinks}
        setDrinks={setDrinks}
        smokes={smokes}
        setSmokes={setSmokes}
        nationality={nationality}
        setNationality={setNationality}
        height={height}
        setHeight={setHeight}
        build={build}
        setBuild={setBuild}
        hairColor={hairColor}
        setHairColor={setHairColor}
        hairStyle={hairStyle}
        setHairStyle={setHairStyle}
        hairLength={hairLength}
        setHairLength={setHairLength}
        eyeColor={eyeColor}
        setEyeColor={setEyeColor}
        ethnicity={ethnicity}
        setEthnicity={setEthnicity}
        feetType={feetType}
        setFeetType={setFeetType}
        loves={loves}
        setLoves={setLoves}
        hates={hates}
        setHates={setHates}
        education={education}
        setEducation={setEducation}
        occupation={occupation}
        setOccupation={setOccupation}
        politics={politics}
        setPolitics={setPolitics}
        religion={religion}
        setReligion={setReligion}
        pets={pets}
        setPets={setPets}
        interests={interests}
        setInterests={setInterests}
        music={music}
        setMusic={setMusic}
        foods={foods}
        setFoods={setFoods}
        books={books}
        setBooks={setBooks}
        films={films}
        setFilms={setFilms}
        sports={sports}
        setSports={setSports}
        livesWith={livesWith}
        setLivesWith={setLivesWith}
        roleInLife={roleInLife}
        setRoleInLife={setRoleInLife}
        managesEdu={managesEdu}
        setManagesEdu={setManagesEdu}
        hobbies={hobbies}
        setHobbies={setHobbies}
        marriage={marriage}
        setMarriage={setMarriage}
        income={income}
        setIncome={setIncome}
        ageOfPartner={ageOfPartner}
        setAgeOfPartner={setAgeOfPartner}
        traits={traits}
        setTraits={setTraits}
        changes={changes}
        setChanges={setChanges}
        relocate={relocate}
        setRelocate={setRelocate}
        treatSelf={treatSelf}
        setTreatSelf={setTreatSelf}
        sexLikes={sexLikes}
        setSexLikes={setSexLikes}
        sexFrequency={sexFrequency}
        setSexFrequency={setSexFrequency}
        vaccinated={vaccinated}
        setVaccinated={setVaccinated}
        loadingCoverImg={loadingCoverImg}
        loadingProfileImg={loadingProfileImg}
        setLoadingProfileImg={setLoadingProfileImg}
        profileImageUpdateModalIsOpen={profileImageUpdateModalIsOpen}
        setProfileImageUpdateModalIsOpen={setProfileImageUpdateModalIsOpen}
        checkInfoExists={checkInfoExists}
        newCoverImages={newCoverImages}
        setNewCoverImages={setNewCoverImages}
        newProfileImages={newProfileImages}
        setNewProfileImages={setNewProfileImages}
      />
      {user.coverImage && user.coverImage.url && (
        <>
          <CropCover
            cropCoverModalIsOpen={cropCoverModalIsOpen}
            setCropCoverModalIsOpen={setCropCoverModalIsOpen}
            coverImage={coverImage}
            setCoverImage={setCoverImage}
            imageUrl={user.coverImage.url}
            crop={crop}
            setCrop={setCrop}
            croppedCover={croppedCover}
            setCroppedCover={setCroppedCover}
            coverImageCropped={coverImageCropped}
            setCoverImageCropped={setCoverImageCropped}
          />
          <LargeCoverImage
            coverImageModalIsOpen={coverImageModalIsOpen}
            setCoverImageModalIsOpen={setCoverImageModalIsOpen}
            imageUrl={user.coverImage.url}
            images={user.coverPhotos}
          />
        </>
      )}
      {user.profileImage && user.profileImage.url && (
        <>
          <CropProfilePic
            cropModalIsOpen={cropModalIsOpen}
            setCropModalIsOpen={setCropModalIsOpen}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            imageUrl={user.profileImage.url}
            crop={crop}
            setCrop={setCrop}
            croppedProfile={croppedProfile}
            setCroppedProfile={setCroppedProfile}
            profileImageCropped={profileImageCropped}
            setProfileImageCropped={setProfileImageCropped}
            setDetecting={setDetecting}
            detectfaces={detectfaces}
          />

          <LargeProfileImage
            profileImageModalIsOpen={profileImageModalIsOpen}
            setProfileImageModalIsOpen={setProfileImageModalIsOpen}
            images={user.profilePhotos}
            setDetecting={setDetecting}
            detectfaces={detectfaces}
          />
        </>
      )}
      <AddComment
        commentModalIsOpen={commentModalIsOpen}
        setCommentModalIsOpen={setCommentModalIsOpen}
        comment={comment}
        setComment={setComment}
        uploading={uploading}
        addComment={addComment}
        image={image}
        handleImage={handleImage}
        loadingImg={loadingImg}
      />
      <SinglePost
        postModalIsOpen={postModalIsOpen}
        setPostModalIsOpen={setPostModalIsOpen}
        post={currentPost}
        fetchUserPosts={fetchUserPosts}
      />
      <ShowLikes
        likesModalIsOpen={likesModalIsOpen}
        setLikesModalIsOpen={setLikesModalIsOpen}
        post={currentPost}
      />
      <PostDelete
        postDeleteModalIsOpen={postDeleteModalIsOpen}
        setPostDeleteModalIsOpen={setPostDeleteModalIsOpen}
        postToDelete={postToDelete}
        fetchUserPosts={fetchUserPosts}
        fetchUserTotalPosts={fetchUserTotalPosts}
        fetchUserPoints={fetchUserPoints}
        fetchPhotos={fetchPhotos}
      />
      <ProfileProgress
        progress={progress}
        progressModalIsOpen={progressModalIsOpen}
        setProgressModalIsOpen={setProgressModalIsOpen}
        page='profile'
      />
      <Verify
        verifyModalIsOpen={verifyModalIsOpen}
        setVerifyModalIsOpen={setVerifyModalIsOpen}
        uploading={uploading}
        setUploading={setUploading}
        verifImg={verifImg}
        setVerifImg={setVerifImg}
        loadingImg={loadingImg}
        setLoadingImg={setLoadingImg}
      />
      <Reauthenticate
        reauthenticateModalIsOpen={reauthenticateModalIsOpen}
        setReauthenticateModalIsOpen={setReauthenticateModalIsOpen}
        updatedMobile={updatedMobile}
        updatedEmail={updatedEmail}
        updatedAnswer={updatedAnswer}
        reauthMobile={reauthMobile}
        setReauthMobile={setReauthMobile}
        showOTP={showOTP}
        setShowOTP={setShowOTP}
        OTP={OTP}
        setOTP={setOTP}
        loadingReauth={loadingReauth}
        setLoadingReauth={setLoadingReauth}
      />
      <LargePostImage
        postImageModalIsOpen={postImageModalIsOpen}
        setPostImageModalIsOpen={setPostImageModalIsOpen}
        post={currentPost}
        fetchUserPosts={fetchUserPosts}
        fetchPhotos={fetchPhotos}
      />
    </div>
  );
};

export default Profile;
