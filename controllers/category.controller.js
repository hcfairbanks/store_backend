import db from '../models';
import i18n from '../helpers/setLanguage';
import returnLanguage from '../helpers/returnLanguage';

const Category = db.category;

exports.findAll = (req, res) => {
  i18n.setLocale(returnLanguage(req.headers));
  Category.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json(
        {
          errorMsg: i18n.__('categories.error_retrieving_categories'),
          error,
          requestBody: req.body,
          requestParams: req.params,
        },
      );
    });
};

exports.create = (req, res) => {
  i18n.setLocale(returnLanguage(req.headers));

  Category.create({ name: req.body.name })
    .then((data) => {
      res.status(201).json(data);
    }).catch((error) => {
      res.status(400).json(
        {
          errorMsg: i18n.__(error.errors[0].message),
          error,
          requestBody: req.body,
          requestParams: req.params,
        },
      );
    });
};

exports.findByPk = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers));

  const category = await Category.findByPk(req.params.id);
  if (category == null) {
    res.status(200).json({ message: i18n.__('categories.no_category_found') });
  } else {
    res.json(category);
  }
};

exports.update = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers));
  const category = await Category.findByPk(req.params.id);
  if (category == null) {
    res.json({ message: i18n.__('categories.no_category_found') });
  } else {
    category.update({ name: req.body.name })
      .then((data) => {
        res.status(200).json(data);
      }).catch((error) => {
        res.status(500).json(error);
      });
  }
};

exports.delete = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers));
  const category = await Category.findByPk(req.params.id);
  if (category == null) {
    res.status(200).json({ message: i18n.__('categories.no_category_found') });
  } else {
    category.destroy({ where: { id: req.params.id } })
      .then((data) => {
        res.status(200).json({ message: i18n.__('categories.delete_success'), data });
      }).catch((error) => {
        res.status(500).json(error);
      });
  }
};
