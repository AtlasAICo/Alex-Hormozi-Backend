const express = require("express");
const router = express.Router();
const { Feature } = require("../../model/Feature");

// Route to get a list of all features
router.get("/", async (req, res) => {
  try {
    const features = await Feature.find();
    res.status(200).json(features);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve features" });
  }
});

// Route to add a new feature
router.post("/", async (req, res) => {
  try {
    const { name, description, api_endpoint } = req.body;

    if (!name || !description || !api_endpoint) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const newFeature = new Feature({
      name,
      description,
      api_endpoint,
    });

    await newFeature.save();

    res.status(201).json(newFeature);
  } catch (error) {
    res.status(500).json({ error: "Could not add the feature" });
  }
});

module.exports = router;
