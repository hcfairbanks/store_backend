//const db = require("../models");
//const db = require("../models");
import db from "../models";
const Item = db.item;
const Category = db.category;
import { i18n } from '../helpers/setLanguage.js'
import returnLanguage from '../helpers/returnLanguage'
import { translateError } from '../helpers/sequelizeTranslate'

exports.findAll = (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))

  Item.findAll({include: [ {model: Category} ],})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || i18n.__("items.error_retrieving_items")
          //err.message || "Error Retrieving Items: Plain text"
      });
    });
};

exports.create =(req, res) => {
  i18n.setLocale(returnLanguage(req.headers))

  Item.create({
                name: req.body["name"],
                description: req.body["description"],
                price: req.body["price"],
                quantity: req.body["quantity"],
                CategoryId: req.body["CategoryId"]
              })
  .then(data =>{
    res.send(data)
  })
}

exports.findByPk = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))
  
  const item = await Item.findByPk(req.params.id);
  if (item == null){
    res.send({message: i18n.__("items.no_item_found")})
  } else{
    res.send(item)
  }
};

exports.update = (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))

  Item.update({
    name: req.body["name"],
    description: req.body["description"],
    price: req.body["price"],
    quantity: req.body["quantity"],
    CategoryId: req.body["CategoryId"]
  }, {
    where: { id: req.body["id"] }
   }).then(result => {
    if ( result == 1){
      res.status(200).json({message: i18n.__("items.update_success"), result: result});
      // res.status(200).json({message: i18n.__n('%s cat', 1),result: result});
    }else{
      res.status(500).json({message: i18n.__('items.update_fail'), result: result});
    }
  }).catch(error => {
    console.log(error)
  })
  
};

exports.delete = (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))

  Item.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    if ( result == 1){
        res.status(200).json({message: i18n.__('items.delete_success'),result: result});
    }else{
      res.status(500).json({message: i18n.__('items.delete_fail'),result: result});
    }
  }).catch(error => {
    console.log(error)
  })
};
