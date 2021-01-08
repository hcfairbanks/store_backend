//const db = require("../models");
const db = require("../models")('en');
const Item = db.item;
const Category = db.category;
import { i18n } from '../helpers/setLanguage.js'


exports.findAll = (req, res) => {
  // TODO This breakes if the header isn't there
  //i18n.setLocale(req.headers.mylanguage)  
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
  // TODO This breakes if the header isn't there
  i18n.setLocale(req.headers.mylanguage)
  const item = await Item.findByPk(req.params.id);
  if (item == null){
    res.send({message: i18n.__("items.no_item_found")})
  } else{
    res.send(item)
  }
};

exports.update = (req, res) => {
  // TODO This breakes if the header isn't there
  i18n.setLocale(req.headers.mylanguage)

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
  // TODO This breakes if the header isn't there
  i18n.setLocale(req.headers.mylanguage)
  
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