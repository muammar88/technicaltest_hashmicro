const jwt = require("jsonwebtoken");
const HandleError = require("../../utils/handleErrors");
const Models = require("./models");

class Controllers extends Models {
  constructor(req, res) {
    super(req);
    this.req = req;
    this.res = res;
    this.handleError = new HandleError(res, res);
    this.refreshTokens = [];
  }

  async login() {
    if (!(await this.handleError.handleValidationErrors(this.req, this.res)))
      return;

    try {
      const data = this.get_info();

      const userPayload = {
        id: data.id,
        username: data.username,
        fullname: data.fullname,
      };
      const access_token = jwt.sign(userPayload, process.env.SECRET_KEY, {
        expiresIn: "5m",
      });
      const refresh_token = jwt.sign(
        userPayload,
        process.env.REFRESH_SECRET_KEY,
        { expiresIn: "7d" }
      );

      refreshTokens.push(refresh_token);

      this.res.status(200).json({
        error: false,
        message: "Proses login berhasil dilakukan.",
        data: {
          access_token,
          refresh_token,
        },
      });
    } catch (error) {
      this.handleError.handleServerError(this.res, error);
    }
  }

  async refresh() {
    const { refresh_token } = this.req.body;
    if (!refresh_token) {
      return this.res
        .status(401)
        .json({ error: true, message: "Token diperlukan" });
    }

    if (!this.refreshTokens.includes(refresh_token)) {
      return this.res
        .status(403)
        .json({ error: true, message: "Token tidak dikenali" });
    }

    jwt.verify(refresh_token, process.env.REFRESH_SECRET_KEY, (err, user) => {
      if (err) {
        return this.res.status(403).json({
          error: true,
          message: "Token kadaluarsa atau tidak valid",
        });
      }

      const { exp, iat, ...cleanUser } = user;
      const accessToken = jwt.sign(cleanUser, process.env.SECRET_KEY, {
        expiresIn: "5m",
      });

      // feedBack
      this.res.status(200).json({
        error: false,
        message: "Token baru berhasil dibuat",
        data: {
          access_token: accessToken,
        },
      });
    });
  }
}

module.exports = Controllers;
