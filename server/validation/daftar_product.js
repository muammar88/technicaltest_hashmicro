const { Product } = require("../models");
const bcrypt = require("bcryptjs");

const validation = {};

validation.check_id = async (value) => {
  var check = await Product.findOne({
    where: { id: value },
  });
  if (!check) {
    throw new Error("ID Product tidak terdaftar dipangkalan data");
  }
  return true;
};

module.exports = validation;
