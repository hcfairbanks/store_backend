// composite unique index keys with custom messages could be an issue
// https://github.com/sequelize/sequelize/issues/5033
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



const Role = require("./role.model")(dbConnection, Sequelize);


// Not sure if I can add unique translated message here or not

module.exports = (dbConnection, Sequelize) => {
  const user = dbConnection.define("User", {
    firstName: {type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
            msg: 'First name cannot be empty'
        },
        // This isn't working because Bcrypt is entring in something when it's null
        // Needs to be stopped by the controller too
        // Look here for pw validations => https://sequelize.org/master/manual/validations-and-constraints.html
        notEmpty: {
          args: true,
          msg: 'First name cannot be empty'
        }
      }
    },
    lastName: {type: Sequelize.STRING},
    email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
              args: 'uniqueKey',
              msg: "email_must_be_unique"
          }
          },
    password: { type: Sequelize.STRING,
                allowNull: false,
                validate: {
                  notNull: {
                      msg: 'Password cannot be empty'
                  },
                  // This isn't working because Bcrypt is entring in something when it's null
                  // Needs to be stopped by the controller too
                  // Look here for pw validations => https://sequelize.org/master/manual/validations-and-constraints.html
                  notEmpty: {
                    args: true,
                    msg: 'Password cannot be empty'
                  }
                }
              },
    RoleId: { type: Sequelize.INTEGER,
              references: { model: 'Roles', key: 'id' },
              allowNull: false}
  });

  user.belongsTo(Role);

  return user;
};