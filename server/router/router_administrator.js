const jwt = require("jsonwebtoken");
const express = require("express");
const { body } = require("express-validator");
const Controllers = require("../modules/administrator/controllers");
const Validation = require("../validation/administrator");
const { authenticateToken } = require("../middleware/authenticate");

// ROUTER
const router = express.Router();

router.post(
  "/login",
  body("username")
    .notEmpty()
    .withMessage("Username Tidak Boleh Kosong")
    .trim()
    .custom(Validation.username),
  body("password")
    .notEmpty()
    .withMessage("Password Tidak Boleh Kosong")
    .trim()
    .custom(Validation.password),
  (req, res) => new Controllers(req, res).login()
);

router.post("/refresh", (req, res) => new Controllers(req, res).refresh());

router.get("/administrator", authenticateToken, (req, res) =>
  new Controllers(req, res).administrator()
);

module.exports = router;
