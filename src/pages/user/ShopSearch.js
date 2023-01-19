import React, { useState, useEffect } from 'react';
import {
  getProductsByCount,
  fetchProductsByFilter,
} from '../../functions/product';
import { getCategories } from '../../functions/category';
import { getSubs } from '../../functions/sub';
import { useSelector, useDispatch } from 'react-redux';
import ProductInfo from '../../components/cards/ProductInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faMagnifyingGlass,
  faEuroSign,
  faTag,
  faStar,
  faTags,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { Menu, Slider, Checkbox } from 'antd';
import Star from '../../components/forms/Star';
import ShopSearchMobile from '../../components/modals/ShopSearchMobile';

const { SubMenu } = Menu;

const ShopSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState('');
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState('');
  const [shopSearchModalIsOpen, setShopSearchModalIsOpen] = useState(false);

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    loadAllProducts();
    getCategories().then((res) => setCategories(res.data));
    getSubs().then((res) => setSubs(res.data));
  }, []);

  useEffect(() => {
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setSub('');
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  useEffect(() => {
    fetchProducts({ price });
  }, [ok]);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  const handleChange = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: e.target.value },
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/shop/search?${text}`);
  };

  const handleSlider = (value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setCategoryIds([]);
    setStar('');
    setSub('');
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const showStars = () => (
    <div className='search-group'>
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  const handleStarClick = (num) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub('');
    fetchProducts({ stars: num });
  };

  const showCategories = () =>
    categories.map((c) => (
      <div className='search-group' key={c._id}>
        <Checkbox
          value={c._id}
          name='category'
          onChange={handleCheck}
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
      </div>
    ));

  const handleCheck = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setStar('');
    setSub('');

    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }
    setCategoryIds(inTheState);
    fetchProducts({ category: inTheState });
  };

  const showSubs = () => (
    <div className='search-group'>
      {subs.map((s) => (
        <button key={s._id} onClick={() => handleSub(s)} className='badge'>
          {s.name}
        </button>
      ))}
    </div>
  );

  const handleSub = (sub) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setStar('');
    setCategoryIds([]);
    setSub(sub);
    fetchProducts({ sub });
  };

  return (
    <div className='container search-container'>
      <div className='left-sidebar search'>
        <div className='shortcut-links'>
          <form onSubmit={handleSearch}>
            <div className='search-box'>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                onClick={handleSearch}
              />
              <input
                type='search'
                placeholder='Search Products'
                onChange={handleChange}
                value={text}
              />
            </div>
            <input type='submit' hidden />
          </form>

          <Menu mode='inline' defaultOpenKeys={['1', '2', '3', '4']}>
            <SubMenu
              key='1'
              title={
                <span>
                  {<FontAwesomeIcon icon={faEuroSign} className='fa' />}
                  Price
                </span>
              }
            >
              <div>
                <Slider
                  tipFormatter={(v) => `€${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max='200'
                />
              </div>
            </SubMenu>
            <SubMenu
              key='2'
              title={
                <span>
                  <FontAwesomeIcon icon={faStar} className='fa' />
                  Rating
                </span>
              }
            >
              {showStars()}
            </SubMenu>
            <SubMenu
              key='3'
              title={
                <span>
                  <FontAwesomeIcon icon={faTag} className='fa' />
                  Categories
                </span>
              }
            >
              {showCategories()}
            </SubMenu>
            <SubMenu
              key='4'
              title={
                <span>
                  <FontAwesomeIcon icon={faTags} className='fa' />
                  Sub-Categories
                </span>
              }
            >
              {showSubs()}
            </SubMenu>
          </Menu>
        </div>
      </div>
      <div className='admin-main-content'>
        <div className='mobile-search'>
          <form onSubmit={handleSearch}>
            <div className='search-box'>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                onClick={handleSearch}
              />
              <input
                type='search'
                placeholder='Search Products'
                onChange={handleChange}
                value={text}
              />
            </div>
            <input type='submit' hidden />
          </form>
          <button
            onClick={() => setShopSearchModalIsOpen(!shopSearchModalIsOpen)}
            type='button'
            className='submit-btn mobile-search-btn'
          >
            <FontAwesomeIcon icon={faFilter} className='fa' />
            Filter
          </button>
        </div>
        <div className='product-cards'>
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className='fa' spin />
          ) : (
            <>
              {products.length < 1 && (
                <h1 className='center'>
                  No products match your current search
                </h1>
              )}
              {products &&
                products.map((product) => (
                  <div className='product-card' key={product._id}>
                    <ProductInfo product={product} />
                  </div>
                ))}
            </>
          )}
        </div>
        <ShopSearchMobile
          shopSearchModalIsOpen={shopSearchModalIsOpen}
          setShopSearchModalIsOpen={setShopSearchModalIsOpen}
          products={products}
          setProducts={setProducts}
        />
      </div>
    </div>
  );
};

export default ShopSearch;
