import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../functions/category';
import { createSub, getSubs, removeSub, updateSub } from '../../functions/sub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faPaperPlane,
  faEdit,
  faTrashCan,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import SubDelete from '../../components/modals/SubDelete';
import SubEdit from '../../components/modals/SubEdit';

const Sub = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [subDeleteModalIsOpen, setSubDeleteModalIsOpen] = useState(false);
  const [subToDelete, setSubToDelete] = useState({});
  const [subEditModalIsOpen, setSubEditModalIsOpen] = useState(false);
  const [subToEdit, setSubToEdit] = useState({});
  const [query, setQuery] = useState('');

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((s) => setSubs(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`${res.data.name} has been created`, {
          position: toast.POSITION.TOP_CENTER,
        });
        loadSubs();
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

  const handleDelete = async (sub) => {
    setSubDeleteModalIsOpen(true);
    setSubToDelete(sub);
  };

  const handleEdit = async (sub) => {
    setSubEditModalIsOpen(true);
    setSubToEdit(sub);
    console.log(sub);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value.toLowerCase());
  };

  const searched = (query) => (s) => s.name.toLowerCase().includes(query);

  const subForm = () => (
    <div className='form-box category'>
      <div className='button-box'>
        <p className='form-header sub'>Create Sub-Category</p>
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
        <select
          name='category'
          className='gray'
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Select a category</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
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
        {subForm()}
        <div className='search-box'>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='fa' />
          <input
            type='search'
            placeholder='Search Sub-Categories'
            onChange={handleSearch}
            value={query}
          />
        </div>
        <br />

        <div className='admin-cards'>
          {subs.filter(searched(query)).map((s) => (
            <div className='admin-card' key={s._id}>
              <h3>{s.name}</h3>
              <FontAwesomeIcon
                icon={faTrashCan}
                className='fa trash'
                onClick={() => handleDelete(s)}
              />
              <FontAwesomeIcon
                icon={faEdit}
                className='fa update'
                onClick={() => handleEdit(s)}
              />
            </div>
          ))}
        </div>
        <SubDelete
          subDeleteModalIsOpen={subDeleteModalIsOpen}
          setSubDeleteModalIsOpen={setSubDeleteModalIsOpen}
          subToDelete={subToDelete}
          removeSub={removeSub}
          loading={loading}
          setLoading={setLoading}
          loadSubs={loadSubs}
        />
        <SubEdit
          subEditModalIsOpen={subEditModalIsOpen}
          setSubEditModalIsOpen={setSubEditModalIsOpen}
          subToEdit={subToEdit}
          updateSub={updateSub}
          loading={loading}
          setLoading={setLoading}
          loadSubs={loadSubs}
          category={category}
          setCategory={setCategory}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default Sub;
