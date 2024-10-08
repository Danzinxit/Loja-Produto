// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios.get('http://localhost:5000/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <Link to="/add">Adicionar Novo Produto</Link>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Nome</th>
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

