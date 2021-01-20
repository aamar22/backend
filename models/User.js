const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const Token = require('../models/token');

const bcrypt = require("bcryptjs");

// Create Schema
const UserSchema = new Schema({
  name: {type: String,required: true},
  email: {type: String,required: true,unique:true },
  mobile:{type:Number,required:false},
  password: {type: String,required: true},
  type:{type:String},
  isVerified: {type: Boolean,default: false},  
  checkbox: {type:String,default:false},
  date: {type: Date,default: Date.now},
  resetPasswordToken: {type: String,required: false},
// resetPasswordExpires: {type: Date,required: false}
  // fresher:[{type:Schema.Types.ObjectId,
  // ref:"fresher"}]   

});
UserSchema.pre('save',  function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          user.password = hash;
          next();
      });
  });
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  let payload = {
      id: this._id,
      email: this.email,
      name: this.name,
      type: this.type
      
  };

  return jwt.sign(payload, 'seceret', {
      expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
  });
};

// UserSchema.methods.generatePasswordReset = function() {
// //   let payload = {
// //     userId: this._id,
// //     resettoken: crypto.randomBytes(20).toString('hex')
// // };
// // return new Resettoken(payload);
//   this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
//   this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
// };

UserSchema.methods.generateVerificationToken = function() {
  let payload = {
      userId: this._id,
      token: crypto.randomBytes(20).toString('hex')
  };

  return new Token(payload);
};

       
module.exports = User = mongoose.model("users", UserSchema);

   