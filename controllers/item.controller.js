import db from "../models";
import returnLanguage from '../helpers/returnLanguage'
import { i18n } from '../helpers/setLanguage.js'
const Item = db.item;
const Category = db.category;

exports.findAll = (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))
  Item.findAll({include: [ {model: Category} ],})
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => {
      res.status(500).json(
        { // Not sure I can predict what the error might be on a request to the index
          errorMsg: i18n.__("items.error_retrieving_items"),
          error: error,
          requestBody: req.body,
          requestParams: req.params
        });
    });
};

exports.create =(req,res) => {
  i18n.setLocale(returnLanguage(req.headers))

  Item.create({
    name: req.body["name"],
    description: req.body["description"],
    price: req.body["price"],
    quantity: req.body["quantity"],
    CategoryId: req.body["CategoryId"]
  })
  .then(data =>{
    res.status(201).send(data)
  }).catch(error => {
    res.status(400).send(
      {
        //errorMsg: i18n.__(error.errors[0].message),
        error: error,
        requestBody: req.body,
        requestParams: req.params
      }
    );
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

exports.update = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))

  let item = await Item.findByPk(req.body["id"]);
  console.log(item)
  console.log('*******************************')
  if (item === null){
    res.status(500).json({message: i18n.__("items.no_item_found")});
    // res.status(200).json({message: i18n.__n('%s cat', 1)});
  } else{
    item.update({
      name: req.body["name"],
      description: req.body["description"],
      price: req.body["price"],
      quantity: req.body["quantity"],
      CategoryId: req.body["CategoryId"]
    })
    .then(result =>{
      res.status(200).json({message: i18n.__("items.update_success"), result: result});
    }).catch(error => {
      //res.status(500).json(error);
      res.status(500).send(
        { // TODO fix this, might happen when I add validation
          // errorMsg: i18n.__(error.errors[0].message),
          error: error,
          requestBody: req.body,
          requestParams: req.params
        });
    })
  }
};

exports.delete = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers))

  let item = await Item.findByPk(req.params.id);
  if (item == null){
    res.send({message: i18n.__("items.no_item_found")})
  } else{
    item.destroy({ where: { id: req.params.id }})
    .then(data =>{
      res.status(200).json({message: i18n.__("items.delete_success"), data: data});
    }).catch(error => {
      //res.status(500).json(error);
      res.status(500).json(
        { // Not sure I can predict what the error might be on a request to the index
          errorMsg: i18n.__(error.errors[0].message),
          error: error,
          requestBody: req.body,
          requestParams: req.params
        });
    })
  }
};