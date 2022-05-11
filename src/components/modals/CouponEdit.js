import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const CouponEdit = ({
  couponEditModalIsOpen,
  setCouponEditModalIsOpen,
  couponToEdit,
  updateCoupon,
  loading,
  setLoading,
  loadCategories,
}) => {
  const [name, setName] = useState(couponToEdit.name);

  let { user } = useSelector((state) => ({ ...state }));

  const editCoupon = async (e, coupon) => {
    e.preventDefault();
    setLoading(true);
    updateCoupon(coupon.slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.name} has been updated`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setCouponEditModalIsOpen(false);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) {
          toast.error(err.response.data, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  const couponForm = () => (
    <div className='form-box coupon update'>
      <div className='button-box'>
        <p className='form-header'>Update Coupon</p>
      </div>
      <form>
        <input
          type='text'
          className='input-field'
          placeholder='Name'
          defaultValue={couponToEdit.name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
          // disabled={loading}
        />
        <button
          onClick={(e) => editCoupon(e, couponToEdit)}
          type='submit'
          className='submit-btn'
          //   disabled={password.length < 6 || loading}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} className='fa' />
          )}
          Update
        </button>
      </form>
    </div>
  );

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

  return (
    <Modal
      isOpen={couponEditModalIsOpen}
      onRequestClose={() => setCouponEditModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {couponForm()}
    </Modal>
  );
};

export default CouponEdit;
