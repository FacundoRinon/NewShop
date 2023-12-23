import instance from './config';

const getAllUsers = () => {
  return instance.get('users');
};

const getOneUser = (id) => {
  return instance.get(`users/${id}`);
};

const getUsersCarts = () => {
  return instance.get(`carts`);
};

const getUserCart = (id) => {
  return instance.get(`carts/${id}`);
};

export { getAllUsers, getOneUser, getUsersCarts, getUserCart };
