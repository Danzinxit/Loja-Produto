// routes/products.js
const express = require('express');
const router = express.Router();
const db = require('../models');

// POST /products: Adicionar um novo produto
router.post('/', async (req, res) => {
  try {
    const { name, description, price, quantity, categoryId } = req.body;
    const category = await db.Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ error: 'Categoria inválida' });
    }
    const product = await db.Product.create({ name, description, price, quantity, categoryId });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /products: Listar todos os produtos com a categoria expandida
router.get('/', async (req, res) => {
  try {
    const { categoryId } = req.query;
    const where = {};
    if (categoryId) {
      where.categoryId = categoryId;
    }
    const products = await db.Product.findAll({
      where,
      include: db.Category,
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /products/:id: Obter detalhes de um produto específico
router.get('/:id', async (req, res) => {
  try {
    const product = await db.Product.findByPk(req.params.id, {
      include: db.Category,
    });
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
    const { name, description, price, quantity, categoryId } = req.body;
    const product = await db.Product.findByPk(req.params.id);
    if (product) {
      if (categoryId) {
        const category = await db.Category.findByPk(categoryId);
        if (!category) {
          return res.status(400).json({ error: 'Categoria inválida' });
        }
      }
      await product.update({ name, description, price, quantity, categoryId });
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
