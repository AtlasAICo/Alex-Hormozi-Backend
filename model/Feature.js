const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const feature_schema = mongoose.Schema({
  id: { type: String, default: uuidv4() },
  name: { type: String },
  description: { type: String },
  api_endpoint: { type: String },
});

const Feature = mongoose.model("feature", feature_schema);

module.exports = {
  Feature,
};
