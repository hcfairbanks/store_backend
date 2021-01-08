
// TODO update these 'require's to 'import's
var bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const db = require("../models")("el");
//require("./item.model")(dbConnection, Sequelize);
import { i18n } from '../helpers/setLanguage.js'
const User = db.user;
const Role = db.role;
const saltRounds = 10;

// Maybe try something like this
// it will require restructuring everything into functions that can have variables passed to them 
// import { user, role} from '../models'


import dbx from "../models"


// TODO verify it's an admin or it's the user 
// Something similar to this
// import jwt from 'jsonwebtoken';
// import rolePermissions from '../config/rolePermissions.js'
// import { i18n } from '../helpers/setLanguage.js'
// try {
//   // If jwt.verify doesn't return tru then an error get thrown
//   // and the function returns the response in the catch
//   const decoded = jwt.verify(req.headers.bearer, process.env.TOKEN_SECRET);
//   const userRole = rolePermissions[decoded.role]

//   // TODO This condition is a bit long
//   if (decoded.role == "admin" || (userRole[accessReq[0]] && userRole[accessReq[0]].includes(accessReq[1]))){
//     // console.log("I am in :) ")
//     next();
//   }
//   else{
//     // console.log("I am not in. :( ")
//     res.status(401).json({message: i18n.__("authorization.denied"), error: err });
//   }
// } catch(err) {
//  res.status(403).json({message: i18n.__("authorization.denied"), error: err });
// }




exports.findAll = (req, res) => {
  // TODO This breakes if the header isn't there
  i18n.setLocale(req.headers.mylanguage)

  User.findAll({include: [ {model: Role} ]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || i18n.__("users.error_retrieving_users")
      });
    });
};

// username is in the form { username: "my cool username" }
// ^^the above object structure is completely arbitrary
function generateAccessToken(user) {
  // The uppercase seems weird here but the only way I could get squeezle to
  // find the Role on the show was to include it like this
  // console.log(user.Role.name);
  
  //TODO START HERE, need this relationship working
  //console.log(user.role)
  // expires after half and hour (1800 seconds = 30 minutes)
  //return jwt.sign(username, process.env.TOKEN_SECRET, { "expiresIn": 1000 });
  return jwt.sign({
    email: user.email,
    role: user.Role.name
  }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
};

exports.create =(req,res) => {
  i18n.setLocale(req.headers.mylanguage)
  bcrypt.hash(req.body["password"], saltRounds, function (err, hash) {
    // https://insights.untapt.com/webpack-import-require-and-you-3fd7f5ea93c0a
    // https://www.geeksforgeeks.org/difference-between-node-js-require-and-es6-import-and-export/
    //const dbx = require("../models")("el");
    const dbx = require("../models")(req.headers.mylanguage);
    //dbx.lang = 'en';
    
    const x = dbx.user;
    x.create({
                  firstName: req.body["firstName"],
                  lastName: req.body["lastName"],
                  email: req.body["email"],
                  password: hash,
                  RoleId: req.body["RoleId"]
                })
    .then(data =>{
      res.send(data)
    }).catch(error => {
      console.log(error);
      res.send(error.errors);
    })
  })
};

exports.login = (req, res) =>{
  // TODO This breakes if the header isn't there
  i18n.setLocale(req.headers.mylanguage)

  User.findOne({
    include: [ {model: Role} ],
    where: {email: req.body.email}
  }).then(function (user) {
    if (!user) {
      res.redirect('/');
    } else {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result == true) {
          res.status(200).json({message: i18n.__("users.access_granted"), result: result,jwt: generateAccessToken(user)});  
        } else {
          res.status(403).json({message: i18n.__("users.access_denied")});
        }
      });
    }
  });
};

exports.findByPk = async (req, res) => {
  // TODO This breakes if the header isn't there
  i18n.setLocale(req.headers.mylanguage)

  const user = await User.findByPk(req.params.id);
  if (user == null){
    res.send({message: i18n.__("users.no_user_found")})
  } else {
    res.send(user)
  }
};

// Change this for security
// The password in the update needs to be hashed
exports.update = (req, res) => {
  // TODO This breakes if the header isn't there
  i18n.setLocale(req.headers.mylanguage)

  User.update({
    firstName: req.body["firstName"],
    lastName: req.body["lastName"],
    email: req.body["email"],
    password: req.body["password"], // Password section will need to be flushed out for an update
    RoleId: req.body["RoleId"] // Change this later to a seperate call that requires admin permissions
  }, {
    where: { id: req.body["id"] }
   }).then(result => {
    if ( result == 1){
      res.status(200).json({message: i18n.__("users.update_success"), result: result});
    }else{
      res.status(500).json({message: i18n.__("users.update_failed"), result: result});
    }
  }).catch(error => {
    console.log(error)
  })
  
};

exports.delete = (req, res) => {
  // TODO This breakes if the header isn't there
  i18n.setLocale(req.headers.mylanguage)

  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    if ( result == 1){
      res.status(200).json({message: i18n.__("users.delete_success"), result: result});
    }else{
      res.status(500).json({message: i18n.__("users.delete_failed"), result: result});
    }
  }).catch(error => {
    console.log(error)
  })
};