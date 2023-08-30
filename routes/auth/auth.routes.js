const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../model/User");
const {
  verifyEmail,
  generateOtp,
  sendOtp,
  generateRandomPassword,
  verifyRgnPassword,
} = require("../../utils/email");
const { checkIfUserExist } = require("../../utils/auth");
require("dotenv").config();

const router = express.Router();

//verify email
router.post("/verfiy-email", verifyEmail);

router.post("/verify-rgn", async (req, res) => {
  const { email, rgn } = req.body;

  if (!email || !rgn) {
    return res
      .status(400)
      .json({ success: false, message: "Missing email or rgn" });
  }

  const { success, user } = await verifyRgnPassword(email, rgn);

  if (success && user) {
    // const user = await User.findOne({ email });
    const secret = process.env.secret;
    const token = jwt.sign(
      { email: user.email, mobileNumber: user.mobileNumber },
      secret
    );
    return res.json({ success: true, token, message: "password verified" });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Invalid password or email" });
  }
});

// Register new user
router.post("/signup", async (req, res) => {
  try {
    const { email, mobileNumber, password } = req.body;
    const doesExist = await checkIfUserExist(email);
    console.log({ doesExist });
    if (doesExist)
      return res.json({
        message: "User already exists login with existing password",
      });
    // const otpForEmail = generateOtp();
    const rgp = generateRandomPassword();
    console.log({ email, mobileNumber, rgp });
    await sendOtp(
      process.env.user,
      email,
      "Email Verification",
      `Your randomly generated password for email verificaton at alex harmozi is ${rgp}`
    );
    const isUser = await User.findOne({ email: email });
    if (isUser && isUser.email) {
      return res.json({
        message: "User is already registered",
      });
    }
    const user = new User({ email, mobileNumber, password, rgp });
    await user.save();
    res.status(201).json({ message: "User registered successfully", email });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ message: err.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const secret = process.env.secret;
    const token = jwt.sign({ user }, secret);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
