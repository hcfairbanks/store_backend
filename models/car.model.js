module.exports = (dbConnection, Sequelize) => {
  const car = dbConnection.define("Car", {
    name: {
      type: Sequelize.STRING
    }
  });

  return car;
};