require("dotenv").config();
const jwt = require("jsonwebtoken");
exports.verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  token = token.split(" ")[1];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unaut" });
    } else {
      req.userId = decoded.id;
      next();
    }
  });
};
