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

  const result = await verifyRgnPassword(email, rgn);

  if (result.success) {
    const user = await User.findOne({ email });
    const secret = process.env.secret;
    const token = jwt.sign(
      { email: user.email, mobileNumber: user.mobileNumber },
      secret
    );
    return res.json({ success: true, token, message: "password verified" });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Invalid RGN password" });
  }
});

// Register new user
router.post("/signup", async (req, res) => {
  try {
    const { email, mobileNumber, password } = req.body;
    // const otpForEmail = generateOtp();
    const rgp = generateRandomPassword();
    console.log({ email, mobileNumber, rgp });
    await sendOtp(
      "gk4051668@gmail.com",
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
    res.status(500).json({ error: err.message });
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
