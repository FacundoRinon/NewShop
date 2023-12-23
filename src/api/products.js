import instance from './config';

const getAllProducts = () => {
  return instance.get('products');
};

const getSingleProduct = (id) => {
  return instance.get(`products/${id}`);
};

const getAllCategories = () => {
  return instance.get('products/categories');
};

export { getAllProducts, getSingleProduct, getAllCategories };
