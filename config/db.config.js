import * as dbCreds from './config.json';

module.exports = {
  HOST: dbCreds[process.env.NODE_ENV].host,
  USER: dbCreds[process.env.NODE_ENV].username,
  PASSWORD: dbCreds[process.env.NODE_ENV].password,
  DB: dbCreds[process.env.NODE_ENV].database,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};