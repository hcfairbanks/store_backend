const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");

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

// username is in the form { username: "my cool username" }
// ^^the above object structure is completely arbitrary
function generateAccessToken(user) {
  console.log("**************");
  // The uppercase seems weird here but the only way I could get squeezle to
  // find the Role on the show was to include it like this
  console.log(user.Role.name);
  
  //TODO START HERE, need this relationship working
  //console.log(user.role)
  // expires after half and hour (1800 seconds = 30 minutes)
  //return jwt.sign(username, process.env.TOKEN_SECRET, { "expiresIn": 1000 });
  return jwt.sign({
    email: user.email,
    role: user.Role.name
  }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}

exports.create =(req,res) => {
  bcrypt.hash(req.body["password"], saltRounds, function (err, hash) {
    User.create({
                  firstName: req.body["firstName"],
                  lastName: req.body["lastName"],
                  email: req.body["email"],
                  password: hash,
                  RoleId: req.body["RoleId"]
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
    include: [
      {
    model: Role}],
    where: {
        email: req.body.email
           }
}).then(function (user) {
   if (!user) {
      res.redirect('/');
   } else {
bcrypt.compare(req.body.password, user.password, function (err, result) {
  if (result == true) {
    //const jwt = generateAccessToken(req.body["email"])
    //res.send({jwt: jwt})

    res.status(200).json({message: 'Success',result: result,jwt: generateAccessToken(user)});  
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
    password: req.body["password"], // Password section will need to be flushed out for an update
    RoleId: req.body["RoleId"] // Change this later to a seperate call that requires admin permissions
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