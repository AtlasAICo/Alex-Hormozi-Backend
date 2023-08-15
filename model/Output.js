const mongoose = require("mongoose");

const outputSchema = new mongoose.Schema({
  email: String,
  createdAt: { type: Date, default: Date.now },
  outputType: { type: String, required: true },
  output: { type: String, required: true },
})

const Output = mongoose.model("Output", outputSchema);

module.exports = {
  Output,
};
