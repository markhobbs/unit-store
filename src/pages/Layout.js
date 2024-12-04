/* Layout.js */

import React from "react";
import { Outlet } from "react-router-dom";
import Menu from '../components/Menu';

const Layout = () => {
  return <> 
        <Menu />
        <Outlet />
      </>
};
export default Layout;
