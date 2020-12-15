import express from 'express';
import cars from '../controllers/car.controller.js';
import users from '../controllers/user.controller.js';

let router = express.Router();

router.get('/', (req, res, next) => {
  res.json({greeting: "This is the Home page"});
});

router.get("/users", users.findAll);
//  router.get("/cars", cars.findAll);
router.post("/cars", cars.create);

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

router.get("/testMiddleWear", requireJsonContent(), (req, res, next) =>{
  res.send('You sent JSON');
});

router.get("/cars", requireJsonContent(), (req, res, next) =>{
  cars.findAll(req, res);
});

export default router;
