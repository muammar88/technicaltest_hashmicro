const jwt = require("jsonwebtoken");
const HandleError = require("../../utils/handleErrors");
const Models = require("./models");

class Controllers extends Models {
  constructor(req, res) {
    super(req);
    this.req = req;
    this.res = res;
    this.handleError = new HandleError(res, res);
  }

  async list() {
    if (!(await this.handleError.handleValidationErrors(this.req, this.res)))
      return;

    try {
      // get data
      const data = await this.m_list();
      // response
      this.res.status(200).json({
        error: false,
        message: "Daftar produk berhasil ditemukan.",
        ...data,
      });
    } catch (error) {
      this.handleError.handleServerError(this.res, error);
    }
  }

  async get_info_edit() {
    if (!(await this.handleError.handleValidationErrors(this.req, this.res)))
      return;

    try {
      // get data
      const data = await this.m_get_info();
      // filter by length
      if (Object.keys(data).length > 0) {
        // response
        this.res.status(200).json({
          error: false,
          message: "Data produk berhasil ditemukan.",
          data: data,
        });
      } else {
        // response
        this.res.status(400).json({
          error: true,
          message: "Data produk gagal ditemukan.",
        });
      }
    } catch (error) {
      console.log("DDD___DDD");
      console.log(error);
      console.log("DDD___DDD");
      this.handleError.handleServerError(this.res, error);
    }
  }

  async delete() {
    if (!(await this.handleError.handleValidationErrors(this.req, this.res)))
      return;

    try {
      // get data
      const response = await this.m_delete();
      if (response) {
        // response
        this.res.status(200).json({
          error: false,
          message: "Daftar produk berhasil dihapus.",
        });
      } else {
        // response
        this.res.status(400).json({
          error: true,
          message: "Daftar produk gagal dihapus.",
        });
      }
    } catch (error) {
      this.handleError.handleServerError(this.res, error);
    }
  }

  async add() {
    if (!(await this.handleError.handleValidationErrors(this.req, this.res)))
      return;

    try {
      console.log("body----");
      console.log(this.req.body);
      console.log("body----");
      // get data
      const response = await this.m_add();
      if (response) {
        // response
        this.res.status(200).json({
          error: false,
          message: "Data produk berhasil ditambahkan.",
        });
      } else {
        // response
        this.res.status(400).json({
          error: true,
          message: "Data produk gagal ditambahkan.",
        });
      }
    } catch (error) {
      console.log("-----");
      console.log(error);
      console.log("-----");
      this.handleError.handleServerError(this.res, error);
    }
  }

  async update() {
    if (!(await this.handleError.handleValidationErrors(this.req, this.res)))
      return;

    try {
      // get data
      const response = await this.m_update();
      if (response) {
        // response
        this.res.status(200).json({
          error: false,
          message: "Data produk berhasil diperbaharui.",
        });
      } else {
        // response
        this.res.status(400).json({
          error: true,
          message: "Data produk gagal diperbaharui.",
        });
      }
    } catch (error) {
      console.log("-----");
      console.log(error);
      console.log("-----");
      this.handleError.handleServerError(this.res, error);
    }
  }

  //   async refresh() {
  //     try {
  //       const { refresh_token } = this.req.body;
  //       if (!refresh_token) {
  //         return this.res
  //           .status(401)
  //           .json({ error: true, message: "Token diperlukan" });
  //       }

  //       if (!this.refreshTokens.includes(refresh_token)) {
  //         return this.res
  //           .status(403)
  //           .json({ error: true, message: "Token tidak dikenali" });
  //       }

  //       jwt.verify(refresh_token, process.env.REFRESH_SECRET_KEY, (err, user) => {
  //         if (err) {
  //           return this.res.status(403).json({
  //             error: true,
  //             message: "Token kadaluarsa atau tidak valid",
  //           });
  //         }

  //         const { exp, iat, ...userPayload } = user;
  //         const accessToken = jwt.sign(userPayload, process.env.SECRET_KEY, {
  //           expiresIn: "5m",
  //         });

  //         // feedBack
  //         this.res.status(200).json({
  //           error: false,
  //           message: "Token baru berhasil dibuat",
  //           data: {
  //             access_token: accessToken,
  //           },
  //         });
  //       });
  //     } catch (error) {
  //       this.res.status(400).json({
  //         error: false,
  //         message: error,
  //       });
  //     }
  //   }

  //   async administrator() {
  //     try {
  //       const data = await this.get_menu_submenu_tab();

  //       this.res.status(200).json({
  //         error: false,
  //         message: "Success.",
  //         data: {
  //           sidebar_info: data.sidebar_info,
  //           user_info: data.user_info,
  //         },
  //       });
  //     } catch (error) {
  //       this.res.status(400).json({
  //         error: false,
  //         message: error,
  //       });
  //     }
  //   }
}

module.exports = Controllers;
