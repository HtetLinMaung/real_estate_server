const { validationResult } = require("express-validator");
const Menu = require("../models/Menu");

exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }

    const menu = new Menu({
      menuName: req.body.menuName,
      url: req.body.url,
      isParent: req.body.isParent,
      parentId: req.body.parentId,
    });
    await menu.save();
    res.status(201).json({ message: "Menu created!", data: menu });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const menus = await Menu.find();
    res.json({ data: menus });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.findById = async (req, res, next) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      const error = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    res.json({ data: menu });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }

    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      const error = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    menu.menuName = req.body.menuName;
    menu.url = req.body.url;
    menu.isParent = req.body.isParent;
    menu.parentId = req.body.parentId;
    await menu.save();
    res.json({ message: "Menu updated successful", data: menu });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      const error = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    await Menu.findByIdAndRemove(req.params.id);
    res.status(204);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
