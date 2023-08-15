const express = require("express");
const { Data } = require("./../../model/Data");

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const { email, info } = req.body;
    const data = await Data.find({ email });

    if (data.length > 0) {
      await Data.updateOne({ email }, { info });
      return res.json({ message: "Updated the info successfully" });
    }

    const newData = new Data({ email, info });
    await newData.save();
    res.status(201).json({ message: "Data stored successfully" });
  } catch (error) {
    console.log("eror : " + error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/:email", async (req, res, next) => {
  const email = req.params.email;
  if (!email) {
    return res.json({ message: "Email required" });
  }
  try {
    const data = await Data.find({ email });
    res.json(data);
  } catch (error) {
    console.log(error.message);
    res.json({ message: "Something went wrong" }).status(404);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
