
import bcrypt from 'bcrypt'
import db from "../models";
import jwt from 'jsonwebtoken'
import returnLanguage from '../helpers/returnLanguage'
import { i18n } from '../helpers/setLanguage.js'
import { translateError } from '../helpers/sequelizeTranslate'

const User = db.user;
const Role = db.role;
const saltRounds = 10;

exports.findAll = (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))

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
  i18n.setLocale(returnLanguage(req.headers))
  bcrypt.hash(req.body["password"], saltRounds, function (err, hash) {
    User.create({
                  firstName: req.body["firstName"],
                  lastName: req.body["lastName"],
                  email: req.body["email"],
                  password: hash,
                  RoleId: req.body["RoleId"]
                })
    .then(data =>{
      res.send(data)
    }).catch(error => {
      console.log(translateError(error));
      res.send(i18n.__(error.errors[0].message));
    })
  })
};

exports.login = (req, res) =>{
  i18n.setLocale(returnLanguage(req.headers))

  User.findOne({
    include: [ {model: Role} ],
    where: {email: req.body.email}
  }).then(function (user) {
    if (!user) {
      res.redirect('/');
    } else {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result == true) {
          res.status(200).json({
                                message: i18n.__("users.access_granted"),
                                result: result,jwt: generateAccessToken(user)
                              });
        } else {
          res.status(403).json({message: i18n.__("users.access_denied")});
        }
      });
    }
  });
};

exports.findByPk = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))

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
  i18n.setLocale(returnLanguage(req.headers))

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
  i18n.setLocale(returnLanguage(req.headers))
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