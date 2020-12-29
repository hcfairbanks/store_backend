const db = require("../models");
const Role = db.role;

exports.findAll = (req, res) => {

  Role.findAll()
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
  Role.create({name: req.body["name"]})
  .then(data =>{
    res.send(data)
  })
}


exports.findOne = (req, res) => {
};

exports.findOne = (req, res) => {
  // const user = await User.findByPk(req.params.id);
  // if (user === null) {
  //   console.log('User Not found!');
  // } else {
  //   console.log(user instanceof User); // true
  //   // Its primary key is 123
  // }

  // User.findByPk(req.params.id).then(data =>{
  //   res.send(data)
  // })
};


exports.findByPk = (req, res) => {
  // const user = await User.findByPk(req.params.id);
  // if (user === null) {
  //   console.log('User Not found!');
  // } else {
  //   console.log(user instanceof User); // true
  //   // Its primary key is 123
  // }

  Role.findByPk(req.params.id).then(data =>{
    res.send(data)
  })
}; 


exports.update = (req, res) => {

  Role.update({
    name: req.body["name"]
  }, {
    where: { id: req.body["id"] }
   }).then(result => {
    // Need to findout how to catch duplicate emails
    if ( result == 1){
        res.status(200).json({message: 'Success',result: result});
    }else{
      res.status(500).json({message: 'Updating data failed.',result: result});
    }
  }).catch(error => {
    console.log(error)
  })
  
};


exports.delete = (req, res) => {
  // https://www.codota.com/code/javascript/functions/sequelize/Model/destroy
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    if ( result == 1){
        res.status(200).json({message: 'Success',result: result});
    }else{
      res.status(500).json({message: 'Deleting data failed.',result: result});
    }
  }).catch(error => {
    console.log(error)
  })
};

exports.deleteAll = (req, res) => {
  
};