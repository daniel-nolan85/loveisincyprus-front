import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  createCategory,
  getCategories,
  removeCategory,
  updateCategory,
} from '../../functions/category';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faPaperPlane,
  faEdit,
  faTrashCan,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import CategoryDelete from '../../components/modals/CategoryDelete';
import CategoryEdit from '../../components/modals/CategoryEdit';

const Category = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryDeleteModalIsOpen, setCategoryDeleteModalIsOpen] =
    useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState({});
  const [categoryEditModalIsOpen, setCategoryEditModalIsOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState({});
  const [query, setQuery] = useState('');

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`${res.data.name} has been created`, {
          position: toast.POSITION.TOP_CENTER,
        });
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

  const handleDelete = async (category) => {
    setCategoryDeleteModalIsOpen(true);
    setCategoryToDelete(category);
  };

  const handleEdit = async (category) => {
    setCategoryEditModalIsOpen(true);
    setCategoryToEdit(category);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value.toLowerCase());
  };

  const searched = (query) => (c) => c.name.toLowerCase().includes(query);

  const categoryForm = () => (
    <div className='form-box category'>
      <div className='button-box'>
        <p className='form-header'>Create Category</p>
      </div>
      <form>
        <input
          type='text'
          className='input-field'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
          // disabled={loading}
        />
        <button
          onClick={handleSubmit}
          type='submit'
          className='submit-btn'
          //   disabled={password.length < 6 || loading}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} className='fa' />
          )}
          Create
        </button>
      </form>
    </div>
  );

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        {categoryForm()}
        <div className='search-box'>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='fa' />
          <input
            type='search'
            placeholder='Search Categories'
            onChange={handleSearch}
            value={query}
          />
        </div>
        <div className='admin-cards'>
          {categories.filter(searched(query)).map((c) => (
            <div className='admin-card' key={c._id}>
              <h3>{c.name}</h3>
              <FontAwesomeIcon
                icon={faTrashCan}
                className='fa trash'
                onClick={() => handleDelete(c)}
              />
              <FontAwesomeIcon
                icon={faEdit}
                className='fa update'
                onClick={() => handleEdit(c)}
              />
            </div>
          ))}
        </div>
        <CategoryDelete
          categoryDeleteModalIsOpen={categoryDeleteModalIsOpen}
          setCategoryDeleteModalIsOpen={setCategoryDeleteModalIsOpen}
          categoryToDelete={categoryToDelete}
          removeCategory={removeCategory}
          loading={loading}
          setLoading={setLoading}
          loadCategories={loadCategories}
        />
        <CategoryEdit
          categoryEditModalIsOpen={categoryEditModalIsOpen}
          setCategoryEditModalIsOpen={setCategoryEditModalIsOpen}
          categoryToEdit={categoryToEdit}
          updateCategory={updateCategory}
          loading={loading}
          setLoading={setLoading}
          loadCategories={loadCategories}
        />
      </div>
    </div>
  );
};

export default Category;
