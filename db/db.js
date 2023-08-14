const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async (cb) => {
  try {
    const mongo_url = process.env.MONGO_URI;
    // Connect to MongoDB
    const db = await mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to db");
    cb();
  } catch (error) {
    console.log("Not able to connect to mongodb");
    console.log(error);
  }
};

module.exports = {
  connectDb,
};
