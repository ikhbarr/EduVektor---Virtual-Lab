// src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import VectorFieldCanvas from './VectorFieldCanvas';
import ScrollToTopButton from './ScrollToTopButton';

const Layout = () => {
  return (
    <>
      <VectorFieldCanvas />
      <Navbar />
      <main className="page-container">
        <Outlet />
      </main>
      <ScrollToTopButton />
    </>
  );
};

export default Layout;