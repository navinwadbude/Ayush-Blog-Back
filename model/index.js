const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },

  password: {
    type: Number,
    min: 6,
  },
  cpassword: {
    type: Number,
    min: 6,
  },
  email: {
    type: String,
    required: true,
  },
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
