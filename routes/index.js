import categories from '../controllers/category.controller.js';
import express from 'express';
import items from '../controllers/item.controller.js';
import returnLanguage from '../helpers/returnLanguage'
import roles from '../controllers/role.controller.js';
import users from '../controllers/user.controller.js';
import { authUser } from '../helpers/authUser.js'
import { i18n } from '../helpers/setLanguage.js'

let router = express.Router();

router.get('/', (req, res, next) => {
  i18n.setLocale(returnLanguage(req.headers));
  res.json({greeting: i18n.__("greeting.homepage")});
});

router.post("/login", users.login);

// Categories
router.post("/categories", authUser(["categories","create"]), categories.create);
router.get("/categories", authUser(["categories","index"]), categories.findAll);
router.patch("/categories", authUser(["categories","update"]), categories.update);
router.get("/categories/:id", authUser(["categories","show"]), categories.findByPk);
router.delete("/categories/:id", authUser(["categories","delete"]), categories.delete);

// Items
router.post("/items", authUser(["items","create"]), items.create);
router.get("/items", authUser(["items","index"]), items.findAll);
router.patch("/items", authUser(["items","update"]), items.update);
router.get("/items/:id", authUser(["items","show"]), items.findByPk);
router.delete("/items/:id", authUser(["items","delete"]), items.delete);

// Roles
router.post("/roles", authUser(["roles","create"]), roles.create);
router.get("/roles", authUser(["roles","index"]), roles.findAll);
router.patch("/roles", authUser(["roles","update"]), roles.update);
router.get("/roles/:id", authUser(["roles","show"]), roles.findByPk);
router.delete("/roles/:id", authUser(["roles","delete"]), roles.delete);

// Users
router.post("/users", authUser(["users","create"]), users.create);
router.get("/users", authUser(["users","index"]), users.findAll);
router.patch("/users",authUser(["users","update"]), users.update);
router.get("/users/:id", authUser(["users","show"]), users.findByPk);
router.delete("/users/:id", authUser(["users","delete"]), users.delete);

export default router;
