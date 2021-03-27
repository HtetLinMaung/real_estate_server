const express = require("express");
const { body } = require("express-validator");
const User = require("../models/User");
const { register, login } = require("../controllers/auth.controller");

const router = express.Router();

router.post(
  "/register",
  [
    body("username")
      .trim()
      .custom((v) => {
        return User.findOne({ username: v }).then((user) => {
          if (user) {
            return Promise.reject("Username already existed!");
          }
          return Promise.resolve();
        });
      }),
    body("password").notEmpty().withMessage("Password must not be empty!"),
  ],
  register
);

router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username must not be empty!"),
    body("password").notEmpty().withMessage("Password must not be empty!"),
  ],
  login
);

module.exports = router;
