import express from 'express';
import roles from '../controllers/role.controller.js';
import categories from '../controllers/category.controller.js';
import items from '../controllers/item.controller.js';
import users from '../controllers/user.controller.js';
import { authUser } from '../helpers/authUser.js'
//  import authUser from '../helpers/authUser.js'

// import { LocaleService } from './services/localeService.mjs';
// import i18n from './i18n.config.mjs';
// const localeService = new LocaleService(i18n);

const path = require('path')
const { I18n } = require('i18n')

const i18n = new I18n({
  locales: ['en', 'el'],
  header: 'myLanguage',
  //  queryParameter: 'lang',
  //  defaultLocale: 'el',
  directory: path.join(__dirname, '../locales')
})


// console.log(localeService.getLocales()); // ['en', 'el']
// console.log(localeService.getCurrentLocale()); // 'en'
// console.log(localeService.translate('Hello')); //  'Hello'
// console.log(localeService.translatePlurals('You have %s message', 3)); // 'You have 3 messages

let router = express.Router();

const setLangage = () => {
  return (req, res, next) => {
    i18n.setLocale(req.headers.mylanguage)
    next()
  }
}

// router.get('/', setLangage(), (req, res, next) => {
//   //  Create middle wear that checks for this and sets the language.
//   //  Middle wear will need to be a helper that gets accessed throgh 
//   //  each controller so the text the controller returns is appropriate.
//   //  This expects this header myLanguage with a language value like en
//   console.log(req.headers.mylanguage)
//   res.json({greeting: i18n.__('Hello')});
// });

router.get('/', (req, res, next) => {
  //  Create middle wear that checks for this and sets the language.
  //  Middle wear will need to be a helper that gets accessed throgh 
  //  each controller so the text the controller returns is appropriate.
  //  This expects this header myLanguage with a language value like en
  console.log(req.headers.mylanguage)
  res.json({greeting: "Home Page"});
});

router.post("/login", users.login);

// Users
router.post("/users", authUser(["users","create"]), users.create);

router.get("/users", authUser(["users","index"]), users.findAll);
//router.get("/users", users.findAll);

router.patch("/users",authUser(["users","update"]), users.update);
router.get("/users/:id", authUser(["users","show"]), users.findByPk);
router.delete("/users/:id", authUser(["users","delete"]), users.delete);

// Roles
router.post("/roles", authUser(["roles","create"]), roles.create);
router.get("/roles", authUser(["roles","index"]), roles.findAll);
router.patch("/roles", authUser(["roles","update"]), roles.update);
router.get("/roles/:id", authUser(["roles","show"]), roles.findByPk);
router.delete("/roles/:id", authUser(["roles","delete"]), roles.delete);

// Categories
router.post("/categories", authUser(["categories","create"]), categories.create);
router.get("/categories", authUser(["categories","index"]), categories.findAll);
//router.get("/categories", categories.findAll);
router.patch("/categories", authUser(["categories","update"]), categories.update);
router.get("/categories/:id", authUser(["categories","show"]), categories.findByPk);
router.delete("/categories/:id", authUser(["categories","delete"]), categories.delete);

// Items
router.post("/items", authUser(["items","create"]), items.create);
router.get("/items", authUser(["items","index"]), items.findAll);
router.patch("/items", authUser(["items","update"]), items.update);
router.get("/items/:id", authUser(["items","show"]), items.findByPk);
router.delete("/items/:id", authUser(["items","delete"]), items.delete);

export default router;
