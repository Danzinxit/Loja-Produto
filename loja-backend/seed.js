// seed.js
const db = require('./models');

const seedCategories = async () => {
  try {
    await db.sequelize.sync({ force: false }); // Não força a sincronização para não perder dados

    const categories = ['Eletrônicos', 'Roupas', 'Alimentos', 'Livros', 'Móveis'];

    for (const name of categories) {
      await db.Category.findOrCreate({
        where: { name },
      });
    }

    console.log('Categorias seedadas com sucesso!');
    process.exit();
  } catch (error) {
    console.error('Erro ao seedar categorias:', error);
    process.exit(1);
  }
};

seedCategories();
