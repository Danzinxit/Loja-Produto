// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Se houver um ID, buscar o produto para editar
      axios.get(`http://localhost:5000/products/${id}`)
        .then(response => {
          setProduct(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar o produto:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Atualizar produto
      axios.put(`http://localhost:5000/products/${id}`, product)
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          console.error('Erro ao atualizar o produto:', error);
        });
    } else {
      // Adicionar novo produto
      axios.post('http://localhost:5000/products', product)
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          console.error('Erro ao adicionar o produto:', error);
        });
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Produto' : 'Adicionar Produto'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Preço:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>
        <div>
          <label>Quantidade:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{id ? 'Atualizar' : 'Adicionar'}</button>
      </form>
    </div>
  );
};

export default ProductForm;
