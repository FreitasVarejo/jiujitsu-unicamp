import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import { Home, Membros, Guia, Galeria, Loja } from './pages';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/membros" element={<Membros />} />
          <Route path="/guia" element={<Guia />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/loja" element={<Loja />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
