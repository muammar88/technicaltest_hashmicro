const { Administrator } = require("../models");
const bcrypt = require("bcryptjs");

const validation = {};

validation.username = async (value) => {
  var check = await Administrator.findOne({
    where: { username: value },
  });
  if (!check) {
    throw new Error("Username tidak terdaftar dipangkalan data");
  }
  return true;
};

validation.password = async (value, { req }) => {
  try {
    var q = await Administrator.findOne({
      where: { username: req.body.username },
    });
    if (!q) {
      throw new Error("User ini tidak terdaftar dipangkalan data");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hasil = await bcrypt.hash(value, salt);

      const valid_password = await bcrypt.compare(value, q.password);
      if (!valid_password) {
        throw new Error("Username atau Password anda tidak valid.");
      }
    }
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = validation;
