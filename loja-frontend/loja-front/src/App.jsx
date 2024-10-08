// src/App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList.jsx';
import ProductForm from './components/ProductForm.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <h1>Sistema de Gerenciamento de Produtos</h1>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<ProductForm />} />
          <Route path="/edit/:id" element={<ProductForm />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

