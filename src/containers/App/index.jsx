import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Cart from 'Containers/Cart';
import Gift from 'Containers/Gift';
import Home from 'Containers/Home';
import Layout from 'Components/Layout';
import Login from 'Containers/Login';
import Product from 'Containers/Product';
import Profile from 'Containers/Profile';
import EditProfile from 'Containers/EditProfile';
import ProjectPage from 'Containers/ProjectPage';
import ProtectedRoute from 'Components/ProtectedRoute';
import ErrorPage from 'Containers/ErrorPage';
import { ROUTES } from 'Data/constants';

import './index.scss';

const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.project} element={<ProjectPage />} />
      <Route path={ROUTES.home} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.product} element={<Product />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.profile} element={<Profile />} />
          <Route path={ROUTES.edit} element={<EditProfile />} />
          <Route path={ROUTES.cart} element={<Cart />} />
          <Route path={ROUTES.gift} element={<Gift />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default App;
