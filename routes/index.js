import express from 'express';
import categories from '../controllers/category.controller';
import i18n from '../helpers/setLanguage';
import items from '../controllers/item.controller';
import returnLanguage from '../helpers/returnLanguage';
import roles from '../controllers/role.controller';
import users from '../controllers/user.controller';
import authUser from '../helpers/authUser';

const router = express.Router();

router.get('/', (req, res) => {
  i18n.setLocale(returnLanguage(req.headers));
  res.status(200).json({ greeting: i18n.__('greeting.homepage') });
});

router.post('/login', users.login);

// Categories
router.post('/categories', authUser(['categories', 'create']), categories.create);
router.get('/categories', authUser(['categories', 'index']), categories.findAll);
router.patch('/categories/:id', authUser(['categories', 'update']), categories.update);
router.get('/categories/:id', authUser(['categories', 'show']), categories.findByPk);
router.delete('/categories/:id', authUser(['categories', 'delete']), categories.delete);

// Items
router.post('/items', authUser(['items', 'create']), items.create);
router.get('/items', authUser(['items', 'index']), items.findAll);
router.patch('/items/:id', authUser(['items', 'update']), items.update);
router.get('/items/:id', authUser(['items', 'show']), items.findByPk);
router.delete('/items/:id', authUser(['items', 'delete']), items.delete);

// Roles
router.post('/roles', authUser(['roles', 'create']), roles.create);
router.get('/roles', authUser(['roles', 'index']), roles.findAll);
router.patch('/roles/:id', authUser(['roles', 'update']), roles.update);
router.get('/roles/:id', authUser(['roles', 'show']), roles.findByPk);
router.delete('/roles/:id', authUser(['roles', 'delete']), roles.delete);

// Users
router.post('/users', authUser(['users', 'create']), users.create);
router.get('/users', authUser(['users', 'index']), users.findAll);
router.patch('/users/:id', authUser(['users', 'update']), users.update);
router.get('/users/:id', authUser(['users', 'show']), users.findByPk);
router.delete('/users/:id', authUser(['users', 'delete']), users.delete);
router.patch('/adminUserUpdate/:id', authUser(['users', 'adminUserUpdate']), users.adminUserUpdate);
router.patch('/usersUpdatePassword/:id', authUser(['users', 'updatePassword']), users.updatePassword);

export default router;
