import bcrypt from 'bcrypt';
import faker from 'faker';
import db from '../../models';

const Role = db.role;
const User = db.user;
const saltRounds = 10;

const createUser = async (role) => {
  const userRole = await Role
    .findOrCreate({ where: { name: role }, defaults: { name: role } });
  const salt = await bcrypt.genSaltSync(saltRounds);
  const password = await bcrypt.hashSync('pa55w0rd', salt);
  const user = await User.create(
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password,
      RoleId: userRole[0].dataValues.id,
    },
  );
  return user;
};

export default createUser;
