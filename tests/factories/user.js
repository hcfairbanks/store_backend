// TODO Make this more dynamic
// Add a roles factory that only creates the three main roles
// Add a general user factory


import faker from 'faker';
import db from "../../models";

const Role = db.role;
const User = db.user;
const saltRounds = 10;
var bcrypt = require('bcrypt');

const createUser = async (role) => {
  let userRole = await Role
  .findOrCreate({where: {name: role}, defaults: {name: role}})
  
  const salt = await bcrypt.genSaltSync(saltRounds)
  const password  = await bcrypt.hashSync("pa55w0rd", salt);
  const user = await User.create({
    "firstName": faker.name.firstName(),
    "lastName": faker.name.lastName(),
    "email": faker.internet.email(),
    "password": password,
    "RoleId": userRole[0].dataValues.id
  });
  return user
}


export default createUser