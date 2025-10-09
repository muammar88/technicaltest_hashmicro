const jwt = require("jsonwebtoken");
const moment = require("moment");
const { sequelize, Op, Product, Item } = require("../../models");

class Models {
  constructor(req) {
    this.req = req;
  }

  async m_list() {
    try {
      const body = this.req.body;
      const limit = parseInt(body.perpage, 10) || 10;
      const page =
        body.pageNumber && body.pageNumber !== "0"
          ? parseInt(body.pageNumber, 10)
          : 1;

      const where = body.search
        ? {
            [Op.or]: [
              { code: { [Op.like]: `%${body.search}%` } },
              { name: { [Op.like]: `%${body.search}%` } },
            ],
          }
        : {};

      const result = await Product.findAndCountAll({
        limit,
        offset: (page - 1) * limit,
        order: [["id", "ASC"]],
        attributes: ["id", "code", "name", "description"],
        where,
        include: {
          model: Item,
          attributes: ["id", "item_code", "name", "price", "status"],
        },
      });

      return {
        data: result.rows.map((e) => ({
          id: e.id,
          code: e.code,
          name: e.name,
          available: e.Items.filter((item) => item.status === "available"),
          description: e.description,
        })),
        total: result.count,
      };
    } catch (error) {
      console.log("dddd");
      console.log(error);
      console.log("dddd");
      return {};
    }
  }

  async m_get_info() {
    try {
      const body = this.req.body;
      const e = await Product.findByPk(body.id);
      return {
        id: e.id,
        name: e.name,
        description: e.description,
      };
    } catch (error) {
      return {};
    }
  }

  async m_delete() {
    const t = await sequelize.transaction();
    const body = this.req.body;

    try {
      await Product.destroy({
        where: { id: body.id },
        transaction: t,
      });
      await t.commit();
      return true;
    } catch (error) {
      await t.rollback();
      return false;
    }
  }

  async m_update() {
    const t = await sequelize.transaction();
    const body = this.req.body;
    const myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    try {
      // update
      await Product.update(
        {
          name: body.name,
          description: body.desc,
          updatedAt: myDate,
        },
        {
          where: { id: body.id },
          transaction: this.t,
        }
      );

      await t.commit();
      return true;
    } catch (error) {
      await t.rollback();
      return false;
    }
  }

  async randomString(length, chars) {
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  async generateProductCode() {
    var rand = 0;
    let condition = true;
    while (condition) {
      rand = await this.randomString(6, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ");
      let check = await Product.findOne({
        where: { code: rand },
      });
      if (!check) condition = false;
    }
    return rand;
  }

  async m_add() {
    const t = await sequelize.transaction();
    const body = this.req.body;
    const myDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    try {
      // generated code
      const code = await this.generateProductCode();

      console.log(">>>> BODY:", this.req.body);

      // insert
      await Product.create(
        {
          code: code,
          name: body.name,
          description: body.desc,
          updatedAt: myDate,
        },
        {
          transaction: t,
        }
      );

      await t.commit();
      return true;
    } catch (error) {
      console.log("cccc");
      console.log(error);
      console.log("cccc");
      await t.rollback();
      return false;
    }
  }
}

module.exports = Models;
