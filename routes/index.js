const express = require("express");
const route = new express.Router();
const jwt = require("jsonwebtoken");
const { signup, login, getUserData, } = require("../controllers/controller");

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  token=token.split(" ")[1]
  console.log("token===================",token);

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token,  "accessToken", (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unaut" });
    }
    else{
      console.log("=======================token verified")
      req.userId = decoded.id;
      next();
    }
    
  });
 
};

route.get("/", (req, res) => {
  res.send("hello mr. sadik");
});

route.post("/signup", signup);

route.post("/login", login);

route.get("/getUserData", verifyToken, getUserData)



module.exports = route;




