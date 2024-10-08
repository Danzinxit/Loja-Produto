// models/index.js
const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false, // Desativa logs SQL
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importa os modelos
db.Product = require('./product')(sequelize, Sequelize);

module.exports = db;
