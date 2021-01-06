const db = require("../models");
const Role = db.role;

exports.findAll = (req, res) => {
  // TODO This breakes if the header isn't there
  i18n.setLocale(req.headers.mylanguage)

  Role.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || i18n.__("roles.error_retrieving_roles")
      });
    });
};

exports.create =(req,res) => {
  Role.create({name: req.body["name"]})
  .then(data =>{
    res.send(data)
  })
};

exports.findByPk = async (req, res) => {
  // TODO This breakes if the header isn't there
  i18n.setLocale(req.headers.mylanguage)

  const role = await Role.findByPk(req.params.id);
  if (role == null){
    res.send({message: i18n.__("roles.no_role_found")})
  } else{
    res.send(role)
  }
}; 

exports.update = (req, res) => {
  // TODO This breakes if the header isn't there
  i18n.setLocale(req.headers.mylanguage)

  Role.update({
    name: req.body["name"]
  }, {
    where: { id: req.body["id"] }
   }).then(result => {
    if ( result == 1){
        res.status(200).json({message: i18n.__("roles.update_success"), result: result});
    }else{
      res.status(500).json({message: i18n.__("roles.update_failed"), result: result});
    }
  }).catch(error => {
    console.log(error)
  })
};

exports.delete = (req, res) => {
  // TODO This breakes if the header isn't there
  i18n.setLocale(req.headers.mylanguage)

  Role.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    if ( result == 1){
        res.status(200).json({message: i18n.__("roles.delete_success"), result: result});
    }else{
      res.status(500).json({message: i18n.__("roles.update_failed"), result: result});
    }
  }).catch(error => {
    console.log(error)
  })
};
