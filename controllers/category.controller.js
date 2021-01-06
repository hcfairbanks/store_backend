const db = require("../models");
const Category = db.category;
import { i18n } from '../helpers/setLanguage.js'

exports.findAll = (req, res) => {
  // TODO This breakes if the header isn't there
  i18n.setLocale(req.headers.mylanguage)

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
  })
}

exports.findByPk = async (req, res) => {
  // TODO This breakes if the header isn't there
  i18n.setLocale(req.headers.mylanguage)

  const category = await Category.findByPk(req.params.id);
  if (category == null){
    res.send({message: i18n.__("categories.no_category_found")})
  } else{
    res.send(category)
  }
}; 

exports.update = (req, res) => {
  // TODO This breakes if the header isn't there
  i18n.setLocale(req.headers.mylanguage)

  Category.update({
    name: req.body["name"]
  }, {
    where: { id: req.body["id"] }
   }).then(result => {
    if ( result == 1){
        res.status(200).json({message: i18n.__("categories.update_success") ,result: result});
    }else{
      res.status(500).json({message: i18n.__("categories.update_failed"),result: result});
    }
  }).catch(error => {
    console.log(error)
  })
};

exports.delete = (req, res) => {
  // TODO This breakes if the header isn't there
  i18n.setLocale(req.headers.mylanguage)
  
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    if ( result == 1){
        res.status(200).json({message: i18n.__("categories.delete_success"), result: result});
    }else{
      res.status(500).json({message: i18n.__("categories.delete_failed"), result: result});
    }
  }).catch(error => {
    console.log(error)
  })
};