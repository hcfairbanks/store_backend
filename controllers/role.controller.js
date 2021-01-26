import db from "../models";
import returnLanguage from '../helpers/returnLanguage'
import { i18n } from '../helpers/setLanguage.js'
const Role = db.role;

exports.findAll = (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))
  Role.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json(
        { // Not sure I can predict what the error might be on a request to the index
          errorMsg: i18n.__("roles.error_retrieving_roles"),
          error: error,
          requestBody: req.body,
          requestParams: req.params
        });
    });
};

exports.create =(req,res) => {
  i18n.setLocale(returnLanguage(req.headers))
  Role.create({name: req.body["name"]})
  .then(data =>{
    res.status(201).json(data)
  }).catch(error => {
    res.status(400).json(
      {
        errorMsg: i18n.__(error.errors[0].message),
        error: error,
        requestBody: req.body,
        requestParams: req.params
      }
    );
  })
}

exports.findByPk = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))
  const category = await Category.findByPk(req.params.id);
  if (category == null){
    res.status(200).json({message: i18n.__("roles.no_role_found")})
  } else{
    res.json(category)
  }
}; 

exports.update = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))
  let role = await Role.findByPk(req.body["id"]);
  if (role == null){
    res.json({message: i18n.__("roles.no_role_found")})
  } else{
    role.update({name: req.body["name"]})
    .then(data =>{
      res.status(200).json(data)
    }).catch(error => {
      res.status(500).json(error);
    })
  }
};

exports.delete = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))
  let role = await Role.findByPk(req.params.id);
  if (role == null){
    res.json({message: i18n.__("roles.no_role_found")})
  } else{
    role.destroy({ where: { id: req.params.id }})
    .then(data =>{
      res.status(200).json({message: i18n.__("roles.delete_success"), data: data});
    }).catch(error => {
      res.status(500).json(error);
    })
  }
};
