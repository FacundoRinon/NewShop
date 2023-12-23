import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './index.scss';

const ProductCard = ({ product }) => {
  return (
    <div className="productCard">
      <Link className="link--primary" to={`/product/${product.id}`}>
        <div className="productCard__imgContainer">
          <img src={product.image} alt="" />
        </div>
        <div className="productCard__title">{product.title}</div>
        <div className="productCard__price">${product.price}</div>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
