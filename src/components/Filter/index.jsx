import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { getAllProducts, getAllCategories } from '../../api/products';
import ErrorPage from 'Containers/ErrorPage';
import ProductList from 'Components/ProductList';
import Spinner from 'Components/Spinner';

import './index.scss';

const Filter = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [error, setError] = useState(false);
  const [message, setMessage] = useState('wrong');

  const getProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (error) {
      setError(true);
    }
  };

  const getCategories = async () => {
    try {
      const categoriesResponse = await getAllCategories();
      setCategories(categoriesResponse.data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const filteredProducts = !selectedCategory.category
    ? products
    : products.filter(
        (product) => product.category === selectedCategory.category,
      );

  if (error) {
    return (
      <>
        <ErrorPage message={message} />
      </>
    );
  }

  return (
    <div className="filter">
      {products.length > 0 ? (
        <>
          <div className="filter__filter">
            {categories.length > 0 && (
              <p
                className={cn('filter__category', {
                  'filter__category--active': selectedCategory === '',
                })}
                onClick={() => setSelectedCategory('')}>
                all
              </p>
            )}
            {categories &&
              categories.map((category) => {
                return (
                  <p
                    key={category}
                    className={cn('filter__category', {
                      'filter__category--active':
                        selectedCategory.category === category,
                    })}
                    onClick={() => setSelectedCategory({ category })}>
                    {category}
                  </p>
                );
              })}
            {categories.length > 0 && (
              <p
                className={cn('filter__category', {
                  'filter__category--active':
                    selectedCategory.category === 'games',
                })}
                onClick={() =>
                  setSelectedCategory({ category: 'games' })
                }>
                games
              </p>
            )}
          </div>
          <div className="filter__list">
            <ProductList products={filteredProducts} page={'home'} />
          </div>
        </>
      ) : (
        <div className="filter__spinner">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Filter;
