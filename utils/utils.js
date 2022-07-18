const jwt = require("jsonwebtoken");
exports.refreshToken = (id) => {
  const token = jwt.sign({ f: id }, "shhhhh", {
    expiresIn: "10m",
  });
  return token;
};

exports.accessToken = (email, id) => {
  const accessToken = jwt.sign({ r: id, email: email }, "accessToken", {
    expiresIn: "2m",
  });
  return accessToken;
};
