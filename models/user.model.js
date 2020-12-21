module.exports = (dbConnection, Sequelize) => {
  const user = dbConnection.define("User", {
    firstName: {type: Sequelize.STRING},
    lastName: {type: Sequelize.STRING},
    email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
          },
    password: { type: Sequelize.STRING,
                allowNull: false}
  });

  return user;
};