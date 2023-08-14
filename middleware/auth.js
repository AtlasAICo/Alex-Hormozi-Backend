const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = (req, res, next) => {
  const data = req.header("Authorization").split(" ");
  const token = data[1];
  if (!token) {
    return res.status(401).json({ error: "Authentication token not provided" });
  }

  try {
    const secret = process.env.secret;
    const decodedToken = jwt.verify(token, secret);
    req.user = decodedToken.user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authenticateUser;
