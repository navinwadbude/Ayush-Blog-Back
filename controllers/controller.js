const jwt = require("jsonwebtoken");
const token = jwt.sign({ foo: "62cc2f9f0e799ada3e52980c" }, "shhhhh");
const User = require("../model/index");
console.log("token::", token);

var decoded = jwt.verify(token, "shhhhh");
console.log("saurabh", decoded.foo);
module.exports = {
  signup: async (req, res) => {
    try {
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
    const result = await User.findOne({ email: req.body.email });
    console.log(result);
    const db_pass = result.password;

    const user_pass = req.body.password;
    console.log("db_pass", db_pass);
    if (db_pass == user_pass) {
      res.send("login successfully");
    } else {
      res.send("invalid login details");
    }
  },
};
