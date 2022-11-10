import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { getProduct, updateProduct } from '../../functions/product';
import { getCategories, getCategorySubs } from '../../functions/category';
import FileUpload from '../../components/forms/FileUpload';
import { Select } from 'antd';

const { Option } = Select;

Modal.setAppElement('#root');

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  subs: [],
  quantity: '',
  images: [],
};

const ProductEdit = ({
  productEditModalIsOpen,
  setProductEditModalIsOpen,
  productToEdit,
  updateProduct,
  loading,
  setLoading,
  loadAllProducts,
}) => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);

  let { token } = useSelector((state) => state.user);

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      loadProduct();
      loadCategories();
    }
  }, [productToEdit]);

  const loadProduct = () => {
    getProduct(productToEdit).then((p) => {
      setValues({ ...values, ...p.data });
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data);
      });
      let arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
      });
      console.log('arr => ', arr);
      setArrayOfSubs((prev) => arr);
    });
  };

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const editProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubs;

    updateProduct(productToEdit, values, token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.title} has been updated`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setProductEditModalIsOpen(false);
        loadAllProducts();
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
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    setArrayOfSubs([]);
  };

  const { title, description, price, category, subs, quantity, images } =
    values;

  const productForm = () => (
    <div className='form-box product update'>
      <div className='button-box'>
        <p className='form-header'>Update Product</p>
      </div>
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
          value={category._id}
        >
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
        <Select
          mode='multiple'
          style={{ width: '100%' }}
          placeholder='Select a sub-category'
          value={arrayOfSubs}
          onChange={(value) => setArrayOfSubs(value)}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option value={s._id} key={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
        <button onClick={editProduct} type='submit' className='submit-btn'>
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
      height: '600px',
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

  return (
    <Modal
      isOpen={productEditModalIsOpen}
      onRequestClose={() => setProductEditModalIsOpen(false)}
      style={modalStyles}
      contentLabel='Example Modal'
    >
      {productForm()}
    </Modal>
  );
};

export default ProductEdit;
