import db from "../models";
import returnLanguage from '../helpers/returnLanguage'
import { i18n } from '../helpers/setLanguage.js'

const Category = db.category;

exports.findAll = (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))

  Category.findAll()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => {
      res.status(500).json(
        { // Not sure I can predict what the error might be on a request to the index
          errorMsg: i18n.__("categories.error_retrieving_categories"),
          error: error,
          requestBody: req.body,
          requestParams: req.params
        });
    });
};

exports.create =(req,res) => {
  Category.create({name: req.body["name"]})
  .then(data =>{
    res.status(201).send(data)
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