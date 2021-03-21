const rolePermissions = {
  admin: {
    categories: [
      'index',
      'show',
      'create',
      'update',
      'delete',
    ],
    items: [
      'index',
      'show',
      'create',
      'update',
      'delete',
    ],
    users: [
      'index',
      'show',
      'create',
      'update',
      'delete',
      'adminUserUpdate',
      'updatePassword',
    ],
    roles: [
      'index',
      'show',
      'create',
      'update',
      'delete',
    ],
  },
  clerk: {
    categories: [
      'index',
      'show',
      'create',
      'update',
      'delete',
    ],
    items: [
      'index',
      'show',
      'create',
      'update',
      'delete',
    ],
    users: [
      'index',
      'show',
      'create',
      'update',
      'delete',
      'updatePassword',
    ],
    roles: [
      'index',
      'show',
      'create',
      'update',
      'delete',
    ],
  },
  customer: {
    items: [
      'index',
      'show',
    ],
    users: [
      'updatePassword',
      'update',
    ],
  },
};

export default rolePermissions;
