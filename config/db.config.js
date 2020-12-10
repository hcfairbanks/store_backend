module.exports = {
  HOST: "localhost",
  USER: "deploy",
  PASSWORD: "password",
  DB: "store",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};