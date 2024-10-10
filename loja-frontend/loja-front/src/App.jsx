// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList.jsx';
import ProductForm from './components/ProductForm.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import Dashboard from './components/Dashboard.jsx';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <h1>Sistema de Gerenciamento de Produtos</h1>
        <nav>
          <ul className="nav">
            <li><Link to="/">Produtos</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<ProductForm />} />
          <Route path="/edit/:id" element={<ProductForm />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
