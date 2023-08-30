const express = require("express");
const { Data } = require("./../../model/Data");
const User = require("../../model/User");

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const { email, info, id } = req.body;
    
    if (id) {
      const data_2 = await Data.find({ id });
      console.log({ data_2 });
      if (data_2.length > 0) {
        await Data.updateOne({ id }, { email, info });
        console.log("Updated the info successfully");
        return res.json({ message: "Updated the info successfully" });
      }
    }

    if (email) {
      const data = await Data.find({ email });

      if (data.length > 0) {
        await Data.updateOne({ email }, { id, info });
        console.log("Updated the info successfully");
        return res.json({ message: "Updated the info successfully" });
      }
    }

    console.log({ id, email, info });

    const newData = new Data({ id, email, info });
    await newData.save();
    console.log("Data stored successfully");
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

// Only works if the token is present and matches the secret key
router.delete("/:email", async (req, res) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Split the header by space and get the second part (the token)

  // Check if the token is present and matches the secret key
  if (!token || token !== process.env.secret) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const email = req.params.email;
  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.deleteOne({ email });
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the user" });
  }
});

module.exports = router;
