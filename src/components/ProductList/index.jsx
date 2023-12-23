import React from 'react';
import PropTypes, { object } from 'prop-types';

import CartProduct from 'Components/CartProduct';
import ProductCard from 'Components/ProductCard';
import Spinner from 'Components/Spinner';

import './index.scss';

const ProductList = ({ products, remove, page }) => {
  return (
    <div className="productList">
      {page === 'home' ? (
        products.length > 0 ? (
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })
        ) : (
          <div className="productList__empty">
            <h2>There are no products in this category</h2>
          </div>
        )
      ) : page === 'cart' ? (
        products.length > 0 ? (
          products.map((product) => {
            return (
              <CartProduct
                key={product.id}
                product={product}
                remove={remove}
              />
            );
          })
        ) : (
          <h2>This cart is empty.</h2>
        )
      ) : (
        <div className="productList__spinner">
          <Spinner />
        </div>
      )}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(object),
  remove: PropTypes.bool,
  page: PropTypes.string.isRequired,
};

export default ProductList;
