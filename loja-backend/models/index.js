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
db.Category = require('./category')(sequelize, Sequelize);

// Define as associações
db.Category.hasMany(db.Product, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
db.Product.belongsTo(db.Category, { foreignKey: 'categoryId' });

module.exports = db;
