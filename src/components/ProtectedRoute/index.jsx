import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

import { ROUTES } from '../../data/constants';

const ProtectedRoute = () => {
  const user = useSelector((state) => state.user);

  if (user) {
    return <Outlet />;
  }
  return <Navigate to={ROUTES.login} replace />;
};

export default ProtectedRoute;
