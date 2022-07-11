const express = require("express");
const route = new express.Router();
const { signup ,login} = require("../controllers/controller");

route.get("/", (req, res) => {
  res.send("hello mr. sadik");
});

route.post("/signup", signup);

route.post("/login", login);

module.exports = route;
