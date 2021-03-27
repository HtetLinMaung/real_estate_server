const express = require("express");
const { body } = require("express-validator");
const {
  findAll,
  findById,
  create,
  update,
  remove,
} = require("../controllers/menu.controller");

const router = express.Router();

router
  .route("/")
  .get(findAll)
  .post(
    [
      body("menuName").notEmpty().withMessage("Menu name must not be empty!"),
      body("url").notEmpty().withMessage("Url must not be empty!"),
      body("isParent")
        .isBoolean()
        .withMessage("isParent must be true or false!"),
    ],
    create
  );

router
  .route("/:id")
  .get(findById)
  .put(
    [
      body("menuName").notEmpty().withMessage("Menu name must not be empty!"),
      body("url").notEmpty().withMessage("Url must not be empty!"),
      body("isParent")
        .isBoolean()
        .withMessage("isParent must be true or false!"),
    ],
    update
  )
  .delete(remove);

module.exports = router;
