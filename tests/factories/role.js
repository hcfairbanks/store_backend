import db from '../../models';

const Role = db.role;
const allowedRoles = ['admin', 'clerk', 'customer'];

const createRole = async (role) => {
  let useRole;
  if (role === undefined || !allowedRoles.includes(role)) {
    useRole = 'customer';
  } else {
    useRole = role;
  }
  const newRoleObject = await Role
    .findOrCreate({ where: { name: useRole }, defaults: { name: useRole } });
  console.log(newRoleObject[0]);
  const newRole = await Role.findOne({ where: { id: newRoleObject[0].dataValues.id } });
  return newRole;
};

export default createRole;
