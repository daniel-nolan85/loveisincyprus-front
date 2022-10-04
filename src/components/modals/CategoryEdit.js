import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const CategoryEdit = ({
  categoryEditModalIsOpen,
  setCategoryEditModalIsOpen,
  categoryToEdit,
  updateCategory,
  loading,
  setLoading,
  loadCategories,
}) => {
  const [name, setName] = useState(categoryToEdit.name);

  let { token } = useSelector((state) => state.user);

  const editCategory = async (e, category) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(category.slug, { name }, token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.name} has been updated`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setCategoryEditModalIsOpen(false);
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

  const categoryForm = () => (
    <div className='form-box category update'>
      <div className='button-box'>
        <p className='form-header'>Update Category</p>
      </div>
      <form>
        <input
          type='text'
          className='input-field'
          placeholder='Name'
          defaultValue={categoryToEdit.name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
          // disabled={loading}
        />
        <button
          onClick={(e) => editCategory(e, categoryToEdit)}
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
      isOpen={categoryEditModalIsOpen}
      onRequestClose={() => setCategoryEditModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {categoryForm()}
    </Modal>
  );
};

export default CategoryEdit;
