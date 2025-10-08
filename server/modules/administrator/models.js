const jwt = require("jsonwebtoken");
const { Administrator, Tab, Menu } = require("../../models");

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
        id: q.id,
        username: q.username,
        fullname: q.fullname,
        password: q.password,
      };
    } catch (error) {
      return {};
    }
  }

  async get_menu_submenu_tab() {
    try {
      const authHeader = this.req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      console.log("DDDDDD");
      console.log(decoded);
      console.log("DDDDDD");
      var user_info = {};
      await Administrator.findOne({
        where: {
          id: decoded.id,
        },
      }).then(async (e) => {
        if (e) {
          user_info["fullname"] = e.fullname;
        }
      });

      var menu = {};
      await Menu.findAll().then(async (value) => {
        await Promise.all(
          await value.map(async (e) => {
            menu[e.id] = {
              id: e.id,
              name: e.name,
              path: e.path,
              icon: e.icon,
              tab: e.path === "#" ? "" : JSON.parse(e.tab),
            };
          })
        );
      });

      var tab = {};
      await Tab.findAll().then(async (value) => {
        await Promise.all(
          await value.map(async (e) => {
            tab = {
              ...tab,
              ...{
                [e.id]: {
                  id: e.id,
                  name: e.name,
                  icon: e.icon,
                  path: e.path,
                  title: e.title,
                  desc: e.desc,
                },
              },
            };
          })
        );
      });

      return { sidebar_info: { menu, tab }, user_info: user_info };
    } catch (error) {
      console.log("~~~~~~~~~~~");
      console.log(error);
      console.log("~~~~~~~~~~~");
      return {};
    }
  }
}

module.exports = Models;
