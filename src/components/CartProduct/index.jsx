import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { deleteFromCart } from '../../redux/cartsSlice';

import './index.scss';

const CartProduct = ({ product, remove }) => {
  const user = useSelector((state) => state.user);
  const carts = useSelector((state) => state.carts);

  const productTotal = product.price * product.quantity;

  const dispatch = useDispatch();

  const deleteProduct = () => {
    const userCarts = carts.filter((cart) => cart.userId === user.id);
    const userCart = userCarts[user.activeCart];
    const updatedProducts = userCart.products.filter(
      (item) => item.productId !== product.id,
    );
    const updatedCart = {
      ...userCart,
      products: updatedProducts,
    };
    dispatch(deleteFromCart({ updatedCart }));
    toast.error(`You just delete ${product.title} from this cart!`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      progress: undefined,
      theme: 'dark',
    });
  };

  return (
    <div className="cartProduct">
      <Link
        className="cartProduct__imgLink"
        to={`/product/${product.id}`}>
        <div className="cartProduct__img">
          <img src={product.image} alt="" />
        </div>
      </Link>
      <div className="cartProduct__info">
        <Link className="link--primary" to={`/product/${product.id}`}>
          <h2>{product.title}</h2>
        </Link>
        <small>
          Rate: {product.rating.rate}{' '}
          <FontAwesomeIcon icon={faStar} />
        </small>
        <div className="cartProduct__cost">
          <p>
            <b>Cost: </b>${product.price}
          </p>
          <p>
            <b>Units: </b>
            {product.quantity}
          </p>
          <p>
            <b>Total: </b>${productTotal}
          </p>
        </div>
        {remove && (
          <div className="cartProduct__delete">
            <button onClick={() => deleteProduct()}>
              <FontAwesomeIcon icon={faTrash} size="2x" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

CartProduct.propTypes = {
  product: PropTypes.object.isRequired,
  remove: PropTypes.bool,
};

export default CartProduct;
