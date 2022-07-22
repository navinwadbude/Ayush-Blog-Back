require('dotenv').config()

const jwt = require("jsonwebtoken");
exports.refreshToken = (id) => {
  const token = jwt.sign({ f: id }, process.env.REFRESH_TOKEN, {
    expiresIn: "50m",
  });
  return token;
};

exports.accessToken = (email, id) => {
  const accessToken = jwt.sign({ r: id, email: email }, process.env.ACCESS_TOKEN, {
    expiresIn: "10m",
  });
  return accessToken;
};
