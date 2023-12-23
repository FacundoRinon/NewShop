import React from 'react';
import { Outlet } from 'react-router-dom';

import Topbar from 'Components/Topbar';
import AboutProject from 'Components/AboutProject';

import './index.scss';

const Layout = () => {
  return (
    <div className="layout">
      <Topbar />
      <Outlet />
      <AboutProject />
    </div>
  );
};

export default Layout;
