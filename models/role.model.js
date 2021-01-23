module.exports = (dbConnection, Sequelize) => {
  const role = dbConnection.define("Role", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        args: 'uniqueKey',
        msg: "roles.name_must_be_unique"
      },
      validate: {
        notNull: {
            msg: 'roles.name_cannot_be_empty'
        },
        notEmpty: {
          args: true,
          msg: 'roles.name_cannot_be_empty'
        }
      }
    }
  });

  return role;
};