const express = require("express");
const route = new express.Router();

const { signup, login, getUserData } = require("../controllers/user");
const { verifyToken } = require("../middelware/verfifyToken");

route.get("/", (req, res) => {
  res.send("hello mr. sadik");
});

route.post("/signup", signup);

route.post("/login", login);

route.get("/getUserData", verifyToken, getUserData);

module.exports = route;
