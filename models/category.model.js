module.exports = (dbConnection, Sequelize) => {
  const category = dbConnection.define("Category", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        args: 'uniqueKey',
        msg: "categories.name_must_be_unique"
      },
      validate: {
        notNull: {
            msg: 'categories.name_cannot_be_empty'
        },
        notEmpty: {
          args: true,
          msg: 'categories.name_cannot_be_empty'
        }
      }
    }
  });

  return category;
};