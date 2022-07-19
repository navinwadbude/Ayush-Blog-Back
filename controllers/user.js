const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { accessToken, refreshToken } = require("../utils/utils");

const bcrypt = require("bcrypt");
module.exports = {
  signup: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.json({ msg: `please enter all fields` });
      }
      const pass = await bcrypt.hash(password, 10);
      req.body.password = pass;
      const result = await User.findOne({ email: req.body.email });
      if (result) {
        return res.status(409).json({ message: "user already exist" });
      }

      const createuser = await User({ ...req.body }).save();
      if (!createuser) {
        res.status(404).send("user is not created ");
      }
      res.status(201).send(createuser);
    } catch (error) {
      console.error("Error", error);
      res.status(400).send(error);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.json({ msg: "please enter all field!" });
      }

      const result = await User.findOne({ email });
      console.log(result);
      if (!result) {
        return res.status(403).send({
          error: "user is not registered",
        });
      }

      const db_pass = result.password;
      const user_pass = req.body.password;
      const match = await bcrypt.compare(user_pass, db_pass);
      console.log(match);
      if (match === true) {
        const token = accessToken(result.email, result.id);
        const data = await User.findOneAndUpdate(
          { _id: result.id },
          { $set: { token: token } }
        );
        res.status(200).json({
          token: token,
          message: "login successfully",
        });
      } else {
        res.send("invalid login details");
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },

  getUserData: async (req, res) => {
    try {
      res.json({ msg: "successfully fetch" });
      let token = req.headers["authorization"];
      if (token) {
        token = token.split(" ")[1];
      }
      const getUser = await User.findOne({
        token: token,
      });
      res.status(200).json({ message: getUser });
    } catch (error) {}
  },
};
