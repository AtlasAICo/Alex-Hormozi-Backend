const express = require("express");
const authenticateUser = require("../../middleware/auth");
const User = require("../../model/User");
const { Output } = require("../../model/Output");

const router = express.Router();


// get output
router.get("/", async (req, res) => {
  try {
    const { email, outputType } = req.query;
    if (!email) {
      return res.json({
        message: "No email address provided",
      });
    }

    if (!outputType) {
      return res.json({
        message: "No outputType provided",
      });
    }

    const result = await Output.findOne({ email, outputType });
    if (!result) {
      return res.json({
        message: `No result found related to this email:${email} and outputType:${outputType}`,
      });
    }

    res.json({
      result: result.output,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
