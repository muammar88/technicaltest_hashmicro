const { Administrator } = require("../../models");

class Models {
  constructor(req) {
    this.req = req;
  }

  async get_info() {
    try {
      var q = await Administrator.findOne({
        where: { username: this.req.body.username },
      });
      return {
        username: q.username,
        fullname: q.fullname,
        password: q.password,
      };
    } catch (error) {
      return {};
    }
  }
}

module.exports = Models;
