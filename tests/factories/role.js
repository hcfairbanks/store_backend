// import faker from 'faker';
// import db from '../../models';

// const data = async (props = {}) => {
//   const defaultProps = {
//     name: faker.name.firstName(),
//   };
//   return Object.assign({}, defaultProps, props);
// };

// export default async (props = {}) =>
//   db.role.create(await data(props));


// TODO Make this more dynamic
// Add a roles factory that only creates the three main roles
// Add a general user factory


import db from "../../models";

const Role = db.role;
const allowedRoles = ['admin', 'clerk', 'customer']

const createRole = async (role) => {
  if (role === undefined || !allowedRoles.includes(role)){
    role = 'customer';
  }
  const newRoleObject = await Role
  .findOrCreate({where: {name: role}, defaults: {name: role}})

console.log(newRoleObject[0])

  const newRole = await Role.findOne( { where: {id: newRoleObject[0].dataValues.id } } )
  return newRole
}


export default createRole