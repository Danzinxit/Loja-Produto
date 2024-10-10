// index.js
const express = require('express');
const cors = require('cors');
const db = require('./models');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories'); // Importa as rotas de categorias

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter); // Adiciona as rotas de categorias

// Sincroniza o banco de dados e inicia o servidor
db.sequelize.sync({ force: false }).then(() => { // Defina force: false para evitar perda de dados
  console.log('Banco de dados sincronizado');
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao sincronizar o banco de dados:', err);
});
