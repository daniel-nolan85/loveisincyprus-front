import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
import defaultProfile from '../../assets/defaultProfile.png';
import VerifDisapprove from '../../components/modals/VerifDisapprove';
import VerifApprove from '../../components/modals/VerifApprove';

const VerifSubmissions = ({ history }) => {
  const [verifs, setVerifs] = useState([]);
  const [verifDisapproveModalIsOpen, setVerifDisapproveModalIsOpen] =
    useState(false);
  const [verifApproveModalIsOpen, setVerifApproveModalIsOpen] = useState(false);
  const [currentVerif, setCurrentVerif] = useState({});
  const [reason, setReason] = useState('');

  const { token, _id, canVerify } = useSelector((state) => state.user);

  useEffect(() => {
    if (!canVerify) {
      history.push('/admin/dashboard');
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchVerifs();
    }
  }, [token]);

  const fetchVerifs = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}/fetch-verifs`,
        { _id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setVerifs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDisapprove = (verif) => {
    setVerifDisapproveModalIsOpen(true);
    setCurrentVerif(verif);
  };

  const handleApprove = (verif) => {
    setVerifApproveModalIsOpen(true);
    setCurrentVerif(verif);
  };

  return (
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        <div className='admin-cards'>
          {verifs.length > 0 ? (
            verifs.map((verif) => (
              <div className='post-container' key={verif._id}>
                <div className='post-row'>
                  <div className='user-profile'>
                    <Link
                      to={
                        _id === verif.postedBy._id
                          ? `/user/profile/${_id}`
                          : `/user/${verif.postedBy._id}`
                      }
                    >
                      <img
                        src={
                          verif.postedBy.profileImage
                            ? verif.postedBy.profileImage.url
                            : defaultProfile
                        }
                        alt={`${
                          verif.postedBy.username || verif.postedBy.name
                        }'s profile picture`}
                      />
                    </Link>
                    <div>
                      <Link
                        to={
                          _id === verif.postedBy._id
                            ? `/user/profile/${_id}`
                            : `/user/${verif.postedBy._id}`
                        }
                      >
                        <p>{verif.postedBy.username || verif.postedBy.name}</p>
                      </Link>
                      <span>{moment(verif.createdAt).fromNow()}</span>
                    </div>
                  </div>
                  <div className='post-icons'>
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      className='fa trash'
                      onClick={() => handleDisapprove(verif)}
                    />
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className='fa edit ml'
                      onClick={() => handleApprove(verif)}
                    />
                  </div>
                </div>
                {verif.image && (
                  <img
                    src={verif.image}
                    alt={`${
                      verif.postedBy.username || verif.postedBy.name
                    }'s advertisement`}
                    className='post-img'
                    style={{ marginTop: '10px' }}
                  />
                )}
              </div>
            ))
          ) : (
            <h1 className='center'>
              There are not currently any verification submissions to review.
            </h1>
          )}
        </div>
        <VerifDisapprove
          verifDisapproveModalIsOpen={verifDisapproveModalIsOpen}
          setVerifDisapproveModalIsOpen={setVerifDisapproveModalIsOpen}
          currentVerif={currentVerif}
          reason={reason}
          setReason={setReason}
          fetchVerifs={fetchVerifs}
        />
        <VerifApprove
          verifApproveModalIsOpen={verifApproveModalIsOpen}
          setVerifApproveModalIsOpen={setVerifApproveModalIsOpen}
          currentVerif={currentVerif}
          fetchVerifs={fetchVerifs}
        />
      </div>
    </div>
  );
};

export default VerifSubmissions;
