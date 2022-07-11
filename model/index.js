const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // username: String,
    // email: String,
    // password: String,
    // password_confirmation: String,
  
      name :{
          type :String,
          required : true,
          minlength : 3,
      },
    
      password : {
         type : Number,
         min : 6,
      },
      cpassword : {
        type : Number,
        min : 6,
     },
      email : {
          type :String,
          required : true,
          unique : [true , 'email id already present i'],
      }
  })
  
  const User = new mongoose.model('User',userSchema);
  module.exports = User;
  