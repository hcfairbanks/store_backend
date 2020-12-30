module.exports = (dbConnection, Sequelize) => {
  const item = dbConnection.define("Item", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    CategoryId: { type: Sequelize.INTEGER,
      references: { model: 'Categories', key: 'id' },
      allowNull: false}
  });

  return item;
};