import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const ProductApprove = ({
  productApproveModalIsOpen,
  setProductApproveModalIsOpen,
  currentProduct,
  fetchProducts,
  loading,
  setLoading,
  fetchProductsForReview,
}) => {
  let { token } = useSelector((state) => state.user);

  const approveProduct = async (product) => {
    setLoading(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}/approve-product`,
        { product },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        toast.success(
          `You have approved this product. It will now be displayed in the store`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
        fetchProducts();
        setProductApproveModalIsOpen(false);
        fetchProductsForReview();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
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
    overlay: {
      position: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0, .8)',
      zIndex: '1000',
      overflowY: 'auto',
    },
  };

  const { title, description, images } = currentProduct;

  return (
    <Modal
      isOpen={productApproveModalIsOpen}
      onRequestClose={() => setProductApproveModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to approve this product?</h1>
        <br />
        <p>{title}</p>
        <br />
        <p>{description}</p>
        {images && images.length > 0 && (
          <div className='match-images'>
            <img src={images[0].url} alt={`${title}'s main image`} />
          </div>
        )}
        <br />
        <button
          className='submit-btn'
          onClick={() => approveProduct(currentProduct)}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, approve'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setProductApproveModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default ProductApprove;
