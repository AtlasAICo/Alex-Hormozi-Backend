const express = require("express");
const authRoutes = require("./routes/auth/auth.routes");
const chatRoutes = require("./routes/chat/chat.routes");
const detailsRoutes = require("./routes/account/accounts.routes");
const featureRoutes = require("./routes/prompt/prompt.routes");
const atlasRoutes = require("./routes/atlas/atlas.routes");
const outputsRoutes = require("./routes/outputs/outputs.routes");
const promptRoutes = require("./routes/prompts/prompts.routes");
const { connectDb } = require("./db/db");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3030;

const app = express();
app.use(express.json());

app.use(cors());

app.use("/auth", authRoutes);
app.use("/chats", chatRoutes);
app.use("/feature", featureRoutes);
app.use("/details", detailsRoutes);
app.use("/outputs", outputsRoutes);
app.use("/prompts", promptRoutes);

//Some endpoints for atlasco.ai
app.use("/atlas", atlasRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the APP",
  });
});

const startServer = () => {
  app.listen(PORT, () => {
    console.log("App is listening on port " + PORT);
  });
};

connectDb(startServer);
