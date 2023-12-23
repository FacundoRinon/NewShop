import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../redux/cartsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getSingleProduct } from '../../api/products';
import ErrorPage from 'Containers/ErrorPage';
import BackRow from 'Components/BackRow';
import Spinner from 'Components/Spinner';

import './index.scss';

const Product = () => {
  const user = useSelector((state) => state.user);
  const carts = useSelector((state) => state.carts);
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const [error, setError] = useState(false);
  const [message, setMessage] = useState('noProduct');

  const dispatch = useDispatch();

  const getProduct = async () => {
    try {
      const response = await getSingleProduct(id);
      if (response.data) {
        setProduct(response.data);
      } else {
        setError(true);
      }
    } catch (error) {
      setMessage('wrong');
      setError(true);
    }
  };

  const cartAdder = () => {
    try {
      const userCarts = carts.filter((c) => c.userId === user.id);
      const userCart = userCarts[user.activeCart];
      let updatedCart;

      if (userCarts.length > 0) {
        const productIndex = userCart.products.findIndex(
          (p) => p.productId === parseInt(id),
        );
        if (productIndex !== -1) {
          updatedCart = {
            ...userCart,
            products: userCart.products.map((product, index) =>
              index === productIndex
                ? { ...product, quantity: product.quantity + 1 }
                : product,
            ),
          };
        } else {
          updatedCart = {
            ...userCart,
            products: [
              ...userCart.products,
              { productId: parseInt(id), quantity: 1 },
            ],
          };
        }
      } else {
        updatedCart = {
          id: carts.length + 1,
          userId: user.id,
          products: [{ productId: parseInt(id), quantity: 1 }],
        };
      }

      dispatch(addToCart({ updatedCart }));
      toast.success(`${product.title} added to your cart!`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } catch (error) {
      setMessage('wrong');
      setError(true);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (error) {
    return (
      <>
        <BackRow page={'Product'} />
        <ErrorPage message={message} />
      </>
    );
  }

  return (
    <>
      <BackRow page={'Product'} />
      <div className="product">
        {product !== null ? (
          <div className="product__container">
            <div className="product__img">
              <img src={product.image} alt="" />
            </div>
            <div className="product__details">
              <h3>{product.title}</h3>
              <div className="product__category">
                <p>{product.category}</p>
                <small>
                  <FontAwesomeIcon
                    className="product__score"
                    icon={faStar}
                  />
                  {product.rating.rate} ({product.rating.count}{' '}
                  ratings)
                </small>
              </div>
              <div className="product__description">
                <p>{product.description}</p>
              </div>
              <div className="product__price">
                <p>${product.price}</p>
              </div>
              {user && (
                <div className="product__adder">
                  <button onClick={() => cartAdder()}>
                    Add to cart
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="product__loader">
            <Spinner />
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default Product;
