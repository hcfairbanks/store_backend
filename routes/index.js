import express from 'express';
import roles from '../controllers/role.controller.js';
import cars from '../controllers/car.controller.js';
import users from '../controllers/user.controller.js';
import jwt from 'jsonwebtoken';

let router = express.Router();

const userRoles = {
  "admin": { "cars":["index","show","create","update"]},
  "clerk": { "cars":["index","show","create","update"]},
  "customer": { "cars":["index","show"]}
};


router.get('/', (req, res, next) => {
  res.json({greeting: "This is the Home page"});
});

router.get("/users", users.findAll);
router.post("/users", users.create);
// https://rapidapi.com/blog/put-vs-patch/
router.patch("/users", users.update);

router.get("/users/:id", users.findByPk);
router.post("/login", users.login);

router.delete("/users/:id", users.delete);
//  router.get("/cars", cars.findAll);
router.post("/cars", cars.create);

router.post("/roles", roles.create);
router.get("/roles", roles.findAll);

// Create authentication and authorization middle wear based on this
const requireJsonContent = () => {
  return (req, res, next) => {
   if (req.headers['content-type'] !== 'application/json') {
      console.log('test 400') 
      res.status(400).send('Server requires application/json, hi there')
    } else {
      console.log('test next')
      next()
    }
  }
}

// Maybe move this to a helper/controller or some other file?
const verifyToken = () => {
  // "role": "admin"
  // "email": "200hcfairbanks@gmail.com",
  // "iat": 1608770055,
  // "exp": 1608773655
  return (req, res, next) => {
     try {
      jwt.verify(req.headers.bearer, process.env.TOKEN_SECRET);
      next();
    } catch(err) {
      res.status(403).json({message: 'Access Denied', error: err });
    }
  }
}

const authorizeUser = (accessRequested) => {
  return (req, res, next) => {
    const decoded = jwt.verify(req.headers.bearer, process.env.TOKEN_SECRET);
    //console.log(decoded.role);
    const permissions = userRoles[decoded.role]
    const xyz = accessRequested.split(":")
    //console.log(userRoles[decoded.role])
    //console.log(accessRequested.split(":"));

    // console.log(permissions)
    // console.log(xyz)
    // console.log(permissions[xyz[0]].includes(xyz[1]))

    if (permissions[xyz[0]] && permissions[xyz[0]].includes(xyz[1])){
      console.log("I am in ")
    }
    else{
      console.log("I am not in. :( ")
    }

    console.log("*******HERE I AM "+ accessRequested +" **********");
    next();
  }
}

router.post("/verify_token", verifyToken(),(req, res, next) =>{
  res.send('Token Verified');
});

router.get("/cars", verifyToken(), authorizeUser("cars:index") ,(req, res, next) =>{
  cars.findAll(req, res);
});


router.get("/testMiddleWear", requireJsonContent(), (req, res, next) =>{
  res.send('You sent JSON');
});

export default router;
