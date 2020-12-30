import express from 'express';
import roles from '../controllers/role.controller.js';
import cars from '../controllers/car.controller.js';
import users from '../controllers/user.controller.js';
import { authUser } from '../helpers/authUser.js'
//  import authUser from '../helpers/authUser.js'

let router = express.Router();

router.get('/', (req, res, next) => {
  res.json({greeting: "This is the Home page"});
});

router.get("/users", users.findAll);
router.post("/users", users.create);
router.patch("/users", users.update);

router.get("/users/:id", users.findByPk);
router.post("/login", users.login);

router.delete("/users/:id", users.delete);
router.post("/cars", cars.create);

router.post("/roles", roles.create);
router.get("/roles", roles.findAll);

router.get("/cars", authUser(["cars","index"]) ,(req, res, next) =>{
  cars.findAll(req, res);
});


export default router;
