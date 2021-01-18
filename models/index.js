import dbConfig from "../config/db.config.js";
import Sequelize from "sequelize";

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

db.user.belongsTo(db.role);
db.role.hasMany(db.user);
db.item.belongsTo(db.category);
db.category.hasMany(db.item);

// module.exports = db;

export default db