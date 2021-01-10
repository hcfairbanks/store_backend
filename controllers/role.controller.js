const db = require("../models");
const Role = db.role;
import returnLanguage from '../helpers/returnLanguage'
import { translateError } from '../helpers/sequelizeTranslate'


exports.findAll = (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))

  Role.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || i18n.__("roles.error_retrieving_roles")
      });
    });
};

exports.create =(req,res) => {
  i18n.setLocale(returnLanguage(req.headers))

  Role.create({name: req.body["name"]})
  .then(data =>{
    res.send(data)
  })
};

exports.findByPk = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))

  const role = await Role.findByPk(req.params.id);
  if (role == null){
    res.send({message: i18n.__("roles.no_role_found")})
  } else{
    res.send(role)
  }
}; 

exports.update = (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))

  Role.update({
    name: req.body["name"]
  }, {
    where: { id: req.body["id"] }
   }).then(result => {
    if ( result == 1){
        res.status(200).json({message: i18n.__("roles.update_success"), result: result});
    }else{
      res.status(500).json({message: i18n.__("roles.update_failed"), result: result});
    }
  }).catch(error => {
    console.log(error)
  })
};

exports.delete = (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))

  Role.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    if ( result == 1){
        res.status(200).json({message: i18n.__("roles.delete_success"), result: result});
    }else{
      res.status(500).json({message: i18n.__("roles.update_failed"), result: result});
    }
  }).catch(error => {
    console.log(error)
  })
};
