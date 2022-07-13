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
    const result = await User.findOne({ email: req.body.email });
    if (!result) {
      return res.status(500).send({
        error: "user is not registered",
      });
    }

    const token = jwt.sign({ foo: result.id }, "shhhhh");

    console.log("==========>", token);
    var decoded = jwt.verify(token, "shhhhh");
    console.log(decoded);
    const db_pass = result.password;

    const user_pass = req.body.password;
    console.log("db_pass", db_pass);
    if (db_pass == user_pass) {
      res.status(200).json({
        message: "login successfully",
        token: token,
      });
    } else {
      res.send("invalid login details");
    }
  },
};
