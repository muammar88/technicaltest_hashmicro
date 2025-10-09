const jwt = require("jsonwebtoken");
const express = require("express");
const { body } = require("express-validator");
const Controllers = require("../modules/daftar_product/controllers");
const Validation = require("../validation/daftar_product");
const { authenticateToken } = require("../middleware/authenticate");

// ROUTER
const router = express.Router();

router.post(
  "/product/list",
  [
    body("perpage")
      .notEmpty()
      .withMessage("Perpage Tidak Boleh Kosong")
      .isInt()
      .withMessage("Perpage Harus Angka"),
    body("pageNumber")
      .notEmpty()
      .withMessage("Page Number Tidak Boleh Kosong")
      .isInt()
      .withMessage("Page Number Harus Angka"),
    body("search").optional().isString().withMessage("Search Harus String"),
  ],
  authenticateToken,
  (req, res) => new Controllers(req, res).list()
);

router.post(
  "/product/add",
  [
    body("name").notEmpty().withMessage("Nama Tidak Boleh Kosong"),
    body("desc").notEmpty().withMessage("Deskripsi Tidak Boleh Kosong"),
  ],
  authenticateToken,
  (req, res) => new Controllers(req, res).add()
);

router.post(
  "/product/get_info_edit",
  [
    body("id")
      .notEmpty()
      .withMessage("ID Product Tidak Boleh Kosong")
      .custom(Validation.check_id),
  ],
  authenticateToken,
  (req, res) => new Controllers(req, res).get_info_edit()
);

router.post(
  "/product/update",
  [
    body("id")
      .notEmpty()
      .withMessage("ID Product Tidak Boleh Kosong")
      .custom(Validation.check_id),
    body("name").notEmpty().withMessage("Nama Tidak Boleh Kosong"),
    body("desc").notEmpty().withMessage("Deskripsi Tidak Boleh Kosong"),
  ],
  authenticateToken,
  (req, res) => new Controllers(req, res).update()
);

router.post(
  "/product/delete",
  [
    body("id")
      .notEmpty()
      .withMessage("ID Product Tidak Boleh Kosong")
      .custom(Validation.check_id),
  ],
  authenticateToken,
  (req, res) => new Controllers(req, res).delete()
);

module.exports = router;
