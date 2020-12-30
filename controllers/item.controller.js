const db = require("../models");
const Item = db.item;

exports.findAll = (req, res) => {

  Item.findAll()
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

exports.create =(req, res) => {
  // Will need category
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

exports.findByPk = (req, res) => {
  // const user = await User.findByPk(req.params.id);
  // if (user === null) {
  //   console.log('User Not found!');
  // } else {
  //   console.log(user instanceof User); // true
  //   // Its primary key is 123
  // }

  Item.findByPk(req.params.id).then(data =>{
    res.send(data)
  })
}; 

exports.update = (req, res) => {

  Item.update({
    name: req.body["name"],
    description: req.body["description"],
    price: req.body["price"],
    quantity: req.body["quantity"],
    CategoryId: req.body["CategoryId"]
  }, {
    where: { id: req.body["id"] }
   }).then(result => {
    // Need to findout how to catch duplicate emails
    if ( result == 1){
        res.status(200).json({message: 'Success',result: result});
    }else{
      res.status(500).json({message: 'Updating Data Failed.',result: result});
    }
  }).catch(error => {
    console.log(error)
  })
  
};

exports.delete = (req, res) => {
  // https://www.codota.com/code/javascript/functions/sequelize/Model/destroy
  Item.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    if ( result == 1){
        res.status(200).json({message: 'Success',result: result});
    }else{
      res.status(500).json({message: 'Deleting Data Failed.',result: result});
    }
  }).catch(error => {
    console.log(error)
  })
};
