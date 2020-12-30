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

db.item = require("./item.model")(dbConnection, Sequelize);
db.category = require("./category.model")(dbConnection, Sequelize);
db.user = require("./user.model")(dbConnection, Sequelize);
db.role = require("./role.model")(dbConnection, Sequelize);


// TODO Not sure if this is actually doing something
db.user.belongsTo(db.role);
db.role.hasMany(db.user);
db.item.belongsTo(db.category);
db.category.hasMany(db.item);


module.exports = db;

// exports.db = db; ???