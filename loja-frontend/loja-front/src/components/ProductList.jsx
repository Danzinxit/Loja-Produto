// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchProducts = () => {
    let url = 'http://localhost:5000/products?_expand=Category';
    if (selectedCategory) {
      url += `&categoryId=${selectedCategory}`;
    }
    axios.get(url)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
      });
  };

  const fetchCategories = () => {
    axios.get('http://localhost:5000/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar categorias:', error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      axios.delete(`http://localhost:5000/products/${id}`)
        .then(() => {
          fetchProducts();
        })
        .catch(error => {
          console.error('Erro ao excluir produto:', error);
        });
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <Link to="/add">Adicionar Novo Produto</Link>
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <label>Filtrar por Categoria: </label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Todas as Categorias</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id}>
              <td>
                <Link to={`/products/${prod.id}`}>{prod.name}</Link>
              </td>
              <td>{prod.Category ? prod.Category.name : 'Sem Categoria'}</td>
              <td>R$ {prod.price.toFixed(2)}</td>
              <td>{prod.quantity}</td>
              <td>
                <Link to={`/edit/${prod.id}`}>Editar</Link>
                {' | '}
                <button onClick={() => handleDelete(prod.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
