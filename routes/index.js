const express = require("express");
const route = new express.Router();
const { signup, login, getUserData, postUserData } = require("../controllers/controller");

route.get("/", (req, res) => {
  res.send("hello mr. sadik");
});

route.post("/signup", signup);

route.post("/login", login);

route.get("/getUserData",getUserData)

route.post("/postUserData",postUserData)


module.exports = route;
