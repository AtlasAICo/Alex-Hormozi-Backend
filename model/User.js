const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true },
  password: { type: String },
  otpForEmail: { type: String },
  rgp: { type: String },
  isEmailVerified: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
