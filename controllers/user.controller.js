import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models';
import i18n from '../helpers/setLanguage';
import returnLanguage from '../helpers/returnLanguage';
import logger from '../helpers/logger';

const Role = db.role;
const saltRounds = 10;
const User = db.user;

function canAccessUser(req, userId) {
  const decoded = jwt.verify(req.headers.bearer, process.env.TOKEN_SECRET);
  return (
    userId === decoded.id || decoded.role === 'admin'
  );
}

function isAdmin(req) {
  const decoded = jwt.verify(req.headers.bearer, process.env.TOKEN_SECRET);
  return (
    decoded.role === 'admin'
  );
}

function generateAccessToken(user) {
  return jwt.sign({
    email: user.email,
    role: user.Role.name,
    id: user.id,
  }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}

function scrubPasswords(userData) {
  for (var i in userData) {
    userData[i]['password'] = "**********";
  }
  return userData[i];
}

exports.findAll =  (req, res) => {
  i18n.setLocale(returnLanguage(req.headers));
  User.findAll({ include: [{ model: Role }] })
    .then((data) => {
      const scrubedData = scrubPasswords(data); 
      res.status(200).json(scrubedData);
    })
    .catch((error) => {
      res.status(500).json({
        message:
          error.message || i18n.__('users.error_retrieving_users'),
      });
    });
};

exports.create = (req, res) => {
  i18n.setLocale(returnLanguage(req.headers));
   bcryptjs.hash(req.body.password, saltRounds, (error, hash) => {
    User.create(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        RoleId: req.body.RoleId,
      },
    )
      .then((data) => {
        res.status(201).json({
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          RoleId: req.RoleId,
        });
      }).catch((err) => {
        res.status(500).json({ error: i18n.__(err.errors[0].message) });
      });
  });
};

exports.login = (req, res) => {
  // logger.info("/ query", { query: req.body });
  i18n.setLocale(returnLanguage(req.headers));
  User.findOne({
    include: [{ model: Role }],
    where: { email: req.body.email },
  }).then((user) => {
    if (!user) {
      res.status(301).redirect('/');
    } else {
      bcryptjs.compare(req.body.password, user.password, (error, result) => {
        if (result === true) {
          res.status(200).json(
            {
              message: i18n.__('users.access_granted'),
              result,
              jwt: generateAccessToken(user),
            },
          );
        } else {
          res.status(403).json({ message: i18n.__('users.access_denied') });
        }
      });
    }
  });
};

exports.findByPk = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers));
  if (canAccessUser(req, req.params.id)) {
    const user = await User.findByPk(req.params.id);
    if (user === null) {
      res.status(404).json({ message: i18n.__('users.no_user_found') });
    } else {
      user.password = "**********";
      res.status(200).json(user);
    }
  } else {
    res.status(403).json({ message: i18n.__('users.access_denied') });
  }
};

exports.update = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers));
  if (canAccessUser(req, req.params.id)) {
    const user = await User.findByPk(req.params.id);
    if (user === null) {
      res.status(404).json({ message: i18n.__('users.no_user_found') });
    } else {
      user.update(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
        },
      )
        .then((result) => {
          const data = {
            id: result.id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
          };
          res.status(200).json(
            {
              message: i18n.__('users.update_success'),
              data,
            },
          );
        }).catch((error) => {
          res.status(500).json(error);
        });
    }
  } else {
    res.status(403).json({ message: i18n.__('users.access_denied') });
  }
};

exports.delete = (req, res) => {
  i18n.setLocale(returnLanguage(req.headers));
  if (canAccessUser(req, req.body.id)) {
    User.destroy({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      if (result === 1) {
        res.status(200).json({ message: i18n.__('users.delete_success'), result });
      } else {
        res.status(500).json({ message: i18n.__('users.delete_failed'), result });
      }
    }).catch((error) => {
      res.status(500).json({ error });
    });
  } else {
    res.status(403).send({ message: i18n.__('users.access_denied') });
  }
};

exports.adminUserUpdate = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers));
  if (isAdmin(req)) {
    const user = await User.findByPk(req.params.id);
    if (user === null) {
      res.status(404).json({ message: i18n.__('users.no_user_found') });
    } else {
      user.update(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          RoleId: req.body.RoleId,
        },
      )
        .then((result) => {
          res.status(200).json({ message: i18n.__('users.update_success'), result });
        }).catch((error) => {
          res.status(500).json(error);
        });
    }
  }
};

exports.updatePassword = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers));
  if (canAccessUser(req, req.params.id)) {
    const user = await User.findByPk(req.params.id);
    if (user === null) {
      res.status(404).json({ message: i18n.__('users.no_user_found') });
    } else {
      user.update(
        {
          password: bcryptjs.hashSync(req.body.password, saltRounds),
        },
      )
        .then((result) => {
          const data = {
            id: result.id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
          };
          res.status(200).json({ message: i18n.__('users.update_success'), data });
        }).catch((error) => {
          res.status(500).json(error);
        });
    }
  }
};
