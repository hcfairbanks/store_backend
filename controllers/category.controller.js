import db from "../models";
import returnLanguage from '../helpers/returnLanguage'
import { i18n } from '../helpers/setLanguage.js'
import { translateError } from '../helpers/sequelizeTranslate'

const Category = db.category;

exports.findAll = (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))

  Category.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || i18n.__("categories.error_retrieving_categories")
      });
    });
};

exports.create =(req,res) => {
  Category.create({name: req.body["name"]})
  .then(data =>{
    res.send(data)
  }).catch(error => {
    // console.log(translateError(error)); // Start here tomorrow
    res.json(i18n.__(error.errors[0].message));
  })
}

exports.findByPk = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))

  const category = await Category.findByPk(req.params.id);
  if (category == null){
    res.send({message: i18n.__("categories.no_category_found")})
  } else{
    res.send(category)
  }
}; 

exports.update = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))

  let category = await Category.findByPk(req.body["id"]);
  if (category == null){
    res.send({message: i18n.__("categories.no_category_found")})
  } else{
    category.update({name: req.body["name"]})
    .then(data =>{
      res.send(data)
    }).catch(error => {
      res.json(error);
    })
  }
};

exports.delete = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))

  let category = await Category.findByPk(req.params.id);
  if (category == null){
    res.send({message: i18n.__("categories.no_category_found")})
  } else{
    category.destroy({ where: { id: req.params.id }})
    .then(data =>{
      res.status(200).json({message: i18n.__("categories.delete_success"), data: data});
    }).catch(error => {
      res.json(error);
    })
  }
};