// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MateriPage from './pages/MateriPage';
import SimulasiPage from './pages/SimulasiPage';
import KuisPage from './pages/KuisPage';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';

import ProyektorPage from './pages/ProyektorPage';

import PaletRGBPage from './pages/PaletRGBPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/materi" element={<MateriPage />} />
          <Route path="/simulasi" element={<SimulasiPage />} />
          <Route path="/proyektor-vektor" element={<ProyektorPage />} />
          <Route path="/palet-rgb" element={<PaletRGBPage />} />
          <Route path="/kuis" element={<KuisPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;