const express = require("express");
const { getInTouch } = require("./../../controller/atlas.controller");

const router = express.Router();

router.post("/get_in_touch", getInTouch);

module.exports = router;
