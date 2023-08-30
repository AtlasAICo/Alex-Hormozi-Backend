const mongoose = require("mongoose");

// Define schema and model
const dataSchema = new mongoose.Schema({
  id: String,
  email: String,
  info: [{}],
});
const Data = mongoose.model("account_data", dataSchema);

module.exports = {
  Data,
};
