import React from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const ProductDelete = ({
  productDeleteModalIsOpen,
  setProductDeleteModalIsOpen,
  productToDelete,
  removeProduct,
  loading,
  setLoading,
  loadAllProducts,
}) => {
  let { user } = useSelector((state) => ({ ...state }));

  const deleteProduct = async (product) => {
    setLoading(true);
    removeProduct(product.slug, user.token)
      .then((res) => {
        setLoading(false);
        toast.error(`${res.data.title} has been deleted`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setProductDeleteModalIsOpen(false);
        loadAllProducts();
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

  const { title, images } = productToDelete;

  return (
    <Modal
      isOpen={productDeleteModalIsOpen}
      onRequestClose={() => setProductDeleteModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to delete {title}?</h1>
        <br />
        {images && images.length > 0 && (
          <div className='match-images'>
            <img src={images[0].url} alt={`${title} image`} />
          </div>
        )}
        <br />
        <button
          className='submit-btn'
          onClick={() => deleteProduct(productToDelete)}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, delete'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setProductDeleteModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default ProductDelete;
