const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const dbConnection = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.dbConnection = dbConnection;

db.car = require("./car.model")(dbConnection, Sequelize);
db.user = require("./user.model")(dbConnection, Sequelize);
db.role = require("./role.model")(dbConnection, Sequelize);


// TODO HERE not sure if this is actually doing something
db.user.belongsTo(db.role);
db.role.hasMany(db.user);


module.exports = db;

// exports.db = db; ???