// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MateriPage from './pages/MateriPage';
import SimulasiPage from './pages/SimulasiPage';
import KuisPage from './pages/KuisPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/materi" element={<MateriPage />} />
        <Route path="/simulasi" element={<SimulasiPage />} />
        <Route path="/kuis" element={<KuisPage />} />
      </Routes>
    </Layout>
  );
}

export default App;