import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories, getCategorySubs } from '../../functions/category';
import { createProduct } from '../../functions/product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faPaperPlane,
  faEdit,
  faTrashCan,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

import { Select } from 'antd';

const { Option } = Select;

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  categories: [],
  subs: [],
  quantity: '',
  images: [],
};

const Product = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const {
    title,
    description,
    price,
    category,
    categories,
    subs,
    quantity,
    images,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.success(`${res.data.title} has been created`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setValues(initialState);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    // console.log('clicked category => ', e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      // console.log('sub options on category click => ', res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  // const handleSubChange = (e) => {
  //   setValues({ ...values, subs: [...subs, e.target.value] });
  //   console.log(subs);
  // };

  const productForm = () => (
    <div className='form-box category product'>
      <div className='button-box'>
        <p className='form-header'>Create Product</p>
      </div>
      <form>
        <input
          type='text'
          name='title'
          className='input-field'
          placeholder='Title'
          value={title}
          onChange={handleChange}
          autoFocus
        />
        <input
          type='text'
          name='description'
          className='input-field'
          placeholder='Description'
          value={description}
          onChange={handleChange}
        />
        <input
          type='number'
          name='price'
          className='input-field'
          placeholder='Price'
          value={price}
          onChange={handleChange}
        />
        <input
          type='number'
          name='quantity'
          className='input-field'
          placeholder='Quantity'
          value={quantity}
          onChange={handleChange}
        />
        <select
          name='category'
          className='gray'
          onChange={handleCategoryChange}
        >
          <option>Select a category</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
        {showSub && (
          <Select
            mode='multiple'
            // style={{ width: '100%' }}
            placeholder='Select a sub-category'
            value={subs}
            onChange={(value) => setValues({ ...values, subs: value })}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option value={s._id} key={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        )}
        {/* <select
          name='subs'
          className='gray'
          onChange={(e) => {
            setValues({ ...values, subs: [...subs, e.target.value] });
            console.log(subs);
          }}
          onChange={handleSubChange}
          multiple
          value={subs}
        >
          <option>Select a sub-category</option>
          {subOptions.length &&
            subOptions.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
        </select> */}

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
        {productForm()}
        <div className='search-box'>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='fa' />
          <input
            type='search'
            placeholder='Search Products'
            // onChange={handleSearch}
            // value={query}
          />
        </div>
        <div className='admin-cards'>
          {/* {categories.filter(searched(query)).map((c) => (
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
      ))} */}
        </div>
        {/* <CategoryDelete
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
    /> */}
      </div>
    </div>
  );
};

export default Product;
