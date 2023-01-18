import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories, getCategorySubs } from '../../functions/category';
import {
  createProduct,
  getProductsByCount,
  removeProduct,
  updateProduct,
} from '../../functions/product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faPaperPlane,
  faEdit,
  faTrashCan,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import FileUpload from '../../components/forms/FileUpload';
import ProductDelete from '../../components/modals/ProductDelete';
import ProductEdit from '../../components/modals/ProductEdit';
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
  weight: '',
  approved: false,
};

const Product = ({ history }) => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [products, setProducts] = useState([]);
  const [productDeleteModalIsOpen, setProductDeleteModalIsOpen] =
    useState(false);
  const [productToDelete, setProductToDelete] = useState({});
  const [productEditModalIsOpen, setProductEditModalIsOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});
  const [query, setQuery] = useState('');

  const { token, canProducts, role } = useSelector((state) => state.user);

  useEffect(() => {
    if (!canProducts) {
      history.push('/admin/dashboard');
    }
  }, []);

  useEffect(() => {
    loadCategories();
    loadAllProducts();
  }, []);

  useEffect(() => {
    if (role === 'main-admin') {
      values.approved = true;
      setValues({ ...values });
    }
    console.log(values);
  }, [role]);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const loadAllProducts = () => {
    getProductsByCount(100)
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(values);
    createProduct(values, token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.success(`${res.data.title} has been created`, {
          position: toast.POSITION.TOP_CENTER,
        });
        loadAllProducts();
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

  const handleDelete = async (product) => {
    setProductDeleteModalIsOpen(true);
    setProductToDelete(product);
  };

  const handleEdit = async (slug) => {
    setProductEditModalIsOpen(true);
    setProductToEdit(slug);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value.toLowerCase());
  };

  const searched = (query) => (p) => p.title.toLowerCase().includes(query);

  const {
    title,
    description,
    price,
    category,
    categories,
    subs,
    quantity,
    images,
    weight,
  } = values;

  const productForm = () => (
    <div className='form-box category product'>
      <div className='button-box'>
        <p className='form-header'>Create Product</p>
      </div>
      {/* {JSON.stringify(values.images)} */}
      <FileUpload values={values} setValues={setValues} />
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
          name='weight'
          className='input-field'
          placeholder='Weight'
          value={weight}
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
            style={{ width: '100%' }}
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
    <div className='container search-container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        {productForm()}
        <div className='search-box'>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='fa' />
          <input
            type='search'
            placeholder='Search Products'
            onChange={handleSearch}
            value={query}
          />
        </div>
        <div className='admin-cards'>
          {products.filter(searched(query)).map((p) => (
            <div className='admin-card' key={p._id}>
              <div>
                <h3>{p.title}</h3>
                <p>
                  {p.description && p.description.length > 100
                    ? `${p.description.substring(0, 100)}...`
                    : p.description}
                </p>
              </div>
              {p.images.length > 0 && (
                <img
                  src={p.images[0].url}
                  alt={`${p.title} image`}
                  className='admin-post-img'
                />
              )}
              <FontAwesomeIcon
                icon={faTrashCan}
                className='fa trash'
                onClick={() => handleDelete(p)}
              />
              <FontAwesomeIcon
                icon={faEdit}
                className='fa update'
                onClick={() => handleEdit(p.slug)}
              />
            </div>
          ))}
        </div>
        <ProductDelete
          productDeleteModalIsOpen={productDeleteModalIsOpen}
          setProductDeleteModalIsOpen={setProductDeleteModalIsOpen}
          productToDelete={productToDelete}
          removeProduct={removeProduct}
          loading={loading}
          setLoading={setLoading}
          loadAllProducts={loadAllProducts}
        />
        <ProductEdit
          productEditModalIsOpen={productEditModalIsOpen}
          setProductEditModalIsOpen={setProductEditModalIsOpen}
          productToEdit={productToEdit}
          updateProduct={updateProduct}
          loading={loading}
          setLoading={setLoading}
          loadAllProducts={loadAllProducts}
        />
      </div>
    </div>
  );
};

export default Product;
