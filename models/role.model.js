module.exports = (dbConnection, Sequelize) => {
  const role = dbConnection.define('Role', {
    name: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ['admin', 'clerk', 'customer'],
      validate: {
        notNull: {
          msg: 'roles.name_cannot_be_empty',
        },
        notEmpty: {
          args: true,
          msg: 'roles.name_cannot_be_empty',
        },
      },
    },
  });

  return role;
};
