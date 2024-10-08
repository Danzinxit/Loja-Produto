// index.js
const express = require('express');
const cors = require('cors');
const db = require('./models');
const productsRouter = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/products', productsRouter);

// Sincroniza o banco de dados e inicia o servidor
db.sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao sincronizar o banco de dados:', err);
});
