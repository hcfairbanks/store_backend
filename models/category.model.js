module.exports = (dbConnection, Sequelize) => {
  const role = dbConnection.define("Category", {
    name: {type: Sequelize.STRING}
  });

  return role;
};