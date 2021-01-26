module.exports = (dbConnection, Sequelize) => {
  const item = dbConnection.define("Item", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        args: 'uniqueKey',
        msg: "items.name_must_be_unique"
      },
      validate: {
        notNull: {
            msg: 'items.name_cannot_be_empty'
        },
        notEmpty: {
          args: true,
          msg: 'items.name_cannot_be_empty'
        }
      }
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
            msg: 'items.description_cannot_be_empty'
        },
        notEmpty: {
          args: true,
          msg: 'items.description_cannot_be_empty'
        }
      }
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    CategoryId: { type: Sequelize.INTEGER,
      references: { model: 'Categories', key: 'id' },
      allowNull: false}
  });

  return item;
};