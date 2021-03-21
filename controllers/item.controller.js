import db from '../models';
import i18n from '../helpers/setLanguage';
import returnLanguage from '../helpers/returnLanguage';

const Item = db.item;
const Category = db.category;

exports.findAll = (req, res) => {
  i18n.setLocale(returnLanguage(req.headers));
  Item.findAll({ include: [{ model: Category }] })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json(
        {
          errorMsg: i18n.__('items.error_retrieving_items'),
          error,
          requestBody: req.body,
          requestParams: req.params,
        },
      );
    });
};

exports.create = (req, res) => {
  i18n.setLocale(returnLanguage(req.headers));
  Item.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    CategoryId: req.body.CategoryId,
  })
    .then((data) => {
      res.status(201).json(data);
    }).catch((error) => {
      res.status(400).json(
        {
          error,
          requestBody: req.body,
          requestParams: req.params,
        },
      );
    });
};

exports.findByPk = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers));
  const item = await Item.findByPk(req.params.id);
  if (item === null) {
    res.json({ message: i18n.__('items.no_item_found') });
  } else {
    res.json(item);
  }
};

exports.update = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers));
  const item = await Item.findByPk(req.params.id);
  if (item === null) {
    res.status(500).json({ message: i18n.__('items.no_item_found') });
  } else {
    item.update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      CategoryId: req.body.CategoryId,
    })
      .then((result) => {
        res.status(200).json({
          message: i18n.__('items.update_success'),
          result,
        });
      }).catch((error) => {
        res.status(500).json(
          {
            error,
            requestBody: req.body,
            requestParams: req.params,
          },
        );
      });
  }
};

exports.delete = async (req, res) => {
  i18n.setLocale(returnLanguage(req.headers));
  const item = await Item.findByPk(req.params.id);
  if (item == null) {
    res.json({ message: i18n.__('items.no_item_found') });
  } else {
    item.destroy({ where: { id: req.params.id } })
      .then((data) => {
        res.status(200).json({ message: i18n.__('items.delete_success'), data });
      }).catch((error) => {
        res.status(500).json(
          {
            errorMsg: i18n.__(error.errors[0].message),
            error,
            requestBody: req.body,
            requestParams: req.params,
          },
        );
      });
  }
};
