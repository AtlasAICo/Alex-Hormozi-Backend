const express = require("express");
const { Prompt } = require("./../../model/Prompt");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// Create a new prompt
router.post("/", async (req, res) => {
  try {
    const { type, role, prompt, inputVariables } = req.body;

    const newPrompt = new Prompt({
      id: uuidv4(),
      type,
      role,
      prompt,
      inputVariables,
    });

    const savedPrompt = await newPrompt.save();
    res.json(savedPrompt);
  } catch (error) {
    console.error("Error creating prompt:", error);
    res.status(500).json({ message: "Error creating prompt" });
  }
});

// Get all prompts
router.get("/", async (req, res) => {
  try {
    const prompts = await Prompt.find();
    res.json(prompts);
  } catch (error) {
    console.error("Error getting prompts:", error);
    res.status(500).json({ message: "Error getting prompts" });
  }
});

// Get a single prompt by ID
router.get("/:id", async (req, res) => {
  try {
    const prompt = await Prompt.findOne({ id: req.params.id });
    if (!prompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }
    res.json(prompt);
  } catch (error) {
    console.error("Error getting prompt:", error);
    res.status(500).json({ message: "Error getting prompt" });
  }
});

// Update a prompt by ID
router.patch("/:id", async (req, res) => {
  try {
    const promptId = req.params.id;
    const { type, role, prompt, inputVariables } = req.body;

    const updatedFields = {};
    if (type) updatedFields.type = type;
    if (role) updatedFields.role = role;
    if (prompt) updatedFields.prompt = prompt;
    if (inputVariables) updatedFields.inputVariables = inputVariables;

    const updatedPrompt = await Prompt.updateOne(
      { id: promptId },
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedPrompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }

    res.json(updatedPrompt);
  } catch (error) {
    console.error("Error updating prompt:", error);
    res.status(500).json({ message: "Error updating prompt" });
  }
});

// Update a prompt by ID
router.put("/:id", async (req, res) => {
  try {
    const { type, role, prompt, inputVariables } = req.body;

    const updatedPrompt = await Prompt.findByIdAndUpdate(req.params.id, {
      type,
      role,
      prompt,
      inputVariables,
    });

    if (!updatedPrompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }

    res.json(updatedPrompt);
  } catch (error) {
    console.error("Error updating prompt:", error);
    res.status(500).json({ message: "Error updating prompt" });
  }
});

// Delete a prompt by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPrompt = await Prompt.findByIdAndDelete(req.params.id);

    if (!deletedPrompt) {
      return res.status(404).json({ message: "Prompt not found" });
    }

    res.json({ message: "Prompt deleted successfully" });
  } catch (error) {
    console.error("Error deleting prompt:", error);
    res.status(500).json({ message: "Error deleting prompt" });
  }
});

module.exports = router;
