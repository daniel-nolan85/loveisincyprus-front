import React from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const CouponDelete = ({
  couponDeleteModalIsOpen,
  setCouponDeleteModalIsOpen,
  couponToDelete,
  removeCoupon,
  loading,
  setLoading,
  loadCoupons,
}) => {
  let { user } = useSelector((state) => ({ ...state }));

  const deleteCoupon = async (coupon) => {
    console.log(coupon);
    setLoading(true);
    removeCoupon(coupon._id, user.token)
      .then((res) => {
        setLoading(false);
        toast.error(`${res.data.name} has been deleted`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setCouponDeleteModalIsOpen(false);
        loadCoupons();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
    },
  };

  const { name } = couponToDelete;

  return (
    <Modal
      isOpen={couponDeleteModalIsOpen}
      onRequestClose={() => setCouponDeleteModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to delete {name}?</h1>
        <br />
        <button
          className='submit-btn'
          onClick={() => deleteCoupon(couponToDelete)}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, delete'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setCouponDeleteModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default CouponDelete;
