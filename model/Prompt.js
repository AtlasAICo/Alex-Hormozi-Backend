const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const prompt_schema = mongoose.Schema({
  id: { type: String, default: uuidv4() },
  type: String,
  role: String,
  prompt: String,
  inputVariables: [],
});

const Prompt = mongoose.model("prompt", prompt_schema);

module.exports = {
  Prompt,
};
