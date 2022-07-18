const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { accessToken, refreshToken } = require("../utils/utils");

const bcrypt = require("bcrypt");
module.exports = {
  signup: async (req, res) => {
    try {
      const pass = await bcrypt.hash(req.body.password, 10);
      req.body.password = pass;

      const result = await User.findOne({ email: req.body.email });
      console.log("result", result);
      if (result) {
        return res.status(201).json({ message: "user already exist" });
      }

      console.log("user", { ...req.body });

      const createuser = await User({ ...req.body }).save();
      if (!createuser) {
        res.status(201).send("user is not created ");
      }
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
        console.log("=>", token);
        res.status(200).json({
          token: token,
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
      console.log("--0------", req.headers["authorization"]);
      res.json({ msg: "successfully fetch" });
      let token = req.headers["authorization"];
      console.log("=====>", req.headers);
      if (token) {
        token = token.split(" ")[1];
        console.log("eeeeeeeeeeeee>", token);
      }

      const getUser = await User.findOne({
        token: token,
      });
      res.status(200).json({ message: getUser });
    } catch (error) {}
  },
};
