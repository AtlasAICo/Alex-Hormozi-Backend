const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const user = process.env.user;
const pass = process.env.pass;

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass,
  },
});

function generateRandomPassword(length = 12) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
}

const generateOtp = () =>
  otpGenerator.generate(6, {
    digits: true,
    upperCase: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

const sendOtp = async (from, to, subject, text) => {
  const mailOptions = {
    from,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");
  } catch (error) {
    console.log("Error sending mail: " + error);
    throw new Error("Error sending mail: ");
  }
};

const sendGetInTouchData = async (from, to, subject, text) => {
  const mailOptions = {
    from,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Get in touch us data sent successfully");
  } catch (error) {
    console.log("Error sending get in touch us data: " + error);
    throw new Error("Error sending get in touch us data: ");
  }
};

// API to send OTP to the user's email
const verifyEmail = async (req, res) => {
  try {
    const { otp, email } = req.body;
    if (!otp || !email) {
      return res
        .json({
          message: "Error while verifying email address!",
        })
        .status(400);
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.json({
        message: `User not found with the email ${email}`,
      });
    }
    if (user.otpForEmail === otp) {
      await User.updateOne({ email }, { isEmailVerified: true });
      const secret = process.env.secret;
      const token = jwt.sign({ user }, secret);
      return res.json({ token });
    } else
      return res.json({
        message: "OTP is not valid",
      });
  } catch (error) {
    res.json({
      message: "Something went wrong!",
    });
  }
};

async function verifyRgnPassword(email, rgn) {
  try {
    // Find the user by their email
    const user = await User.findOne({ email });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const isRgnValid = rgn === user.rgp;

    if (isRgnValid) {
      return { success: true, message: "RGN password verified" };
    } else {
      return { success: false, message: "Invalid RGN password" };
    }
  } catch (error) {
    return { success: false, message: "An error occurred" };
  }
}

module.exports = {
  verifyEmail,
  generateOtp,
  sendOtp,
  sendGetInTouchData,
  generateRandomPassword,
  verifyRgnPassword,
};
