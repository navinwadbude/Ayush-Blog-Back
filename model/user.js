const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },

  password: {
    type: String,
    min: 6,
  },
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null,
  },
},{timestamps:true});

const User = new mongoose.model("User", userSchema);
module.exports = User;
