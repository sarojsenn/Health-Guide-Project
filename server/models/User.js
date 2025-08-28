const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  otp: { type: String },
  otpExpires: { type: Date },
  name: { type: String },
  age: { type: Number },
  gender: { type: String },
  contact: { type: String },
  other: { type: String }
});

module.exports = mongoose.model("User", UserSchema);
