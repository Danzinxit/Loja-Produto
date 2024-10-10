// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar os componentes necessários do Chart.js
Chart.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Buscar categorias e produtos
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          axios.get('http://localhost:5000/categories'),
          axios.get('http://localhost:5000/products?_expand=Category'),
        ]);
        setCategories(categoriesRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error('Erro ao buscar dados para o dashboard:', error);
      }
    };
    fetchData();
  }, []);

  // Dados para o gráfico de produtos em estoque por categoria
  const stockData = {
    labels: categories.map(cat => cat.name),
    datasets: [
      {
        label: 'Produtos em Estoque',
        data: categories.map(cat => {
          return products.filter(prod => prod.categoryId === cat.id).reduce((acc, curr) => acc + curr.quantity, 0);
        }),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Dados para o gráfico de distribuição de preços
  const priceDistribution = {
    labels: ['Até R$50', 'R$50 - R$100', 'R$100 - R$200', 'Acima de R$200'],
    datasets: [
      {
        label: 'Distribuição de Preços',
        data: [
          products.filter(prod => prod.price <= 50).length,
          products.filter(prod => prod.price > 50 && prod.price <= 100).length,
          products.filter(prod => prod.price > 100 && prod.price <= 200).length,
          products.filter(prod => prod.price > 200).length,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <div style={{ width: '45%', marginBottom: '40px' }}>
          <Bar data={stockData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div style={{ width: '45%', marginBottom: '40px' }}>
          <Pie data={priceDistribution} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
