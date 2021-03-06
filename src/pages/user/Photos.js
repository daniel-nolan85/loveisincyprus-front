import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LeftSidebar from '../../components/user/LeftSidebar';
import RightSidebar from '../../components/user/RightSidebar';
import LargeImage from '../../components/modals/LargeImage';
import ImagesDenied from '../../components/modals/ImagesDenied';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [thisUser, setThisUser] = useState({});
  const [imageModalIsOpen, setImageModalIsOpen] = useState(false);
  const [image, setImage] = useState('');
  const [visitorPhotos, setVisitorPhotos] = useState(0);
  const [deniedModalIsOpen, setDeniedModalIsOpen] = useState(false);

  let { user } = useSelector((state) => ({ ...state }));

  const { userId } = useParams();

  useEffect(() => {
    fetchUser();
    fetchUsersPhotos();
    visitorPhotosCount();
  }, [userId]);

  const fetchUser = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/user/${userId}`,
        { user },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setThisUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUsersPhotos = () => {
    axios
      .post(
        `${process.env.REACT_APP_API}/users-photos`,
        {
          userId,
          user,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log('res.data => ', res.data);
        setPhotos(res.data);
      });
  };

  const getThisImage = (photo) => {
    setImage(photo);
  };

  const visitorPhotosCount = async () => {
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/visitor-photos`,
          { user },
          {
            headers: {
              authtoken: user.token,
            },
          }
        )
        .then((res) => {
          console.log('visitorPhotos res => ', res.data);
          if (res.data < 2) {
            setDeniedModalIsOpen(true);
          }
          setVisitorPhotos(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const { name, email } = thisUser;

  // console.log('photos => ', photos);

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='main-content'>
        {/* <h1 className='center'>
          {photos[0].length > 0 || photos[1].length > 0 || photos[2].length > 0
            ? //   {photos.length > 0
              'Photo Gallery'
            : `${name || email} has not uploaded any photos yet`}
        </h1> */}
        <input type='radio' name='Photos' id='check1' defaultChecked />
        <input type='radio' name='Photos' id='check2' />
        <input type='radio' name='Photos' id='check3' />
        <div className='photos-top-content'>
          <label htmlFor='check1' className='submit-btn'>
            Profile Images
          </label>
          <label htmlFor='check2' className='submit-btn'>
            Cover Images
          </label>
          <label htmlFor='check3' className='submit-btn'>
            Uploads
          </label>
        </div>
        <div className='photo-gallery'>
          {photos[0] &&
            photos[0].map((photo, i) => (
              <div className='pic profile' key={i}>
                <img
                  src={photo}
                  alt=''
                  style={{ cursor: 'zoom-in' }}
                  onClick={() => {
                    getThisImage(photo);
                    setImageModalIsOpen(true);
                  }}
                  className={visitorPhotos < 2 ? 'blur' : ''}
                />
              </div>
            ))}
          {photos[1] &&
            photos[1].map((photo, i) => (
              <div className='pic cover' key={i}>
                <img
                  src={photo}
                  alt=''
                  style={{ cursor: 'zoom-in' }}
                  onClick={() => {
                    getThisImage(photo);
                    setImageModalIsOpen(true);
                  }}
                  className={visitorPhotos < 2 ? 'blur' : ''}
                />
              </div>
            ))}
          {photos[2] &&
            photos[2].map((photo, i) => (
              <div className='pic upload' key={i}>
                <img
                  src={photo}
                  alt=''
                  style={{ cursor: 'zoom-in' }}
                  onClick={() => {
                    getThisImage(photo);
                    setImageModalIsOpen(true);
                  }}
                  className={visitorPhotos < 2 ? 'blur' : ''}
                />
              </div>
            ))}
        </div>
        <LargeImage
          imageModalIsOpen={imageModalIsOpen}
          setImageModalIsOpen={setImageModalIsOpen}
          imageUrl={image}
        />
        <ImagesDenied
          deniedModalIsOpen={deniedModalIsOpen}
          setDeniedModalIsOpen={setDeniedModalIsOpen}
          visitorPhotos={visitorPhotos}
        />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Photos;
