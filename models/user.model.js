const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const dbConnection = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const Role = require('./role.model')(dbConnection, Sequelize);
module.exports = () => {
  const user = dbConnection.define('User', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First name cannot be empty',
        },
        notEmpty: {
          args: true,
          msg: 'First name cannot be empty',
        },
      },
    },
    lastName: { type: Sequelize.STRING },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        args: 'uniqueKey',
        msg: 'email_must_be_unique',
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password cannot be empty',
        },
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty',
        },
      },
    },
    RoleId: {
      type: Sequelize.INTEGER,
      references: { model: 'Roles', key: 'id' },
      allowNull: false,
    },
  });

  user.belongsTo(Role);

  return user;
};
