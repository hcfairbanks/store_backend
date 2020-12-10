const db = require("../models");
const Car = db.car;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {

  Car.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.create =(req,res) => {
  Car.create({name: req.body["name"]})
  .then(data =>{
    res.send(data)
  })
}

exports.findOne = (req, res) => {
  
};

exports.update = (req, res) => {
  
};

exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};

exports.findAllPublished = (req, res) => {
  
};