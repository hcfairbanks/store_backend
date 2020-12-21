const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

var bcrypt = require('bcrypt');
const saltRounds = 10;

exports.findAll = (req, res) => {

  User.findAll()
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
  bcrypt.hash(req.body["password"], saltRounds, function (err, hash) {
    User.create({
                  firstName: req.body["firstName"],
                  lastName: req.body["lastName"],
                  email: req.body["email"],
                  password: hash
                })
    .then(data =>{
      res.send(data)
    }).catch(error => {
      console.log(error);
      res.send(error.errors);
    })
  })
}

exports.login = (req, res) =>{
//  const user = await User.findByPk(req.params.id)
  User.findOne({
    where: {
        email: req.body.email
           }
}).then(function (user) {
   if (!user) {
      res.redirect('/');
   } else {
bcrypt.compare(req.body.password, user.password, function (err, result) {
  if (result == true) {
    res.status(200).json({message: 'Success',result: result});  
    //res.redirect('/home');
  } else {
   // res.send('Incorrect password');
   // res.redirect('/');
   res.status(403).json({message: 'Access Denied'});
  }
});
}

});


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

  User.findByPk(req.params.id).then(data =>{
    res.send(data)
  })
}; 


exports.update = (req, res) => {

  User.update({
    firstName: req.body["firstName"],
    lastName: req.body["lastName"],
    email: req.body["email"],
    password: req.body["password"] // Password section will need to be flushed out for an update
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