import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useParams } from 'react-router-dom';

const Rating = ({ children }) => {
  const [ratingModalIsOpen, setRatingModalIsOpen] = useState(false);

  const { token } = useSelector((state) => state.user) || {};

  const history = useHistory();
  const { slug } = useParams();

  const handleModal = () => {
    if (token) {
      setRatingModalIsOpen(true);
    } else {
      history.push({
        pathname: '/authentication',
        state: { from: `/product/${slug}` },
      });
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        <div className='tooltip'>
          <FontAwesomeIcon icon={faStar} className='fa star' />,
          <span className='tooltip-text'>
            {token ? 'Leave a Rating' : 'Login to Leave a Rating'}
          </span>
        </div>
      </div>
      <Modal
        title='Leave your rating'
        centered
        visible={ratingModalIsOpen}
        onOk={() => {
          setRatingModalIsOpen(false);
          toast.success('Thanks for leaving us your feedback', {
            position: toast.POSITION.TOP_CENTER,
          });
        }}
        onCancel={() => setRatingModalIsOpen(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default Rating;
