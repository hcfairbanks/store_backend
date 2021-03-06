import bcryptjs from 'bcryptjs';
import db from './models';

const Role = db.role;
const User = db.user;
const saltRounds = 10;
const roles = [
  {
    name: 'admin',
  },
  {
    name: 'clerk',
  },
  {
    name: 'customer',
  },
];
const basicUsers = {
  admin: {
    firstName: 'admin',
    lastName: 'admin',
    email: 'admin@test.com',
    password: 'pa55w0rd',
  },
  clerk: {
    firstName: 'clerk',
    lastName: 'clerk',
    email: 'clerk@test.com',
    password: 'pa55w0rd',
  },
  customer: {
    firstName: 'customer',
    lastName: 'customer',
    email: 'customer@test.com',
    password: 'pa55w0rd',
  },
};

const seed = async () => Role.bulkCreate(roles)
  .then(
    async () => {
      // TODO
      // This needs to be a dynamic loop but it's not working correctly at the moment
      // figure out why it's not working as a loop
      const adminRole = await Role.findOne({ where: { name: 'admin' } });
      basicUsers.admin.RoleId = adminRole.id;
      const adminSalt = await bcryptjs.genSaltSync(saltRounds);
      basicUsers.admin.password = await bcryptjs.hashSync(basicUsers.admin.password, adminSalt);
      const adminUser = await User.create(basicUsers.admin);
      console.log(adminUser);

      const clerkRole = await Role.findOne({ where: { name: 'clerk' } });
      basicUsers.clerk.RoleId = clerkRole.id;
      const clerkSalt = await bcryptjs.genSaltSync(saltRounds);
      basicUsers.clerk.password = await bcryptjs.hashSync(basicUsers.clerk.password, clerkSalt);
      const clerkUser = await User.create(basicUsers.clerk);
      console.log(clerkUser);

      const customerRole = await Role.findOne({ where: { name: 'customer' } });
      basicUsers.customer.RoleId = customerRole.id;
      const customerSalt = await bcryptjs.genSaltSync(saltRounds);
      basicUsers.customer.password = await
      bcryptjs.hashSync(basicUsers.customer.password, customerSalt);
      const customerUser = await User.create(basicUsers.customer);
      console.log(customerUser);
    },
  );

seed().then(() => {
  process.exit();
});
