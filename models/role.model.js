module.exports = (dbConnection, Sequelize) => {
  const role = dbConnection.define("Role", {
    name: {type: Sequelize.STRING}
  });

  return role;
};