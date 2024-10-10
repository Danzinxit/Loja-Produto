// routes/categories.js
const express = require('express');
const router = express.Router();
const db = require('../models');

// GET /categories: Listar todas as categorias
router.get('/', async (req, res) => {
  try {
    const categories = await db.Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /categories: Adicionar uma nova categoria
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const category = await db.Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
