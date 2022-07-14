const jwt = require("jsonwebtoken");
const User = require("../model/index");

const bcrypt = require("bcrypt");
module.exports = {
  signup: async (req, res) => {
    try {
      const pass = await bcrypt.hash(req.body.password, 10);
      req.body.password = pass;
      const cpass = await bcrypt.hash(req.body.cpassword, 10);
      req.body.cpassword = cpass;
      const result = await User.findOne({ email: req.body.email });
      console.log("result", result);
      if (result) {
        return res.status(201).json({ message: "user already exist" });
      }

      console.log("user", { ...req.body });

      const createuser = await User({ ...req.body }).save();
      res.status(201).send(createuser);
    } catch (error) {
      console.error("Error", error);
      res.status(400).send(error);
    }
  },

  login: async (req, res) => {
    try {
      const result = await User.findOne({ email: req.body.email });
      if (!result) {
        return res.status(500).send({
          error: "user is not registered",
        });
      }

      const token = jwt.sign({ f: result.id }, "shhhhh",{
        expiresIn: "10m"});
        const accessToken = jwt.sign({ r: result.id }, "accessToken",{
          expiresIn: "2m"});
          console.log(token+"=============>",accessToken);
      var decoded = jwt.verify(token, "shhhhh");
      var decoded = jwt.verify(accessToken, "accessToken");
      const db_pass = result.password;
      const user_pass = req.body.password;
      const match = await bcrypt.compare(user_pass, db_pass);
      console.log(match);
      if (match === true) {
        const data = await User.findOneAndUpdate(
          { _id: result.id },
          { $set: { token: token } }
        );

        res.status(200).json({
          token: accessToken,
          message: "login successfully",
        });
      } else {
        res.send("invalid login details");
      }
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  },
  
  getUserData: async (req, res) => {
    try {
    const getUser= await User.findOne({
      email:req.body.email,
    })
    console.log(req.body.email,getUser)
    } catch (error) {
      
    }
  },
  

postUserData: async (req, res) => {
  try {
  const getUser= await User.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
  })
  res.send(getUser )
  console.log(req.body.email)
  } catch (error) {
    console.log(error)
  }
},
};