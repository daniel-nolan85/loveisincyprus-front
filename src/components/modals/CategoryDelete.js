import React from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const CategoryDelete = ({
  categoryDeleteModalIsOpen,
  setCategoryDeleteModalIsOpen,
  categoryToDelete,
  removeCategory,
  loading,
  setLoading,
  loadCategories,
}) => {
  let { token } = useSelector((state) => state.user);

  const deleteCategory = async (category) => {
    setLoading(true);
    removeCategory(category.slug, token)
      .then((res) => {
        setLoading(false);
        toast.error(`${res.data.name} has been deleted`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setCategoryDeleteModalIsOpen(false);
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

  const { name } = categoryToDelete;

  return (
    <Modal
      isOpen={categoryDeleteModalIsOpen}
      onRequestClose={() => setCategoryDeleteModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      <div className='match'>
        <h1>Are you sure you want to delete {name}?</h1>
        <p>This will permanently delete all related sub-categories as well</p>
        <br />
        <button
          className='submit-btn'
          onClick={() => deleteCategory(categoryToDelete)}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            'Yes, delete'
          )}
        </button>
        <button
          className='submit-btn trash'
          onClick={() => setCategoryDeleteModalIsOpen(false)}
        >
          No, cancel
        </button>
      </div>
    </Modal>
  );
};

export default CategoryDelete;
