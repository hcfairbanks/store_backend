
import bcrypt from 'bcrypt'
import db from "../models";
import jwt from 'jsonwebtoken'
import returnLanguage from '../helpers/returnLanguage'
import { i18n } from '../helpers/setLanguage.js'
import { translateError } from '../helpers/sequelizeTranslate'

const Role = db.role;
const saltRounds = 10;
const User = db.user;

function canAccessUser(req, user_id){
  const decoded = jwt.verify(req.headers.bearer, process.env.TOKEN_SECRET);
  return (
    user_id == decoded.id || decoded.role == 'admin'
  )
}

function isAdmin(req){
  const decoded = jwt.verify(req.headers.bearer, process.env.TOKEN_SECRET);
  return (
    decoded.role == 'admin'
  )
}


function generateAccessToken(user) {
  // The uppercase seems weird here but the only way I could get squeezle to
  // find the Role on the show was to include it like this
  // console.log(user.Role.name);
  
  // TODO START HERE, need this relationship working
  // console.log(user.role)
  // expires after half and hour (1800 seconds = 30 minutes)
  // return jwt.sign(username, process.env.TOKEN_SECRET, { "expiresIn": 1000 });
  return jwt.sign({
    email: user.email,
    role: user.Role.name,
    id: user.id
  }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
};

exports.findAll = (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))
  User.findAll({include: [ {model: Role} ]})
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || i18n.__("users.error_retrieving_users")
      });
    });
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
      res.status(200).json(data)
    }).catch(error => {
      console.log(translateError(error));
      res.status(500).json({error: i18n.__(error.errors[0].message)});
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
      res.status(301).redirect('/');
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
  if ( canAccessUser(req, req.params.id) ){
    const user = await User.findByPk(req.params.id);
    if (user == null){
      res.status(404).json({message: i18n.__("users.no_user_found")})
    } else {
      res.status(200).json(user)
    }
  } else {
    res.status(403).json({message: i18n.__("users.access_denied")})
  }
};

exports.update = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))
  // if ( canAccessUser(req, req.body["id"]) ){
  if ( canAccessUser(req, req.params.id) ){
    // const user = await User.findByPk(req.body["id"]);
    const user = await User.findByPk(req.params.id);
    if (user == null){
      res.status(404).json({message: i18n.__("users.no_user_found")})
    } else {
      user.update(
        {
          firstName: req.body["firstName"],
          lastName: req.body["lastName"],
          email: req.body["email"]
        })
        .then((result)=>{
          const data = {
            id: result.id,
            firstName: result["firstName"],
            lastName: result["lastName"],
            email: result["email"]
          }
          res.status(200).json(
                                {
                                  message: i18n.__("users.update_success"),
                                  data: data
                                });
        }).catch(error => {
          res.status(500).json(error);
      })
      }
  } else {
    res.status(403).json({message: i18n.__("users.access_denied")})
  }
};

exports.delete = (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))
  if ( canAccessUser(req, req.body["id"]) ){
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
  }else{
    res.status(403).send({message: i18n.__("users.access_denied")})
  }
};

exports.adminUserUpdate = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))
  if ( isAdmin(req) ){
    const user = await User.findByPk(req.params.id);
  if (user == null){
    res.status(404).json({message: i18n.__("users.no_user_found")})
  } else {
    user.update(
      {
        firstName: req.body["firstName"],
        lastName: req.body["lastName"],
        email: req.body["email"],
        RoleId: req.body["RoleId"]
      })
      .then((result)=>{
        res.status(200).json({message: i18n.__("users.update_success"), result: result});
      }).catch(error => {
        res.status(500).json(error);
      })
    }
  }
};


exports.updatePassword = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))
  if ( canAccessUser(req, req.params.id) ){
    const user = await User.findByPk(req.params.id);
  if (user == null){
    res.status(404).json({message: i18n.__("users.no_user_found")})
  } else {
    user.update(
      {
        password: bcrypt.hashSync(req.body["password"], saltRounds)
      })
      .then((result)=>{
        const data = {
          id: result.id,
          firstName: result["firstName"],
          lastName: result["lastName"],
          email: result["email"]
        }
        res.status(200).json({message: i18n.__("users.update_success"), data: data});
      }).catch(error => {
        res.status(500).json(error);
      })
    }
  }
};