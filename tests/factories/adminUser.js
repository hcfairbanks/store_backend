// TODO Make this more dynamic
// Add a roles factory that only creates the three main roles
// Add a general user factory


// import faker from 'faker';
import db from "../../models";

const Role = db.role;
const User = db.user;
const saltRounds = 10;
var bcrypt = require('bcrypt');

const createAdminUser = async () => {
  const adminRole = await Role.create({"name": "admin"})
  const adminSalt = await bcrypt.genSaltSync(saltRounds)
  const password  = await bcrypt.hashSync("pa55w0rd", adminSalt);
  const adminUser = await User.create({
    "firstName": "admin",
    "lastName": "admin",
    "email": "admin@test.com",
    "password": password,
    "RoleId": adminRole.id
  });
  return adminUser
}


export default createAdminUser