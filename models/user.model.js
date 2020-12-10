module.exports = (dbConnection, Sequelize) => {
  const user = dbConnection.define("User", {
    firstName: {type: Sequelize.STRING},
    lastName: {type: Sequelize.STRING},
    email: {type: Sequelize.STRING},
    password: {type: Sequelize.STRING}
  });

  return user;
};