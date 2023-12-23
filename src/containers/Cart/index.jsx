import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getAllProducts } from '../../api/products';
import { getOneUser } from '../../api/users';
import { setActiveCart } from '../../redux/userSlice';
import { buyCart, newCart } from '../../redux/cartsSlice';
import ErrorPage from 'Containers/ErrorPage';
import ProductList from 'Components/ProductList';
import BackRow from 'Components/BackRow';
import Spinner from 'Components/Spinner';

import './index.scss';

const Cart = () => {
  const user = useSelector((state) => state.user);
  const carts = useSelector((state) => state.carts);
  const { id } = useParams();
  const [cartUser, setCartUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [cartPage, setCartPage] = useState(0);

  const [error, setError] = useState(false);
  const [message, setMessage] = useState('noCart');

  const dispatch = useDispatch();

  const getCartData = async () => {
    try {
      const userResponse = await getOneUser(id);
      const productsResponse = await getAllProducts();
      const userCart = carts.filter(
        (item) => item.userId === parseInt(id),
      );

      if (userCart && userCart.length > 0) {
        const cartProducts = userCart[cartPage].products.map(
          (cartItem) => {
            const productDetails = productsResponse.data.find(
              (product) => product.id === cartItem.productId,
            );
            return {
              ...productDetails,
              quantity: cartItem.quantity,
            };
          },
        );
        setUserCart(userCart);
        if (userResponse.data.id === user.id) {
          setCartUser(user);
        } else {
          setCartUser(userResponse.data);
        }
        setCartItems(cartProducts);
      } else {
        if (userResponse.data) {
          setCartItems([]);
          setCartUser(userResponse.data);
        } else {
          setError(true);
        }
      }
    } catch (error) {
      setMessage('wrong');
      setError(true);
    }
  };

  const buyCartItems = () => {
    try {
      dispatch(
        buyCart({ userId: id, cartId: userCart[cartPage].id }),
      );
      toast.success(
        `You just buy ${cartUser.name.firstname} ${cartUser.name.lastname} cart!`,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        },
      );
    } catch (error) {
      setMessage('wrong');
      setError(true);
    }
  };

  const increaseCart = () => {
    try {
      setCartUser(null);
      if (userCart.length <= cartPage + 1) {
        setCartPage(0);
      } else {
        setCartPage(cartPage + 1);
      }
    } catch (error) {
      setMessage('wrong');
      setError(true);
    }
  };

  const decreaseCart = () => {
    try {
      setCartUser(null);
      if (userCart.length === 0) {
        setCartPage(userCart.length - 1);
      } else {
        setCartPage(
          cartPage === 0 ? userCart.length - 1 : cartPage - 1,
        );
      }
    } catch (error) {
      setMessage('wrong');
      setError(true);
    }
  };

  const setCart = () => {
    try {
      dispatch(setActiveCart({ cartPage }));
      toast.success(`Cart ${cartPage + 1} is now active`, {
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

  const createCart = () => {
    try {
      dispatch(newCart({ id: parseInt(id) }));
      setCartPage(userCart.length);
    } catch (error) {
      setMessage('wrong');
      setError(true);
    }
  };

  useEffect(() => {
    getCartData();
  }, [carts, cartPage]);

  useEffect(() => {
    setCartUser(null);
    getCartData();
  }, [id]);

  if (error) {
    return (
      <>
        <BackRow page={'Cart'} />
        <ErrorPage message={message} />
      </>
    );
  }

  return (
    <>
      <BackRow page={'Cart'} />
      <div className="cart">
        {cartUser && (
          <div className="cart__header">
            <div className="cart__img">
              <img
                src={`https://robohash.org/${cartUser.username}`}
                alt=""
              />
            </div>
            <div className="cart__user">
              <h2>
                <Link
                  className="link--primary"
                  to={`/profile/${cartUser.id}`}>
                  {cartUser.name.firstname} {cartUser.name.lastname}
                </Link>
              </h2>
              <p>{cartUser.username}</p>
              <p>{cartUser.email}</p>
              {user.id == id && (
                <button onClick={() => createCart()}>New cart</button>
              )}
            </div>
          </div>
        )}
        {cartUser ? (
          <>
            <div className="cart__activeCart">
              {userCart.length > 1 && (
                <button onClick={() => decreaseCart()}>
                  <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </button>
              )}
              {cartPage === user.activeCart && user.id == id ? (
                <h3>
                  This is your active cart ({cartPage + 1}/
                  {userCart.length})
                </h3>
              ) : (
                userCart.length > 0 && (
                  <h3>
                    This is cart {cartPage + 1}/{userCart.length}
                  </h3>
                )
              )}
              {userCart.length > 1 && (
                <button onClick={() => increaseCart()}>
                  <FontAwesomeIcon icon={faArrowRight} size="lg" />
                </button>
              )}
            </div>
            {cartUser.id === user.id ? (
              <>
                {cartPage !== user.activeCart && (
                  <button
                    className="cart__button"
                    onClick={() => setCart()}>
                    Activate cart
                  </button>
                )}
                {cartPage === user.activeCart ? (
                  <ProductList
                    products={cartItems}
                    remove={true}
                    page={'cart'}
                  />
                ) : (
                  <ProductList
                    products={cartItems}
                    remove={false}
                    page={'cart'}
                  />
                )}
              </>
            ) : (
              <ProductList
                products={cartItems}
                remove={false}
                page={'cart'}
              />
            )}

            {cartItems.length > 0 && (
              <div className="cart__buy">
                <b>
                  Cart Total: $
                  {cartItems.reduce((total, item) => {
                    return total + item.price * item.quantity;
                  }, 0)}
                </b>
                <button
                  className="cart__button"
                  onClick={() => buyCartItems()}>
                  Buy Cart
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="cart__spinner">
            <Spinner />
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default Cart;
