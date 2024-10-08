// src/components/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar o produto:', error);
      });
  }, [id]);

  if (!product) return <div>Carregando...</div>;

  return (
    <div>
      <h2>Detalhes do Produto</h2>
      <p><strong>Nome:</strong> {product.name}</p>
      <p><strong>Descrição:</strong> {product.description}</p>
      <p><strong>Preço:</strong> R$ {product.price.toFixed(2)}</p>
      <p><strong>Quantidade:</strong> {product.quantity}</p>
      <Link to="/">Voltar para a Lista</Link>
    </div>
  );
};

export default ProductDetail;
