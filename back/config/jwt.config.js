const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.userToken, secret, (err, payload) => {
    if (err) {
      res.status(401).json({ verified: false, msg: "Token not found" });
    } else {
      req.userId = payload.id;
      next();
    }
  });
};
