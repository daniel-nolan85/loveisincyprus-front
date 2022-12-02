import React, { useState, useEffect } from 'react';
import LeftSidebar from '../../components/admin/LeftSidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import ProductDisapprove from '../../components/modals/ProductDisapprove';
import ProductApprove from '../../components/modals/ProductApprove';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Card } from 'antd';
import defaultItem from '../../assets/defaultItem.png';
import { Link } from 'react-router-dom';
import { ChatState } from '../../context/ChatProvider';

const ProductReview = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [productApproveModalIsOpen, setProductApproveModalIsOpen] =
    useState(false);
  const [productDisapproveModalIsOpen, setProductDisapproveModalIsOpen] =
    useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [loading, setLoading] = useState(false);

  const { setProductsForReview } = ChatState();

  const { role } = useSelector((state) => state.user);

  useEffect(() => {
    if (role !== 'main-admin') {
      history.push('/admin/dashboard');
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    await axios
      .post(`${process.env.REACT_APP_API}/fetch-products-to-review`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchProductsForReview = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/fetch-products-for-review`)
      .then((res) => {
        console.log('products for review ==> ', res.data);
        setProductsForReview(res.data);
      });
  };

  const handleDisapprove = (product) => {
    setProductDisapproveModalIsOpen(true);
    setCurrentProduct(product);
  };

  const handleApprove = (product) => {
    setProductApproveModalIsOpen(true);
    setCurrentProduct(product);
  };

  return (
    <div className='container'>
      <LeftSidebar />
      <div className='admin-main-content'>
        {products.length > 0 ? (
          products.map((product) => {
            const {
              title,
              description,
              images,
              slug,
              price,
              category,
              subs,
              _id,
              quantity,
              createdAt,
            } = product;

            return (
              <div className='post-container' key={_id}>
                <div className='post-row'>
                  <div className='user-profile'>
                    <span>{moment(createdAt).fromNow()}</span>
                  </div>
                  <div className='post-icons'>
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      className='fa trash'
                      onClick={() => handleDisapprove(product)}
                    />
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className='fa edit ml'
                      onClick={() => handleApprove(product)}
                    />
                  </div>
                </div>
                <div className='small-container single-product'>
                  <div className='row'>
                    <div className='col-2'>
                      {images && images.length ? (
                        <Carousel showArrows autoPlay infiniteLoop>
                          {images.map((i) => (
                            <img src={i.url} key={i.public_id} />
                          ))}
                        </Carousel>
                      ) : (
                        <Card
                          cover={
                            <img src={defaultItem} className='card-image' />
                          }
                        ></Card>
                      )}
                    </div>
                    <div className='col-2'>
                      <Card>
                        <h1>{title}</h1>
                        <br />
                        <h4>€{price}</h4>
                        <br />
                        <p>{description}</p>
                        <div className='cat-links'>
                          <p>Quantity:</p>
                          {quantity}
                        </div>
                        {category && (
                          <div className='cat-links'>
                            <p>Category:</p>
                            <Link to={`/category/${category.slug}`}>
                              {category.name}
                            </Link>
                          </div>
                        )}
                        {subs && (
                          <div className='cat-links'>
                            <p>
                              {subs.length > 1
                                ? 'Sub-Categories:'
                                : 'Sub-Category:'}
                            </p>
                            {subs.map((s) => (
                              <Link to={`/sub/${s.slug}`} key={s._id}>
                                {s.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className='center'>
            There are not currently any new products to review.
          </h1>
        )}
        <ProductDisapprove
          productDisapproveModalIsOpen={productDisapproveModalIsOpen}
          setProductDisapproveModalIsOpen={setProductDisapproveModalIsOpen}
          currentProduct={currentProduct}
          fetchProducts={fetchProducts}
          loading={loading}
          setLoading={setLoading}
          fetchProductsForReview={fetchProductsForReview}
        />
        <ProductApprove
          productApproveModalIsOpen={productApproveModalIsOpen}
          setProductApproveModalIsOpen={setProductApproveModalIsOpen}
          currentProduct={currentProduct}
          fetchProducts={fetchProducts}
          loading={loading}
          setLoading={setLoading}
          fetchProductsForReview={fetchProductsForReview}
        />
      </div>
    </div>
  );
};

export default ProductReview;
