// TODO Make this more dynamic
import bcryptjs from 'bcryptjs';
import db from '../../models';

const Role = db.role;
const User = db.user;
const saltRounds = 10;

const createAdminUser = async () => {
  const adminRole = await Role.create({ name: 'admin' });
  const adminSalt = await bcryptjs.genSaltSync(saltRounds);
  const password = await bcryptjs.hashSync('pa55w0rd', adminSalt);
  const adminUser = await User.create({
    firstName: 'admin',
    lastName: 'admin',
    email: 'admin@test.com',
    password,
    RoleId: adminRole.id,
  });
  return adminUser;
};

export default createAdminUser;
