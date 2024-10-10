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
    categoryId: '',
  });

  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:5000/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar categorias:', error);
      });

    if (id) {
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
      axios.put(`http://localhost:5000/products/${id}`, product)
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          console.error('Erro ao atualizar o produto:', error);
        });
    } else {
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
    <div className="container">
      <h2 className="my-4">{id ? 'Editar Produto' : 'Adicionar Produto'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Preço:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            step="0.01"
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantidade:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Categoria:</label>
          <select
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Atualizar' : 'Adicionar'}</button>
      </form>
    </div>
  );
};

export default ProductForm;
