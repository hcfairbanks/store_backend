const rolePermissions = {
  "admin": { "cars":["index","show","create","update"]},
  "clerk": { "cars":["index","show","create","update"]},
  "customer": { "cars":["index","show"]}
};

export default rolePermissions

// this could also be done like this

// export default {
//   "admin": { "cars":["index","show","create","update"]},
//   "clerk": { "cars":["index","show","create","update"]},
//   "customer": { "cars":["index","show"]}
// };