const jwt = require("jsonwebtoken");
exports.refreshToken = (id) => {
  const token = jwt.sign({ f: id }, "secret_key", {
    expiresIn: "50m",
  });
  return token;
};

exports.accessToken = (email, id) => {
  const accessToken = jwt.sign({ r: id, email: email }, "accessToken", {
    expiresIn: "10m",
  });
  return accessToken;
};
