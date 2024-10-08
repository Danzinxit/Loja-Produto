// routes/products.js
const express = require('express');
const router = express.Router();
const db = require('../models');

// POST /products: Adicionar um novo produto
router.post('/', async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const product = await db.Product.create({ name, description, price, quantity });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /products: Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const products = await db.Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /products/:id: Obter detalhes de um produto específico
router.get('/:id', async (req, res) => {
  try {
    const product = await db.Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /products/:id: Atualizar as informações de um produto
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const product = await db.Product.findByPk(req.params.id);
    if (product) {
      await product.update({ name, description, price, quantity });
      res.json(product);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /products/:id: Excluir um produto
router.delete('/:id', async (req, res) => {
  try {
    const product = await db.Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.json({ message: 'Produto excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
